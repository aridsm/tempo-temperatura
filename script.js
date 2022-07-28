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
const loading = document.querySelector('.loading-container')
const dataContainer = document.querySelector('.city-container')
const fullDate = document.querySelector('.date')
const noResults = document.querySelector('.sem-results')

function searchForCity(city) {
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&units=metric&appid=${key}`
    getCityData(link)

}

function initLoading() {
    loading.style.display = 'block';
    dataContainer.style.display = 'none';
    noResults.style.display = 'none'
}

function getCityData(link) {
    initLoading()
    fetch(link)
        .then(response => response.json())
        .then(weather => {
            getWeatherData(weather);
            if (weather)
                dataContainer.style.display = 'block';
        })
        .catch(error => {
            noResults.style.display = 'block';
            console.log(error);
        })
        .finally(() => {
            loading.style.display = 'none';
        })
}

function fetchByCoords(lat, lon) {
    const link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&units=metric&appid=${key}`
    getCityData(link)
}

function getWeatherData(weather) {
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
    wind.textContent = `${weather.wind.speed}m/s - ${weather.wind.deg}° (${getDirection(weather.wind.deg)})`;

    getDate(weather.timezone)
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

function getDate(timezone) {

    const localTime = timezone / 3600;
    const d = new Date()
    const hours = d.getUTCHours();
    const minutes = d.getMinutes();
    const day = d.getUTCDate();
    const month = d.getUTCMonth();

    const utcDate = new Date('2022', month, day, hours, minutes, 0);
    const localDate = utcDate.setHours(utcDate.getHours() + localTime)
    const newDate = new Date(localDate)
    console.log(newDate)
    const weekName = getWeekName(newDate.getDay());
    const monthName = getMonthName(newDate.getMonth());
    const localDay = newDate.getDate();
    const localYear = newDate.getFullYear();
    const localHour = newDate.getHours();
    fullDate.innerText = `${weekName}, ${localDay} de ${monthName} de ${localYear}`;
    time.innerText = `${localHour}h:${minutes}min`
}

function getWeekName(weekDay) {
    switch (weekDay) {
        case 0:
            return 'Domingo';
        case 1:
            return 'Segunda-feira';
        case 2:
            return 'Terça-feira';
        case 3:
            return 'Quarta-feira';
        case 4:
            return 'Quinta-feira';
        case 5:
            return 'Sexta-feira';
        case 6:
            return 'Sabado';
    }
}
function getMonthName(month) {
    switch (month) {
        case 0:
            return 'Janeiro';
        case 1:
            return 'Fevereiro';
        case 2:
            return 'Março';
        case 3:
            return 'Abril';
        case 4:
            return 'Maio';
        case 5:
            return 'Junho';
        case 6:
            return 'Julho';
        case 7:
            return 'Agosto';
        case 8:
            return 'Setembro';
        case 9:
            return 'Outubro';
        case 10:
            return 'Novembro';
        case 11:
            return 'Dezembro';
    }
}

submitInput.addEventListener('click', (e) => {
    e.preventDefault()
    searchForCity(searchInput.value)
})

window.addEventListener('keypress', (e) => {
    if (e.key == "Enter") { searchForCity(searchInput.value) }
})

window.addEventListener('load', (e) => {
    navigator.geolocation.getCurrentPosition(getCoords, showError)

    function getCoords(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude
        fetchByCoords(lat, lon)
    }

    function showError(er) {
        alert(`Um erro ocorreu: ${er.message}`)
    }
})