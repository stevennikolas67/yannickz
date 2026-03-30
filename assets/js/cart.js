// Cart Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCartPage();
});

function initializeCartPage() {
    loadAndRenderCartItems(); // Load items from localStorage
    attachEventDelegation(); // Use event delegation for dynamic elements
    initializeShippingMethod();
    initializeCheckout();
    initializeSaveForLater();
    initializePromoCode();
    updateCartTotals();
}

// Attach event listeners using event delegation
function attachEventDelegation() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;
    
    // Single consolidated click handler for all button actions
    container.addEventListener('click', function(e) {
        // Handle quantity buttons
        const qtyBtn = e.target.closest('.qty-btn');
        if (qtyBtn) {
            e.stopPropagation();
            const cartItem = qtyBtn.closest('.cart-item');
            if (!cartItem) return;
            
            const input = cartItem.querySelector('.qty-input');
            if (!input) return;
            
            const productId = parseInt(input.getAttribute('data-product-id'));
            let value = parseInt(input.value) || 1;
            
            if (qtyBtn.getAttribute('data-action') === 'decrease') {
                if (value > 1) value--;
            } else {
                value++;
            }
            
            input.value = value;
            updateCartItemQuantity(productId, value);
            updateCartTotals();
            return;
        }
        
        // Handle remove button
        const removeBtn = e.target.closest('.remove-btn');
        if (removeBtn) {
            e.stopPropagation();
            const cartItem = removeBtn.closest('.cart-item');
            if (!cartItem) return;
            
            const productId = parseInt(removeBtn.getAttribute('data-product-id'));
            
            cartItem.style.opacity = '0';
            cartItem.style.transform = 'translateX(20px)';
            setTimeout(() => {
                // Remove from localStorage
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart = cart.filter(item => item.id !== productId);
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Update cart count
                if (typeof updateCartCount === 'function') {
                    updateCartCount();
                }
                
                cartItem.remove();
                updateCartTotals();
                showEmptyCartMessage();
            }, 300);
            return;
        }
    });
    
    // Quantity input changes
    container.addEventListener('change', function(e) {
        const input = e.target.closest('.qty-input');
        if (!input) return;
        
        if (input.value < 1) input.value = 1;
        if (input.value > 99) input.value = 99;
        const productId = parseInt(input.getAttribute('data-product-id'));
        updateCartItemQuantity(productId, parseInt(input.value));
        updateCartTotals();
    });
}

// Load cart items from localStorage and render them
function loadAndRenderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-items-container');
    
    if (cart.length === 0) {
        showEmptyCartMessage();
        return;
    }
    
    container.innerHTML = '';
    
    cart.forEach(item => {
        const cartItemHTML = `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.title}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px;">
                </div>
                <div class="item-details">
                    <h3>${item.title}</h3>
                    <p class="item-price">₱${item.price.toLocaleString('en-PH')}</p>
                </div>
                <div class="item-quantity">
                    <button class="qty-btn" data-action="decrease">−</button>
                    <input type="number" value="${item.quantity}" min="1" class="qty-input" data-product-id="${item.id}">
                    <button class="qty-btn" data-action="increase">+</button>
                </div>
                <div class="item-price">
                    <p class="price">₱${(item.price * item.quantity).toLocaleString('en-PH')}</p>
                </div>
                <button class="remove-btn" data-product-id="${item.id}">Remove</button>
            </div>
        `;
        container.innerHTML += cartItemHTML;
    });
}

function updateCartItemQuantity(productId, newQuantity) {
    if (!productId || isNaN(newQuantity)) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update the displayed price
        const cartItemElement = document.querySelector(`[data-product-id="${productId}"]`);
        if (cartItemElement) {
            const priceElement = cartItemElement.querySelector('.price');
            if (priceElement) {
                priceElement.textContent = `₱${(item.price * newQuantity).toLocaleString('en-PH')}`;
            }
        }
    }
}

function initializeShippingMethod() {
    const shippingSelect = document.getElementById('shipping-method');
    shippingSelect?.addEventListener('change', updateCartTotals);
}

function updateCartTotals() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let subtotal = 0;
        
        // Calculate subtotal from localStorage cart data
        cart.forEach(item => {
            if (item && item.price && item.quantity) {
                subtotal += (item.price || 0) * (item.quantity || 1);
            }
        });
        
        const shippingSelect = document.getElementById('shipping-method');
        const shippingValue = shippingSelect?.value || 550;
        const shipping = parseFloat(shippingValue) || 550;
        const tax = subtotal * 0.12;
        const total = subtotal + shipping + tax;
        
        const subtotalEl = document.getElementById('subtotal');
        const shippingEl = document.getElementById('shipping');
        const taxEl = document.getElementById('tax');
        const totalEl = document.getElementById('total');
        
        if (subtotalEl) subtotalEl.textContent = `₱${subtotal.toLocaleString('en-PH', {minimumFractionDigits: 2})}`;
        if (shippingEl) shippingEl.textContent = `₱${shipping.toLocaleString('en-PH', {minimumFractionDigits: 2})}`;
        if (taxEl) taxEl.textContent = `₱${tax.toLocaleString('en-PH', {minimumFractionDigits: 2})}`;
        if (totalEl) totalEl.textContent = `₱${total.toLocaleString('en-PH', {minimumFractionDigits: 2})}`;
    } catch (error) {
        console.warn('Error updating cart totals:', error);
    }
}

function showEmptyCartMessage() {
    const container = document.getElementById('cart-items-container');
    if (container && container.querySelectorAll('.cart-item').length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <p style="text-align: center; padding: 40px; color: var(--gray);">
                    Your cart is empty. <a href="products.html" style="color: var(--primary);">Continue Shopping</a>
                </p>
            </div>
        `;
    }
}

function initializeCheckout() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (!checkoutBtn) return;
    
    checkoutBtn.addEventListener('click', function() {
        const cartItems = document.querySelectorAll('.cart-item');
        if (cartItems.length === 0) {
            showToast('Your cart is empty!', 'error');
            return;
        }
        openCheckoutModal();
    });
    
    // Checkout Modal Event Listeners
    const modal = document.getElementById('checkoutModal');
    const closeBtn = document.getElementById('closeCheckoutModal');
    const form = document.getElementById('checkoutFormElement');
    const paymentMethod = document.getElementById('paymentMethod');
    
    if (!modal || !closeBtn || !form) return;
    
    // Close modal
    closeBtn.addEventListener('click', closeCheckoutModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeCheckoutModal();
    });
    
    // Payment method change
    paymentMethod.addEventListener('change', function() {
        const creditCardFields = document.getElementById('creditCardFields');
        if (this.value === 'credit-card' || this.value === 'debit-card') {
            creditCardFields.style.display = 'block';
        } else {
            creditCardFields.style.display = 'none';
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateCheckoutForm()) {
            submitCheckout();
        }
    });
}

function openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    const form = document.getElementById('checkoutForm');
    const confirmation = document.getElementById('orderConfirmation');
    
    // Reset form and show checkout form
    document.getElementById('checkoutFormElement').reset();
    document.getElementById('creditCardFields').style.display = 'none';
    clearAllErrors();
    
    form.style.display = 'block';
    confirmation.style.display = 'none';
    
    modal.classList.add('active');
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('active');
}

function clearAllErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function validateCheckoutForm() {
    clearAllErrors();
    let isValid = true;
    
    // Validate Full Name
    const fullName = document.getElementById('fullName').value.trim();
    if (!fullName) {
        showError('fullNameError', 'Full Name is required');
        isValid = false;
    }
    
    // Validate Email
    const email = document.getElementById('email').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('emailError', 'Email Address is required');
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate Phone
    const phone = document.getElementById('phone').value.trim();
    const phonePattern = /^[0-9\s\-\+\(\)]{10,}$/;
    if (!phone) {
        showError('phoneError', 'Phone Number is required');
        isValid = false;
    } else if (!phonePattern.test(phone)) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate Address
    const address = document.getElementById('address').value.trim();
    if (!address) {
        showError('addressError', 'Address is required');
        isValid = false;
    }
    
    // Validate Payment Method
    const paymentMethod = document.getElementById('paymentMethod').value;
    if (!paymentMethod) {
        showError('paymentError', 'Please select a Payment Method');
        isValid = false;
    }
    
    // Validate Credit Card fields if applicable
    if (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') {
        const cardName = document.getElementById('cardName').value.trim();
        if (!cardName) {
            showError('cardNameError', 'Cardholder Name is required');
            isValid = false;
        }
        
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        if (!cardNumber || cardNumber.length < 13) {
            showError('cardNumberError', 'Please enter a valid card number');
            isValid = false;
        }
        
        const cardExpiry = document.getElementById('cardExpiry').value.trim();
        const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!cardExpiry) {
            showError('cardExpiryError', 'Expiry Date is required');
            isValid = false;
        } else if (!expiryPattern.test(cardExpiry)) {
            showError('cardExpiryError', 'Please use MM/YY format');
            isValid = false;
        }
        
        const cardCVV = document.getElementById('cardCVV').value.trim();
        if (!cardCVV || cardCVV.length !== 3) {
            showError('cardCVVError', 'CVV must be 3 digits');
            isValid = false;
        }
    }
    
    return isValid;
}

function submitCheckout() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10;
    const total = subtotal + tax;
    
    // Generate Order Number
    const orderNumber = 'ORD-' + Date.now();
    
    // Prepare order data
    const orderData = {
        orderNumber,
        fullName,
        email,
        phone,
        address,
        paymentMethod: paymentMethod === 'credit-card' ? 'Credit Card' : paymentMethod === 'debit-card' ? 'Debit Card' : paymentMethod === 'gcash' ? 'GCash' : 'Cash on Delivery',
        items: cart,
        subtotal,
        tax,
        total,
        date: new Date().toLocaleString()
    };
    
    // Save order to localStorage
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Show confirmation
    showOrderConfirmation(orderData);
}

function showOrderConfirmation(orderData) {
    const form = document.getElementById('checkoutForm');
    const confirmation = document.getElementById('orderConfirmation');
    
    // Update confirmation details
    document.getElementById('confirmName').textContent = orderData.fullName;
    document.getElementById('confirmEmail').textContent = orderData.email;
    document.getElementById('confirmPhone').textContent = orderData.phone;
    document.getElementById('confirmAddress').textContent = orderData.address;
    document.getElementById('confirmPayment').textContent = orderData.paymentMethod;
    document.getElementById('confirmTotal').textContent = '₱' + orderData.total.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('orderNumber').textContent = orderData.orderNumber;
    
    // Show order items
    const itemsHTML = orderData.items
        .map(item => `
            <div class="order-item">
                <span>${item.title} x ${item.quantity}</span>
                <span>₱${(item.price * item.quantity).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
        `)
        .join('');
    document.getElementById('confirmationOrderItems').innerHTML = itemsHTML;
    
    // Switch to confirmation view
    form.style.display = 'none';
    confirmation.style.display = 'block';
    
    // Clear cart after a delay
    setTimeout(() => {
        localStorage.removeItem('cart');
        clearCartDisplay();
    }, 100);
}

function clearCartDisplay() {
    document.getElementById('cart-items-container').innerHTML = '';
    document.getElementById('cart-count').textContent = '0';
    updateCartTotals();
}

function initializeSaveForLater() {
    const saveBtn = document.querySelector('.save-later-btn');
    if (!saveBtn) return;
    
    saveBtn.addEventListener('click', function() {
        showToast('Items saved for later!', 'success');
    });
}

function initializePromoCode() {
    const applyBtn = document.querySelector('.apply-promo-btn');
    if (!applyBtn) return;
    
    const promoInput = document.querySelector('.promo-code input');
    applyBtn.addEventListener('click', function() {
        const code = promoInput?.value?.trim() || '';
        if (code === '') {
            showToast('Please enter a promo code', 'error');
            return;
        }
        showToast('Promo code applied!', 'success');
        if (promoInput) promoInput.value = '';
    });
}

function showToast(message, type = 'success') {
    try {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.background = type === 'success' ? 'var(--success)' : 'var(--primary)';
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    } catch (error) {
        console.warn('Error showing toast:', error);
    }
}