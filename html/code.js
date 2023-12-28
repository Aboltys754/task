const shops = document.getElementById("shops");
const table_shops = document.getElementById("table_shops");
const table_employees = document.getElementById("table_employees");
const table_shop_employees = document.getElementById("table_shop_employees");
const input_shops = document.getElementById("input_shops");
const input_employees = document.getElementById("input_employees");
const input_shops_employee = document.getElementById("input_shop_employees");
const number_shop = document.getElementById("number_shop");
const address_shop = document.getElementById("address_shop");
const name_employee = document.getElementById("name_employee");
const age_employee = document.getElementById("age_employee");
const post_employee = document.getElementById("post_employee");
const selected_shop = document.getElementById("selected_shop");
const selected_empolyee = document.getElementById("selected_empolyee");


const list_lenght_shops_and_employees = [null, null];

// флаг, id, значение первого p, значение второго p
const activ_element_update_shop = [false, null, null, null];

// флаг, id, значение первого p, значение второго p, значение третьего p
const activ_element_update_employee = [false, null, null, null, null];

//приводит список активного элемента к исходному состоянию
function clear_activ_element() {
    activ_element_update_shop[0] = false;
    activ_element_update_shop[1] = null;
    activ_element_update_shop[2] = null;
    activ_element_update_shop[3] = null;
    activ_element_update_employee[0] = false;
    activ_element_update_employee[1] = null;
    activ_element_update_employee[2] = null;
    activ_element_update_employee[3] = null;
    activ_element_update_employee[4] = null;

}

// очищает поля для ввода нового сотрудника и нового магазина
function clear_field_new_data() {
    number_shop.value = "";
    address_shop.value = "";
    name_employee.value = "";
    age_employee.value = "";
    post_employee.value = "";
}

//Вспомогательная функция для удаления первых 4 элементов в переданном тэге
function delete_tag_shop(tag) {
    tag.childNodes[0].remove()
    tag.childNodes[0].remove()
    tag.childNodes[0].remove()
    tag.childNodes[0].remove()
}

//Вспомогательная функция для удаления первых 5 элементов в переданном тэге
function delete_tag_employee(tag) {
    tag.childNodes[0].remove()
    tag.childNodes[0].remove()
    tag.childNodes[0].remove()
    tag.childNodes[0].remove()
    tag.childNodes[0].remove()
}

//Создание одной строчки таблицы магазины
function create_teg_table_shop(shop) {
    const divTable = document.createElement('div');
    const divInfo = document.createElement('div');
    const errorTag = document.createElement('div');

    errorTag.className = "error";
    errorTag.id = `shop-${shop.id_shop}`;
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
    divTable.append(errorTag);
    table_shops.append(divTable);
}

//Создание одной строчки таблицы сотрудники
function create_teg_table_employee(employee) {
    const divTable = document.createElement('div');
    const divInfo = document.createElement('div');
    const errorTag = document.createElement('div');

    errorTag.className = "error";
    errorTag.id = `employee-${employee.id_employee}`;
    divTable.className = "table_employee_and_button";
    divInfo.className = "info_table_employee";

    divInfo.insertAdjacentHTML('beforeend', `<p>${employee.name_employee}</p>`);
    divInfo.insertAdjacentHTML('beforeend', `<p>${employee.age_employee}</p>`);
    divInfo.insertAdjacentHTML('beforeend', `<p>${employee.post_employee}</p>`);
    divInfo.insertAdjacentHTML('beforeend',
         `<button><img src="./img/edit.svg" alt="изменить" onclick="click_edit_employee(event)"> </button>`);
    divInfo.insertAdjacentHTML('beforeend',
         `<button><img src="./img/delete.svg" alt="удалить" onclick="delete_employee(event)"> </button>`);

    divTable.id = employee.id_employee;    
    divTable.append(divInfo);
    divTable.append(errorTag);
    table_employees.append(divTable);
}


function create_teg_table_shop_employee() {

}


//Открывает форму нового магазина и закрывает форму нового сотрудника
function click_change_class_shop() {
    if (activ_element_update_shop[0] === true) {
        const last_element = document.getElementById(`update_number_shop-${activ_element_update_shop[1]}`).parentElement;

        delete_tag_shop(last_element);

        last_element.insertAdjacentHTML('beforeend', `<p>${activ_element_update_shop[2]}</p>`);
        last_element.insertAdjacentHTML('beforeend', `<p>${activ_element_update_shop[3]}</p>`);
        last_element.insertAdjacentHTML('beforeend',
            `<button><img src="./img/edit.svg" alt="изменить" onclick="click_edit_shop(event)"> </button>`);
        last_element.insertAdjacentHTML('beforeend',
            `<button><img src="./img/delete.svg" alt="удалить" onclick="delete_shop(event)"> </button>`);
        clear_activ_element()
    }

    if (input_employees.classList.contains("hidden") !== true) {
        input_employees.classList.toggle("hidden");
        clear_field_new_data()
    }
    if (table_employees.classList.contains("hidden") !== true) {
        table_employees.classList.toggle("hidden");
    }

    if (input_shops_employee.classList.contains("hidden") !== true) {
        input_shops_employee.classList.toggle("hidden");
    }

    if (table_shop_employees.classList.contains("hidden") !== true) {
        table_shop_employees.classList.toggle("hidden");
    }

    input_shops.classList.toggle("hidden");
    table_shops.classList.toggle("hidden");
}


//открывает форму нового сотрудника и закрывает форму нового магазина
function click_change_class_employees() {
    if (activ_element_update_shop[0] === true) {
        const last_element = document.getElementById(`update_number_shop-${activ_element_update_shop[1]}`).parentElement;

        delete_tag_shop(last_element);

        last_element.insertAdjacentHTML('beforeend', `<p>${activ_element_update_shop[2]}</p>`);
        last_element.insertAdjacentHTML('beforeend', `<p>${activ_element_update_shop[3]}</p>`);
        last_element.insertAdjacentHTML('beforeend',
            `<button><img src="./img/edit.svg" alt="изменить" onclick="click_edit_shop(event)"> </button>`);
        last_element.insertAdjacentHTML('beforeend',
            `<button><img src="./img/delete.svg" alt="удалить" onclick="delete_shop(event)"> </button>`);
        clear_activ_element()
    }

    if (input_shops.classList.contains("hidden") !== true) {
        input_shops.classList.toggle("hidden");
        clear_field_new_data()
    }

    if (table_shops.classList.contains("hidden") !== true) {
        table_shops.classList.toggle("hidden");
    }

    if (input_shops_employee.classList.contains("hidden") !== true) {
        input_shops_employee.classList.toggle("hidden");
    }
    
    if (table_shop_employees.classList.contains("hidden") !== true) {
        table_shop_employees.classList.toggle("hidden");
    }

    input_employees.classList.toggle("hidden");
    table_employees.classList.toggle("hidden");
}  

//Открыть форму добовления сотрудника в магазин
async function click_change_class_shop_employees() {
    if (input_shops_employee.classList.contains("hidden") === true) {
        const res_shop = await fetch(`/get_shops/`);
        const json_shop = await res_shop.json();
        if (res_shop.ok) {
            selected_shop.textContent = "";
            selected_shop.insertAdjacentHTML('beforeend', `<option value="Выбрать магазин" selected="0">Выбрать магазин</option>`)
            json_shop.map((shop) => {
                selected_shop.insertAdjacentHTML('beforeend', `<option value="${shop.id_shop}">${shop.number_shop}: ${shop.address_shop}</option>`)
            })}

        const res_employee = await fetch(`/get_employees/`);
        const json_employee = await res_employee.json();
    
        if (res_employee.ok) {
            selected_empolyee.textContent ="";
            selected_empolyee.insertAdjacentHTML('beforeend', `<option value="Выбрать персонал" selected="0">Выбрать персонал</option>`)
            json_employee.map((employee) => {
                selected_empolyee.insertAdjacentHTML('beforeend', `<option value="${employee.id_employee}">${employee.post_employee}: ${employee.name_employee}</option>`)
            })}    
    }    

    if (input_shops.classList.contains("hidden") !== true) {
        input_shops.classList.toggle("hidden");
        clear_field_new_data()
    }

    if (table_shops.classList.contains("hidden") !== true) {
        table_shops.classList.toggle("hidden");
    }

    if (input_employees.classList.contains("hidden") !== true) {
        input_employees.classList.toggle("hidden");
        clear_field_new_data()
    }
    if (table_employees.classList.contains("hidden") !== true) {
        table_employees.classList.toggle("hidden");
    }

    if (list_lenght_shops_and_employees[0] !== null && list_lenght_shops_and_employees[1] !== null) {
        input_shops_employee.classList.toggle("hidden");
        table_shop_employees.classList.toggle("hidden");
    }

    get_employee_in_shop();
    
}

//открыть форму изменение магазина
async function click_edit_shop(event) {
    const tag_input = event.target.parentElement.parentElement   
    if (activ_element_update_shop[0] === true) {
        const last_element = document.getElementById(`update_number_shop-${activ_element_update_shop[1]}`).parentElement;
        console.log(last_element)
        delete_tag_shop(last_element)

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

    delete_tag_shop(tag_input)

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

//открыть форму изменение сотрудника
async function click_edit_employee(event) {
    const tag_input = event.target.parentElement.parentElement
    if (activ_element_update_employee[0] === true) {
        const last_element = document.getElementById(`update_post_employee-${activ_element_update_employee[1]}`).parentElement;
        delete_tag_employee(last_element)

        last_element.insertAdjacentHTML('beforeend', `<p>${activ_element_update_employee[2]}</p>`);
        last_element.insertAdjacentHTML('beforeend', `<p>${activ_element_update_employee[3]}</p>`);
        last_element.insertAdjacentHTML('beforeend', `<p>${activ_element_update_employee[4]}</p>`);
        last_element.insertAdjacentHTML('beforeend',
         `<button><img src="./img/edit.svg" alt="изменить" onclick="click_edit_employee(event)"> </button>`);
        last_element.insertAdjacentHTML('beforeend',
            `<button><img src="./img/delete.svg" alt="удалить" onclick="delete_employee(event)"> </button>`);
    }
    
    activ_element_update_employee[0] = true;
    activ_element_update_employee[1] = event.target.parentElement.parentElement.parentElement.id;
    activ_element_update_employee[2] = tag_input.childNodes[0].textContent;
    activ_element_update_employee[3] = tag_input.childNodes[1].textContent;
    activ_element_update_employee[4] = tag_input.childNodes[2].textContent;

    delete_tag_employee(tag_input)

    tag_input.insertAdjacentHTML('afterBegin',
        `<input type="text" id="update_name_employee" 
        value="${activ_element_update_employee[2]}" name="name_employee">`);
    tag_input.insertAdjacentHTML('afterBegin',
        `<input type="text" id="update_age_employee" 
        value="${activ_element_update_employee[3]}" name="age_employee">`);
    tag_input.insertAdjacentHTML('afterBegin',
        `<input type="text" id="update_post_employee-${activ_element_update_employee[1]}"
        value="${activ_element_update_employee[4]}" name="post_employee">`);
    tag_input.insertAdjacentHTML('beforeend',
        `<button onclick="patch_employee(event)">Изменить сотрудника</button>`);
    tag_input.insertAdjacentHTML('beforeend',
        `<button onclick="cansell_update_employee(event)">Отмена</button>`);
}

//Закрыть форму изменения магазина
function cansell_update_shop(event) {
    const tag_input = event.target.parentElement;
    const error_tag = document.getElementById(`shop-${tag_input.parentElement.id}`)
    error_tag.textContent = ""
    delete_tag_shop(tag_input);

    tag_input.insertAdjacentHTML('beforeend', `<p>${activ_element_update_shop[2]}</p>`);
    tag_input.insertAdjacentHTML('beforeend', `<p>${activ_element_update_shop[3]}</p>`);
    tag_input.insertAdjacentHTML('beforeend',
         `<button><img src="./img/edit.svg" alt="изменить" onclick="click_edit_shop(event)"> </button>`);
    tag_input.insertAdjacentHTML('beforeend',
         `<button><img src="./img/delete.svg" alt="удалить" onclick="delete_shop(event)"> </button>`);
    clear_activ_element();
}


//Закрыть форму изменения сотрудника
function cansell_update_employee(event) {
    const tag_input = event.target.parentElement;
    const error_tag = document.getElementById(`employee-${tag_input.parentElement.id}`)
    error_tag.textContent = ""
    delete_tag_employee(tag_input);

    tag_input.insertAdjacentHTML('beforeend', `<p>${activ_element_update_employee[2]}</p>`);
    tag_input.insertAdjacentHTML('beforeend', `<p>${activ_element_update_employee[3]}</p>`);
    tag_input.insertAdjacentHTML('beforeend', `<p>${activ_element_update_employee[4]}</p>`);
    tag_input.insertAdjacentHTML('beforeend',
        `<button><img src="./img/edit.svg" alt="изменить" onclick="click_edit_employee(event)"> </button>`);
    tag_input.insertAdjacentHTML('beforeend',
        `<button><img src="./img/delete.svg" alt="удалить" onclick="delete_employee(event)"> </button>`);
    clear_activ_element();
}


//Запрашивает информацию о магазинах и отрисовывает ее на странице
async function get_shops() {
    const res = await fetch(`/get_shops/`);
    const json = await res.json();

    if (res.ok) {
        table_shops.textContent = "";        
        
        json.map((shop) => create_teg_table_shop(shop));
        if (json.length !== 0) {
            list_lenght_shops_and_employees[0] = json.length
            const head_table_shop = document.createElement('div');
            head_table_shop.className = "head_table_shop";
            head_table_shop.insertAdjacentHTML('beforeend', `<p>номер магазина</p>`);
            head_table_shop.insertAdjacentHTML('beforeend', `<p>адрес магазина</p>`);
            table_shops.prepend(head_table_shop);
        }        
    }    
}

//Запрашивает информацию о сотрудниках и отрисовывает ее на странице
async function get_employees() {
    const res = await fetch(`/get_employees/`)

    const json = await res.json();

    if (res.ok) {
        table_employees.textContent = "";              

        json.map((employee) => create_teg_table_employee(employee));
        if (json.length !== 0) {
            list_lenght_shops_and_employees[1] =  json.length            
            const head_table_employee = document.createElement('div');
            head_table_employee.className = "head_table_employee";
            head_table_employee.insertAdjacentHTML('beforeend', `<p>ФИО</p>`);
            head_table_employee.insertAdjacentHTML('beforeend', `<p>Возраст</p>`);
            head_table_employee.insertAdjacentHTML('beforeend', `<p>Должность</p>`);
            table_employees.prepend(head_table_employee);
        }        
    }
}


//Запрашивает информацию о связях магазинов и персонала
async function get_employee_in_shop() {
    const res = await fetch(`/get_shops_employees/`)

    const json = await res.json();

    if (res.ok) {
        table_shop_employees.textContent = ""

        json.map((eis) => create_teg_table_shop_employee(eis))
    }

    console.log(JSON.stringify(json));

    // if (res.ok) {
    //     console.log(JSON.stringify(json));
    // }
}


//Отправляет запрос на новый магазин
async function add_shop() {
    const error = document.getElementsByClassName("error");
    const shop = {
        number_shop: Number(number_shop.value),
        address_shop: address_shop.value
    }

    const res = await fetch(`/add_shop/`, {
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
        table_shops.classList.toggle("hidden");
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

// Отправляет запрос на нового сотрудника
async function add_employee() {
    const error = document.getElementsByClassName("error");

    const empoyee = {
        name_employee: name_employee.value,
        age_employee: Number(age_employee.value),
        post_employee: post_employee.value
    }

    const res = await fetch(`/add_employee/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(empoyee)
    })

    const json = await res.json();

    if (res.ok) {
        error[1].textContent = ""
        input_employees.classList.toggle("hidden");
        table_employees.classList.toggle("hidden");

        clear_field_new_data();
        get_employees();
        
        return
    } else if (JSON.stringify(json) === '{"detail":"The name field should not be empty"}') {
        error[1].textContent = ""
        error[1].insertAdjacentHTML('beforeend', `<p>Поле имя сотрудника не должно быть пустым</p>`);
        return
    } else if (JSON.stringify(json) === '{"detail":"The position field should not be empty"}') {
        error[1].textContent = ""
        error[1].insertAdjacentHTML('beforeend', `<p>Поле должность не должно быть пустым</p>`);
        return
    } else if (JSON.stringify(json) === '{"detail":"The age of the employee must be over 18 years old"}') {
        error[1].textContent = ""
        error[1].insertAdjacentHTML('beforeend', `<p>Возраст должен быть более 17 лет</p>`);
        return
    }
}

async function add_employee_in_shop() {
    if (selected_shop.value === "Выбрать магазин") {
        console.log("Выберите магазин")
        return
    }

    if (selected_empolyee.value === "Выбрать персонал") {
        console.log("Выберите персонал")
        return
    }
    
    const employee_in_shop = {
        id_shop: selected_shop.value,
        id_employee: selected_empolyee.value
    }
    const res = await fetch(`/add_employee_in_shop/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(employee_in_shop)
    })

    const json = await res.json();

    console.log(JSON.stringify(json));
}

//Отправляет данные для изменения магазина
async function patch_shop(event) {
    const error = document.getElementsByClassName("error");
    let target_error = null
    let json = null

    const shop = {
        id_shop: Number(event.target.parentElement.parentElement.id),
        number_shop: Number(event.target.parentElement.childNodes[0].value),
        address_shop: event.target.parentElement.childNodes[1].value
    }

    if (confirm('Вы точно хотите изменить данные магазина?') === true) {
        const res = await fetch(`/update_shop/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(shop) 
    })

    json = await res.json();   

    for (let i = 0; i < error.length; i++) {
        if (event.target.parentElement.parentElement.id === error[i].id.slice(5)) {
             target_error = error[i]
        }}

    if (res.ok) {
        clear_activ_element();
        await get_shops();
        return
    } else if (JSON.stringify(json) === '{"detail":"There is already such a shop"}') {
        console.log(2)
        target_error.textContent = ""
        target_error.insertAdjacentHTML('beforeend', `<p>Магазин с таким номером уже есть</p>`);
        return
    } else if (JSON.stringify(json) === '{"detail":"The store number cannot be zero or empty"}') {
        target_error.textContent = ""
        target_error.insertAdjacentHTML('beforeend', `<p>Поле номер магазина не заполнено или номер указали 0</p>`);        
        return
    } else if (JSON.stringify(json) === `{"detail":"The store's address cannot be empty"}`) {
        target_error.textContent = ""
        target_error.insertAdjacentHTML('beforeend', `<p>Поле адрес магазина не заполнено</p>`);
        return
    }
}}

//Изменяет данные сотрудника
async function patch_employee(event) {
    const error = document.getElementsByClassName("error");
    let target_error = null
    let json = null

    const employee = {
        id_employee: event.target.parentElement.parentElement.id,
        name_employee: event.target.parentElement.childNodes[0].value,
        age_employee: Number(event.target.parentElement.childNodes[1].value),
        post_employee: event.target.parentElement.childNodes[2].value
    }

    if (confirm('Вы точно хотите изменить данные магазина?') === true) {
        const res = await fetch(`/update_employee/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(employee) 
    })

    json = await res.json(); 

    for (let i = 0; i < error.length; i++) {
        if (event.target.parentElement.parentElement.id === error[i].id.slice(9)) {
             target_error = error[i]
        }}
        
    if (res.ok) {
        clear_activ_element();
        await get_employees();
        return
    } else if (JSON.stringify(json) === '{"detail":"The name field should not be empty"}') {
        console.log(2)
        target_error.textContent = ""
        target_error.insertAdjacentHTML('beforeend', `<p>ФИО не может быть пустым</p>`);
        return
    } else if (JSON.stringify(json) === '{"detail":"The age of the employee must be over 18 years old"}') {
        target_error.textContent = ""
        target_error.insertAdjacentHTML('beforeend', `<p>Возраст должен быть не ниже 18 лет</p>`);        
        return
    } else if (JSON.stringify(json) === `{"detail":"The position field should not be empty"}`) {
        target_error.textContent = ""
        target_error.insertAdjacentHTML('beforeend', `<p>Поле должность не может быть пустым</p>`);
        return
    }
}}

//Удаляет выбранный магазин
async function delete_shop(event) {
    const shop_id = event.target.parentElement.parentElement.parentElement.id
    if (confirm('Вы точно хотите удалить магазин?') === true) {
        const respon = await fetch(`/delete_shop/${shop_id}`, {
        method: 'DELETE',
    });

    if (respon.ok) {
      await get_shops();
    }}
}

//Удаляет выбранного сотрудника
async function delete_employee(event) {
    const employee_id = event.target.parentElement.parentElement.parentElement.id
    console.log(employee_id)
    if (confirm('Вы точно хотите удалить магазин?') === true) {
        const respon = await fetch(`/delete_employee/${employee_id}`, {
        method: 'DELETE',
    });

    if (respon.ok) {
      await get_employees();
    }}
}

get_employees();
get_shops();