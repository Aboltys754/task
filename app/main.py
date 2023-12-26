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
async def get_shops(db: Session = Depends(get_db)):
    shops = await crud.get_shops(db)
    return shops


@app.get("/get_employees/", response_model=list[schemas.Employee])
def get_shops(db: Session = Depends(get_db)):
    employees = crud.get_employees(db)
    return employees


@app.get("/get_shops_employees/", response_model=list[schemas.ShopEmployees])
def get_shops_employees(db: Session = Depends(get_db)):
    shops_employees = crud.get_shops_employees(db)
    return shops_employees


@app.post("/add_shop/", response_model=schemas.Shop)
def add_shop(shop: schemas.Shop, db: Session = Depends(get_db)):
    if not shop.number_shop:
        raise HTTPException(status_code=400, detail="The store number cannot be zero or empty")
    if not shop.address_shop:
        raise HTTPException(status_code=400, detail="The store's address cannot be empty")
    db_shop = crud.get_shop(db, number_shop=shop.number_shop)
    if db_shop:
        raise HTTPException(status_code=400, detail="There is already such a shop")
    return crud.create_shop(db, shop=shop)


@app.post("/add_employee/", response_model=schemas.Employee)
def add_employee(employee: schemas.Employee, db: Session = Depends(get_db)):
    if not employee.name_employee:
        raise HTTPException(status_code=400, detail="The name field should not be empty")
    if not employee.post_employee:
        raise HTTPException(status_code=400, detail="The position field should not be empty")
    if employee.age_employee < 18:
        raise HTTPException(status_code=400, detail="The age of the employee must be over 18 years old")
    return crud.create_employee(db, employee=employee)


@app.post("/add_employee_in_shop/", response_model=schemas.Employee)
def add_employee_in_shop(employee_in_shop: schemas.ShopEmployees, db: Session = Depends(get_db)):
    return crud.create_shop_employees(db, shopEmployees=employee_in_shop)


@app.patch("/update_shop/", response_model=schemas.Shop)
def update_shop(shop: schemas.Shop, db: Session = Depends(get_db)):
    if not shop.number_shop:
        raise HTTPException(status_code=400, detail="The store number cannot be zero or empty")
    if not shop.address_shop:
        raise HTTPException(status_code=400, detail="The store's address cannot be empty")
    db_shop_id = crud.get_shop_id(db, id_shop=shop.id_shop)
    if db_shop_id is None:
        raise HTTPException(status_code=400, detail="There is no store with this id")
    crud.update_shop(db, shop=shop)
    return shop


@app.patch("/update_employee/", response_model=schemas.Employee)
def update_shop(employee: schemas.Employee, db: Session = Depends(get_db)):
    if not employee.name_employee:
        raise HTTPException(status_code=400, detail="The name field should not be empty")
    if not employee.post_employee:
        raise HTTPException(status_code=400, detail="The position field should not be empty")
    if employee.age_employee < 18:
        raise HTTPException(status_code=400, detail="The age of the employee must be over 18 years old")
    crud.get_employee_id(db, employee_id=employee.id_employee)
    crud.update_employee(db, employee=employee)
    return employee


@app.delete("/delete_employee/{employee_id}", response_model=schemas.Employee)
def delete_shop(employee_id: int, db: Session = Depends(get_db)):
    db_employee_id = crud.get_employee_id(db, employee_id=employee_id)
    if db_employee_id is None:
        raise HTTPException(status_code=400, detail="No such employee was found")
    crud.delete_employee(db, employee_id=employee_id)
    return db_employee_id


@app.delete("/delete_shop/{id_shop}", response_model=schemas.Shop)
def delete_shop(id_shop: int, db: Session = Depends(get_db)):
    db_shop_id = crud.get_shop_id(db, id_shop=id_shop)
    print(db_shop_id)
    if db_shop_id is None:
        raise HTTPException(status_code=400, detail="There is no store with this id")
    crud.delete_shop(db, id_shop=id_shop)
    return db_shop_id


app.mount("/", StaticFiles(directory="html"), name="static")
