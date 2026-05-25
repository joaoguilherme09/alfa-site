from app.database.connection import create_connection

class Curso:

    def __init__(
        self,
        id=None,
        nome=None,
        descricao=None,
        duracao=None,
        valor=None,
        categoria=None
    ):
        self.id = id
        self.nome = nome
        self.descricao = descricao
        self.duracao = duracao
        self.valor = valor
        self.categoria = categoria

    # =========================
    # LISTAR TODOS
    # =========================
    @staticmethod
    def listar_todos():
        connection = create_connection()

        if connection is None:
            return []

        cursor = connection.cursor(dictionary=True)

        query = "SELECT * FROM cursos"

        cursor.execute(query)

        cursos = cursor.fetchall()

        cursor.close()
        connection.close()

        return cursos

    # =========================
    # BUSCAR POR ID
    # =========================
    @staticmethod
    def buscar_por_id(id):
        connection = create_connection()

        if connection is None:
            return None

        cursor = connection.cursor(dictionary=True)

        query = "SELECT * FROM cursos WHERE id = %s"

        cursor.execute(query, (id,))

        curso = cursor.fetchone()

        cursor.close()
        connection.close()

        return curso

    # =========================
    # BUSCAR POR CATEGORIA
    # =========================
    @staticmethod
    def buscar_por_categoria(categoria):
        connection = create_connection()

        if connection is None:
            return []

        cursor = connection.cursor(dictionary=True)

        query = "SELECT * FROM cursos WHERE categoria = %s"

        cursor.execute(query, (categoria,))

        cursos = cursor.fetchall()

        cursor.close()
        connection.close()

        return cursos

    # =========================
    # SALVAR CURSO
    # =========================
    def salvar(self):
        connection = create_connection()

        if connection is None:
            return False

        cursor = connection.cursor()

        query = """
            INSERT INTO cursos (
                nome,
                descricao,
                duracao,
                valor,
                categoria
            )
            VALUES (%s, %s, %s, %s, %s)
        """

        valores = (
            self.nome,
            self.descricao,
            self.duracao,
            self.valor,
            self.categoria
        )

        cursor.execute(query, valores)

        connection.commit()

        cursor.close()
        connection.close()

        return True
