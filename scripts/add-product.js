const API_TOKEN = 'patvSjQormZgmfkzi.bc4061cdf61176c5f422b8621a07caf753409d9d43db50629515e4b2a7653960';
const BASE_ID = 'appyonjokIdkozPKl';
const TABLE_NAME1 = 'Products';
const API_URL1 = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME1}`;

const TABLE_NAME2 = 'UnloadedProducts';
const API_URL2 = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME2}`;
    

function createProduct(event){
    event.preventDefault();
    
    const name = document.querySelector('#product-name').value.trim();
    const price = parseFloat(document.querySelector('#product-price').value);
    const state = document.querySelector('#product-state').value.trim();
    const thumbnail = document.querySelector('#product-thumbnail').value.trim();
    const category = document.querySelector('#product-category').value.trim();
    const description = document.querySelector('#product-description').value.trim();
    const brand = document.querySelector('#product-brand').value.trim();

    if (!name || isNaN(price)) {
        alert('Por favor ingresa al menos un nombre y un precio válido.');
        return;
    }

    const product = {
        name: name,
        price: price,
        state: state,
        thumbnail: thumbnail,
        category: category,
        description: description,
        brand: brand
    };

    const itemAirtable = {
        fields: product
    };

    fetch(API_URL1, {
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemAirtable)
    })
    .then(response => response.json())
    .then(data => {
        if(data.error) {
            console.error('Error detallado:', data);
            alert(`Error al crear (${data.error.type}): ${data.error.message}`);
        } else {
            alert('Producto creado correctamente.');
            window.location.href = './View-Products.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al crear producto.');
    });
}

function createClientProduct(event){
    event.preventDefault();
    
    const mail = document.querySelector('#product-mail').value.trim();
    const name = document.querySelector('#product-name').value.trim();
    const price = parseFloat(document.querySelector('#product-price').value);
    const state = document.querySelector('#product-state').value.trim();
    const thumbnail = document.querySelector('#product-thumbnail').value.trim();
    const category = document.querySelector('#product-category').value.trim();
    const description = document.querySelector('#product-description').value.trim();
    const brand = document.querySelector('#product-brand').value.trim();

    const product = {
        mail: mail,
        name: name,
        price: price,
        state: state,
        thumbnail: thumbnail,
        category: category,
        description: description,
        brand: brand
    };

    const itemAirtable = {
        fields: product
    };

    fetch(API_URL2, {
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemAirtable)
    })
    .then(response => response.json())
    .then(data => {
        if(data.error) {
            console.error('Error detallado:', data);
            alert(`Error al crear (${data.error.type}): ${data.error.message}`);
        } else {
            alert('¡Su solicitud ha sido enviada!, por favor aguardar contacto.');
            document.querySelector('#product-form').reset();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al enviar solicitud.');
    });
}