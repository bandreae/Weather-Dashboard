var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=austin&appid=855d76da096afb4f6b03794b5572ca06'

fetch(apiUrl)
.then(function (response) {
    //Turn response to json format
      response.json()
.then(function (data) {
    //console.log the final data
        console.log(data);
        console.log(data.main.temp);
      });
  });