// <!-- AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly

// Acceptance Criteria

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast
// 1) Search for a city
// 2) Return current conditions
// 3) Return UV index with color coded rules
// 4) Return 5 day forcast
// 5) Save recent searches in local storage -->

console.log("hello world!");

var cityApi = document.querySelector("#search");
var btnSearch = document.querySelector("#btnsearch");
var currentDiv = document.querySelector("#current-weather-forecast")
var forecastDiv = document.querySelector("#forecast-container")
var pastCity = "";
var iconEl; 


function currentWeatherApi(event) {
  event.preventDefault();
  //console.log("currentWeatherApi function called")
  var cityValue = cityApi.value;
  //console.log(cityValue)
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityValue +
      "&units=imperial&appid=855d76da096afb4f6b03794b5572ca06"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var temperature = document.querySelector(".temperature");
      var humidity = document.querySelector(".humidity");
      var wind = document.querySelector(".wind");
      var cityName = document.querySelector(".city");
      var weatherIconEl = document.querySelector(".weathericon");
      var dateForToday = new Date(data.dt * 1000).toLocaleDateString("en-US");
      var lat = data.coord.lat;
      var lon = data.coord.lon;


      console.log(data);
      console.log(data.main.temp);

currentDiv.innerHTML =
  `
  <h3 id="city">
  <span id="current-city-forecast">
    </span><span id="current-date"></span><span id="weather-icon"></span>
</h3>

<div> Temperature: ${data.main.temp}</div>
<div id="humidity"></div>
<div id="wind"></div>
<div id="UVindex"></div>
`

      

      //weatherIconEl.src =
        //"https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
     // weatherIconEl.style = "width: 45px; height: 45px; display: inline-block;";
      //cityName.textContent = data.name + " " + dateForToday;

     // temperature.textContent = "Temperature: " + data.main.temperature + "°F";
     // humidity.textContent = "Humidity: " + data.main.humidity + "%";
      //wind.textContent = "Wind Speed: " + data.wind.speed + " MPH";

      localStorage.setItem("SearchedCity", cityApi.value);
    fiveDayForecast(data.coord.lat, data.coord.lon) 

    });
}

function fiveDayForecast(lat, lon) {
  fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,current,alerts&units=imperial&appid=855d76da096afb4f6b03794b5572ca06")
      .then(function (response) {
          console.log(response);
          return response.json();
      })
      .then(function (data) {
        console.log(data)
          for (i = 0; i < data.daily.length; i++) {
            console.log(data.daily[i])
              var imgIcon = document.createElement("img")
              var Icon = document.getElementById(i);

              var newDate = new Date(data.daily[i].dt*1000).toLocaleDateString("en-US");
              console.log(newDate);
              //Icon.textContent = newDate;

              imgIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png");
              imgIcon.style = "width: 45px; height: 45px; display: inline-block;"
              //Icon.append(imgIcon);

              var weatherDiv = document.createElement("div");
              weatherDiv.innerHTML = "Temp: " + data.daily[i].temp.day + "°F" + " " + "Humidity: " + data.daily[i].humidity + "%";

              forecastDiv.innerHTML = 
              `
              <div class="col-6 col-md-2 forecast">${new Date(data.daily[0].dt*1000).toLocaleDateString("en-US")}</div>
              
              <div class="col-6 col-md-2 forecast">${new Date(data.daily[1].dt*1000).toLocaleDateString("en-US")}</div>
              <div class="col-6 col-md-2 forecast">${new Date(data.daily[2].dt*1000).toLocaleDateString("en-US")}</div>
              <div class="col-6 col-md-2 forecast">${new Date(data.daily[3].dt*1000).toLocaleDateString("en-US")}</div>
              <div class="col-6 col-md-2 forecast">${new Date(data.daily[4].dt*1000).toLocaleDateString("en-US")}</div>
              `

              //Icon.append(weatherDiv);
          }
          //document.querySelector(".forecast").hidden = false;
          //document.querySelector(".card-group").hidden = false;
      });
}

btnSearch.addEventListener("click", currentWeatherApi )