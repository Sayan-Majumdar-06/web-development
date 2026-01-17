document.addEventListener("DOMContentLoaded", () => {
    const cityName = document.querySelector("#city-name");
    const cityTemp = document.querySelector("#city-temp");
    const weather = document.querySelector("#weather");
    const maxTemp = document.querySelector("#max-temp");
    const minTemp = document.querySelector("#min-temp");

    const searchBar = document.querySelector("#search-input");
    const searchBtn = document.querySelector("#search-btn");

    async function fetchLocation(name) {
        cityName.textContent = "-";
        cityTemp.textContent = "-";
        weather.textContent = "-";
        maxTemp.textContent = "-";
        minTemp.textContent = "-";

        searchBtn.textContent = "Searching...";
        searchBtn.disabled = true;
        try{
            const locationUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&format=json`;
            const locationResponse = await fetch(locationUrl);

            if(!locationResponse.ok) {
                throw new Error("Couldn't fetch location data");
            }

            const locationData = await locationResponse.json();
            fetchWeather(locationData);
        }
        catch(e) {
            console.log(e);
            searchBtn.textContent = "Search";
            searchBtn.disabled = false;
        }
        
    }
    async function fetchWeather(locationData) {
        try{
            const latitude = locationData.results[0].latitude;
            const longitude = locationData.results[0].longitude;
            const city = locationData.results[0].name;
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&current=temperature_2m&timezone=auto&forecast_days=1&current=apparent_temperature`;
            const response = await fetch(url);

            if(!response.ok) {
                throw new Error("Couldn't fetch weather data");
            }

            const weatherData = await response.json();
            updateWeatherCard(city, weatherData);
        }
        catch(e) {
            console.log(e);
        }
        finally{
            searchBtn.textContent = "Search";
            searchBtn.disabled = false;
        }
    }

    function updateWeatherCard(city, data) {
        cityName.textContent = city;
        const tempUnits = data.current_units.temperature_2m;
        cityTemp.textContent = data.current.temperature_2m + tempUnits;
        weather.textContent = "Feels like " + data.current.apparent_temperature + tempUnits;
        maxTemp.textContent = data.daily.temperature_2m_max + tempUnits;
        minTemp.textContent = data.daily.temperature_2m_min + tempUnits;
    }

    searchBtn.addEventListener('click', () => {
        const name = searchBar.value;

        fetchLocation(name);
    })
})