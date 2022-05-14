let key = 'your-api-key-goes-here';
let weatherplace = document.getElementById('weather');

function capitalize (s) {
    return s[0].toUpperCase() + s.slice(1);
}

async function check() {
    let city = document.getElementById('city').value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    let directions = document.querySelector('.directions');
    let request = await fetch(url).then(response => response.json()).then((response) => {
        
        let temperature = response.main['temp'];
        let temp_celsius = (-273.15 + temperature).toFixed(2);
        let feels = response.main['feels_like'];
        let feels_like = (-273.15 + feels).toFixed(2);
        let weather = response.weather[0].main;
        let country = response.sys.country;
        let windspeed = response.wind.speed;
        let wind_km = (3.6 * windspeed).toFixed();
        let winddegree = response.wind.deg;
        
        let city_capitalized = capitalize(city);
        let weather_sentence = `Weather in <span id='cityplace'>${city_capitalized}</span>,${country} is ${weather}. <br> There is ${temp_celsius}°C but it feels like ${feels_like}°C.<br>`;
        if(windspeed > 0) {
            weather_sentence += `The wind blows from ${winddegree}° at ${wind_km} km/h`;
            directions.style.display = "block";
        } else
            weather_sentence += 'There is no wind';
        weatherplace.innerHTML = weather_sentence;
        weatherplace.style.border = '1px black dotted';
        
        }).catch(err => weatherplace.innerHTML = "City not found<br>"+ err)
}