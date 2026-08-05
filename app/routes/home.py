from flask import Blueprint, render_template, send_from_directory, current_app

# Cria o Blueprint da Home
home_bp = Blueprint('home', __name__)

# Rota principal
@home_bp.route('/')
def home():
    return render_template('index.html')

@home_bp.route('/sobre')
def sobre():
    return render_template('sobre.html')

@home_bp.route('/sitemap.xml')
def sitemap():
    return send_from_directory(current_app.static_folder, "sitemap.xml")

@home_bp.route('/alfatech')
def alfatech():
    return render_template('alfatech.html')

@home_bp.route('/robots.txt')
def robots():
    return send_from_directory(current_app.static_folder, 'robots.txt')