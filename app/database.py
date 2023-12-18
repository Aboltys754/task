from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import json

with open("secret.json", "r", encoding="utf-8") as secret:
    data_db = json.load(secret)

    SQLALCHEMY_DATABASE_URL = (f"postgresql://{data_db['pg_db']['db_name']}:"
                               f"{data_db['pg_db']['db_password']}@"
                               f"{data_db['pg_db']['host']}/"
                               f"shop_info")
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()