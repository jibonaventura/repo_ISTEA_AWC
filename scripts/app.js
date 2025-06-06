const API_TOKEN = 'patvSjQormZgmfkzi.bc4061cdf61176c5f422b8621a07caf753409d9d43db50629515e4b2a7653960';
const BASE_ID = 'appyonjokIdkozPKl';
const TABLE_NAME = 'Products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const products = [];

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
        title: item.fields.title,
        description: item.fields.description,
        thumbnail: item.fields.thumbnail,
        price: item.fields.price
        };
    })

    console.log(productsMaped);
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

    const description = document.createElement('p');
    description.textContent = product.description;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    const button = document.createElement('button');
    button.textContent = 'Comprar';

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}

function addProduct() {
    const newProduct = {
        title: "Nuevo Producto",
        thumbnail: "Descripción del nuevo producto",
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

/*arreglar los filtros*/
function filterProducts(text){
    const filteredProducts = products.filter( product => {
    const newState = !stateNewCheckBox.checked || product.description == "nuevo";
    const usedState = !stateUsedCheckBox.checked || product.description == "usado";
    const reState = !stateReCheckBox.checked || product.description == "reacondicionado";
    const catConsole = !consoleCheckBox.checked || product.name.toLowerCase().includes("consola");
    const catController = !controllerCheckBox.checked || product.name.toLowerCase().includes("joystick");

        return product.name.toLowerCase().includes(text.toLowerCase()) && newState && usedState && reState && catConsole && catController;
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
