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
    storeSearch()
}

var storeSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

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

var show1Day = function(weather, findCity) {
    currentWeatherEl.textContent= "";
    currentSearchEl.textContent= findCity;

var todayDate = document.createElement("span");
todayDate.textContent = moment().format('L');
currentSearchEl.appendChild(todayDate);

var tempEl = document.createElement("span");
tempEl.textContent = "temp: " + weather.main.temp + "°F";
currentWeatherEl.appendChild(tempEl);

var humidEl = document.createElement("span");
humidEl.textContent = "humidity: " + weather.main.humidity + "%";
currentWeatherEl.appendChild(humidEl);

var windEl = document.createElement("span");
windEl.textContent = "speed: " + weather.wind.speed + " MPH";
currentWeatherEl.appendChild(windEl);
 
}

var show5Day = function(weather) {
    weekWeatherEl.textContent = "";
    weekHeaderEl.textContent = "5 Day Forecast: ";

    var forecast5 = weather.list;
    for( var r=5; r < forecast5.length; r=r+8) {
        var dailyForecast = forecast5[r];

        var forecast5El=document.createElement("div");

        var forecast5Date = document.createElement("h4");
        forecast5Date.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY");
        forecast5El.appendChild(forecast5Date);

        var forecast5tempEl = document.createElement("span");
        forecast5tempEl.textContent = dailyForecast.main.temp + "°F";
        forecast5El.appendChild(forecast5tempEl);
        
        var forecast5humidEl = document.createElement("span");
        forecast5humidEl.textContent = dailyForecast.main.humidity + "%";
        forecast5El.appendChild(forecast5humidEl);

        var forecast5windEl = document.createElement("span");
        forecast5windEl.textContent = dailyForecast.wind.speed + " MPH";
        forecast5El.appendChild(forecast5windEl);

        weekWeatherEl.appendChild(forecast5El);
    }
}

var findIndex = function(latitude, longitude) {
    latitude = weather.coord.lat;
    longitude = weather.coord.lon;
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

var displayIndex = function(index) {
    var uvEl = duocument.createElement("div");
    uvEl.textContent = "UV Index: ";

    uvAmount = document.createElement("span");
    uvAmount.textContent = index.value;
    uvEl.appendChild(uvAmount);

    currentWeatherEl.appendChild(uvEl);
}

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

formEl.addEventListener("submit", formSubmitHandler);