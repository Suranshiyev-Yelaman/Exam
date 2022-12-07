document.querySelector("#user_email").innerHTML += localStorage.getItem("currentUserEmail");

;(async () => {
    let cart_mass_id;
    let current_user = JSON.parse(localStorage.getItem("currentUserEmail"));
    // console.log(current_user);

    let users_arr = JSON.parse(localStorage.getItem("users"));
    // console.log(users_arr);

    users_arr.map(user => {
        if (user.email == current_user) {
            cart_mass_id = user.cart;
        }
    })
    // console.log(cart_mass_id);

    let response = await fetch("https://dummyjson.com/products?limit=100");
    let data = await response.json();
    let cart_mass = [];
    
    cart_mass_id.map(id_num => cart_mass.push(data.products.filter(product => product.id == id_num)[0]));
    // console.log(cart_mass);

    let container = document.querySelector("#container");

    cart_mass.map(cart_item => container.innerHTML += `
    <div>
        <img src="${cart_item.images[0]}" style="width: 200px;">
        <p clas="title">${cart_item.title}</p>
        <p clas="category">category: ${cart_item.category}</p>
        <p clas="price">${cart_item.price}$</p>
    </div>
    <hr><hr><hr>
    ` 
    );
})();