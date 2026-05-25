from flask import Blueprint, render_template

# Cria o Blueprint da matrícula
matricula_bp = Blueprint('matricula', __name__)

# Página de matrícula
@matricula_bp.route('/matricula')
def matricula():
    return render_template('matricula.html')
