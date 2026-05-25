from app.models.aluno import Aluno
from app.models.matricula import Matricula

class MatriculaService:

    @staticmethod
    def realizar_matricula(
        nome,
        email,
        telefone,
        data_nascimento,
        cursos_id
    ):

        # =========================
        # VERIFICA SE O ALUNO EXISTE
        # =========================
        aluno_existente = Aluno.buscar_por_email(email)

        # =========================
        # SE NÃO EXISTIR, CRIA
        # =========================
        if aluno_existente is None:

            novo_aluno = Aluno(
                nome=nome,
                email=email,
                telefone=telefone,
                data_nascimento=data_nascimento
            )

            novo_aluno.salvar()

            # Busca novamente para pegar ID
            aluno_existente = Aluno.buscar_por_email(email)

        # =========================
        # CRIA MATRÍCULA
        # =========================
        nova_matricula = Matricula(
            aluno_id=aluno_existente['id'],
            cursos_id=cursos_id,
            status='pendente'
        )

        nova_matricula.salvar()

        return {
            "success": True,
            "message": "Matrícula realizada com sucesso!"
        }
