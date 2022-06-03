const cityform = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
   
    // const cityDets = data.cityDets;
    // const weather = data.weather;

    //destructure properties
    const {cityDets, weather} = data;

    //update details template
    details.innerHTML = `
     <h5 class="my-3">${cityDets.EnglishName}</h5>
     <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update the night/day & icon img

    const iconsrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconsrc);

    let timesrc = null;
    if(weather.IsDayTime){
        timesrc = 'img/day.svg';
    }else{
        timesrc = 'img/night.svg';
    }
    time.setAttribute('src', timesrc);

    //remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets: cityDets,
        weather: weather
    };
}

cityform.addEventListener('submit', (e) => {
    
    //preventing default action like on submiting it doesn't refresh
    e.preventDefault();

    //get city value
    const city = cityform.city.value.trim();
    cityform.reset();

    //update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));


});