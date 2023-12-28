from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class Shop(Base):
    __tablename__ = "shops"

    id_shop = Column(Integer, primary_key=True, index=True)
    number_shop = Column(Integer, unique=True)
    address_shop = Column(String)


class Employee(Base):
    __tablename__ = "employees"

    id_employee = Column(Integer, primary_key=True, index=True)
    name_employee = Column(String)
    age_employee = Column(Integer)
    post_employee = Column(String)


class ShopEmployee(Base):
    __tablename__ = "shop_employees"

    id_shop_employee = Column(Integer, primary_key=True, index=True)
    id_shop = Column(Integer, ForeignKey("shops.id_shop", ondelete="CASCADE"))
    id_employee = Column(Integer, ForeignKey("employees.id_employee", ondelete="CASCADE"))