let results = [];

async function search() {
    const query = document.getElementById('query').value;
    
    if (!query) {
        alert('Please enter a search query');
        return;
    }

    const url = `http://localhost:3000/search?query=${query}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            alert('No results found for your query');
            return;
        }

        results = data.map(item => ({
            title: item.title,
            link: item.link,
            snippet: item.snippet
        }));

        displayResults(results);

    } catch (error) {
        console.error('Error fetching data:', error);
        alert(`An error occurred while searching: ${error.message}`);
    }
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found</p>';
    }

    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.classList.add('result-item');
        resultElement.innerHTML = `
            <h3><a href="${result.link}" target="_blank">${result.title}</a></h3>
            <p>${result.snippet}</p>
        `;
        resultsContainer.appendChild(resultElement);
    });

    document.getElementById('downloadButtons').style.display = 'block';
}

function downloadJSON() {
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'search_results.json';
    link.click();
}

function downloadCSV() {
    const csvRows = [];
    const headers = ['Title', 'Link', 'Snippet'];
    csvRows.push(headers.join('|'));

    results.forEach(result => {
        const row = [result.title, result.link, result.snippet];
        csvRows.push(row.join('|'));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'search_results.csv';
    link.click();
}
