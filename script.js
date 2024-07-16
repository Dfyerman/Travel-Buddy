function handleFormSubmit(event) {
    event.preventDefault(); 
    const cityName = document.getElementById('city-input').value; 

    fetchWeatherData(cityName);
}

function fetchWeatherData(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=acff6742f55f0a303e23ffe66f339f4b&units=imperial`)
        .then(response => response.json())
        .then(data => {
            const weatherDataString = JSON.stringify(data);
            localStorage.setItem(`weatherData-${cityName}`, weatherDataString);
            console.log('Weather data saved to local storage', data);
            createWeatherCard(data);
            displaySavedSearches();
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function createWeatherCard(weatherData) {
    const viewsDiv = document.querySelector('.column.is-three-fifths.has-text-centered .content');
    
    // Clear existing weather cards
    viewsDiv.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        const cityWeather = weatherData.list[i];
        const card = document.createElement('div');
        card.classList.add('card');

        const weatherIcon = cityWeather.weather[0].icon;
        const weatherDescription = cityWeather.weather[0].description;

        card.innerHTML = `
            <div class="card-content">
                <p>City: ${weatherData.city.name} </p>
                <p>Date: ${cityWeather.dt_txt} </p>
                <p>Weather: ${weatherDescription}</p>
                <p><img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="${weatherDescription}"></p>
                <p>Temperature: ${cityWeather.main.temp} F</p>
                <p>Humidity: ${cityWeather.main.humidity}</p>
                <p>Wind Speed: ${cityWeather.wind.speed}</p>
            </div>
        `;

        viewsDiv.appendChild(card); 
    }
}

function displaySavedSearches() {
    const savedSearchesDiv = document.getElementById('saved-searches');
    savedSearchesDiv.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes('weatherData-')) {
            const cityName = key.replace('weatherData-', '');
            const savedSearchLink = document.createElement('a');
            savedSearchLink.href = '#';
            savedSearchLink.textContent = cityName;
            savedSearchLink.addEventListener('click', () => {
                const weatherData = JSON.parse(localStorage.getItem(key));
                createWeatherCard(weatherData);
            });
            savedSearchesDiv.appendChild(savedSearchLink);
        }
    }
}

// Event listener for form submission
const form = document.getElementById('search-form');
form.addEventListener('submit', handleFormSubmit);

// Display saved searches on page load
displaySavedSearches();

function createSavedSearchCard(cityName) {
    const savedSearchesDiv = document.getElementById('saved-searches');

    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <div class="card-content">
            <p>${cityName}</p>
            <button class="button is-primary load-weather-button" data-city="${cityName}">Load Weather</button>
        </div>
    `;

    savedSearchesDiv.appendChild(card);

    const loadWeatherButton = card.querySelector('.load-weather-button');
    loadWeatherButton.addEventListener('click', () => {
        const weatherData = JSON.parse(localStorage.getItem(`weatherData-${cityName}`));
        createWeatherCard(weatherData);
    });
}

function displaySavedSearches() {
    const savedSearchesDiv = document.getElementById('saved-searches');
    savedSearchesDiv.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes('weatherData-')) {
            const cityName = key.replace('weatherData-', '');
            createSavedSearchCard(cityName);
        }
    }
}

// Display saved searches on page load
