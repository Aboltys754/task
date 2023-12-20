const shops = document.getElementById("shops");
const table_shops = document.getElementById("table_shops");
const input_shops = document.getElementById("input_shops");
const input_employees = document.getElementById("input_employees");
const number_shop = document.getElementById("number_shop");
const address_shop = document.getElementById("address_shop");
const name_employee = document.getElementById("name_employee");
const age_employee = document.getElementById("age_employee");
const post_employee = document.getElementById("post_employee");
const error = document.getElementsByClassName("error");


// очищает поля для ввода нового сотрудника и нового магазина
function clear_field_new_data() {
    number_shop.value = "";
    address_shop.value = "";
    name_employee.value = "";
    age_employee.value = "";
    post_employee.value = "";
}

//Отправляет запрос на новый магазин
async function add_shop() {
    const shop = {
        number_shop: Number(number_shop.value),
        address_shop: address_shop.value
    }

    const res = await fetch(`http://127.0.0.1:8000/add_shop/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(shop)
    })

    const json = await res.json();

    if (res.ok) {
        input_shops.classList.toggle("hidden");
        clear_field_new_data()
        get_shops();
        return
    } else if (JSON.stringify(json) === '{"detail":"There is already such a shop"}') {
        error[0].insertAdjacentHTML('beforeend', `<p>Магазин с таким номером уже есть</p>`);
        return
    }   
}

//Отправляет запрос на нового сотрудника
async function add_empoyee() {
    error[1].textContent = ""
    const shop = {
        number_shop: Number(number_shop.value),
        address_shop: address_shop.value
    }

    const res = await fetch(`http://127.0.0.1:8000/add_shop/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(shop)
    })

    const json = await res.json();
    console.log(json);

    if (res.ok) {
        input_shops.classList.toggle("hidden");
        clear_field_new_data()
        get_shops();
        return
    } else if (JSON.stringify(json) === '{"detail":"There is already such a shop"}') {
        error[0].insertAdjacentHTML('beforeend', `<p>Магазин с таким номером уже есть</p>`);
        return
    }

}

//Запрашивает информацию о магазинах и отрисовывает ее на странице
async function get_shops() {
    
    const res = await fetch(`http://127.0.0.1:8000/get_shops/`)

    if (res.ok) {
        table_shops.textContent = "";
        const json = await res.json();
        json.map((shop) => create_teg_table(shop));
        if (json.length !== 0) {
            const head_table_shop = document.createElement('div');
            head_table_shop.className = "head_table_shop";
            head_table_shop.insertAdjacentHTML('beforeend', `<p>номер магазина</p>`);
            head_table_shop.insertAdjacentHTML('beforeend', `<p>адрес магазина</p>`);
            table_shops.prepend(head_table_shop);
        }        
    }
}

//Создание одной строчки таблицы
function create_teg_table(shop) {
    const divTable = document.createElement('div');
    const divInfo = document.createElement('div');

    divTable.className = "table_shop_and_button";
    divInfo.className = "info_table_shop";

    divInfo.insertAdjacentHTML('beforeend', `<p>${shop.number_shop}</p>`);
    divInfo.insertAdjacentHTML('beforeend', `<p>${shop.address_shop}</p>`);
    divInfo.insertAdjacentHTML('beforeend',
         `<button><img src="./img/edit.svg" alt="изменить" onclick="edit_shop(event)"> </button>`);
    divInfo.insertAdjacentHTML('beforeend',
         `<button><img src="./img/delete.svg" alt="удалить" onclick="delet_shop(event)"> </button>`);

    divTable.id = shop.id_shop;
    divTable.append(divInfo);
    table_shops.append(divTable);
}

//Открывает форму нового магазина и закрывает форму нового сотрудника
function click_change_class_shop() {
    if (input_employees.classList.contains("hidden") !== true) {
        input_employees.classList.toggle("hidden");
        clear_field_new_data()
    }
    input_shops.classList.toggle("hidden");
}

//открывает форму нового сотрудника и закрывает форму нового магазина
function click_change_class_employees() {
    if (input_shops.classList.contains("hidden") !== true) {
        input_shops.classList.toggle("hidden");
        clear_field_new_data()
    }
    input_employees.classList.toggle("hidden");
}

//Удаляет выбранный магазин
async function delet_shop(event) {
    const shop_id = event.target.parentElement.parentElement.parentElement.id
    if (confirm('Вы точно хотите удалить контакт?') === true) {
        const respon = await fetch(`http://127.0.0.1:8000/get_shops/${shop_id}`, {
        method: 'DELETE',
    });

    if (respon.ok) {
      await get_table_contact();
    }
    }
    console.log(shop_id);
}

get_shops()
