from app.database.connection import create_connection

class Matricula:

    def __init__(
        self,
        id=None,
        aluno_id=None,
        cursos_id=None,
        status='pendente'
    ):
        self.id = id
        self.aluno_id = aluno_id
        self.cursos_id = cursos_id
        self.status = status

    # =========================
    # LISTAR TODAS
    # =========================
    @staticmethod
    def listar_todas():
        connection = create_connection()

        if connection is None:
            return []

        cursor = connection.cursor(dictionary=True)

        query = """
            SELECT 
                matriculas.id,
                alunos.nome AS aluno,
                cursos.nome AS curso,
                matriculas.status,
                matriculas.data_matricula
            FROM matriculas
            INNER JOIN alunos
                ON matriculas.aluno_id = alunos.id
            INNER JOIN cursos
                ON matriculas.cursos_id = cursos.id
        """

        cursor.execute(query)

        matriculas = cursor.fetchall()

        cursor.close()
        connection.close()

        return matriculas

    # =========================
    # BUSCAR POR ID
    # =========================
    @staticmethod
    def buscar_por_id(id):
        connection = create_connection()

        if connection is None:
            return None

        cursor = connection.cursor(dictionary=True)

        query = """
            SELECT * FROM matriculas
            WHERE id = %s
        """

        cursor.execute(query, (id,))

        matricula = cursor.fetchone()

        cursor.close()
        connection.close()

        return matricula

    # =========================
    # SALVAR MATRÍCULA
    # =========================
    def salvar(self):
        connection = create_connection()

        if connection is None:
            return False

        cursor = connection.cursor()

        query = """
            INSERT INTO matriculas (
                aluno_id,
                cursos_id,
                status
            )
            VALUES (%s, %s, %s)
        """

        valores = (
            self.aluno_id,
            self.cursos_id,
            self.status
        )

        cursor.execute(query, valores)

        connection.commit()

        cursor.close()
        connection.close()

        return True
