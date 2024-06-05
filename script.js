const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

let cryptoData = [];

// Fetch data using .then
function fetchDataWithThen() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            cryptoData = data;
            renderTable(cryptoData);
        })
        .catch(error => console.error('Error fetching data with then:', error));
}

// Fetch data using async/await
async function fetchDataWithAsync() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        cryptoData = data;
        renderTable(cryptoData);
    } catch (error) {
        console.error('Error fetching data with async/await:', error);
    }
}

// Render data in a table
function renderTable(data) {
    const tableBody = document.getElementById('cryptoTable').querySelector('tbody');
    tableBody.innerHTML = '';

    data.forEach(coin => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td><img src="${coin.image}" alt="${coin.name}" width="30"></td>
            <td>${coin.name}</td>
            <td>${coin.symbol.toUpperCase()}</td>
            <td>$${coin.current_price.toLocaleString()}</td>
            <td>${coin.total_volume.toLocaleString()}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = cryptoData.filter(coin => coin.name.toLowerCase().includes(searchTerm));
    renderTable(filteredData);
});

// Sort functionality
document.getElementById('sortMarketCap').addEventListener('click', () => {
    const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
});

document.getElementById('sortChange').addEventListener('click', () => {
    const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderTable(sortedData);
});

// Initial fetch
fetchDataWithAsync();
// Alternatively, use fetchDataWithThen();