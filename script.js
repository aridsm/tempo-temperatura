//Ao clicar no botão de BUSCAR, ou dar ENTER quando o input estiver focado, irá chamar uma função
//que irá realizar o fetch na API em questão com a busca pela CIDADE.
//Então, será chamada outra função com os resultados json desse fetch.
//Esta outra função irá pegar os valores do objeto json de cidade, país, condição (ex: nublado), temperatura real.
//temperatura percebida, temperatura mínima, temperatura máxima, vento, pressão atmosférica, umidade e visibilidade
//OBS: lembrar de fazer a conversão dos graus do vento em direção (ex:norte).
//Nessa mesma função irá ser chamada uma outra função que irá pegar os valores da data de hoje.
//Ao carregar a página, será chamada uma função que pegará a geolocalização do navegador
//e enviará os valores de longitude e latitude para outra função que realizará o fetch,
// porém a busca será feita por lon e lat.

const key = 'f666184363d7862c0c6e64eee175ff35'

const searchInput = document.querySelector('#search')
const submitInput = document.querySelector('#submit')
const city = document.querySelector('#city')
const sunnyCloudy = document.querySelector('.sunny-cloudy span')
const realTemperature = document.querySelector('.temp')
const feelLikeTemperature = document.querySelector('.feel-like-temp')
const minTemp = document.querySelector('.min-temp')
const maxTemp = document.querySelector('.max-temp')
const visibility = document.querySelector('.visibility-value')
const pressure = document.querySelector('.pressure-value')
const humidity = document.querySelector('.humidity-value')
const wind = document.querySelector('.wind-value')



function searchForCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&units=metric&appid=${key}`)
    .then(response => {return response.json()})
    .catch(error => console.log(error))
    .then(weather => getWeatherData(weather))
}

function getWeatherData(weather) {
    console.log(weather);
    city.textContent = `${weather.name} - ${weather.sys.country}`;
    sunnyCloudy.textContent = weather.weather[0].description;
    realTemperature.textContent = Math.floor(weather.main.temp);
    feelLikeTemperature.textContent = Math.floor(weather.main.feels_like) + 'ºC';
    minTemp.textContent = Math.floor(weather.main.temp_min) + 'ºC';
    maxTemp.textContent = Math.floor(weather.main.temp_max) + 'ºC';
    visibility.textContent = `${weather.visibility / 1000}km`;
    pressure.textContent = `${weather.main.pressure}hPa`;
    humidity.textContent = `${weather.main.humidity}%`;
    wind.textContent = weather.wind.speed + 'm/s';

}

submitInput.addEventListener('click', (e) => {
    e.preventDefault()
    searchForCity(searchInput.value)
})