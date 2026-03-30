/* ===================================
   PRODUCT DETAIL PAGE JAVASCRIPT
   =================================== */

// NOTE: Product data is now centralized in products-data.js
// This file uses getProductById() to retrieve product information
// Any changes to product data will automatically reflect on this page

document.addEventListener('DOMContentLoaded', function() {
    initializeProductDetail();
});

function initializeProductDetail() {
    loadProductData();
    initializeQuantityButtons();
    initializeAddToCart();
}

// Helper function to get product from central database
function getProductFromDatabase(productId) {
    if (typeof getProductById === 'function') {
        return getProductById(productId);
    }
    console.warn('products-data.js not loaded. Cannot retrieve product data.');
    return null;
}

// NOTE: All product data now stored in products-data.js
// The old productDatabase object has been removed. 
// Product data is now loaded via getProductFromDatabase() function above
// which uses getProductById() from the centralized products-data.js file

function loadProductData() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;
    const product = getProductFromDatabase(productId);
    
    if (product) {
        const productImage = document.getElementById('product-image');
        productImage.src = product.image;
        productImage.alt = product.name;
        
        document.getElementById('product-title').textContent = product.name;
        document.getElementById('product-category').textContent = product.category;
        const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
        document.getElementById('product-rating').textContent = `${stars} (${product.reviews} reviews)`;
        document.getElementById('current-price').textContent = `₱${product.price.toLocaleString('en-PH')}`;
        document.getElementById('old-price').textContent = `₱${product.oldPrice.toLocaleString('en-PH')}`;
        document.getElementById('product-description').innerHTML = `<p>Experience the excellence of ${product.name}. Designed with precision and quality, it delivers exceptional performance and style.</p>`;
        
        document.getElementById('spec-model').textContent = product.model;
        document.getElementById('spec-brand').textContent = product.brand;
        document.getElementById('spec-color').textContent = product.color;
        document.getElementById('spec-display').textContent = product.display;
        document.getElementById('spec-battery').textContent = product.battery;
        document.getElementById('spec-water').textContent = product.water;
        document.getElementById('spec-connectivity').textContent = product.connectivity;
        document.getElementById('spec-compatibility').textContent = product.compatibility;
        document.getElementById('spec-warranty').textContent = product.warranty;
        document.getElementById('spec-weight').textContent = product.weight;
        
        const stockElement = document.getElementById('product-stock-status');
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        const qtySelector = document.querySelector('.quantity-selector');
        
        if (product.inStock) {
            stockElement.innerHTML = '<strong>✓ In Stock</strong> - Available for immediate delivery';
            addToCartBtn.disabled = false;
            addToCartBtn.style.opacity = '1';
            addToCartBtn.style.cursor = 'pointer';
            qtySelector.style.opacity = '1';
            qtySelector.style.pointerEvents = 'auto';
        } else {
            stockElement.innerHTML = '<strong style="color: #e74c3c;">✗ Out of Stock</strong> - Currently unavailable';
            addToCartBtn.disabled = true;
            addToCartBtn.style.opacity = '0.5';
            addToCartBtn.style.cursor = 'not-allowed';
            addToCartBtn.style.backgroundColor = '#ccc';
            qtySelector.style.opacity = '0.5';
            qtySelector.style.pointerEvents = 'none';
        }
        
        window.currentProduct = product;
    }
}

function initializeQuantityButtons() {
    const qtyInput = document.getElementById('quantity');
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');
    
    qtyMinus.addEventListener('click', function() {
        let value = parseInt(qtyInput.value);
        if (value > 1) {
            qtyInput.value = value - 1;
        }
    });
    
    qtyPlus.addEventListener('click', function() {
        let value = parseInt(qtyInput.value);
        qtyInput.value = value + 1;
    });
}

function initializeAddToCart() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    addToCartBtn?.addEventListener('click', function() {
        const quantity = parseInt(document.getElementById('quantity').value) || 1;
        const product = window.currentProduct;
        
        if (product) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cart.find(item => item.id === product.id);
            
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.push({
                    id: product.id,
                    title: product.name,
                    price: product.price,
                    quantity: quantity,
                    image: product.image
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count display immediately
            if (typeof updateCartCount === 'function') {
                updateCartCount();
            }
            
            showNotification(`Added ${quantity} x ${product.name} to cart`);
            document.getElementById('quantity').value = 1;
        }
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
