const key = 'f666184363d7862c0c6e64eee175ff35'

const searchInput = document.querySelector('#search')
const submitInput = document.querySelector('#submit')
const city = document.querySelector('#city')
const sunnyCloudy = document.querySelector('.sunny-cloudy span')
const icon = document.querySelector('.sunny-cloudy img')
const realTemperature = document.querySelector('.temp')
const feelLikeTemperature = document.querySelector('.feel-like-temp')
const minTemp = document.querySelector('.min-temp')
const maxTemp = document.querySelector('.max-temp')
const visibility = document.querySelector('.visibility-value')
const pressure = document.querySelector('.pressure-value')
const humidity = document.querySelector('.humidity-value')
const wind = document.querySelector('.wind-value')
const time = document.querySelector('.hour')


function searchForCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&units=metric&appid=${key}`)
    .then(response => {return response.json()})
    .catch(error => console.log(error))
    .then(weather => getWeatherData(weather))
}

function fetchByCoords(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&units=metric&appid=${key}`)
    .then(response => {return response.json()})
    .catch(error => console.log(error))
    .then(weather => getWeatherData(weather))
}

function getWeatherData(weather) {
    console.log(weather)
    city.textContent = `${weather.name} - ${weather.sys.country}`;
    sunnyCloudy.textContent = weather.weather[0].description;
    icon.setAttribute('src', `img/${weather.weather[0].icon}.svg`)

    realTemperature.textContent = Math.floor(weather.main.temp);
    feelLikeTemperature.textContent = Math.floor(weather.main.feels_like) + '°C';
    minTemp.textContent = Math.floor(weather.main.temp_min) + '°C';
    maxTemp.textContent = Math.floor(weather.main.temp_max) + '°C';

    visibility.textContent = `${weather.visibility / 1000}km`;
    pressure.textContent = `${weather.main.pressure}hPa`;
    humidity.textContent = `${weather.main.humidity}%`;
    wind.textContent =`${weather.wind.speed}m/s - ${weather.wind.deg}° (${getDirection(weather.wind.deg)})`;

    time.textContent = setLocalTime(weather.timezone)

}

function getDirection(deg) {
    if ((deg >= 0 && deg < 22.5) || (deg >= 337.5 && deg <= 360)) {
        return 'Norte'
    } else if (deg >= 292.5 && deg < 337.5) {
        return 'Noroeste'
    } else if (deg >= 247.5 && deg < 292.5) {
        return 'Oeste'
    } else if (deg >= 202.5 && deg < 247.5) {
        return 'Sudoeste'
    } else if (deg >= 157.5 && deg < 202.5) {
        return 'Sul'
    } else if (deg >= 112.5 && deg < 157.5) {
        return 'Sudeste'
    } else if (deg >= 67.5 && deg < 112.5) {
        return 'Leste'
    } else if (deg >= 22.5 && deg < 67.5) {
        return 'Nordeste'
    }
}


function setLocalTime(timezone) {
    const localTime = timezone / 3600
    const d = new Date()
    let UTC = d.getUTCHours()
    let minutes = d.getMinutes()

    let hour = UTC + localTime
    if (hour > 23) {
       hour -= 24
    } else if (hour < 0) {
       hour += 24
    }

    return `${hour.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`
}


submitInput.addEventListener('click', (e) => {
    e.preventDefault()
    searchForCity(searchInput.value)
})
window.addEventListener('keypress', (e) => {
    if (e.key == "Enter") searchForCity(searchInput.value)
})

window.addEventListener('load', (e) =>{
    navigator.geolocation.getCurrentPosition(getCoords, showError)

    function getCoords(position) {
        console.log(position)
        let lat = position.coords.latitude;
        let lon = position.coords.longitude
        fetchByCoords(lat, lon)
    }

    function showError(er) {
        alert(`Um erro ocorreu: ${er.message}`)
    }
})