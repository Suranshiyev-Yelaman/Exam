document.querySelector("#user_email").innerHTML += localStorage.getItem("currentUserEmail");

let select = document.querySelector("#filter_select");
let cartDiv = document.querySelector("#cartDiv");
let input = document.querySelector("#input");
let btnCart = document.querySelector("#btnCart");

function add_to_cart(item_id) {
    console.log(item_id);
    let current_user = JSON.parse(localStorage.getItem("currentUserEmail"));
    console.log(current_user);
    let users_arr = JSON.parse(localStorage.getItem("users"))
    console.log(users_arr)
    users_arr.map(user => {
        if (user.email == current_user) {
            user.cart.push(item_id);
        }
    })
    localStorage.setItem("users", JSON.stringify(users_arr));
}

async function drawProducts(){
    let response = await fetch('https://dummyjson.com/products')
    let data = await response.json();
    let sumIn = 0;
    for(let product of data.products){
        if(product.category === select.value){
            cartDiv.innerHTML += `
            <div class="div_main">
            <p>${product.title}</p>
            <p>${product.price}</p>
            <p>${product.category}</p>
            <img class="image" width="100px" height="100px" src="${product.thumbnail}"><br>
            <button id="btnCart" onclick="add_to_cart(${product.id})">В корзину</button>
            </div><hr>
            `;
        }
    }
}

console.log();

drawProducts();
select.addEventListener("change", () => {
    cartDiv.innerHTML = ""
    drawProducts();
})

select.innerHTML += `
    <option>smartphones</option>
    <option>laptops</option>
    <option>fragrances</option>
    <option>skincare</option>
    <option>groceries</option>
    <option>home-decoration</option>
`;

input.addEventListener("input", async () => {
    let response = await fetch('https://dummyjson.com/products')
    let data = await response.json();
    let product = data.products;
    let filteredProducts = product.filter(item => item.title.toLowerCase().includes(input.value.toLowerCase()) && item.category.toLowerCase() == select.value);
    cartDiv.innerHTML = "";
    filteredProducts.map(product => cartDiv.innerHTML += `
        <div class="div_main">
            <p>${product.title}</p>
            <p>${product.price}</p>
            <p>${product.category}</p>
            <img class="image" width="100px" height="100px" src="${product.thumbnail}"><br>
            <button id="btnCart" onclick="add_to_cart(${product.id})">В корзину</button>
        </div><hr>
    `)
});