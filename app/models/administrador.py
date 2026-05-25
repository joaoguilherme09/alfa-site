from app.database.connection import create_connection

class Administrador:

    def __init__(self, id=None, nome=None, email=None, senha=None):
        self.id = id
        self.nome = nome
        self.email = email
        self.senha = senha

    # =========================
    # LISTAR TODOS
    # =========================
    @staticmethod
    def listar_todos():
        connection = create_connection()

        if connection is None:
            return []

        cursor = connection.cursor(dictionary=True)

        query = "SELECT * FROM administradores"

        cursor.execute(query)

        administradores = cursor.fetchall()

        cursor.close()
        connection.close()

        return administradores

    # =========================
    # BUSCAR POR EMAIL
    # =========================
    @staticmethod
    def buscar_por_email(email):
        connection = create_connection()

        if connection is None:
            return None

        cursor = connection.cursor(dictionary=True)

        query = "SELECT * FROM administradores WHERE email = %s"

        cursor.execute(query, (email,))

        administrador = cursor.fetchone()

        cursor.close()
        connection.close()

        return administrador

    # =========================
    # SALVAR ADMIN
    # =========================
    def salvar(self):
        connection = create_connection()

        if connection is None:
            return False

        cursor = connection.cursor()

        query = """
            INSERT INTO administradores (nome, email, senha)
            VALUES (%s, %s, %s)
        """

        valores = (
            self.nome,
            self.email,
            self.senha
        )

        cursor.execute(query, valores)

        connection.commit()

        cursor.close()
        connection.close()

        return True
