from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base

class Shop(Base):
    __tablename__ = "shops"

    id_shop = Column(Integer, primary_key=True, index=True)
    number_shop = Column(Integer, unique=True, index=True)
    address_shop = Column(String, index=True)

class Employee(Base):
    __tablename__ = "employees"

    id_employee = Column(Integer, primary_key=True, index=True)
    name_employee = Column(String, index=True)
    age_employee = Column(Integer, index=True)
    post_employee = Column(String, index=True)


class Shop_employee(Base):
    __tablename__ = "shop_employees"

    id_shop_employee = Column(Integer, primary_key=True, index=True)
    id_shop
    id_employee