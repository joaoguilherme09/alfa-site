
from flask import Blueprint, render_template

# Cria o Blueprint da Home
home_bp = Blueprint('home', __name__)

# Rota principal
@home_bp.route('/')
def home():
    return render_template('index.html')
