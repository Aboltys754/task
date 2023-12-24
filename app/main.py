from fastapi import FastAPI, Depends, HTTPException
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/get_shops/", response_model=list)
def get_shops(db: Session = Depends(get_db)):
    shops = crud.getShops(db)
    return shops


@app.post("/add_shop/", response_model=schemas.Shop)
def add_shop(shop: schemas.CreateShop, db: Session = Depends(get_db)):
    if shop.number_shop == 0:
        raise HTTPException(status_code=400, detail="The store number cannot be zero or empty")
    if len(shop.address_shop) < 1:
        raise HTTPException(status_code=400, detail="The store's address cannot be empty")
    db_shop = crud.getShop(db, number_shop=shop.number_shop)
    if db_shop:
        raise HTTPException(status_code=400, detail="There is already such a shop")
    return crud.createShop(db, shop=shop)


@app.delete("/delete_shop/{id_shop}", response_model=schemas.Shop)
def delete_shop(id_shop: int, db: Session = Depends(get_db)):
    db_shop_id = crud.getShopId(db, id_shop=id_shop)
    print(db_shop_id)
    if db_shop_id is None:
        raise HTTPException(status_code=400, detail="There is no store with this id")
    crud.deleteShop(db, id_shop=id_shop)
    return db_shop_id


@app.patch("/update_shop/", response_model=schemas.Shop)
def update_shop(shop: schemas.Shop, db: Session = Depends(get_db)):
    if shop.number_shop == 0:
        raise HTTPException(status_code=400, detail="The store number cannot be zero or empty")
    if len(shop.address_shop) < 1:
        raise HTTPException(status_code=400, detail="The store's address cannot be empty")
    db_shop_id = crud.getShopId(db, id_shop=shop.id_shop)
    if db_shop_id is None:
        raise HTTPException(status_code=400, detail="There is no store with this id")
    crud.updateShop(db, shop=shop)
    return shop


@app.get("/get_employees/", response_model=list[schemas.Employee])
def get_shops(db: Session = Depends(get_db)):
    employees = crud.getEmployees(db)
    return employees


@app.post("/add_employee/", response_model=schemas.Employee)
def add_employee(employee: schemas.BaseEmployee, db: Session = Depends(get_db)):
    if len(employee.name_employee) < 1:
        raise HTTPException(status_code=400, detail="The name field should not be empty")
    if len(employee.post_employee) < 1:
        raise HTTPException(status_code=400, detail="The position field should not be empty")
    if employee.age_employee < 18:
        raise HTTPException(status_code=400, detail="The age of the employee must be over 18 years old")
    return crud.createEmployee(db, employee=employee)


@app.delete("/delete_employee/{employee_id}", response_model=schemas.Employee)
def delete_shop(employee_id: int, db: Session = Depends(get_db)):
    db_employee_id = crud.getEmployeeId(db, employee_id=employee_id)
    if db_employee_id is None:
        raise HTTPException(status_code=400, detail="No such employee was found")
    crud.deleteEmployee(db, employee_id=employee_id)
    return db_employee_id


@app.patch("/update_employee/", response_model=schemas.Employee)
def update_shop(employee: schemas.Employee, db: Session = Depends(get_db)):
    if len(employee.name_employee) < 1:
        raise HTTPException(status_code=400, detail="The name field should not be empty")
    if len(employee.post_employee) < 1:
        raise HTTPException(status_code=400, detail="The position field should not be empty")
    if employee.age_employee < 18:
        raise HTTPException(status_code=400, detail="The age of the employee must be over 18 years old")
    db_employee_id = crud.getEmployeeId(db, employee_id=employee.id_employee)
    crud.updateEmployee(db, employee=employee)
    return employee


app.mount("/", StaticFiles(directory="html"), name="static")
