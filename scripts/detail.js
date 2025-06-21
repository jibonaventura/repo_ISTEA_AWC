const API_TOKEN = 'patvSjQormZgmfkzi.bc4061cdf61176c5f422b8621a07caf753409d9d43db50629515e4b2a7653960';
const BASE_ID = 'appyonjokIdkozPKl';
const TABLE_NAME = 'Products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

let productId = null;
let fetchProductById = null;
let product = null;

const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    productId = urlParams.get('id');

    if (productId) {
        fetchProductById = async (id) => {
            const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${id}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                alert('Error al cargar el producto');
                return null;
            }
            const data = await response.json();
            return data;
        };

        loadDetail();
    } else {
        alert('error al cargar el ID');
    }
});

const name = document.getElementById('product-name');
const brand = document.getElementById('product-brand');
const thumbnail = document.getElementById('product-thumbnail');
const description = document.getElementById('product-description');
const price = document.getElementById('product-price');
const state = document.getElementById('product-state');
const category = document.getElementById('product-category');
const cartButton = document.getElementById('cart-button');

const loadDetail = async () => {
    if (!productId || !fetchProductById) return;

    const fetchedProduct = await fetchProductById(productId);
    if (!fetchedProduct || !fetchedProduct.fields) {
        alert('Producto no encontrado o error en la carga.');
        return;
    }

    product = {
        id: fetchedProduct.id,
        name: fetchedProduct.fields.name,
        brand: fetchedProduct.fields.brand,
        thumbnail: fetchedProduct.fields.thumbnail,
        description: fetchedProduct.fields.description,
        price: fetchedProduct.fields.price,
        state: fetchedProduct.fields.state,
        category: fetchedProduct.fields.category,
        title: fetchedProduct.fields.title
        
    };

    name.textContent = product.name || '';
    brand.textContent = product.brand || '';
    thumbnail.src = product.thumbnail || '';
    description.textContent = product.description || '';
    price.textContent = `$${product.price || ''}`;
    state.textContent = product.state || '';
    category.textContent = product.category || '';

    cartButton.addEventListener('click', () => {
        const exists = cartProducts.find(p => p.title === product.title);
        if (!exists) {
                cartProducts.push(product);
                localStorage.setItem('cart', JSON.stringify(cartProducts));
                console.log('Producto agregado al carrito');
                window.location.href = `./Cart.html`;
            }
    });
};