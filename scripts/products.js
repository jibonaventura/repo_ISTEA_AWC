const API_TOKEN = 'patvSjQormZgmfkzi.bc4061cdf61176c5f422b8621a07caf753409d9d43db50629515e4b2a7653960';
const BASE_ID = 'appyonjokIdkozPKl';
const TABLE_NAME = 'Products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;


const grid =  document.querySelector('#product-list');

function createProductRow(product) {
    const row = document.createElement('tr');

    const title = document.createElement('td');
    title.textContent = product.title;

    const price = document.createElement('td');
    price.textContent = `$${product.price}`;

    const actions = document.createElement('td');
   
    const button = document.createElement('button');
    button.textContent = 'Modificar';
    button.addEventListener('click', () => {
        window.location.href = `../admin/Edit-Products.html?id=${product.id}`;
    });

    actions.appendChild(button);
    row.appendChild(title);
    row.appendChild(price);
    row.appendChild(actions);

    return row;
}
const products = [];
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
            thumbnail: item.fields.thumbnail,
            price: item.fields.price
        };
    })
    console.log(productsMaped);

    renderProducts(productsMaped);
}

function renderProducts(list){
    list.forEach( product => {
        const row = createProductRow(product);
        grid.appendChild(row);
    });
}

getProducts();