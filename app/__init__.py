from flask import Flask

def create_app():

    app = Flask(
        __name__,
        template_folder='templates',
        static_folder='static'
    )

    # Importação das rotas
    from app.routes.home import home_bp
    from app.routes.cursos import cursos_bp
    from app.routes.matricula import matricula_bp
    from app.routes.admin import admin_bp

    # Registro dos blueprints
    app.register_blueprint(home_bp)
    app.register_blueprint(cursos_bp)
    app.register_blueprint(matricula_bp)
    app.register_blueprint(admin_bp)

    return app
