from flask import Blueprint, render_template

# Cria o Blueprint dos cursos
cursos_bp = Blueprint('cursos', __name__)

# Página principal de cursos
@cursos_bp.route('/cursos')
def cursos():
    return render_template('cursos.html')

# Página do curso de inglês
@cursos_bp.route('/cursos/ingles')
def ingles():
    return render_template('cursos/ingles.html')

# Página do curso de informática
@cursos_bp.route('/cursos/informatica')
def informatica():
    return render_template('cursos/informatica.html')

# Página do curso preparatório
@cursos_bp.route('/cursos/enem')
def enem():
    return render_template('cursos/enem.html')
