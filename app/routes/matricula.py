from flask import Blueprint, render_template, request

from app.database.connection import create_connection

matricula_bp = Blueprint('matricula', __name__)


@matricula_bp.route('/matricula', methods=['GET', 'POST'])
def matricula():

    if request.method == 'POST':

        try:

            nome = request.form.get('nome')
            email = request.form.get('email')
            telefone = request.form.get('telefone')
            data_nascimento = request.form.get('data_nascimento')

            curso_id = request.form.get('curso')

            print("DADOS RECEBIDOS:")
            print(nome)
            print(email)
            print(telefone)
            print(data_nascimento)
            print(curso_id)

            connection = create_connection()

            if not connection:

                return "ERRO: conexão falhou"

            cursor = connection.cursor()

            # =========================
            # INSERE ALUNO
            # =========================

            sql_aluno = """
            INSERT INTO alunos
            (nome, email, telefone, data_nascimento)

            VALUES (%s, %s, %s, %s)
            """

            valores_aluno = (
                nome,
                email,
                telefone,
                data_nascimento
            )

            cursor.execute(sql_aluno, valores_aluno)

            connection.commit()

            aluno_id = cursor.lastrowid

            print("ALUNO CRIADO:", aluno_id)

            # =========================
            # INSERE MATRÍCULA
            # =========================

            sql_matricula = """
            INSERT INTO matriculas
            (aluno_id, cursos_id)

            VALUES (%s, %s)
            """

            valores_matricula = (
                aluno_id,
                curso_id
            )

            cursor.execute(
                sql_matricula,
                valores_matricula
            )

            connection.commit()

            print("MATRÍCULA CRIADA")

            cursor.close()
            connection.close()

            return """
            <h1>Matrícula realizada com sucesso!</h1>
            <a href="/">Voltar</a>
            """

        except Exception as e:

            print("ERRO:")
            print(e)

            return f"ERRO NO SISTEMA: {e}"

    return render_template('matricula.html')