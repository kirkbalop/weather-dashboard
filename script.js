// input value
let city = $("#city-name").val();
// api key 
const apiKey = "&appid=8d813a224e07db0ccde3dc2768165f2a";

let date = new Date();

$("#city-name").keypress(function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchBtn").click();
    }
});

$("#searchBtn").on("click", function() {
    $("#5day-h4")
        .removeClass("hide-forecast")
        .addClass("show-forecast");

    city = $("#city-name").val();

    // clear input
    $("#city-name").val("");

const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey

// https://www.w3schools.com/jquery/jquery_ajax_get_post.asp
// ajax documentation for future reference
$.ajax({
    url: queryUrl,
    method: "GET"
})
.then(function(response) {
    console.log(response)

    console.log(response.name)
    console.log(response.weather[0].icon)

    // convert to farenheit
    let tempF = (response.main.temp - 273.15) *1.80 +32;
    console.log(Math.floor(tempF))

    console.log(response.main.humidity)

    console.log(response.wind.speed)
})

});

function getCurrentForecast() {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey,
        method: "GET"
    }).then(function(response){

        console.log(response)
    })
}