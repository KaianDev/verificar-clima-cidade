/* Functions
------------------------------- */
const c = el => document.querySelector(el); 

const renderWarning = (text) => {
    document.querySelector('.aviso').innerHTML = text;
}

const renderInfo = (data) => {
    renderWarning('');

    c('.titulo').innerHTML = `${data.name}, ${data.country}`;
    c('.tempInfo').innerHTML = `${data.temp} <sup>ºC</sup>`;
    c('.temp img').src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
    c('.temp img').alt = data.iconAlt;
    c('.ventoInfo').innerHTML = `${data.windSpeed} <span>km/h</span>`;
    c('.ventoPonto').style.transform = `rotate(${data.windDeg - 90}deg)`;

    c('.resultado').style.display = 'block';
}

const clearInfo = () => {
    renderWarning('');
    c('.resultado').style.display = 'none';
}

/* Events
------------------------------- */
document.querySelector('.busca').addEventListener('submit', async (event)=> {
    event.preventDefault();

    let input = document.querySelector('#searchInput');

    if(input.value != '') {
        clearInfo();
        renderWarning('Carregando...');

        let inputValue = input.value;
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(inputValue)}&appid=b63f570375ef3f971314293d60afb0a0&units=metric&lang=pt-br`;

        let req = await fetch(url);
        let data = await req.json();

        if (data.cod === 200) {        
            renderInfo({
                name: data.name,
                country: data.sys.country,
                temp: data.main.temp,
                windSpeed: data.wind.speed,
                windDeg: data.wind.deg,
                icon: data.weather[0].icon,
                iconAlt: data.weather[0].main
            });

        } else {
            renderWarning('Não encontramos essa localização');
        }

    } else {
        clearInfo();
    }

})