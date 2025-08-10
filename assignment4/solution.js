async function getRandomNumber() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const num = Math.floor(Math.random() * 5) + 1;
            resolve(num);
        }, 500);
    });
}

async function getNationality(name) {
    const url = `https://api.nationalize.io/?name=${name}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.country[0]?.country_id || null;
}

async function fetchProducts(id) {
    try {
        const url = `https://dummyjson.com/products/${id}`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data.title;
    } catch (error) {
        return `Could not get products: Error: ${error.message}`;
    }
}

async function searchStorePrice(product_name) {
    try {
        const url = `https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const products = await res.json();
        const found = products.find(p => p.name.toLowerCase() === product_name.toLowerCase());
        return found ? found.price : null;
    } catch (error) {
        return `Could not get products ${error.message}`;
    }
}

async function getStarWarsCharacters() {
    const url = `https://swapi.dev/api/people/`;
    const res = await fetch(url);
    const data = await res.json();
    const characters = {};
    data.results.forEach(char => {
        characters[char.name] = char.url;
    });
    return { characters };
}

module.exports = {
    getRandomNumber,
    getNationality,
    fetchProducts,
    searchStorePrice,
    getStarWarsCharacters
};
