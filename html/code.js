async function add_shop() {
    const numberShop = document.getElementById("number_shop").value;
    const addressShop = document.getElementById("address_shop").value;

    const shop = {
        number_shop: Number(numberShop),
        address_shop: addressShop
    }

    let response = await fetch(`http://127.0.0.1:8000/add_shop/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(shop)
    }
    )

    let result = await response.json();
    console.log(result.message);
}