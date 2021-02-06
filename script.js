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

var CityApi = document.querySelector("#search");
var Btnsearch = document.querySelector("#btnsearch");
var pastCity = "";
var iconEl; 


function currentWeatherApi(event) {
  event.preventDefault();
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      CityApi.value +
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
      var dateForToday = new Date(data.dt * 1000).toLocaleDateString("en-US");
      var lat = data.coord.lat;
      var lon = data.coord.lon;


      console.log(data);
      console.log(data.main.temp);
      weatherIconEl.src =
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
      weatherIconEl.style = "width: 45px; height: 45px; display: inline-block;";
      cityName.textContent = data.name + " " + dateForToday;

      temperature.textContent = "Temperature: " + data.main.temperature + "°F";
      humidity.textContent = "Humidity: " + data.main.humidity + "%";
      wind.textContent = "Wind Speed: " + data.wind.speed + " MPH";

      localStorage.setItem("SearchedCity", CityApi.value);
    });
}

function fiveDayForecast(lat, lon) {
  fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,current,alerts&units=imperial&appid=73764a83501606e04b74a8e0281a654b")
      .then(function (response) {
          console.log(response);
          return response.json();
      })
      .then(function (data) {
          for (i = 1; i < 6; i++) {
              var imgIcon = document.createElement("img")
              var Icon = document.getElementById(i);

              var newDate = new Date(data.daily[i].dt*1000).toLocaleDateString("en-US");
              console.log(newDate);
              Icon.textContent = newDate;

              imgIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png");
              imgIcon.style = "width: 45px; height: 45px; display: inline-block;"
              Icon.append(imgIcon);

              var weatherDiv = document.createElement("div");
              weatherDiv.innerHTML = "Temp: " + data.daily[i].temp.day + "°F" + " " + "Humidity: " + data.daily[i].humidity + "%";
              Icon.append(weatherDiv);
          }
          document.querySelector(".forecast").hidden = false;
          document.querySelector(".card-group").hidden = false;
      });
}
