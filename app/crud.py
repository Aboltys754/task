from sqlalchemy.orm import Session

from . import models, schemas


def createShop(db: Session, shop: schemas.CreateShop):
    """Создать магазин"""
    db_shop = models.Shop(number_shop=shop.number_shop, address_shop=shop.address_shop)
    db.add(db_shop)
    db.commit()
    db.refresh(db_shop)
    return db_shop


def getShop(db: Session, number_shop):
    """Получить конкретный магазин"""
    return db.query(models.Shop).filter(models.Shop.number_shop == number_shop).first()


def getShopId(db: Session, id_shop):
    """Поиск по id магазина"""
    return db.query(models.Shop).filter(models.Shop.id_shop == id_shop).first()


def deleteShop(db: Session, id_shop):
    """Удалить магазин"""
    db_shop_id = db.query(models.Shop).filter(models.Shop.id_shop == id_shop).first()
    db.delete(db_shop_id)
    db.commit()
    return id_shop


def getShops(db: Session):
    """Получить все  магазины"""
    return db.query(models.Shop).all()


def updateShop(db: Session, shop: schemas.Shop):
    """обновляет данные магазина"""
    db_shop = db.query(models.Shop).filter(models.Shop.id_shop == shop.id_shop).first()
    db_shop.number_shop = shop.number_shop
    db_shop.address_shop = shop.address_shop
    db.commit()
    db.refresh(db_shop)


def createEmployee(db: Session, employee: schemas.CreateEmployee):
    """Создать сотрудника"""
    db_employee = models.Employee(name_employee=employee.name_employee,
                                  age_employee=employee.age_employee,
                                  post_employee=employee.post_employee)
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee


def getEmployees(db: Session):
    """Получение данных о всех сотрудниках"""
    return db.query(models.Employee).all()


def getEmployeeId(db: Session, employee_id):
    """Поиск по id сотрудника"""
    foo = db.query(models.Employee).filter(models.Employee.id_employee == employee_id).first()
    return foo


def deleteEmployee(db: Session, employee_id):
    """Удалить сотрудника"""
    db_employee_id = db.query(models.Employee).filter(models.Employee.id_employee == employee_id).first()
    db.delete(db_employee_id)
    db.commit()
    return employee_id


def updateEmployee(db: Session, employee: schemas.Employee):
    """обновляет данные сотрудника"""
    db_employee = db.query(models.Employee).filter(models.Employee.id_employee == employee.id_employee).first()
    db_employee.name_employee = employee.name_employee
    db_employee.age_employee = employee.age_employee
    db_employee.post_employee = employee.post_employee
    db.commit()
    db.refresh(db_employee)
