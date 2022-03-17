
const api_key = '541560ac0134f0a0d37af87de06af620';

const show = document.querySelector('main');
const form = document.getElementById('form');
const search = document.getElementById('search');




const api_url = (e) => `
    https://api.openweathermap.org/data/2.5/forecast?q=${e}&appid=${api_key}

    `;


async function getWeather(get) {

    const resp = await fetch(api_url(get));
    const respData = await resp.json();
    console.log(respData);
    showData(respData);
}


function showData(data) {
    show.innerHTML = '';
    const { feels_like, humidity, pressure, temp, temp_max, temp_min } = data.list[0].main;
    const { country, name, population } = data.city;
    const { main, description } = data.list[0].weather[0];
    //<img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png" alt="">


    const createEl = document.createElement('div');
    createEl.classList.add('weather');
    createEl.innerHTML = `

        <h3>Today's Weather </h3>
        <p class="clouds"> ${main}</p>
        <img id="img" src="https://api.openweathermap.org/img/w/${data.list[0].weather[0].icon}.png" alt="">
        <p id="mid"> ${KtoC(temp)}°C</p>
        <div class="flex">
            <p class="max ">Maximum:<span class="${maximum(KtoC(temp_max))}"> ${KtoC(temp_max)}</span>°C</p>
            <p class="min ">Minimum:<span class="${minimum(KtoC(temp_min))}"> ${KtoC(temp_min)} </span>°C</p>
        </div>
        <p id="name"> ${toAtm(pressure)} atm Pressure</p>
        <p id="name"> ${name}</p>
        <p id="country"> ${country}</p>
        `;

    show.appendChild(createEl);
}


function maximum(e) {

    if (e >= 20) {
        return 'orange'
    } else if (e >= 10) {
        return 'green'
    } else { return 'red' }

}


function minimum(e) {

    if (e >= 25) {
        return 'orange'
    } else if (e >= 10) {
        return 'green'
    } else { return 'red' }

}


function toAtm(A){
    return (A/760).toFixed(2);

}



function KtoC(K) {
    return (K - 273.15).toFixed(2);
}


form.addEventListener('submit', (e) => {
    e.preventDefault(e);


    const searchVal = search.value;
    console.log(searchVal);

    if (searchVal) {
        getWeather(searchVal);
        search.value = '';
    }

})
















