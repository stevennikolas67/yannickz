/* ===================================
   ECOMMERCE GADGET STORE - MAIN JAVASCRIPT
   =================================== */

// Theme Management
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.add('dark-theme');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.classList.remove('dark-theme');
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initializeThemeToggle();
    initializeMobileMenu();
    initializeFAQ();
    initializeScrollToTop();
    initializeSwiper();
    loadFeaturedProducts();
    initializeBannerCarousel();
    initializeProductViewButtons();
    initializeNewsletterForm();
    initializeSearch();
    updateCartCount();
}

/* ===================================
   THEME TOGGLE
   =================================== */
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    updateThemeIcons(isDark);
    
    themeToggle?.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        
        updateThemeIcons(newTheme === 'dark');
    });
}

function updateThemeIcons(isDark) {
    const sunIcons = document.querySelectorAll('.sun-icon');
    const moonIcons = document.querySelectorAll('.moon-icon');
    
    sunIcons.forEach(icon => icon.style.display = isDark ? 'none' : 'block');
    moonIcons.forEach(icon => icon.style.display = isDark ? 'block' : 'none');
}

/* ===================================
   MOBILE MENU
   =================================== */
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    menuToggle?.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle?.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
}

/* ===================================
   FAQ ACCORDION
   =================================== */
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question?.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active', !isActive);
        });
    });
}

/* ===================================
   SCROLL TO TOP
   =================================== */
function initializeScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ===================================
   SWIPER CAROUSEL
   =================================== */
function initializeSwiper() {
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 800,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }
}

/* ===================================
   BANNER CAROUSEL
   =================================== */
let bannerProducts = []; // Will be loaded from PRODUCTS_DATABASE
let currentSlide = 0;
let autoplayInterval;

function initializeBannerCarousel() {
    // Load products from database
    if (typeof PRODUCTS_DATABASE !== 'undefined' && PRODUCTS_DATABASE.length > 0) {
        bannerProducts = PRODUCTS_DATABASE.slice(0, 4).map(product => ({
            name: product.name,
            price: product.price,
            description: `Experience the excellence of ${product.name}. Designed with precision and quality, it delivers exceptional performance and style.`,
            image: product.image
        }));
    }
    
    if (bannerProducts.length === 0) {
        console.warn('No banner products available');
        return;
    }
    
    const dotsContainer = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    // Clear existing dots
    if (dotsContainer) dotsContainer.innerHTML = '';
    
    bannerProducts.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer?.appendChild(dot);
    });
    
    prevBtn?.addEventListener('click', previousSlide);
    nextBtn?.addEventListener('click', nextSlide);
    
    updateBannerSlide();
    startAutoplay();
    
    const carouselContainer = document.getElementById('banner-carousel');
    carouselContainer?.addEventListener('mouseenter', stopAutoplay);
    carouselContainer?.addEventListener('mouseleave', startAutoplay);
}

function updateBannerSlide() {
    const product = bannerProducts[currentSlide];
    
    const bannerImg = document.getElementById('banner-img');
    const bannerName = document.getElementById('banner-product-name');
    const bannerDesc = document.getElementById('banner-product-desc');
    const bannerPrice = document.getElementById('banner-product-price');
    
    if (bannerImg) bannerImg.src = product.image;
    if (bannerName) bannerName.textContent = product.name;
    if (bannerDesc) bannerDesc.textContent = product.description;
    if (bannerPrice) bannerPrice.textContent = product.price.toLocaleString('en-PH');
    
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + bannerProducts.length) % bannerProducts.length;
    updateBannerSlide();
    resetAutoplay();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % bannerProducts.length;
    updateBannerSlide();
    resetAutoplay();
}

function goToSlide(index) {
    currentSlide = index;
    updateBannerSlide();
    resetAutoplay();
}

function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
}

/* ===================================
   PRODUCT VIEW BUTTONS
   =================================== */
function initializeProductViewButtons() {
    document.querySelectorAll('.view-product-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            if (productId) {
                window.open(`product-detail.html?id=${productId}`, '_blank');
            }
        });
    });
}

/* ===================================
   NEWSLETTER FORM
   =================================== */
function initializeNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    form?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const button = this.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        setTimeout(() => {
            showToast('Successfully subscribed! Thank you.');
            this.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1000);
    });
}

/* ===================================
   SEARCH FUNCTIONALITY
   =================================== */
function initializeSearch() {
    const searchBtn = document.querySelector('.search-btn');
    searchBtn?.addEventListener('click', openSearchModal);
}

function openSearchModal() {
    const existingModal = document.querySelector('.search-modal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.innerHTML = `
        <div class="search-modal-content">
            <div class="search-modal-header">
                <h3>Search Products</h3>
                <button class="close-search-modal">&times;</button>
            </div>
            <div class="search-modal-body">
                <input type="text" class="search-input" placeholder="Search for gadgets, brands, or categories..." autofocus>
                <div class="search-results"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    const searchInput = modal.querySelector('.search-input');
    const resultsContainer = modal.querySelector('.search-results');
    const closeBtn = modal.querySelector('.close-search-modal');
    
    closeBtn.addEventListener('click', () => closeSearchModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeSearchModal(modal);
    });
    
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.trim();
        if (term.length > 0) {
            performSearch(term, resultsContainer);
        } else {
            resultsContainer.innerHTML = '<p style="text-align:center; color: var(--gray);">Start typing to search...</p>';
        }
    });
    
    searchInput.focus();
}

function performSearch(term, container) {
    if (typeof PRODUCTS_DATABASE === 'undefined') {
        container.innerHTML = '<p style="text-align:center; color: var(--gray);">Loading products...</p>';
        return;
    }
    
    const results = PRODUCTS_DATABASE.filter(product => 
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase())
    );
    
    if (results.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 40px;">
                <p style="color: var(--gray);">No products found for "${term}"</p>
                <p style="font-size: 0.85rem; color: var(--gray);">Try searching with different keywords</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = results.slice(0, 8).map(product => `
        <div class="search-result-item" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="search-result-image" onerror="this.src='assets/images/placeholder.jpg'">
            <div class="search-result-info">
                <div class="search-result-title">${product.name}</div>
                <div style="font-size: 0.8rem; color: var(--gray);">${product.category}</div>
                <div class="search-result-price">₱${product.price.toLocaleString('en-PH')}</div>
            </div>
        </div>
    `).join('');
    
    container.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
            const productId = item.getAttribute('data-id');
            window.open(`product-detail.html?id=${productId}`, '_blank');
            closeSearchModal(document.querySelector('.search-modal'));
        });
    });
}

function closeSearchModal(modal) {
    modal.remove();
    document.body.style.overflow = '';
}

/* ===================================
   CART FUNCTIONALITY
   =================================== */
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) cartCountSpan.textContent = totalItems;
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.background = type === 'success' ? 'var(--success)' : 'var(--primary)';
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/* ===================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   =================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ===================================
   ACTIVE NAV LINK ON SCROLL
   =================================== */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

/* ===================================
   LOAD FEATURED PRODUCTS DYNAMICALLY
   =================================== */
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products-grid');
    if (!container) return;
    
    // Get all products and shuffle them
    if (typeof PRODUCTS_DATABASE === 'undefined' || PRODUCTS_DATABASE.length === 0) {
        container.innerHTML = '<p>Loading products...</p>';
        return;
    }
    
    // Shuffle products randomly and get 6
    const shuffledProducts = shuffleArray([...PRODUCTS_DATABASE]);
    const featuredProducts = shuffledProducts.slice(0, 6);
    
    container.innerHTML = '';
    
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-content">
                <p class="product-category">${product.category}</p>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-footer">
                    <span class="product-price">₱${product.price.toLocaleString('en-PH')}</span>
                    <button class="btn btn-small view-product-btn" data-id="${product.id}">View Product</button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
    
    // Re-initialize view product buttons after loading
    initializeProductViewButtons();
}

/**
 * Fisher-Yates shuffle algorithm to randomize array
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
updateActiveNavLink();