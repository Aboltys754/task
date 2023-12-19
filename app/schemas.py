from pydantic import BaseModel


class BaseShop(BaseModel):
    number_shop: int
    address_shop: str


class CreateShop(BaseShop):
    pass


class Shop(BaseShop):
    id_shop: int
    shop_employee: int

    class Config:
        orm_mode = True


class BaseEmployee(BaseModel):
    name_employee: str
    age_employee: int
    post_employee: str


class CreateEmployee(BaseEmployee):
    pass


class Employee(BaseEmployee):
    id_employee: int
    shop_employee: int

    class Config:
        orm_mode = True


