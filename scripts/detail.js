const API_TOKEN = 'patvSjQormZgmfkzi.bc4061cdf61176c5f422b8621a07caf753409d9d43db50629515e4b2a7653960';
const BASE_ID = 'appyonjokIdkozPKl';
const TABLE_NAME = 'Products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetch(`${API_URL}/${productId}`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {

            document.getElementById('product-name').textContent = data.fields.name || '';
            document.getElementById('product-brand').textContent = data.fields.brand || '';
            document.getElementById('product-thumbnail').src = data.fields.thumbnail || '';
            document.getElementById('product-description').textContent = data.fields.description || '';
            document.getElementById('product-price').textContent = `$${data.fields.price || ''}`;
            document.getElementById('product-state').textContent = data.fields.state || '';
            document.getElementById('product-category').textContent = data.fields.category || '';

            const cartButton = document.getElementById('cart-button');
            cartButton.addEventListener('click', () => {
            const exists = cartProducts.find(p => p.title === data.fields.title);
                if (!exists) {
                    const product = {
                        id: data.id,
                        name: data.fields.name,
                        brand: data.fields.brand,
                        thumbnail: data.fields.thumbnail,
                        description: data.fields.description,
                        price: data.fields.price,
                        state: data.fields.state,
                        category: data.fields.category,
                        title: data.fields.title
                    };
                        cartProducts.push(product);
                        localStorage.setItem('cart', JSON.stringify(cartProducts));
                        alert('Producto agregado al carrito');
                    } else {
                        alert('El producto ya se encuentra en el carrito');
                    }
                });
            } else {
                alert('Producto no encontrado o error en la carga.');
            }
        })
        .catch(error => {
            console.error('Error cargando producto:', error);
            alert('Error al cargar el producto.');
        });
    }
});