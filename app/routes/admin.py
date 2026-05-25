from flask import Blueprint, render_template

# Cria o Blueprint do admin
admin_bp = Blueprint('admin', __name__)

# Página de login do administrador
@admin_bp.route('/admin')
def admin_login():
    return render_template('admin/login.html')

# Dashboard principal
@admin_bp.route('/admin/dashboard')
def dashboard():
    return render_template('admin/dashboard.html')

# Página de alunos
@admin_bp.route('/admin/alunos')
def alunos():
    return render_template('admin/alunos.html')

# Página de matrículas
@admin_bp.route('/admin/matriculas')
def matriculas():
    return render_template('admin/matriculas.html')
