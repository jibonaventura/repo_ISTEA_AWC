const API_TOKEN = 'patvSjQormZgmfkzi.bc4061cdf61176c5f422b8621a07caf753409d9d43db50629515e4b2a7653960';
const BASE_ID = 'appyonjokIdkozPKl';
const TABLE_NAME = 'Products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const products = [];
const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

const addToAirtable = async (product)=>{
    
    const itemAirtable = {
        fields: product
    };

    fetch(API_URL, {
    method: 'POST',
    headers:{
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
    },
    
    body: JSON.stringify(itemAirtable)
    }).then(data => console.log(data));
}

const getProducts = async () => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });

const data = await response.json();
console.log('data', data);

const productsMaped = data.records.map(item => {
    return {
        id: item.id,
        title: item.fields.title,
        state: item.fields.state,
        thumbnail: item.fields.thumbnail,
        price: item.fields.price,
        category: item.fields.category
        };
    })

    console.log(productsMaped);

    products.length = 0;
    products.push(...productsMaped);

    renderProducts(productsMaped);
}

getProducts();

const grid = document.querySelector('.product-space');
const searchInput = document.querySelector('#input-search-products');
const stateNewCheckBox = document.querySelector('#state-new');
const stateUsedCheckBox = document.querySelector('#state-used');
const stateReCheckBox = document.querySelector('#state-re');
const consoleCheckBox = document.querySelector('#cat-console');
const controllerCheckBox = document.querySelector('#cat-controller');

function createProductCard(product){
    const card = document.createElement('article');
    card.classList.add('product-cards');

    const img = document.createElement('img');
    img.src = product.thumbnail;
    img.alt = product.title;

    const title = document.createElement('h3');
    title.textContent = product.title;

    const state = document.createElement('p');
    state.textContent = product.state;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    const button = document.createElement('button');
    button.textContent = 'Agregar';
    button.addEventListener('click', () => {
        const exists = cartProducts.find(p => p.title === product.title);
            if (!exists){
            cartProducts.push(product);
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            console.log('Producto agregado al carrito');
            }
    });
    card.style.cursor = 'pointer';
    title.addEventListener('click', () => {
        window.location.href = `./Detail.html?id=${product.id}`;
    });
    img.addEventListener('click', () => {
        window.location.href = `./Detail.html?id=${product.id}`;
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(state);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}

/*Modificar la funcion para que sea en base al formulario de alta*/
function addProduct() {
    const newProduct = {
        title: "Nuevo Producto",
        state: "Descripción del nuevo producto",
        image: "./imgs//Place_Holder_IMG.png",
        price: 0
    };

    const card = createProductCard(newProduct);
    grid.appendChild(card);
}

function renderProducts(list){
    list.forEach( product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

function filterProducts(text){
    const filteredProducts = products.filter( product => {
    const newState = !stateNewCheckBox.checked || product.state == "nuevo";
    const usedState = !stateUsedCheckBox.checked || product.state == "usado";
    const reState = !stateReCheckBox.checked || product.state == "reacondicionado";
    const catConsole = !consoleCheckBox.checked || product.category == "consola";
    const catController = !controllerCheckBox.checked || product.category == "joystick";

        return product.title.toLowerCase().includes(text.toLowerCase()) && newState && usedState && reState && catConsole && catController;
    });
    grid.innerHTML = '';
    renderProducts(filteredProducts);
}


searchInput.addEventListener('input', (e) => {
    filterProducts(e.target.value);
});

stateNewCheckBox.addEventListener('change', (e) => {
    filterProducts(searchInput.value);
})
stateUsedCheckBox.addEventListener('change', (e) => {
    filterProducts(searchInput.value);
})
stateReCheckBox.addEventListener('change', (e) => {
    filterProducts(searchInput.value);
})
consoleCheckBox.addEventListener('change', (e) => {
    filterProducts(searchInput.value);
})
controllerCheckBox.addEventListener('change', (e) => {
    filterProducts(searchInput.value);
})

renderProducts(products);
