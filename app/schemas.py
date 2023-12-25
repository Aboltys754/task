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


class BaseShopEmployees(BaseModel):
    id_shop: int
    id_employee: int


class ShopEmployee(BaseShopEmployees):
    id_shop_employee: int


class CreateShopEmployees(BaseShopEmployees):
    pass

    class Config:
        from_attributes = True

class Foo(BaseModel):
    id_shop_employee: int
    number_shop: int
    address_shop: str
    name_employee: str
    age_employee: int
    post_employee: str

