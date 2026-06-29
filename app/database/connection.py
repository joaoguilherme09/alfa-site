import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

load_dotenv()

def create_connection():
    try:
        connection = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME'),
            port=3306
        )
        if connection.is_connected():
            print("MYSQL CONECTADO!")
        return connection
    except Error as e:
        print(f"Erro ao conectar ao MySQL: {e}")
        return None