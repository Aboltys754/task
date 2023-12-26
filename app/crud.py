from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder

from . import models, schemas


def create_shop(db: Session, shop: schemas.Shop):
    """Создать магазин"""
    db_shop = models.Shop(number_shop=shop.number_shop, address_shop=shop.address_shop)
    db.add(db_shop)
    db.commit()
    db.refresh(db_shop)
    foo = jsonable_encoder(
        models.Shop(number_shop=shop.number_shop, address_shop=shop.address_shop)
    )
    print(foo)
    return db_shop


def get_shop(db: Session, number_shop: int):
    """Получить конкретный магазин"""
    return db.query(models.Shop).filter(models.Shop.number_shop == number_shop).first()


def get_shop_id(db: Session, id_shop: int):
    """Поиск по id магазина"""
    return db.query(models.Shop).filter(models.Shop.id_shop == id_shop).first()


def delete_shop(db: Session, id_shop: int):
    """Удалить магазин"""
    db_shop = db.query(models.Shop).filter(models.Shop.id_shop == id_shop).first()
    db.delete(db_shop)
    db.commit()
    return id_shop


async def get_shops(db: Session) -> list[models.Shop]:
    """Получить все  магазины"""
    return db.query(models.Shop).all()


def update_shop(db: Session, shop: schemas.Shop):
    """обновляет данные магазина"""
    db_shop = db.query(models.Shop).filter(models.Shop.id_shop == shop.id_shop).first()
    db_shop.number_shop = shop.number_shop
    db_shop.address_shop = shop.address_shop
    db.commit()
    db.refresh(db_shop)


def create_employee(db: Session, employee: schemas.Employee):
    """Создать сотрудника"""
    db_employee = models.Employee(
        name_employee=employee.name_employee,
        age_employee=employee.age_employee,
        post_employee=employee.post_employee
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee


def get_employees(db: Session):
    """Получение данных о всех сотрудниках"""
    return db.query(models.Employee).all()


def get_employee_id(db: Session, employee_id):
    """Поиск по id сотрудника"""
    return db.query(models.Employee).filter(models.Employee.id_employee == employee_id).first()


def delete_employee(db: Session, employee_id):
    """Удалить сотрудника"""
    db_employee_id = db.query(models.Employee).filter(models.Employee.id_employee == employee_id).first()
    db.delete(db_employee_id)
    db.commit()
    return employee_id


def update_employee(db: Session, employee: schemas.Employee):
    """обновляет данные сотрудника"""
    db_employee = db.query(models.Employee).filter(models.Employee.id_employee == employee.id_employee).first()
    db_employee.name_employee = employee.name_employee
    db_employee.age_employee = employee.age_employee
    db_employee.post_employee = employee.post_employee
    db.commit()
    db.refresh(db_employee)


def create_shop_employees(db: Session, shop_employees: schemas.Employee):
    """Создание связи магазина и персонала"""
    db_shop_employees = models.ShopEmployee(id_shop=shop_employees.id_shop,
                                            id_employee=shop_employees.id_employee)
    db.add(db_shop_employees)
    db.commit()
    db.refresh(db_shop_employees)
    return db_shop_employees


def get_shops_employee_id(db: Session, shops_employee: schemas.Employee):
    """Проверка связи магазина и персонала по id"""
    return db.query(models.Employee).filter(models.Employee.id_shop == shops_employee.id_shop and
                                            models.Employee.id_employee == shops_employee.id_employee).first()


def get_shops_employees(db: Session):
    """Получение всех магазинов и сотрудников"""
    # foo = db.query(models.ShopEmployee).join(models.ShopEmployee.shops).join(models.ShopEmployee.id_employee)
    # res =  db.query(models.ShopEmployee).join(models.Shop).join(models.Employee).all()
    return
