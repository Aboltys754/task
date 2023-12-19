from fastapi import FastAPI, Depends, HTTPException
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.post("/add_shop/", response_model=schemas.BaseShop)
def add_shop(shop: schemas.CreateShop):
    return shop


app.mount("/static/", StaticFiles(directory="html"), name="static")
