from flask import Blueprint, render_template, request
from app.database.connection import create_connection
from datetime import datetime

matricula_bp = Blueprint('matricula', __name__)
@matricula_bp.route('/matricula', methods=['GET', 'POST'])
def matricula():
    if request.method == 'POST':
        try:
            # =========================
            # DADOS DO ALUNO
            # =========================
            nomes_alunos = request.form.getlist(
                'nome_aluno[]'
            )
            datas_nascimento = request.form.getlist(
                'data_nascimento_aluno[]'
            )
            
            periodos = request.form.getlist('periodo[]')
            # =========================
            # DADOS DO RESPONSÁVEL
            # =========================
            nome_responsavel = request.form.get(
                'nome_responsavel'
            )
            cpf = request.form.get(
                'cpf'
            )
            rg = request.form.get(
                'rg'
            )            
            email = request.form.get(
                'email'
            )
            telefone = request.form.get(
                'telefone'
            )
            data_nascimento_responsavel = request.form.get(
                'data_nascimento_responsavel'
            )
            rua = request.form.get(
                'rua'
            )
            numero = request.form.get(
                'numero'
            )
            complemento = request.form.get(
                'complemento'
            )
            cep = request.form.get(
                'cep'
            )

            hoje = datetime.today().date()
            # Valida data do responsável
            if datetime.strptime(
                data_nascimento_responsavel,
                "%Y-%m-%d"
            ).date() > hoje:

                return "Data de nascimento do responsável inválida."
                    
            print("DADOS RECEBIDOS")
            connection = create_connection()
            if not connection:
                return "ERRO: conexão falhou"
            cursor = connection.cursor()            
    
            # =========================
            # INSERE RESPONSÁVEL
            # =========================
            sql_responsavel = """
            INSERT INTO responsaveis (
                nome,
                cpf,
                rg,
                email,
                telefone,
                data_nascimento,
                rua,
                numero,
                complemento,
                cep
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            valores_responsavel = (
                nome_responsavel,
                cpf,
                rg,
                email,
                telefone,
                data_nascimento_responsavel,
                rua,
                numero,
                complemento,
                cep
            )
            cursor.execute(
                sql_responsavel,
                valores_responsavel
            )
            connection.commit()
            responsavel_id = cursor.lastrowid
            print("RESPONSÁVEL CRIADO")


            for i in range(len(nomes_alunos)):

                # =========================
                # INSERE ALUNO
                # =========================

                if datetime.strptime(
                    datas_nascimento[i],
                    "%Y-%m-%d"
                ).date() > hoje:

                    return f"Data de nascimento do aluno {i + 1} inválida."

                sql_aluno = """
                INSERT INTO alunos (
                    nome,
                    data_nascimento
                )
                VALUES (%s, %s)
                """

                valores_aluno = (
                    nomes_alunos[i],
                    datas_nascimento[i]
                )

                cursor.execute(
                    sql_aluno,
                    valores_aluno
                )

                connection.commit()

                aluno_id = cursor.lastrowid

                cursos_aluno = request.form.getlist(
                    f'curso_{i + 1}[]'
                )

                periodos_aluno = request.form.getlist(
                    f'periodo_{i + 1}[]'
                )

                print(f'Aluno {i+1}')
                print(cursos_aluno)
                print(periodos_aluno)
                

                # =========================
                # VÍNCULO ALUNO/RESPONSÁVEL
                # =========================

                sql_vinculo = """
                INSERT INTO aluno_responsavel (
                    aluno_id,
                    responsavel_id
                )
                VALUES (%s, %s)
                """

                valores_vinculo = (
                    aluno_id,
                    responsavel_id
                )

                cursor.execute(
                    sql_vinculo,
                    valores_vinculo
                )

                connection.commit()

                # =========================
                # MATRÍCULA
                # =========================

                sql_matricula = """
                INSERT INTO matriculas (
                    aluno_id,
                    cursos_id,
                    horario_id,
                    status
                )
                VALUES (%s, %s, %s, %s)
                """

                for j in range(len(cursos_aluno)):

                    valores_matricula = (
                        aluno_id,
                        cursos_aluno[j],
                        periodos_aluno[j],
                        'Pendente'
                    )

                    cursor.execute(
                        sql_matricula,
                        valores_matricula
                    )

                connection.commit()


            cursor.close()
            connection.close()
            return """
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                >
                <title>
                    Matrícula Realizada
                </title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: Arial, sans-serif;
                    }
                    body {
                        min-height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background:
                            linear-gradient(
                                135deg,
                                #2563eb,
                                #1d4ed8
                            );
                    }
                    .sucesso-box {
                        background: white;
                        padding: 60px;
                        border-radius: 28px;
                        text-align: center;
                        max-width: 550px;
                        box-shadow:
                            0 20px 50px rgba(0,0,0,0.18);
                    }
                    .icone {
                        font-size: 80px;
                        margin-bottom: 25px;
                    }
                    h1 {
                        color: #0f172a;
                        margin-bottom: 20px;
                        font-size: 38px;
                    }
                    p {
                        color: #475569;
                        font-size: 18px;
                        line-height: 1.7;
                        margin-bottom: 35px;
                    }
                    .btn {
                        display: inline-block;
                        padding: 16px 32px;
                        border-radius: 14px;
                        background: #2563eb;
                        color: white;
                        text-decoration: none;
                        font-weight: bold;
                        transition: 0.3s ease;
                    }
                    .btn:hover {
                        transform: translateY(-4px);
                        background: #1d4ed8;
                    }
                    .btn-whatsapp {

                        display: block;

                        width: 100%;

                        padding: 16px;

                        border-radius: 14px;

                        background: #25d366;

                        color: white;

                        text-decoration: none;

                        font-weight: bold;

                        margin-bottom: 15px;

                        transition: .3s ease;
                    }

                    .btn-whatsapp:hover {

                        background: #20ba5a;

                        transform: translateY(-4px);
                    }

                    .btn-voltar {

                        display: block;

                        width: 100%;

                        padding: 16px;

                        border-radius: 14px;

                        background: #e2e8f0;

                        color: #0f172a;

                        text-decoration: none;

                        font-weight: bold;

                        transition: .3s ease;
                    }

                    .btn-voltar:hover {

                        transform: translateY(-4px);

                        background: #cbd5e1;
                    }
                </style>
            </head>
            <body>

                <div class="sucesso-box">

                    <div class="icone">
                        🎉
                    </div>

                    <h1>
                        Pré-Matrícula Realizada!
                    </h1>

                    <p>

                        Seus dados foram enviados com sucesso. 
                        Em breve a nossa equipe entrará em contato com você.

                        <br><br>

                        Para agilizar seu atendimento e garantir sua vaga,
                        clique no botão abaixo e confirme sua pré-matrícula
                        diretamente pelo WhatsApp.

                    </p>

                    <a
                        href="https://wa.me/5512997781432?text=Olá!%20Acabei%20de%20realizar%20minha%20pré-matrícula%20no%20site%20da%20Alfa%20Cursos%20e%20gostaria%20de%20receber%20mais%20informações."
                        target="_blank"
                        class="btn-whatsapp"
                    >
                        📲 Confirmar Pré-Matrícula
                    </a>

                    <a
                        href="/"
                        class="btn-voltar"
                    >
                        Voltar ao Site
                    </a>

                </div>

            </body>
            </html>
            """
        except Exception as e:
            print("ERRO:")
            print(e)
            return f"ERRO NO SISTEMA: {e}"
    return render_template('matricula.html')