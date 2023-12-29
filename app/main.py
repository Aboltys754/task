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


@app.get("/get_shops/", response_model=list[schemas.Shop])
async def get_shops(db: Session = Depends(get_db)) -> list[str]:
    shops = await crud.get_shops(db)
    return shops


@app.get("/get_employees/", response_model=list[schemas.Employee])
def get_shops(db: Session = Depends(get_db)) -> list[str]:
    employees = crud.get_employees(db)
    return employees


@app.get("/get_shops_employees/", response_model=list[schemas.AllInfo])
def get_shops_employees(db: Session = Depends(get_db)):
    shops_employees = crud.get_shops_employees(db)
    return shops_employees


@app.post("/add_shop/")
def add_shop(shop: schemas.Shop, db: Session = Depends(get_db)):
    if not shop.number_shop:
        raise HTTPException(status_code=400, detail="The store number cannot be zero or empty")
    if not shop.address_shop:
        raise HTTPException(status_code=400, detail="The store's address cannot be empty")
    db_shop = crud.get_shop(db, number_shop=shop.number_shop)
    if db_shop:
        raise HTTPException(status_code=400, detail="There is already such a shop")
    crud.create_shop(db, shop=shop)
    return HTTPException(status_code=200, detail="The store has been created")


@app.post("/add_employee/")
def add_employee(employee: schemas.Employee, db: Session = Depends(get_db)):
    if not employee.name_employee:
        raise HTTPException(status_code=400, detail="The name field should not be empty")
    if not employee.post_employee:
        raise HTTPException(status_code=400, detail="The position field should not be empty")
    if employee.age_employee < 18:
        raise HTTPException(status_code=400, detail="The age of the employee must be over 18 years old")
    crud.create_employee(db, employee=employee)
    return HTTPException(status_code=200, detail="The employee has been created")


@app.post("/add_employee_in_shop/")
def add_employee_in_shop(employee_in_shop: schemas.ShopEmployees, db: Session = Depends(get_db)):
    return crud.create_shop_employees(db, shop_employees=employee_in_shop)


@app.patch("/update_shop/")
def update_shop(shop: schemas.Shop, db: Session = Depends(get_db)):
    if not shop.number_shop:
        raise HTTPException(status_code=400, detail="The store number cannot be zero or empty")
    if not shop.address_shop:
        raise HTTPException(status_code=400, detail="The store's address cannot be empty")
    db_shop = crud.get_shop_id(db, id_shop=shop.id_shop)
    if db_shop is None:
        raise HTTPException(status_code=400, detail="There is no store with this id")
    crud.update_shop(db, shop=shop)
    return HTTPException(status_code=200, detail="The store data has been updated")


@app.patch("/update_employee/")
def update_shop(employee: schemas.Employee, db: Session = Depends(get_db)):
    if not employee.name_employee:
        raise HTTPException(status_code=400, detail="The name field should not be empty")
    if not employee.post_employee:
        raise HTTPException(status_code=400, detail="The position field should not be empty")
    if employee.age_employee < 18:
        raise HTTPException(status_code=400, detail="The age of the employee must be over 18 years old")
    db_employee = crud.get_employee_id(db, employee_id=employee.id_employee)
    if db_employee is None:
        raise HTTPException(status_code=400, detail="The employee with this id was not found")
    crud.update_employee(db, employee=employee)
    return HTTPException(status_code=200, detail="The employee has been created")


@app.patch("/update_shop_employees")
def update_shop_employees(shop_employees: schemas.ShopEmployees, db: Session = Depends(get_db)):
    db_shop_employees = crud.get_shops_employee_id(db, shop_employees_id=shop_employees.id_shop_employee)
    if db_shop_employees is None:
        raise HTTPException(status_code=400, detail="No such employee was found")
    return crud.update_shop_employees(db, shop_employees=shop_employees)


@app.delete("/delete_employee/{employee_id}")
def delete_shop(employee_id: int, db: Session = Depends(get_db)):
    db_employee = crud.get_employee_id(db, employee_id=employee_id)
    if db_employee is None:
        raise HTTPException(status_code=400, detail="No such employee was found")
    crud.delete_employee(db, employee_id=employee_id)
    return HTTPException(status_code=200, detail="The employee has been deleted")


@app.delete("/delete_shop/{id_shop}")
def delete_shop(id_shop: int, db: Session = Depends(get_db)):
    db_shop = crud.get_shop_id(db, id_shop=id_shop)
    if db_shop is None:
        raise HTTPException(status_code=400, detail="There is no store with this id")
    crud.delete_shop(db, id_shop=id_shop)
    return HTTPException(status_code=200, detail="The store has been deleted")


@app.delete("/delete_shop_employees/{shop_employees}")
def delete_shop(id_shop_employees: int, db: Session = Depends(get_db)):
    db_shop = crud.get_shops_employee_id(db, id_shop_employees=id_shop_employees)
    if db_shop is None:
        raise HTTPException(status_code=400, detail="There is no store with this id")
    crud.delete_shop(db, id_shop=id_shop)
    return HTTPException(status_code=200, detail="The store has been deleted")


app.mount("/", StaticFiles(directory="html"), name="static")
