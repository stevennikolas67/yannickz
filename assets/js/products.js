/* ===================================
   PRODUCTS PAGE - FILTERING & PAGINATION
   =================================== */

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 12;
let currentSort = 'featured';

document.addEventListener('DOMContentLoaded', function() {
    if (typeof getAllProducts === 'function') {
        allProducts = getAllProducts();
        filteredProducts = [...allProducts];
        initializeProductsPage();
    } else {
        console.warn('products-data.js not loaded properly');
    }
});

function initializeProductsPage() {
    setupFilterListeners();
    setupSortListener();
    displayProducts();
}

/**
 * Dynamically generate category filter list from database
 */
function setupCategoryFilterUI() {
    const filterList = document.getElementById('category-filter-list');
    if (!filterList) return;
    
    // Get unique categories and count products in each
    const categoryCounts = {};
    let totalProducts = 0;
    
    allProducts.forEach(product => {
        if (!categoryCounts[product.category]) {
            categoryCounts[product.category] = 0;
        }
        categoryCounts[product.category]++;
        totalProducts++;
    });
    
    // Clear existing filter list
    filterList.innerHTML = '';
    
    // Add "All Categories" option
    const allItem = document.createElement('li');
    allItem.innerHTML = `<label><input type="checkbox" class="category-checkbox" data-category="all" checked> All Categories (${totalProducts})</label>`;
    filterList.appendChild(allItem);
    
    // Add category options sorted alphabetically
    Object.keys(categoryCounts).sort().forEach(category => {
        const count = categoryCounts[category];
        const li = document.createElement('li');
        li.innerHTML = `<label><input type="checkbox" class="category-checkbox" data-category="${category}"> ${category} (${count})</label>`;
        filterList.appendChild(li);
    });
    
    // Attach event listeners to category checkboxes
    attachCategoryListeners();
}

/**
 * Attach change event listeners to category checkboxes
 */
function attachCategoryListeners() {
    const categoryCheckboxes = document.querySelectorAll('.category-checkbox');
    
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // If "All Categories" is checked, uncheck all others
            if (this.dataset.category === 'all' && this.checked) {
                categoryCheckboxes.forEach(cb => {
                    if (cb.dataset.category !== 'all') cb.checked = false;
                });
            } 
            // If any specific category is checked, uncheck "All Categories"
            else if (this.checked && this.dataset.category !== 'all') {
                const allCheckbox = document.querySelector('.category-checkbox[data-category="all"]');
                if (allCheckbox) allCheckbox.checked = false;
            }
            
            // Apply filters immediately when any category changes
            applyFilters();
        });
    });
}

function setupFilterListeners() {
    // Price range
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-range-value');
    
    priceRange?.addEventListener('input', function() {
        const value = parseInt(this.value);
        priceValue.textContent = `₱${value.toLocaleString('en-PH')}`;
        applyFilters();
    });
    
    // Rating checkboxes
    document.querySelectorAll('.rating-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Availability checkboxes
    document.querySelectorAll('.availability-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Sort dropdown
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            sortProducts();
            displayProducts();
        });
    }
    
    // Reset filters button
    const resetBtn = document.querySelector('.reset-filters-btn');
    resetBtn?.addEventListener('click', resetFilters);
    
    // Initialize category UI (this will attach category listeners)
    setupCategoryFilterUI();
}

function setupSortListener() {
    const sortSelect = document.getElementById('sort-select');
    sortSelect?.addEventListener('change', function() {
        currentSort = this.value;
        sortProducts();
        currentPage = 1;
        displayProducts();
    });
}

function applyFilters() {
    // Get selected categories
    const selectedCategories = [];
    const categoryCheckboxes = document.querySelectorAll('.category-checkbox');
    const allChecked = document.querySelector('.category-checkbox[data-category="all"]')?.checked;
    
    if (!allChecked) {
        categoryCheckboxes.forEach(cb => {
            if (cb.checked && cb.dataset.category !== 'all') {
                selectedCategories.push(cb.dataset.category);
            }
        });
    }
    
    // Get price range
    const maxPrice = parseInt(document.getElementById('price-range')?.value || 200000);
    
    // Get selected ratings
    const selectedRatings = [];
    document.querySelectorAll('.rating-checkbox:checked').forEach(cb => {
        selectedRatings.push(parseInt(cb.dataset.rating));
    });
    
    // Get availability
    const inStockChecked = document.querySelector('.availability-checkbox[data-availability="in-stock"]')?.checked;
    const preOrderChecked = document.querySelector('.availability-checkbox[data-availability="pre-order"]')?.checked;
    const outOfStockChecked = document.querySelector('.availability-checkbox[data-availability="out-of-stock"]')?.checked;
    
    // Filter products
    filteredProducts = allProducts.filter(product => {
        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
            return false;
        }
        
        // Price filter
        if (product.price > maxPrice) {
            return false;
        }
        
        // Rating filter
        if (selectedRatings.length > 0 && !selectedRatings.includes(product.rating)) {
            return false;
        }
        
        // Availability filter
        if (inStockChecked && !outOfStockChecked && !preOrderChecked) {
            return product.inStock === true;
        }
        if (outOfStockChecked && !inStockChecked && !preOrderChecked) {
            return product.inStock === false;
        }
        if (inStockChecked && outOfStockChecked && !preOrderChecked) {
            return true;
        }
        if (preOrderChecked) {
            // For now, no pre-order items, so return false if only pre-order is selected
            if (!inStockChecked && !outOfStockChecked) return false;
        }
        
        return true;
    });
    
    sortProducts();
    currentPage = 1;
    displayProducts();
}

function resetFilters() {
    // Reset category checkboxes
    const allCheckbox = document.querySelector('.category-checkbox[data-category="all"]');
    if (allCheckbox) allCheckbox.checked = true;
    
    document.querySelectorAll('.category-checkbox[data-category!="all"]').forEach(cb => {
        cb.checked = false;
    });
    
    // Reset price range
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
        priceRange.value = 100000;
        document.getElementById('price-range-value').textContent = '₱100,000';
    }
    
    // Reset rating checkboxes
    document.querySelectorAll('.rating-checkbox').forEach(cb => {
        cb.checked = false;
    });
    
    // Reset availability
    document.querySelectorAll('.availability-checkbox').forEach(cb => {
        cb.checked = cb.dataset.availability === 'in-stock';
    });
    
    // Reset sort
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.value = 'featured';
    currentSort = 'featured';
    
    // Reset products
    filteredProducts = [...allProducts];
    currentPage = 1;
    displayProducts();
}

function sortProducts() {
    switch(currentSort) {
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
            break;
        default: // featured
            filteredProducts.sort((a, b) => a.id - b.id);
    }
}

function displayProducts() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToDisplay = filteredProducts.slice(startIndex, endIndex);
    
    const productsGrid = document.getElementById('products-grid');
    const totalProducts = filteredProducts.length;
    const startCount = startIndex + 1;
    const endCount = Math.min(endIndex, totalProducts);
    
    // Update product count display
    const countDisplay = document.getElementById('product-count-display');
    if (countDisplay) {
        if (totalProducts === 0) {
            countDisplay.textContent = 'No products found';
        } else {
            countDisplay.textContent = `Showing ${startCount}-${endCount} of ${totalProducts} products`;
        }
    }
    
    if (!productsGrid) return;
    
    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <p>No products found matching your filters.</p>
                <button class="btn btn-primary reset-filters-btn" style="margin-top: 16px;">Clear Filters</button>
            </div>
        `;
        document.getElementById('pagination').innerHTML = '';
        return;
    }
    
    productsGrid.innerHTML = productsToDisplay.map(product => createProductCard(product)).join('');
    
    // Add click listeners to view buttons
    document.querySelectorAll('.view-product-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            window.open(`product-detail.html?id=${productId}`, '_blank');
        });
    });
    
    updatePagination();
}

function createProductCard(product) {
    const ratingStars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    const stockBadge = product.inStock 
        ? '<span class="stock-badge in-stock">In Stock</span>' 
        : '<span class="stock-badge out-of-stock">Out of Stock</span>';
    
    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/images/placeholder.jpg'">
                ${stockBadge}
            </div>
            <div class="product-content">
                <p class="product-category">${product.category}</p>
                <h3 class="product-title">${escapeHtml(product.name)}</h3>
                <div class="product-rating">${ratingStars} (${product.reviews})</div>
                <div class="product-footer">
                    <span class="product-price">₱${product.price.toLocaleString('en-PH')}</span>
                    <button class="btn btn-small view-product-btn" data-id="${product.id}">View Product</button>
                </div>
            </div>
        </div>
    `;
}

function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    
    if (!paginationContainer) return;
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<a href="#" class="page-link" data-page="${currentPage - 1}">← Previous</a>`;
    }
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    if (startPage > 1) {
        paginationHTML += `<a href="#" class="page-link" data-page="1">1</a>`;
        if (startPage > 2) paginationHTML += `<span class="page-dots">...</span>`;
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `<a href="#" class="page-link ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) paginationHTML += `<span class="page-dots">...</span>`;
        paginationHTML += `<a href="#" class="page-link" data-page="${totalPages}">${totalPages}</a>`;
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<a href="#" class="page-link" data-page="${currentPage + 1}">Next →</a>`;
    }
    
    paginationContainer.innerHTML = paginationHTML;
    
    // Add click listeners
    document.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = parseInt(this.getAttribute('data-page'));
            if (!isNaN(page) && page !== currentPage) {
                currentPage = page;
                displayProducts();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

function updateCategoryCounts() {
    if (!allProducts.length) return;
    
    const categories = {
        'Laptops': 0,
        'Smartphones': 0,
        'Tablets': 0,
        'Smartwatches': 0,
        'Headsets': 0,
        'Gaming Consoles': 0,
        'Drones': 0,
        'Action Cameras': 0,
        'Portable Speakers': 0
    };
    
    allProducts.forEach(product => {
        if (categories[product.category] !== undefined) {
            categories[product.category]++;
        }
    });
    
    const total = Object.values(categories).reduce((sum, count) => sum + count, 0);
    
    // Update category labels
    document.querySelectorAll('.category-checkbox').forEach(checkbox => {
        const category = checkbox.dataset.category;
        const label = checkbox.closest('label');
        if (category === 'all') {
            label.innerHTML = `<input type="checkbox" class="category-checkbox" data-category="all"> All Categories (${total})`;
        } else if (categories[category] !== undefined) {
            label.innerHTML = `<input type="checkbox" class="category-checkbox" data-category="${category}"> ${category} (${categories[category]})`;
        }
    });
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}