import psycopg2
from psycopg2 import Error
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

connection = psycopg2.connect(
    dbname='postgres',
    user='postgres',
    password='postgres',
    host='localhost',
    port='5432',
)


def init_db():
    try:
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

# init_db()
# drop_db()