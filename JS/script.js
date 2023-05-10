'use strict'

const city = document.querySelector('.city')
const container = document.querySelector('.container')

const acces_KEY = `02dcc97f6cdbba0d0c3bde38364eaede`

//Convert timestamp 
function convertTime(timestamp){
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`
}
//Convert temp
function convertToCelsius(kelvin){
    let converter = kelvin - 273.15
    return converter.toFixed(1)
}


async function weather(set) {
    try{
  const rep = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${set}&appid=${acces_KEY}&lang=ro`);
  const data = await rep.json();
   const {name,main:{temp,humidity},sys:{country,sunrise,sunset},weather:[{main:sky}],wind:{speed}} = data;
   console.log(data);

  const htmlEl = `  
          <div class="weather-card">
           <h3 class="city-name">${name} -<span class="country">${country}</span></h3>
           <img class="weather-img" src="./images/${sky.toLowerCase()}.png" alt=" The sky is: ${sky}">
           <span class="temperature">${convertToCelsius(temp)}<sup>o</sup><span class="deg">C</span></span>
           <span class="sun">
            <span class="sun-rise">Sunrise: ${convertTime(sunrise)}</span> -
            <span class="sun-set">Sunset: ${convertTime(sunset)}</span>
           </span>

            <div class="weather">
                <div class="wind">
                    <img class="wind-humidity" src="./images/wind.png" title = 'Wind'  alt="Wind image">
                    <span class="wind-data">${speed} km/h</span>
                </div>
                <div class="humidity">
                    <img class="wind-humidity"  src="./images/humidity.png" title ='Humidity' alt="Humidity image">
                    <span class="humidity-data">${humidity}%</span>
                </div>
            </div>

        </div>`

        container.insertAdjacentHTML('beforeend',htmlEl);
    }catch(error){
        if (error instanceof TypeError && error.message.includes("404")){
            console.error('Server error');
        } else { alert('use diacritics or city does not exist')}
    }


}



city.addEventListener('keypress',function(e){
    const val = e.target.value
   if(e.key === 'Enter'){
     weather(val);
   }
   
})

