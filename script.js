// input value
let city = $("#city-name").val();
// api key 
const apiKey = "&appid=8163dffe92726c08e74d88ed012ec920";

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
})

const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey