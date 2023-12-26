import asyncio

import asyncpg
import datetime


# async def main():
#     conn = await asyncpg.connect('postgresql://postgres:postgres@localhost/shop_info')

async def run():
    con = await asyncpg.connect('postgresql://postgres:postgres@localhost/shop_info')
    result = await con.copy_from_query(
        'SELECT * FROM users', 10,
        output='file.csv', format='csv')

run()


    # await conn.execute('''
    #     CREATE TABLE users(
    #         id serial PRIMARY KEY,
    #         name text,
    #         dob date
    #     )
    # ''')
    #
    # await conn.execute('''
    #         INSERT INTO users(name, dob) VALUES($1, $2)
    #     ''', 'Bob', datetime.date(1984, 3, 1))

    # row = await conn.fetchrow('SELECT * FROM users')
    # await conn.close()

    # print(row)

#     for i in row:
#         print(i)
# asyncio.get_event_loop().run_until_complete(main())
