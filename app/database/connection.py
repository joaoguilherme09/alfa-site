import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

load_dotenv()


def create_connection():

    try:

        connection = mysql.connector.connect(

            host="127.0.0.1",

            user="root",

            password="alfa123456",

            database="alfa_site",

            port=3307
        )

        if connection.is_connected():

            print("MYSQL CONECTADO!")

        return connection

    except Error as e:

        print(f"Erro ao conectar ao MySQL: {e}")

        return None