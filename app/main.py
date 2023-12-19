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
def get_shops(db: Session = Depends(get_db)):
    shops = crud.getShops(db)
    return shops


@app.post("/add_shop/", response_model=schemas.Shop)
def add_shop(shop: schemas.CreateShop, db: Session = Depends(get_db)):
    db_shop = crud.getShop(db, number_shop=shop.number_shop)
    if db_shop:
        raise HTTPException(status_code=400, detail="There is already such a shop")
    return crud.createShop(db, shop=shop)


app.mount("/", StaticFiles(directory="html"), name="static")
