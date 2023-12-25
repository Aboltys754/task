from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class Shop(Base):
    __tablename__ = "shops"

    id_shop = Column(Integer, primary_key=True, index=True)
    number_shop = Column(Integer, unique=True, index=True)
    address_shop = Column(String, index=True)

    shop = relationship("ShopEmployee", back_populates="shops")


class Employee(Base):
    __tablename__ = "employees"

    id_employee = Column(Integer, primary_key=True, index=True)
    name_employee = Column(String, index=True)
    age_employee = Column(Integer, index=True)
    post_employee = Column(String, index=True)

    employee = relationship("ShopEmployee", back_populates="employees")


class ShopEmployee(Base):
    __tablename__ = "shop_employees"

    id_shop_employee = Column(Integer, primary_key=True, index=True)
    id_shop = Column(Integer, ForeignKey("shops.id_shop"))
    id_employee = Column(Integer, ForeignKey("employees.id_employee"))

    shops = relationship("Shop", back_populates="shop")
    employees = relationship("Employee", back_populates="employee")