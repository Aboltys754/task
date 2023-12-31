from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import config

SQLALCHEMY_DATABASE_URL = (f"postgresql://{config['user']}:{config['pass']}@{config['host']}:{int(config['port'])}/shop_info")

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
