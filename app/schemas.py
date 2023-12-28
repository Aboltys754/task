from pydantic import BaseModel
from typing import List, Optional


class Shop(BaseModel):
    id_shop: int | None = None
    number_shop: int
    address_shop: str

    class Config:
        from_attributes = True


class Employee(BaseModel):
    id_employee: int | None = None
    name_employee: str
    age_employee: int
    post_employee: str

    class Config:
        from_attributes = True


class ShopEmployees(BaseModel):
    id_shop_employee: int | None = None
    id_shop: int
    id_employee: int

    class Config:
        from_attributes = True

class AllInfo(Shop, Employee, ShopEmployees):
    id_shop_employee: int | None = None
    id_shop: int | None = None
    number_shop: int
    address_shop: str
    id_employee: int | None = None
    name_employee: str
    age_employee: int
    post_employee: str

    class Config:
        from_attributes = True