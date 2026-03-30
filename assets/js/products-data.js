/* ===================================
   CENTRALIZED PRODUCT DATABASE
   =================================== 
   
   This file contains ALL product data for the entire website.
   All other JS files (script.js, products.js, product-detail.js) 
   reference this central database.
   
   CHANGE ANY PRODUCT INFO HERE AND IT UPDATES EVERYWHERE!
   
=================================== */

const PRODUCTS_DATABASE = [
    // ========== LAPTOPS (6 products) ==========
    { id: 1, name: 'MacBook Pro 16-inch M4', category: 'Laptops', price: 185995, oldPrice: 195995, rating: 5, reviews: 342, inStock: true, image: 'assets/images/MacBook Pro 16-inch M4.png', brand: 'Apple', model: 'MacBook Pro 16" M4 Max', color: 'Space Gray, Silver', display: '16-inch Liquid Retina XDR', battery: 'Up to 22 hours', water: 'Water Resistant', connectivity: 'Thunderbolt 4, Wi-Fi 7', compatibility: 'macOS 15+', warranty: '1 Year Limited', weight: '2.1kg'},
    { id: 2, name: 'Dell XPS 16 Plus', category: 'Laptops', price: 126995, oldPrice: 133995, rating: 5, reviews: 289, inStock: true, image: 'assets/images/Dell XPS 16 Plus.png', brand: 'Dell', model: 'XPS 16 Plus', color: 'Graphite, Platinum', display: '16-inch 4K OLED', battery: 'Up to 15 hours', water: 'Not Water Resistant', connectivity: 'Thunderbolt 4, Wi-Fi 7', compatibility: 'Windows 11', warranty: '1 Year Standard', weight: '1.96kg'},
    { id: 3, name: 'HP Pavilion Pro 16', category: 'Laptops', price: 54995, oldPrice: 57995, rating: 4, reviews: 178, inStock: true, image: 'assets/images/HP Pavilion Pro 16.png', brand: 'HP', model: 'Pavilion Pro 16', color: 'Ceramic White', display: '16-inch IPS 2.5K', battery: 'Up to 11 hours', water: 'Not Water Resistant', connectivity: 'Thunderbolt 4, Wi-Fi 6E', compatibility: 'Windows 11', warranty: '1 Year Limited', weight: '1.89kg'},
    { id: 4, name: 'Lenovo ThinkPad X1 Carbon Gen 13', category: 'Laptops', price: 89995, oldPrice: 94995, rating: 5, reviews: 267, inStock: true, image: 'assets/images/Lenovo ThinkPad X1 Carbon Gen 13.png', brand: 'Lenovo', model: 'ThinkPad X1 Carbon Gen 13', color: 'Black', display: '14-inch 2.8K OLED', battery: 'Up to 16 hours', water: 'Water Resistant', connectivity: 'Thunderbolt 4, Wi-Fi 7', compatibility: 'Windows 11', warranty: '1 Year Standard', weight: '1.23kg'},
    { id: 5, name: 'ASUS ROG Zephyrus G16 GU605', category: 'Laptops', price: 134995, oldPrice: 141995, rating: 5, reviews: 245, inStock: true, image: 'assets/images/ASUS ROG Zephyrus G16 GU605.png', brand: 'ASUS', model: 'ROG Zephyrus G16', color: 'Platinum Gray', display: '16-inch 2.5K 120Hz OLED', battery: 'Up to 8 hours', water: 'Not Water Resistant', connectivity: 'Thunderbolt 4, Wi-Fi 7', compatibility: 'Windows 11', warranty: '2 Year Standard', weight: '2.15kg'},
    { id: 6, name: 'Microsoft Surface Laptop 7th Gen', category: 'Laptops', price: 87995, oldPrice: 92995, rating: 5, reviews: 223, inStock: true, image: 'assets/images/Microsoft Surface Laptop 7th Gen.png', brand: 'Microsoft', model: 'Surface Laptop 7', color: 'Platinum, Sapphire', display: '13.8-inch PixelSense', battery: 'Up to 24 hours', water: 'Not Water Resistant', connectivity: 'Thunderbolt 4, Wi-Fi 7', compatibility: 'Windows 11', warranty: '1 Year Standard', weight: '1.29kg'},

    // ========== SMARTPHONES (6 products) ==========
    { id: 7, name: 'iPhone 16 Pro Max', category: 'Smartphones', price: 74995, oldPrice: 78995, rating: 5, reviews: 523, inStock: true, image: 'assets/images/iPhone 16 Pro Max.png', brand: 'Apple', model: 'iPhone 16 Pro Max', color: 'Titanium Black, Gold, Natural', display: '6.9-inch Super Retina XDR', battery: 'Up to 33 hours', water: 'IP68 Water Resistant', connectivity: '5G, Bluetooth 5.4, Wi-Fi 7', compatibility: 'iOS 18+', warranty: '1 Year Limited', weight: '225g'},
    { id: 8, name: 'Samsung Galaxy S25 Ultra', category: 'Smartphones', price: 69995, oldPrice: 73995, rating: 5, reviews: 467, inStock: true, image: 'assets/images/Samsung Galaxy S25 Ultra.png', brand: 'Samsung', model: 'Galaxy S25 Ultra', color: 'Titanium Black, Gray, Silver', display: '6.8-inch Dynamic AMOLED 2X', battery: 'Up to 30 hours', water: 'IP68 Water Resistant', connectivity: '5G, Bluetooth 5.4, Wi-Fi 7', compatibility: 'Android 15', warranty: '1 Year Limited', weight: '218g'},
    { id: 9, name: 'Google Pixel 9 Pro XL', category: 'Smartphones', price: 59995, oldPrice: 62995, rating: 5, reviews: 356, inStock: true, image: 'assets/images/Google Pixel 9 Pro XL.png', brand: 'Google', model: 'Pixel 9 Pro XL', color: 'Obsidian, Porcelain, Jade', display: '6.8-inch QHD OLED', battery: 'Up to 32 hours', water: 'IP68 Water Resistant', connectivity: '5G, Bluetooth 5.4, Wi-Fi 7', compatibility: 'Android 15', warranty: '1 Year Limited', weight: '234g'},
    { id: 10, name: 'OnePlus 13', category: 'Smartphones', price: 46995, oldPrice: 49995, rating: 5, reviews: 278, inStock: true, image: 'assets/images/OnePlus 13.png', brand: 'OnePlus', model: 'OnePlus 13', color: 'Midnight Black, Cream White', display: '6.82-inch AMOLED 120Hz', battery: 'Up to 26 hours', water: 'IP69 Water Resistant', connectivity: '5G, Bluetooth 5.4, Wi-Fi 7', compatibility: 'OxygenOS 15', warranty: '1 Year Standard', weight: '213g'},
    { id: 11, name: 'Xiaomi 15 Ultra', category: 'Smartphones', price: 54995, oldPrice: 57995, rating: 5, reviews: 234, inStock: true, image: 'assets/images/Xiaomi 15 Ultra.png', brand: 'Xiaomi', model: 'Xiaomi 15 Ultra', color: 'Black, White, Blue', display: '6.73-inch AMOLED 120Hz', battery: 'Up to 28 hours', water: 'IP68 Water Resistant', connectivity: '5G, Bluetooth 5.4, Wi-Fi 7', compatibility: 'HyperOS 2', warranty: '1 Year Standard', weight: '216g'},
    { id: 12, name: 'Samsung Galaxy A56', category: 'Smartphones', price: 29995, oldPrice: 31995, rating: 4, reviews: 289, inStock: true, image: 'assets/images/Samsung Galaxy A56.png', brand: 'Samsung', model: 'Galaxy A56', color: 'Light Blue, Black', display: '6.7-inch Super AMOLED', battery: 'Up to 20 hours', water: 'IP54 Water Resistant', connectivity: '5G, Bluetooth 5.3, Wi-Fi 6E', compatibility: 'Android 15', warranty: '1 Year Limited', weight: '208g'},

    // ========== TABLETS (6 products) ==========
    { id: 13, name: 'iPad Pro 13-inch M4', category: 'Tablets', price: 89995, oldPrice: 94995, rating: 5, reviews: 378, inStock: true, image: 'assets/images/iPad Pro 13-inch M4.png', brand: 'Apple', model: 'iPad Pro 13" M4', color: 'Space Gray, Silver', display: '13-inch Liquid Retina XDR', battery: 'Up to 10 hours', water: 'Not Water Resistant', connectivity: 'Wi-Fi 7, Bluetooth 5.4', compatibility: 'iPadOS 18', warranty: '1 Year Limited', weight: '579g'},
    { id: 14, name: 'Samsung Galaxy Tab S10 Ultra', category: 'Tablets', price: 56995, oldPrice: 59995, rating: 5, reviews: 267, inStock: true, image: 'assets/images/Samsung Galaxy Tab S10 Ultra.png', brand: 'Samsung', model: 'Galaxy Tab S10 Ultra', color: 'Moonstone Gray, Silver', display: '14.6-inch Dynamic AMOLED 2X', battery: 'Up to 16 hours', water: 'IP68 Water Resistant', connectivity: 'Wi-Fi 7, Bluetooth 5.4', compatibility: 'Android 15', warranty: '1 Year Limited', weight: '724g'},
    { id: 15, name: 'iPad Air 11-inch M2', category: 'Tablets', price: 54995, oldPrice: 57995, rating: 5, reviews: 289, inStock: true, image: 'assets/images/iPad Air 11-inch M2.png', brand: 'Apple', model: 'iPad Air 11" M2', color: 'Space Gray, Silver, Blue', display: '11-inch Liquid Retina', battery: 'Up to 10 hours', water: 'Not Water Resistant', connectivity: 'Wi-Fi 7, Bluetooth 5.4', compatibility: 'iPadOS 18', warranty: '1 Year Limited', weight: '489g'},
    { id: 16, name: 'Microsoft Surface Pro 11', category: 'Tablets', price: 74995, oldPrice: 78995, rating: 5, reviews: 345, inStock: true, image: 'assets/images/Microsoft Surface Pro 11.png', brand: 'Microsoft', model: 'Surface Pro 11', color: 'Platinum, Sapphire', display: '13-inch PixelSense', battery: 'Up to 20 hours', water: 'Not Water Resistant', connectivity: 'Thunderbolt 4, Wi-Fi 7', compatibility: 'Windows 11', warranty: '1 Year Standard', weight: '879g'},
    { id: 17, name: 'Lenovo Yoga Tab Pro 12.7', category: 'Tablets', price: 42995, oldPrice: 44995, rating: 4, reviews: 178, inStock: true, image: 'assets/images/Lenovo Yoga Tab Pro 12.7.png', brand: 'Lenovo', model: 'Yoga Tab Pro 12.7', color: 'Storm Gray', display: '12.7-inch OLED', battery: 'Up to 15 hours', water: 'Not Water Resistant', connectivity: 'Wi-Fi 7, Bluetooth 5.3', compatibility: 'Android 15', warranty: '1 Year Standard', weight: '649g'},
    { id: 18, name: 'iPad 11-inch Gen 7', category: 'Tablets', price: 29995, oldPrice: 31995, rating: 4, reviews: 356, inStock: true, image: 'assets/images/iPad 11-inch Gen 7.png', brand: 'Apple', model: 'iPad 11" Gen 7', color: 'Blue, Pink, Yellow, Silver', display: '11-inch Liquid Retina', battery: 'Up to 10 hours', water: 'Not Water Resistant', connectivity: 'Wi-Fi 6E, Bluetooth 5.3', compatibility: 'iPadOS 18', warranty: '1 Year Limited', weight: '517g'},

    // ========== SMARTWATCHES (6 products) ==========
    { id: 19, name: 'Apple Watch Ultra 3', category: 'Smartwatches', price: 56995, oldPrice: 59995, rating: 5, reviews: 412, inStock: true, image: 'assets/images/Apple Watch Ultra 3.png', brand: 'Apple', model: 'Watch Ultra 3', color: 'Titanium, Black', display: '2.12-inch Retina', battery: 'Up to 36 hours', water: 'Water Resistant 100m', connectivity: 'Bluetooth 5.4, LTE', compatibility: 'watchOS 11', warranty: '1 Year Limited', weight: '61.3g'},
    { id: 20, name: 'Samsung Galaxy Watch7 Ultra', category: 'Smartwatches', price: 32995, oldPrice: 34995, rating: 5, reviews: 356, inStock: true, image: 'assets/images/Samsung Galaxy Watch7 Ultra.png', brand: 'Samsung', model: 'Galaxy Watch7 Ultra', color: 'Titanium Gray, Black', display: '1.5-inch AMOLED', battery: 'Up to 48 hours', water: 'Water Resistant 10ATM', connectivity: 'Bluetooth 5.4, NFC', compatibility: 'Wear OS 4', warranty: '1 Year Limited', weight: '57.6g'},
    { id: 21, name: 'Garmin Fenix 8', category: 'Smartwatches', price: 52995, oldPrice: 55995, rating: 5, reviews: 289, inStock: true, image: 'assets/images/Garmin Fenix 8.png', brand: 'Garmin', model: 'Fenix 8', color: 'Black, Silver, Gold', display: '1.4-inch AMOLED', battery: 'Up to 18 days', water: 'Water Resistant 10ATM', connectivity: 'Bluetooth 5.3, ANT+', compatibility: 'Garmin Connect', warranty: '1 Year Standard', weight: '67g'},
    { id: 22, name: 'Fitbit Sense 3', category: 'Smartwatches', price: 21995, oldPrice: 23195, rating: 4, reviews: 223, inStock: true, image: 'assets/images/Fitbit Sense 3.png', brand: 'Fitbit', model: 'Sense 3', color: 'Platinum, Black', display: '1.12-inch AMOLED', battery: 'Up to 7 days', water: 'Water Resistant 50m', connectivity: 'Bluetooth 5.3, NFC', compatibility: 'Fitbit App', warranty: '1 Year Standard', weight: '40.5g'},
    { id: 23, name: 'Fossil Gen 7 Smartwatch', category: 'Smartwatches', price: 18995, oldPrice: 19995, rating: 4, reviews: 178, inStock: true, image: 'assets/images/Fossil Gen 7 Smartwatch.png', brand: 'Fossil', model: 'Gen 7 Wear OS', color: 'Silver, Black, Rose Gold', display: '1.4-inch AMOLED', battery: 'Up to 2 days', water: 'Water Resistant 5ATM', connectivity: 'Bluetooth 5.2, NFC', compatibility: 'Wear OS 4', warranty: '1 Year Standard', weight: '45g'},
    { id: 24, name: 'Apple Watch Series 10', category: 'Smartwatches', price: 29995, oldPrice: 31595, rating: 5, reviews: 534, inStock: true, image: 'assets/images/Apple Watch Series 10.png', brand: 'Apple', model: 'Watch Series 10', color: 'Aluminum, Stainless', display: '2.0-inch Retina', battery: 'Up to 18 hours', water: 'Water Resistant 50m', connectivity: 'Bluetooth 5.4, LTE', compatibility: 'watchOS 11', warranty: '1 Year Limited', weight: '31.9g'},

    // ========== HEADSETS (6 products) ==========
    { id: 25, name: 'Sony WH-1000XM5S', category: 'Headsets', price: 29995, oldPrice: 31595, rating: 5, reviews: 645, inStock: true, image: 'assets/images/Sony WH-1000XM5S.png', brand: 'Sony', model: 'WH-1000XM5S', color: 'Black, Silver, Beige', display: 'OLED Touchpad', battery: 'Up to 12 hours', water: 'IPX4 Water Resistant', connectivity: 'Bluetooth 5.4, 3.5mm', compatibility: 'All Devices', warranty: '1 Year Standard', weight: '250g'},
    { id: 26, name: 'Apple AirPods Pro 3rd Gen', category: 'Headsets', price: 39995, oldPrice: 41995, rating: 5, reviews: 378, inStock: true, image: 'assets/images/Apple AirPods Pro 3rd Gen.png', brand: 'Apple', model: 'AirPods Pro 3', color: 'White', display: 'Touch Controls', battery: 'Up to 6 hours', water: 'IPX4 Water Resistant', connectivity: 'Bluetooth 5.4, H2 Chip', compatibility: 'Apple Devices', warranty: '1 Year Limited', weight: '5.3g'},
    { id: 27, name: 'Bose QuietComfort Ultra', category: 'Headsets', price: 27995, oldPrice: 29495, rating: 5, reviews: 356, inStock: true, image: 'assets/images/Bose QuietComfort Ultra.png', brand: 'Bose', model: 'QC Ultra', color: 'Black, White', display: 'Touch Controls', battery: 'Up to 24 hours', water: 'Not Water Resistant', connectivity: 'Bluetooth 5.4', compatibility: 'All Devices', warranty: '1 Year Standard', weight: '226g'},
    { id: 28, name: 'Sennheiser Momentum 5', category: 'Headsets', price: 28995, oldPrice: 30595, rating: 5, reviews: 234, inStock: true, image: 'assets/images/Sennheiser Momentum 5.png', brand: 'Sennheiser', model: 'Momentum 5', color: 'Black, White', display: 'Gesture Controls', battery: 'Up to 70 hours', water: 'IPX4 Water Resistant', connectivity: 'Bluetooth 5.4', compatibility: 'All Devices', warranty: '2 Year Standard', weight: '200g'},
    { id: 29, name: 'JBL Tour Pro 3', category: 'Headsets', price: 21995, oldPrice: 23195, rating: 5, reviews: 267, inStock: true, image: 'assets/images/JBL Tour Pro 3.png', brand: 'JBL', model: 'Tour Pro 3', color: 'Black, White', display: 'Touch Controls', battery: 'Up to 10 hours', water: 'IPX5 Water Resistant', connectivity: 'Bluetooth 5.4', compatibility: 'All Devices', warranty: '1 Year Standard', weight: '5.4g'},
    { id: 30, name: 'Beats Studio Pro Max', category: 'Headsets', price: 31995, oldPrice: 33695, rating: 5, reviews: 289, inStock: true, image: 'assets/images/Beats Studio Pro Max.png', brand: 'Beats', model: 'Studio Pro Max', color: 'Black, Silver, Gold', display: 'Touch Controls', battery: 'Up to 40 hours', water: 'Not Water Resistant', connectivity: 'Bluetooth 5.4, Spatial Audio', compatibility: 'Apple & Android', warranty: '1 Year Limited', weight: '238g'},

    // ========== GAMING CONSOLES (6 products) ==========
    { id: 31, name: 'PlayStation 5 Pro', category: 'Gaming Consoles', price: 39995, oldPrice: 41995, rating: 5, reviews: 723, inStock: true, image: 'assets/images/PlayStation 5 Pro.png', brand: 'Sony', model: 'PlayStation 5 Pro', color: 'White, Black', display: 'Supports 4K & 8K', battery: 'AC Powered', water: 'N/A', connectivity: 'Wi-Fi 7, Bluetooth 5.3', compatibility: 'PS5 Games', warranty: '1 Year Limited', weight: '4.2kg'},
    { id: 32, name: 'Xbox Series X Gen 2', category: 'Gaming Consoles', price: 36995, oldPrice: 38995, rating: 5, reviews: 645, inStock: true, image: 'assets/images/Xbox Series X Gen 2.png', brand: 'Microsoft', model: 'Xbox Series X Gen 2', color: 'Black', display: 'Supports 4K & 8K', battery: 'AC Powered', water: 'N/A', connectivity: 'Wi-Fi 7, Bluetooth 5.3', compatibility: 'Xbox Games', warranty: '1 Year Standard', weight: '4.5kg'},
    { id: 33, name: 'Nintendo Switch 2 OLED', category: 'Gaming Consoles', price: 24995, oldPrice: 26295, rating: 5, reviews: 612, inStock: true, image: 'assets/images/Nintendo Switch 2 OLED.png', brand: 'Nintendo', model: 'Switch 2 OLED', color: 'White, Black, Gray', display: '8.4-inch OLED', battery: 'Up to 11 hours', water: 'Not Water Resistant', connectivity: 'Wi-Fi 6E, Bluetooth 5.2', compatibility: 'Switch 2 Games', warranty: '1 Year Limited', weight: '450g'},
    { id: 34, name: 'Steam Deck OLED 1TB', category: 'Gaming Consoles', price: 56995, oldPrice: 59995, rating: 5, reviews: 534, inStock: true, image: 'assets/images/Steam Deck OLED 1TB.png', brand: 'Valve', model: 'Steam Deck OLED 1TB', color: 'Black', display: '7.4-inch OLED 90Hz', battery: 'Up to 10 hours', water: 'Not Water Resistant', connectivity: 'Wi-Fi 7, Bluetooth 5.3', compatibility: 'Steam Games', warranty: '1 Year Limited', weight: '680g'},
    { id: 35, name: 'Meta Quest 3S 512GB', category: 'Gaming Consoles', price: 24995, oldPrice: 26295, rating: 5, reviews: 456, inStock: true, image: 'assets/images/Meta Quest 3S 512GB.png', brand: 'Meta', model: 'Quest 3S 512GB', color: 'White', display: '4K+ VR Display', battery: 'Up to 2.5 hours', water: 'Not Water Resistant', connectivity: 'Wi-Fi 7, Bluetooth 5.4', compatibility: 'Meta Apps', warranty: '1 Year Standard', weight: '600g'},
    { id: 36, name: 'Nintendo Switch Lite Gen 2', category: 'Gaming Consoles', price: 14995, oldPrice: 15795, rating: 4, reviews: 378, inStock: true, image: 'assets/images/Nintendo Switch Lite Gen 2.png', brand: 'Nintendo', model: 'Switch Lite Gen 2', color: 'Cream, Gray, Blue', display: '6.5-inch LCD', battery: 'Up to 8 hours', water: 'Not Water Resistant', connectivity: 'Wi-Fi 6, Bluetooth 5.2', compatibility: 'Switch Games', warranty: '1 Year Limited', weight: '290g'},

    // ========== DRONES (6 products) ==========
    { id: 37, name: 'DJI Air 4S', category: 'Drones', price: 74995, oldPrice: 78995, rating: 5, reviews: 367, inStock: true, image: 'assets/images/DJI Air 4S.png', brand: 'DJI', model: 'Air 4S', color: 'Gray', display: '8.3"Display', battery: 'Up to 50 min', water: 'Water Resistant', connectivity: 'Bluetooth, 2.4GHz, Wi-Fi 6', compatibility: 'DJI App', warranty: '1 Year Standard', weight: '256g'},
    { id: 38, name: 'DJI Mini 4 Pro Max', category: 'Drones', price: 59995, oldPrice: 62995, rating: 5, reviews: 423, inStock: true, image: 'assets/images/DJI Mini 4 Pro Max.png', brand: 'DJI', model: 'Mini 4 Pro Max', color: 'Gray', display: '6.2" Display', battery: 'Up to 38 min', water: 'Water Resistant', connectivity: 'Bluetooth, 2.4GHz, Wi-Fi 6E', compatibility: 'DJI App', warranty: '1 Year Standard', weight: '260g'},
    { id: 39, name: 'DJI Avata 3', category: 'Drones', price: 62995, oldPrice: 66295, rating: 5, reviews: 289, inStock: true, image: 'assets/images/DJI Avata 3.png', brand: 'DJI', model: 'Avata 3', color: 'Gray', display: 'Goggles 3S', battery: 'Up to 25 min', water: 'Water Resistant', connectivity: 'Bluetooth, 2.4GHz, Wi-Fi 6E', compatibility: 'DJI App', warranty: '1 Year Standard', weight: '430g'},
    { id: 40, name: 'Autel EVO 4 Pro', category: 'Drones', price: 104995, oldPrice: 110395, rating: 5, reviews: 212, inStock: true, image: 'assets/images/Autel EVO 4 Pro.png', brand: 'Autel', model: 'EVO 4 Pro', color: 'Gray', display: '9" Display', battery: 'Up to 52 min', water: 'Water Resistant', connectivity: 'Bluetooth, 2.4GHz, Wi-Fi 7', compatibility: 'Mobile App', warranty: '1 Year Standard', weight: '1350g'},
    { id: 41, name: 'DJI Neo Mini', category: 'Drones', price: 26995, oldPrice: 28495, rating: 4, reviews: 345, inStock: true, image: 'assets/images/DJI Neo Mini.png', brand: 'DJI', model: 'Neo', color: 'Gray, Red, White', display: 'Mobile App', battery: 'Up to 18 min', water: 'Water Resistant', connectivity: 'Bluetooth, 2.4GHz', compatibility: 'DJI App', warranty: '1 Year Standard', weight: '145g'},
    { id: 42, name: 'Skydio X3', category: 'Drones', price: 78995, oldPrice: 83195, rating: 5, reviews: 234, inStock: false, image: 'assets/images/Skydio X3.png', brand: 'Skydio', model: 'X3', color: 'Gray', display: 'Mobile App', battery: 'Up to 35 min', water: 'Water Resistant', connectivity: 'Bluetooth, 5GHz Wi-Fi', compatibility: 'Skydio App', warranty: '1 Year Standard', weight: '580g'},

    // ========== ACTION CAMERAS (6 products) ==========
    { id: 43, name: 'GoPro Hero 13 Black', category: 'Action Cameras', price: 24995, oldPrice: 26295, rating: 5, reviews: 534, inStock: true, image: 'assets/images/GoPro Hero 13 Black.png', brand: 'GoPro', model: 'Hero 13 Black', color: 'Black', display: '2.27-inch Touchscreen', battery: 'Up to 1 hour', water: 'IPX68 Waterproof', connectivity: 'Bluetooth 5.4, Wi-Fi 6E', compatibility: 'Mobile App', warranty: '1 Year Standard', weight: '153g'},
    { id: 44, name: 'DJI Osmo Action 5 Pro', category: 'Action Cameras', price: 19995, oldPrice: 21045, rating: 5, reviews: 423, inStock: true, image: 'assets/images/DJI Osmo Action 5 Pro.png', brand: 'DJI', model: 'Osmo Action 5 Pro', color: 'Black', display: '2.0-inch Touchscreen', battery: 'Up to 2.5 hours', water: 'IPX8 Waterproof', connectivity: 'Bluetooth 5.3, Wi-Fi 6', compatibility: 'DJI App', warranty: '1 Year Standard', weight: '135g'},
    { id: 45, name: 'Insta360 X4', category: 'Action Cameras', price: 34995, oldPrice: 36895, rating: 5, reviews: 289, inStock: true, image: 'assets/images/Insta360 X4.png', brand: 'Insta360', model: 'X4', color: 'Black', display: '2.1-inch Touchscreen', battery: 'Up to 1.3 hours', water: 'IPX3 Water Resistant', connectivity: 'Bluetooth 5.3, Wi-Fi 6E', compatibility: 'Insta360 App', warranty: '1 Year Standard', weight: '248g'},
    { id: 46, name: 'Akaso Brave 4 Pro', category: 'Action Cameras', price: 8995, oldPrice: 9495, rating: 4, reviews: 267, inStock: true, image: 'assets/images/Akaso Brave 4 Pro.png', brand: 'Akaso', model: 'Brave 4 Pro', color: 'Black', display: '2.0-inch LCD', battery: 'Up to 1 hour', water: 'IPX7 Waterproof', connectivity: 'Bluetooth 5.2, Wi-Fi 5', compatibility: 'Mobile App', warranty: '1 Year Standard', weight: '92g'},
    { id: 47, name: 'Sjcam SJ9 Max', category: 'Action Cameras', price: 12995, oldPrice: 13695, rating: 4, reviews: 178, inStock: true, image: 'assets/images/Sjcam SJ9 Max.png', brand: 'SJCAM', model: 'SJ9 Max', color: 'Black', display: '2.33-inch Touchscreen', battery: 'Up to 80 min', water: 'IPX7 Waterproof', connectivity: 'Bluetooth 5.2, Wi-Fi 5', compatibility: 'Mobile App', warranty: '1 Year Standard', weight: '178g'},
    { id: 48, name: 'Campark X40 4K', category: 'Action Cameras', price: 6995, oldPrice: 7395, rating: 4, reviews: 145, inStock: true, image: 'assets/images/Campark X40 4K.png', brand: 'Campark', model: 'X40 4K', color: 'Black', display: '1.5-inch LCD', battery: 'Up to 1 hour', water: 'IPX6 Waterproof', connectivity: 'Bluetooth 4.2, Wi-Fi 5', compatibility: 'Mobile App', warranty: '1 Year Standard', weight: '72g'},

    // ========== PORTABLE SPEAKERS (6 products) ==========
    { id: 49, name: 'Apple HomePod mini 2', category: 'Portable Speakers', price: 8995, oldPrice: 9495, rating: 5, reviews: 612, inStock: true, image: 'assets/images/Apple HomePod mini 2.png', brand: 'Apple', model: 'HomePod mini Gen 2', color: 'White, Orange, Yellow', display: 'LED Indicators', battery: 'AC Powered', water: 'Not Water Resistant', connectivity: 'Bluetooth 5.3, Wi-Fi 6E', compatibility: 'Apple Devices', warranty: '1 Year Limited', weight: '272g'},
    { id: 50, name: 'JBL PartyBox Club 720', category: 'Portable Speakers', price: 24995, oldPrice: 26295, rating: 5, reviews: 478, inStock: true, image: 'assets/images/JBL PartyBox Club 720.png', brand: 'JBL', model: 'PartyBox Club 720', color: 'Black', display: 'LED Touch Panel', battery: 'AC Powered', water: 'IPX4 Water Resistant', connectivity: 'Bluetooth 5.3, USB, AUX', compatibility: 'All Devices', warranty: '2 Year Standard', weight: '5.8kg'},
    { id: 51, name: 'Beats Pill 2025', category: 'Portable Speakers', price: 18995, oldPrice: 19995, rating: 5, reviews: 356, inStock: true, image: 'assets/images/Beats Pill 2025.png', brand: 'Beats', model: 'Pill 2025', color: 'Black, White, Gold', display: 'Touch Controls', battery: 'Up to 24 hours', water: 'IPX4 Water Resistant', connectivity: 'Bluetooth 5.4, USB-C', compatibility: 'All Devices', warranty: '1 Year Limited', weight: '625g'},
    { id: 52, name: 'Ultimate Ears Boom 4', category: 'Portable Speakers', price: 14995, oldPrice: 15795, rating: 5, reviews: 289, inStock: true, image: 'assets/images/Ultimate Ears Boom 4.png', brand: 'Ultimate Ears', model: 'Boom 4', color: 'Black, Blue, Red', display: 'Button Controls', battery: 'Up to 24 hours', water: 'IPX7 Waterproof', connectivity: 'Bluetooth 5.3, USB-C', compatibility: 'All Devices', warranty: '1 Year Standard', weight: '469g'},
    { id: 53, name: 'Bose SoundLink Flex', category: 'Portable Speakers', price: 19995, oldPrice: 21045, rating: 5, reviews: 423, inStock: true, image: 'assets/images/Bose SoundLink Flex.png', brand: 'Bose', model: 'SoundLink Flex', color: 'Black, White, Stone', display: 'Button Controls', battery: 'Up to 12 hours', water: 'IPX7 Waterproof', connectivity: 'Bluetooth 5.3, USB-C', compatibility: 'All Devices', warranty: '2 Year Standard', weight: '600g'},
    { id: 54, name: 'Sony SRS-XE300', category: 'Portable Speakers', price: 12995, oldPrice: 13695, rating: 4, reviews: 234, inStock: true, image: 'assets/images/Sony SRS-XE300.png', brand: 'Sony', model: 'SRS-XE300', color: 'Black, White', display: 'LED Indicators', battery: 'Up to 24 hours', water: 'IPX5 Waterproof', connectivity: 'Bluetooth 5.3, USB-C', compatibility: 'All Devices', warranty: '1 Year Standard', weight: '654g'},
];

// ===================================
// HELPER FUNCTIONS
// ===================================

/**
 * Get a product by ID
 * @param {number} productId - The product ID
 * @returns {object} The product object
 */
function getProductById(productId) {
    return PRODUCTS_DATABASE.find(p => p.id === productId);
}

/**
 * Get all products
 * @returns {array} Array of all products
 */
function getAllProducts() {
    return PRODUCTS_DATABASE;
}

/**
 * Get featured products (random selection)
 * @param {number} count - How many products to return
 * @returns {array} Array of featured products
 */
function getFeaturedProducts(count = 6) {
    const shuffled = [...PRODUCTS_DATABASE].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

/**
 * Get products by category
 * @param {string} category - The category name
 * @returns {array} Array of products in that category
 */
function getProductsByCategory(category) {
    return PRODUCTS_DATABASE.filter(p => p.category === category);
}

/**
 * Get all unique categories
 * @returns {array} Array of category names
 */
function getAllCategories() {
    const categories = [...new Set(PRODUCTS_DATABASE.map(p => p.category))];
    return categories.sort();
}

/**
 * Search products by name or category
 * @param {string} searchTerm - The search term
 * @returns {array} Array of matching products
 */
function searchProducts(searchTerm) {
    const term = searchTerm.toLowerCase();
    return PRODUCTS_DATABASE.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.category.toLowerCase().includes(term)
    );
}
