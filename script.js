// Step 1: Create a basic HTML structure with a container to hold the data
const cardRow = document.getElementById('card-row');

// Step 2: Fetch data from API using fetch method

fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        // Step 3: Manipulating the DOM to display the fetched data in card layout using bootstrap classes
        data.forEach(product => {
            const card = document.createElement('div');
            card.className = 'col-md-3 mb-3';
            card.innerHTML = `
                        <div class="card">
                            <div class="card-body" style="background-color: #f8f9fa; border: 1px solid #dee2e6; border-radius: 5px;">
                                <h5 class="card-title" style="height: 120px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${product.title}</h5>
                                <img src="${product.image}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: contain;">
                                <!-- <p class="card-text">ID: ${product.id}</p> -->
                                <p class="card-text">Price: $${product.price.toFixed(2)}</p>
                                <p class="card-text">Category: ${product.category}</p>
                                <p class="card-text" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Description: ${product.description}</p>
                                <p class="card-text">Rating: ${product.rating.rate} (${product.rating.count} reviews)
                                </div>
                                <button class="btn btn-primary mt-2">Add to Cart</button>
                        </div>
                    `;
            cardRow.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
const searchInput = document.querySelector('.search');
const searchButton = document.querySelector('.search-btn');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();  
        const category = card.querySelector('.card-text:nth-child(4)').textContent.toLowerCase(); // Assuming category is the 4th .card-text
        
        if (title.includes(query) || category.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

const cartButton = document.querySelector('.cart');
const floatCount = document.querySelector('.float-count');
let cartCount = 0;

cartButton.addEventListener('click', () => {
    alert(`You have ${cartCount} items in your cart.`);
});

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-primary')) {
        cartCount++;
        floatCount.textContent = cartCount;
    }
});