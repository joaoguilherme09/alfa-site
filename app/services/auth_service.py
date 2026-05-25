from app.models.administrador import Administrador
from werkzeug.security import check_password_hash

class AuthService:

    @staticmethod
    def login(email, senha):

        # =========================
        # BUSCA ADMIN POR EMAIL
        # =========================
        administrador = Administrador.buscar_por_email(email)

        # =========================
        # VERIFICA SE EXISTE
        # =========================
        if administrador is None:
            return {
                "success": False,
                "message": "Administrador não encontrado."
            }

        # =========================
        # VERIFICA SENHA
        # =========================
        senha_valida = check_password_hash(
            administrador['senha'],
            senha
        )

        if not senha_valida:
            return {
                "success": False,
                "message": "Senha incorreta."
            }

        # =========================
        # LOGIN OK
        # =========================
        return {
            "success": True,
            "message": "Login realizado com sucesso!",
            "admin": administrador
        }
