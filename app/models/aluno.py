from app.database.connection import create_connection

class Aluno:

    def __init__(
        self,
        id=None,
        nome=None,
        email=None,
        telefone=None,
        data_nascimento=None
    ):
        self.id = id
        self.nome = nome
        self.email = email
        self.telefone = telefone
        self.data_nascimento = data_nascimento

    # =========================
    # LISTAR TODOS
    # =========================
    @staticmethod
    def listar_todos():
        connection = create_connection()

        if connection is None:
            return []

        cursor = connection.cursor(dictionary=True)

        query = "SELECT * FROM alunos"

        cursor.execute(query)

        alunos = cursor.fetchall()

        cursor.close()
        connection.close()

        return alunos

    # =========================
    # BUSCAR POR ID
    # =========================
    @staticmethod
    def buscar_por_id(id):
        connection = create_connection()

        if connection is None:
            return None

        cursor = connection.cursor(dictionary=True)

        query = "SELECT * FROM alunos WHERE id = %s"

        cursor.execute(query, (id,))

        aluno = cursor.fetchone()

        cursor.close()
        connection.close()

        return aluno

    # =========================
    # BUSCAR POR EMAIL
    # =========================
    @staticmethod
    def buscar_por_email(email):
        connection = create_connection()

        if connection is None:
            return None

        cursor = connection.cursor(dictionary=True)

        query = "SELECT * FROM alunos WHERE email = %s"

        cursor.execute(query, (email,))

        aluno = cursor.fetchone()

        cursor.close()
        connection.close()

        return aluno

    # =========================
    # SALVAR ALUNO
    # =========================
    def salvar(self):
        connection = create_connection()

        if connection is None:
            return False

        cursor = connection.cursor()

        query = """
            INSERT INTO alunos (
                nome,
                email,
                telefone,
                data_nascimento
            )
            VALUES (%s, %s, %s, %s)
        """

        valores = (
            self.nome,
            self.email,
            self.telefone,
            self.data_nascimento
        )

        cursor.execute(query, valores)

        connection.commit()

        cursor.close()
        connection.close()

        return True
