const API_TOKEN = 'patvSjQormZgmfkzi.bc4061cdf61176c5f422b8621a07caf753409d9d43db50629515e4b2a7653960';
const BASE_ID = 'appyonjokIdkozPKl';
const TABLE_NAME = 'Products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const products = [];
const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

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
        brand: item.fields.brand
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
const brandNintenCheckBox = document.querySelector('#brand-ninten');
const brandSonyCheckBox = document.querySelector('#brand-sony');
const brandAtariCheckBox = document.querySelector('#brand-atari');
const minPrice = document.querySelector('#min-price');
const maxPrice = document.querySelector('#max-price');

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

function filterProducts(text){
    const inputMinPrice = parseFloat(minPrice.value);
    const inputMaxPrice = parseFloat(maxPrice.value);

    const filteredProducts = products.filter( product => {

    const productBrand = product.brand && product.brand.toLowerCase();
    const productCategory = product.category && product.category.toLowerCase();
    const productState = product.state && product.state.toLowerCase();

    const newState = !stateNewCheckBox.checked || productState == "nuevo";
    const usedState = !stateUsedCheckBox.checked || productState == "usado";
    const reState = !stateReCheckBox.checked || productState == "reacondicionado";
    const catConsole = !consoleCheckBox.checked || productCategory == "consola";
    const catController = !controllerCheckBox.checked || productCategory == "joystick";
    const brandNinten = !brandNintenCheckBox.checked || productBrand == "nintendo";
    const brandSony = !brandSonyCheckBox.checked || productBrand == "sony";
    const brandAtari = !brandAtariCheckBox.checked || productBrand == "atari";

    const priceRange = (isNaN(inputMinPrice) || product.price >= inputMinPrice) && (isNaN(inputMaxPrice) || product.price <= inputMaxPrice);

        return product.title.toLowerCase().includes(text.toLowerCase()) && newState && usedState && reState && catConsole && catController && brandNinten && brandSony && brandAtari && priceRange;
    });
    grid.innerHTML = '';
    renderProducts(filteredProducts);
}

searchInput.addEventListener('input', (e) => {
    filterProducts(e.target.value);
});

stateNewCheckBox.addEventListener('change', (e) => {
    filterProducts(searchInput.value);
});
stateUsedCheckBox.addEventListener('change', (e) => {
    filterProducts(searchInput.value);
});
stateReCheckBox.addEventListener('change', (e) => {
    filterProducts(searchInput.value);
});

consoleCheckBox.addEventListener('change', (e) => {
    filterProducts(searchInput.value);
});
controllerCheckBox.addEventListener('change', (e) => {
    filterProducts(searchInput.value);
});

brandNintenCheckBox.addEventListener('change', (e) => {
    filterProducts(searchInput.value);
});
brandSonyCheckBox.addEventListener('change', (e) => {
    filterProducts(searchInput.value);
});
brandAtariCheckBox.addEventListener('change', (e) => {
    filterProducts(searchInput.value);
});

minPrice.addEventListener('input', () => {
    filterProducts(searchInput.value);
});
maxPrice.addEventListener('input', () => {
    filterProducts(searchInput.value);
});

renderProducts(products);
