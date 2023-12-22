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
    return  db.query(models.Shop).filter(models.Shop.id_shop == id_shop).first()


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
    return db.query(models.Employee).all()
