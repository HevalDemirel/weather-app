document.addEventListener('DOMContentLoaded', function () {
    const searchCity = document.querySelector('#cityNameInput');
    const searchButton = document.querySelector('.search button');
    const weatherIcon = document.querySelector('.weahter-icon');
    const weatherTemperature = document.querySelector('.temp');
    const weatherCity = document.querySelector('.city');
    const humidityElement = document.querySelector('.humidity');
    const windElement = document.querySelector('.wind');

    searchButton.addEventListener('click', function () {
        const cityName = searchCity.value;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.hourly && Array.isArray(data.hourly) && data.hourly.length > 0) {
                    const temperature = data.hourly.temperature_2m[0].value;
                    const humidity = data.hourly.humidity[0].value;
                    const windSpeed = data.hourly.wind_speed_10m[0].value;

                    weatherTemperature.textContent = `${temperature}°C`;
                    weatherCity.textContent = cityName;
                    humidityElement.textContent = `${humidity}%`;
                    windElement.textContent = `${windSpeed} Km/h`;

                    if (temperature > 25) {
                        weatherIcon.src = "images/clear.png";
                    } else if (temperature > 15) {
                        weatherIcon.src = "images/clouds.png";
                    } else {
                        weatherIcon.src = "images/rain.png";
                    }
                } else {
                    console.error('Invalid data format received from API.');
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    });
});
