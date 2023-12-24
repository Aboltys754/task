from pydantic import BaseModel


class BaseShop(BaseModel):
    number_shop: int
    address_shop: str


class CreateShop(BaseShop):
    pass


class Shop(BaseShop):
    id_shop: int

    class Config:
        from_attributes = True


class DeleteShop(BaseModel):
    id_shop: int

    class Config:
        from_attributes = True


class Shops(Shop):
    shops: list[Shop] = []


class BaseEmployee(BaseModel):
    name_employee: str
    age_employee: int
    post_employee: str


class CreateEmployee(BaseEmployee):
    pass


class Employee(BaseEmployee):
    id_employee: int

    class Config:
        from_attributes = True
