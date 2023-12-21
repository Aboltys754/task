import psycopg2
from psycopg2 import Error
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

import json


def init_db():
    try:
        with open("secret.json", "r", encoding="utf-8") as file:
            data_db = json.load(file)
            connection = psycopg2.connect(
                user=data_db['pg_db']['db_name'],
                password=data_db['pg_db']['db_password'],
                host=data_db['pg_db']['host'],
                port=data_db['pg_db']['port']
            )
            connection.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
            cursor = connection.cursor()
            sql_create_database = "create database shop_info"
            cursor.execute(sql_create_database)
            print("База shop_info создана")
    except (Exception, Error) as error:
        print("Ошибка при работе с PostgresSQL", error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            print("Соединение с PostgreSQL закрыто")


def drop_db():
    try:
        with open("secret.json", "r", encoding="utf-8") as file:
            data_db = json.load(file)
            connection = psycopg2.connect(
                user=data_db['pg_db']['db_name'],
                password=data_db['pg_db']['db_password'],
                host=data_db['pg_db']['host'],
                port=data_db['pg_db']['port']
            )
            connection.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
            cursor = connection.cursor()
            sql_create_database = "drop database shop_info"
            cursor.execute(sql_create_database)
            print("База shop_info удалена")
    except (Exception, Error) as error:
        print("Ошибка при работе с PostgresSQL", error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            print("Соединение с PostgreSQL закрыто")
