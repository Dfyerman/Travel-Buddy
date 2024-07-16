// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent form submission
    const cityName = document.getElementById('city-input').value; // Get the city name from the input field

    // Call a function to fetch weather data using the city name
    fetchWeatherData(cityName);
}

// Function to fetch weather data from OpenWeatherMap API
function fetchWeatherData(cityName) {
    // Make a request to a geocoding API to get the latitude and longitude for the city
    // Then, use the obtained coordinates to fetch weather data from the OpenWeatherMap API
    // Replace 'YOUR_API_KEY' with your actual API key
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=acff6742f55f0a303e23ffe66f339f4b&units=imperial`)
        .then(response => response.json())
        .then(data => {

            const weatherDataString = JSON.stringify(data);

            localStorage.setItem('weatherData', weatherDataString);

            console.log('Weather data saved to local storage', data);
            // Process the weather data and create cards for each city
            createWeatherCard(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// Function to create weather cards for 5 days with weather icons
function createWeatherCard(weatherData) {
    const viewsDiv = document.querySelector('.column.is-three-fifths.has-text-centered .content');

    // Loop through the weather data for the first 5 days
    for (let i = 0; i < 5; i++) {
        const cityWeather = weatherData.list[i];
        const card = document.createElement('div');
        card.classList.add('card');

        // Get the weather icon code and description
        const weatherIcon = cityWeather.weather[0].icon;
        const weatherDescription = cityWeather.weather[0].description;

        // Populate the card with weather information and icon
        card.innerHTML = `
            <div class="card-content">
                <p>City: ${weatherData.city.name} </p>
                <p>Date: ${cityWeather.dt_txt} </p>
                <p><p>Weather: ${weatherDescription}</p>
                <p><img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="${weatherDescription}"></p>
                <p>Temperature: ${cityWeather.main.temp} F</p>
                <p>Humidity: ${cityWeather.main.humidity}</p>
                <p>Wind Speed: ${cityWeather.wind.speed}</p>
            </div>
        `;

        viewsDiv.appendChild(card); // Append the card to the views section
    }
}












// Event listener for form submission
const form = document.getElementById('search-form');
form.addEventListener('submit', handleFormSubmit);