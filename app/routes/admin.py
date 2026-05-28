from flask import (Blueprint, render_template, request, redirect, session
)

from app.database.connection import create_connection

from werkzeug.security import check_password_hash

# Cria o Blueprint do admin
admin_bp = Blueprint('admin', __name__)

# Página de login do administrador
@admin_bp.route('/admin', methods=['GET', 'POST'])
def admin_login():

    if request.method == 'POST':

        email = request.form.get('email')
        senha = request.form.get('senha')

        connection = create_connection()
 
        cursor = connection.cursor(dictionary=True)

        sql = """
        SELECT * FROM administradores
        WHERE email = %s
        """

        valores = (email,)

        cursor.execute(sql, valores)

        admin = cursor.fetchone()

        cursor.close()
        connection.close()
        
        if admin and check_password_hash(admin['senha'], senha):

            session['admin_id'] = admin['id']
            session['admin_nome'] = admin['nome']

            return redirect('/admin/dashboard')

        else:

            return """
            <h1>Email ou senha inválidos</h1>
            <a href="/admin">Voltar</a>
            """

    return render_template('admin/login.html')

# Dashboard principal
# Dashboard principal
@admin_bp.route('/admin/dashboard')
def dashboard():

    if 'admin_id' not in session:
        return redirect('/admin')

    connection = create_connection()

    cursor = connection.cursor(dictionary=True)

    # TOTAL ALUNOS
    cursor.execute("SELECT COUNT(*) AS total FROM alunos")
    total_alunos = cursor.fetchone()['total']

    # TOTAL CURSOS
    cursor.execute("SELECT COUNT(*) AS total FROM cursos")
    total_cursos = cursor.fetchone()['total']

    # MATRÍCULAS ATIVAS
    cursor.execute("""
        SELECT COUNT(*) AS total
        FROM matriculas
        WHERE status = 'Ativa'
    """)
    matriculas_ativas = cursor.fetchone()['total']

    # MATRÍCULAS PENDENTES
    cursor.execute("""
        SELECT COUNT(*) AS total
        FROM matriculas
        WHERE status = 'Pendente'
    """)
    matriculas_pendentes = cursor.fetchone()['total']

    # MATRÍCULAS RECENTES
    cursor.execute("""

        SELECT
            alunos.nome AS aluno,
            cursos.nome AS curso,
            matriculas.status

        FROM matriculas

        JOIN alunos
        ON matriculas.aluno_id = alunos.id

        JOIN cursos
        ON matriculas.cursos_id = cursos.id

        ORDER BY matriculas.id DESC

        LIMIT 5

    """)

    matriculas_recentes = cursor.fetchall()

    cursor.close()
    connection.close()

    

    return render_template(

        'admin/dashboard.html',

        total_alunos=total_alunos,
        total_cursos=total_cursos,

        matriculas_ativas=matriculas_ativas,
        matriculas_pendentes=matriculas_pendentes,

        matriculas_recentes=matriculas_recentes
    )


# Página de alunos
@admin_bp.route('/admin/alunos')
def alunos():

    if 'admin_id' not in session:
        return redirect('/admin')

    connection = create_connection()

    cursor = connection.cursor(dictionary=True)

    cursor.execute("""

        SELECT
            id,
            nome,
            email,
            telefone,

            TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE())
            -
            (
                DATE_FORMAT(CURDATE(), '%m%d')
                <
                DATE_FORMAT(data_nascimento, '%m%d')
            ) AS idade

        FROM alunos

        ORDER BY nome ASC

    """)

    alunos = cursor.fetchall()

    cursor.close()
    connection.close()

    return render_template(
        'admin/alunos.html',
        alunos=alunos
    )


# Página de matrículas
@admin_bp.route('/admin/matriculas')
def matriculas():

    if 'admin_id' not in session:
        return redirect('/admin')

    connection = create_connection()

    cursor = connection.cursor(dictionary=True)

    cursor.execute("""

        SELECT

            matriculas.id,
            matriculas.aluno_id,
                   
            alunos.nome AS aluno,
                   
            cursos.nome AS curso,
                   
            matriculas.status,
            matriculas.data_matricula

        FROM matriculas

        JOIN alunos
        ON matriculas.aluno_id = alunos.id

        JOIN cursos
        ON matriculas.cursos_id = cursos.id

        ORDER BY matriculas.id DESC

    """)

    matriculas = cursor.fetchall()

    cursor.close()
    connection.close()

    return render_template(
        'admin/matriculas.html',
        matriculas=matriculas
    )


# Ativar matrícula
@admin_bp.route('/admin/matriculas/ativar/<int:id>')
def ativar_matricula(id):

    if 'admin_id' not in session:
        return redirect('/admin')

    connection = create_connection()

    cursor = connection.cursor()

    sql = """
    UPDATE matriculas
    SET status = 'Ativa'
    WHERE id = %s
    """

    valores = (id,)

    cursor.execute(sql, valores)

    connection.commit()

    cursor.close()
    connection.close()

    return redirect('/admin/matriculas')


# Cancelar matrícula
@admin_bp.route('/admin/matriculas/cancelar/<int:id>')
def cancelar_matricula(id):

    if 'admin_id' not in session:
        return redirect('/admin')

    connection = create_connection()

    cursor = connection.cursor()

    sql = """
    UPDATE matriculas
    SET status = 'Cancelada'
    WHERE id = %s
    """

    valores = (id,)

    cursor.execute(sql, valores)

    connection.commit()

    cursor.close()
    connection.close()

    return redirect('/admin/matriculas')


# Detalhes do aluno
@admin_bp.route('/admin/aluno/<int:id>')
def detalhes_aluno(id):

    if 'admin_id' not in session:
        return redirect('/admin')

    connection = create_connection()

    cursor = connection.cursor(dictionary=True)

    cursor.execute("""

        SELECT

            alunos.nome,
            alunos.email,
            alunos.telefone,
            TIMESTAMPDIFF(YEAR, alunos.data_nascimento, CURDATE())
            -
            (
                DATE_FORMAT(CURDATE(), '%m%d')
                <
                DATE_FORMAT(alunos.data_nascimento, '%m%d')
            ) AS idade,

            cursos.nome AS curso,

            matriculas.status,
            matriculas.data_matricula

        FROM matriculas

        JOIN alunos
        ON matriculas.aluno_id = alunos.id

        JOIN cursos
        ON matriculas.cursos_id = cursos.id

        WHERE alunos.id = %s

        LIMIT 1

    """, (id,))

    aluno = cursor.fetchone()

    cursor.close()
    connection.close()

    return aluno

# Logout admin
@admin_bp.route('/admin/logout')
def logout():

    session.clear()

    return redirect('/admin')