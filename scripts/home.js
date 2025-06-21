const API_TOKEN = 'patvSjQormZgmfkzi.bc4061cdf61176c5f422b8621a07caf753409d9d43db50629515e4b2a7653960';
const BASE_ID = 'appyonjokIdkozPKl';
const TABLE_NAME = 'Products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const products = [];
const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
const dateFilter = new Date('2025-06-21');

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
        category: item.fields.category,
        brand: item.fields.brand,
        date: item.fields.date
        };
    })

    const filterProducts = productsMaped.filter(product => {
        if (product.date) {
            const productDate = new Date(product.date);
            return productDate >= dateFilter;
        }
        return false;
    });

    console.log('Filtrados:', filterProducts);

    products.length = 0;
    products.push(...filterProducts);

    renderProducts(filterProducts);
}

getProducts();

const grid = document.querySelector('.new-products');


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

function renderProducts(list){
    list.forEach( product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}
