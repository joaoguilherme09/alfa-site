from flask import Blueprint, render_template, request
from app.database.connection import create_connection
from datetime import datetime

matricula_bp = Blueprint('matricula', __name__)

def sanitizar(valor, max_len=200):
    """Remove espaços extras e limita tamanho."""
    if not valor:
        return ''
    return str(valor).strip()[:max_len]

@matricula_bp.route('/matricula', methods=['GET', 'POST'])
def matricula():
    if request.method == 'POST':
        try:
            hoje = datetime.today().date()

            # Dados do aluno
            nomes_alunos     = request.form.getlist('nome_aluno[]')
            datas_nascimento = request.form.getlist('data_nascimento_aluno[]')

            # Dados do responsável
            nome_responsavel           = sanitizar(request.form.get('nome_responsavel'))
            cpf                        = sanitizar(request.form.get('cpf'), 20)
            rg                         = sanitizar(request.form.get('rg'), 20)
            email                      = sanitizar(request.form.get('email'), 150)
            telefone                   = sanitizar(request.form.get('telefone'), 20)
            data_nascimento_responsavel = request.form.get('data_nascimento_responsavel')
            rua                        = sanitizar(request.form.get('rua'))
            numero                     = sanitizar(request.form.get('numero'), 10)
            complemento                = sanitizar(request.form.get('complemento'), 100)
            cep                        = sanitizar(request.form.get('cep'), 10)

            # Validações básicas
            if not nome_responsavel or not cpf or not email or not telefone:
                return render_template('matricula.html', erro="Preencha todos os campos obrigatórios.")

            try:
                data_resp = datetime.strptime(data_nascimento_responsavel, "%Y-%m-%d").date()
                if data_resp > hoje:
                    return render_template('matricula.html', erro="Data de nascimento do responsável inválida.")
            except Exception:
                return render_template('matricula.html', erro="Data de nascimento do responsável inválida.")

            connection = create_connection()
            if not connection:
                return render_template('matricula.html', erro="Erro ao conectar. Tente novamente.")

            cursor = connection.cursor()

            # Insere responsável
            cursor.execute("""
                INSERT INTO responsaveis (
                    nome, cpf, rg, email, telefone,
                    data_nascimento, rua, numero, complemento, cep
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                nome_responsavel, cpf, rg, email, telefone,
                data_nascimento_responsavel, rua, numero, complemento, cep
            ))
            connection.commit()
            responsavel_id = cursor.lastrowid

            for i in range(len(nomes_alunos)):
                nome_aluno = sanitizar(nomes_alunos[i])

                try:
                    data_aluno = datetime.strptime(datas_nascimento[i], "%Y-%m-%d").date()
                    if data_aluno > hoje:
                        return render_template('matricula.html', erro=f"Data de nascimento do aluno {i+1} inválida.")
                except Exception:
                    return render_template('matricula.html', erro=f"Data de nascimento do aluno {i+1} inválida.")

                cursor.execute("""
                    INSERT INTO alunos (nome, data_nascimento)
                    VALUES (%s, %s)
                """, (nome_aluno, datas_nascimento[i]))
                connection.commit()
                aluno_id = cursor.lastrowid

                cursos_aluno  = request.form.getlist(f'curso_{i+1}[]')
                periodos_aluno = request.form.getlist(f'periodo_{i+1}[]')

                cursor.execute("""
                    INSERT INTO aluno_responsavel (aluno_id, responsavel_id)
                    VALUES (%s, %s)
                """, (aluno_id, responsavel_id))
                connection.commit()

                for j in range(len(cursos_aluno)):
                    cursor.execute("""
                        INSERT INTO matriculas (aluno_id, cursos_id, horario_id, status)
                        VALUES (%s, %s, %s, %s)
                    """, (aluno_id, cursos_aluno[j], periodos_aluno[j], 'Pendente'))

                connection.commit()

            cursor.close()
            connection.close()

            return render_template('matricula_sucesso.html')

        except Exception as e:
            print(f"ERRO MATRÍCULA: {e}")
            return render_template('matricula.html', erro="Ocorreu um erro. Tente novamente.")

    return render_template('matricula.html')