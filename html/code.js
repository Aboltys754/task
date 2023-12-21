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


// флаг, id, значение первого p, значение второго p
const activ_element_update_shop = [false, null, null, null];


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
        error[0].textContent = ""
        input_shops.classList.toggle("hidden");
        clear_field_new_data()
        get_shops();
        return
    } else if (JSON.stringify(json) === '{"detail":"There is already such a shop"}') {
        error[0].textContent = ""
        error[0].insertAdjacentHTML('beforeend', `<p>Магазин с таким номером уже есть</p>`);
        return
    } else if (JSON.stringify(json) === '{"detail":"The store number cannot be zero or empty"}') {
        error[0].textContent = ""
        error[0].insertAdjacentHTML('beforeend', `<p>Поле номер магазина не заполнено или номер указали 0</p>`);        
        return
    } else if (JSON.stringify(json) === `{"detail":"The store's address cannot be empty"}`) {
        error[0].textContent = ""
        error[0].insertAdjacentHTML('beforeend', `<p>Поле адрес магазина не заполнено</p>`);
        return
    }
}

//Отправляет запрос на нового сотрудника
// async function add_empoyee() {
//     error[1].textContent = ""
//     const shop = {
//         number_shop: Number(number_shop.value),
//         address_shop: address_shop.value
//     }

//     const res = await fetch(`http://127.0.0.1:8000/add_shop/`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//           },
//         body: JSON.stringify(shop)
//     })

//     const json = await res.json();
//     console.log(JSON.stringify(json));

//     if (res.ok) {
//         input_shops.classList.toggle("hidden");
//         clear_field_new_data()
//         get_shops();
//         return
//     } else if (JSON.stringify(json) === '{"detail":"There is already such a shop"}') {
//         error[0].insertAdjacentHTML('beforeend', `<p>Магазин с таким номером уже есть</p>`);
//         return
//     } else if (JSON.stringify(json) === '{detail: "The store number cannot be zero or empty"}') {
//         console.log(1)
//         error[0].insertAdjacentHTML('beforeend', `<p>Поле номер магазина не заполнено или номер указали 0</p>`);
//         return
//     }
//     else {
//         console.log(JSON.stringify(json));
//     }
// }

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
         `<button><img src="./img/edit.svg" alt="изменить" onclick="click_edit_shop(event)"> </button>`);
    divInfo.insertAdjacentHTML('beforeend',
         `<button><img src="./img/delete.svg" alt="удалить" onclick="delete_shop(event)"> </button>`);

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
async function delete_shop(event) {
    const shop_id = event.target.parentElement.parentElement.parentElement.id
    if (confirm('Вы точно хотите удалить магазин?') === true) {
        const respon = await fetch(`http://127.0.0.1:8000/delete_shop/${shop_id}`, {
        method: 'DELETE',
    });

    if (respon.ok) {
      await get_shops();
    }}
}


//Отправляет данные для изменения
async function patch_shop(event) {
    console.log(event.target.parentElement.parentElement.id);
    console.log(event.target.parentElement.childNodes[0].value)
    console.log(event.target.parentElement.childNodes[1].value)
    const shop = {
        id_shop: Number(event.target.parentElement.parentElement.id),
        number_shop: Number(event.target.parentElement.childNodes[0].value),
        address_shop: event.target.parentElement.childNodes[1].value
    }

    if (confirm('Вы точно хотите изменить данные магазина?') === true) {
        const respon = await fetch(`http://127.0.0.1:8000/update_shop/`, {
        method: 'PATCH',
        body: JSON.stringify(shop) 
    });

    if (respon.ok) {
      await get_shops();
    }}
}

//открыть форму изменение магазина
async function click_edit_shop(event) {
    const tag_input = event.target.parentElement.parentElement   
    if (activ_element_update_shop[0] === true) {
        const last_element = document.getElementById(`update_number_shop-${activ_element_update_shop[1]}`).parentElement
    
        last_element.childNodes[0].remove()
        last_element.childNodes[0].remove()
        last_element.childNodes[0].remove()
        last_element.childNodes[0].remove()

        last_element.insertAdjacentHTML('beforeend', `<p>${activ_element_update_shop[2]}</p>`);
        last_element.insertAdjacentHTML('beforeend', `<p>${activ_element_update_shop[3]}</p>`);
        last_element.insertAdjacentHTML('beforeend',
            `<button><img src="./img/edit.svg" alt="изменить" onclick="click_edit_shop(event)"> </button>`);
        last_element.insertAdjacentHTML('beforeend',
            `<button><img src="./img/delete.svg" alt="удалить" onclick="delete_shop(event)"> </button>`);
    }
    
    activ_element_update_shop[0] = true;
    activ_element_update_shop[1] = event.target.parentElement.parentElement.parentElement.id;
    activ_element_update_shop[2] = tag_input.childNodes[0].textContent;
    activ_element_update_shop[3] = tag_input.childNodes[1].textContent;
    
    tag_input.childNodes[0].remove();
    tag_input.childNodes[0].remove();
    tag_input.childNodes[0].remove();
    tag_input.childNodes[0].remove();
    tag_input.insertAdjacentHTML('afterBegin',
        `<input type="text" id="update_adress_shop" 
        value="${activ_element_update_shop[3]}" name="number_shop">`);
    tag_input.insertAdjacentHTML('afterBegin',
        `<input type="text" id="update_number_shop-${activ_element_update_shop[1]}" 
        value="${activ_element_update_shop[2]}" name="number_shop">`);
    tag_input.insertAdjacentHTML('beforeend',
        `<button onclick="patch_shop(event)">Изменить магазин</button>`);
    tag_input.insertAdjacentHTML('beforeend',
        `<button onclick="cansell_update_shop(event)">Отмена</button>`);
    
}

//Закрыть форму изменения магазина
function cansell_update_shop(event) {
    const tag_input = event.target.parentElement;
    tag_input.childNodes[0].remove();
    tag_input.childNodes[0].remove();
    tag_input.childNodes[0].remove();
    tag_input.childNodes[0].remove();

    tag_input.insertAdjacentHTML('beforeend', `<p>${activ_element_update_shop[2]}</p>`);
    tag_input.insertAdjacentHTML('beforeend', `<p>${activ_element_update_shop[3]}</p>`);
    tag_input.insertAdjacentHTML('beforeend',
         `<button><img src="./img/edit.svg" alt="изменить" onclick="click_edit_shop(event)"> </button>`);
    tag_input.insertAdjacentHTML('beforeend',
         `<button><img src="./img/delete.svg" alt="удалить" onclick="delete_shop(event)"> </button>`);

    activ_element_update_shop[0] = false;
    activ_element_update_shop[1] = null;
    activ_element_update_shop[2] = null;
    activ_element_update_shop[3] = null;
}

get_shops()
