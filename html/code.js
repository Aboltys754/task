const table_shops = document.getElementsByClassName("table_shops")


async function add_shop() {
    const numberShop = document.getElementById("number_shop");
    const addressShop = document.getElementById("address_shop");

    const shop = {
        number_shop: Number(numberShop.value),
        address_shop: addressShop.value
    }

    const res = await fetch(`http://127.0.0.1:8000/add_shop/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(shop)
    }
    )

    if (res.ok) {
        const json = await res.json();
        numberShop.value = "";
        addressShop.value = "";
        console.log(json);
        get_shops();
    }    
}

async function get_shops() {
    const res = await fetch(`http://127.0.0.1:8000/get_shops/`)

    if (res.ok) {
        const json = await res.json();
        const divHeadTable = 
        json.map((shop) => create_teg_table(shop))
    }
}

function create_teg_table(shop) {
    const divTable = document.createElement('div');
    const divInfo = document.createElement('div');

    divTable.className = "table_shop_and_button";
    divInfo.className = "info_table_shop";

    divInfo.insertAdjacentHTML('beforeend', `<p id="p1-${shop.id}">${shop.number_shop}</p>`);
    divInfo.insertAdjacentHTML('beforeend', `<p id="p2-${shop.id}">${shop.address_shop}</p>`);
    divInfo.insertAdjacentHTML('beforeend', '<button><img src="./img/edit.svg" alt="изменить" onclick="edit_shop(event)"> </button>');
    divInfo.insertAdjacentHTML('beforeend', '<button><img src="./img/delete.svg" alt="удалить" onclick="delet_shop(event)"> </button>');

    divTable.id = shop.id_shop;
    divTable.append(divInfo);
    table_shops.append(divTable);

    console.log(`id: ${shop.id_shop}, Номер: ${shop.number_shop}, Адрес: ${shop.address_shop}`)

}


const dataShops = [
    {
        "number_shop": 3242,
        "address_shop": "asdas",
        "id_shop": 1
    },
    {
        "number_shop": 234234,
        "address_shop": "asdasd",
        "id_shop": 2
    },
    {
        "number_shop": 324234,
        "address_shop": "asdasd",
        "id_shop": 3
    },
    {
        "number_shop": 724,
        "address_shop": "qwe",
        "id_shop": 4
    },
    {
        "number_shop": 7242,
        "address_shop": "qwe",
        "id_shop": 5
    },
    {
        "number_shop": 111,
        "address_shop": "asdasd",
        "id_shop": 7
    },
    {
        "number_shop": 1111,
        "address_shop": "asdasdasd",
        "id_shop": 8
    },
    {
        "number_shop": 12,
        "address_shop": "asdasdasd",
        "id_shop": 9
    },
    {
        "number_shop": 121,
        "address_shop": "asdasd",
        "id_shop": 10
    },
    {
        "number_shop": 131,
        "address_shop": "asdasdsd",
        "id_shop": 11
    },
    {
        "number_shop": 1122,
        "address_shop": "asdsas",
        "id_shop": 12
    }
]


get_shops()
