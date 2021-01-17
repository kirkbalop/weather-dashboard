var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-name");
var weatherContainerEl = document.querySelector("#weather-container");
var citySearchTerm = document.querySelector("#city-search-term");

var formSubmitHandler = function(event) {
    event.preventDefault();
    
    var cityName = cityInputEl.value.trim();


    if (cityName) {
    getCityWeather(cityName);

    weatherContainerEl.textContent = "";
    cityInputEl.value = "";
    } else {
        alert("Please enter a valid city name");
    }
};

getCityWeather = function (city)