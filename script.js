var formEl = document.querySelector("#search-form");
var inputEl = document.querySelector("#city-input");
var currentWeatherEl = document.querySelector("#current-container");
var currentSearchEl = document.querySelector("#current-city");
var weekHeaderEl = document.querySelector("#forecast");
var weekWeatherEl = document.querySelector("#week-container");
var pastSearchEl = document.querySelector("#search-list");
var cities = [];

var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = inputEl.value.trim();
    if(city) {
        find1Day(city);
        find5Day(city);
        inputEl.value = "";
    }
    else {
        alert("Must Enter City!!!")
    }
    storeSearch();
}

var storeSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

/* forecast for the day */

var find1Day = function(city) {
    var key = "12d7582393a5faca0979f0f3d2c1fc1a";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        show1Day(data, city);
    })
}

var show1Day = function(weather, city) {
    currentWeatherEl.textContent= "";
    currentSearchEl.textContent= city;

var todayDate = document.createElement("span");
todayDate.textContent = moment().format('ll');
todayDate.classList="card-header text-center";
currentSearchEl.appendChild(todayDate);

var tempEl = document.createElement("span");
tempEl.textContent = "temp: " + weather.main.temp + " K";
tempEl.classList="card-body text-left";
currentWeatherEl.appendChild(tempEl);

var humidEl = document.createElement("span");
humidEl.textContent = "humidity: " + weather.main.humidity + " %";
humidEl.classList="card-body text-left";
currentWeatherEl.appendChild(humidEl);

var windEl = document.createElement("span");
windEl.textContent = "speed: " + weather.wind.speed + " MPH";
windEl.classList="card-body text-left";
currentWeatherEl.appendChild(windEl);

}

/* uv index */

var findIndex = function(city) {
    var lat = response.data.coord.lat;
    var lon = response.data.coord.lon;
    var key = "12d7582393a5faca0979f0f3d2c1fc1a";
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + key;

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        showIndex(data, city);
    })
}

var showIndex = function(city) {
    var uvIndex = document.createElement("span");
    uvIndex.textContent = "UV Index: " + response.data.value;
    uvIndex.classList="card-body text-left";
    currentWeatherEl.appendChild(city);
}

/* forecast for the week */

var find5Day = function(city) {
    var key = "12d7582393a5faca0979f0f3d2c1fc1a";
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key;

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        show5Day(data, city);
    })
}

var show5Day = function(weather) {
    weekWeatherEl.textContent = "";
    weekHeaderEl.textContent = "5 Day Forecast: ";

    var forecast5 = weather.list;
    for( var r=5; r < forecast5.length; r=r+8) {
        var dailyForecast = forecast5[r];

        var forecast5El=document.createElement("div");
        forecast5El.classList = "card m-4";

        var forecast5Date = document.createElement("h4");
        forecast5Date.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY");
        forecast5Date.classList="card-header text-center";
        forecast5El.appendChild(forecast5Date);

        var forecast5tempEl = document.createElement("span");
        forecast5tempEl.textContent = dailyForecast.main.temp + " K";
        forecast5tempEl.classList="card-body text-center";
        forecast5El.appendChild(forecast5tempEl);
        
        var forecast5humidEl = document.createElement("span");
        forecast5humidEl.textContent = dailyForecast.main.humidity + " %";
        forecast5humidEl.classList="card-body text-center";
        forecast5El.appendChild(forecast5humidEl);

        var forecast5windEl = document.createElement("span");
        forecast5windEl.textContent = dailyForecast.wind.speed + " MPH";
        forecast5windEl.classList="card-body text-center";
        forecast5El.appendChild(forecast5windEl);

        weekWeatherEl.appendChild(forecast5El);
    }
}

formEl.addEventListener("submit", formSubmitHandler);