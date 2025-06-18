const API_TOKEN = 'patvSjQormZgmfkzi.bc4061cdf61176c5f422b8621a07caf753409d9d43db50629515e4b2a7653960';
const BASE_ID = 'appyonjokIdkozPKl';
const TABLE_NAME = 'Products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if(productId) {
        fetch(`${API_URL}/${productId}`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if(!data.error) {
                document.querySelector('#product-title').value = data.fields.title || '';
                document.querySelector('#product-price').value = data.fields.price || '';
                document.querySelector('#product-state').value = data.fields.state || '';
                document.querySelector('#product-thumbnail').value = data.fields.thumbnail || '';
                document.querySelector('#product-category').value = data.fields.category || '';
                document.querySelector('#product-description').value = data.fields.description || '';
            }
        })
        .catch(error => console.error('Error cargando producto:', error));
    }
});

function updateSubmit(event){
    event.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if(!productId) {
        alert('No se especificó ID de producto');
        return;
    }

    const title = document.querySelector('#product-title').value.trim();
    const price = parseFloat(document.querySelector('#product-price').value);
    const state = document.querySelector('#product-state').value.trim();
    const thumbnail = document.querySelector('#product-thumbnail').value.trim();
    const category = document.querySelector('#product-category').value.trim();
    const description = document.querySelector('#product-description').value.trim();

    if(!title || isNaN(price)) {
        alert('Título y precio son campos requeridos. El precio debe ser numérico.');
        return;
    }

    const product = {
        title: title,
        price: price,
        state: state,
        thumbnail: thumbnail,
        category: category,
        description: description
    };

    const itemAirtable = {
        fields: product
    };

    fetch(`${API_URL}/${productId}`, {
        method: 'PATCH',
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
            alert(`Error al actualizar (${data.error.type}): ${data.error.message}`);
        } else {
            alert('Producto actualizado');
            window.location.href = './View-Products.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al actualizar el producto');
    });
}