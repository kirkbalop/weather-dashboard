// input value
let city = $("#city-name").val();
// api key 
const apiKey = "&appid=8d813a224e07db0ccde3dc2768165f2a";
let cardRow = $(".card-row");

var date = new Date();

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

    getCurrentConditions(response);
    getCurrentForecast(response);
    createList();
})

});

function createList() {
    let listItem = $("<li>")
        .addClass("list-group-item").text(city);
    
        $(".list").append(listItem);
}

function getCurrentConditions(response) {
    // get temp, convert to F
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $("#current-city").empty();

    // Retrieve content and set
    const card = $("<div>")
        .addClass("card");
    const cardBody = $("<div>")
        .addClass("card-body");
    const city = $("<h4>")
        .addClass("card-title").text(response.name);
    const cityDate = $("<h4>")
        .addClass("card-title").text(date.toLocaleDateString("en-US"));
    const temperature = $("<p>")
        .addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    const humidity = $("<p>")
        .addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    const wind = $("<p>")
        .addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    const image = $("<img>")
        .attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

    // add to page
    city.append(cityDate, image);
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#current-city").append(card);
};

function getCurrentForecast() {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
        method: "GET"
    }).then(function(forecastResponse){

        console.log(forecastResponse)

//         for (var i = 5; i < 40; i+=8) {
//         var forecastResults = forecastResponse;
//         var forecastResultsDate = forecastResults.list[i].dt_txt;
//         var forecastDate = new Date(forecastResultsDate).toLocaleDateString("en-US");
//         var forecastTemp = forecastResults.list[i].main.temp;
//         var forecastHumidity = forecastResults.list[i].main.humidity;
//         var forecastIcon = forecastResults.list[i].weather[0].icon;

//         forecastObj["list"] = {};
//         forecastObj["list"]["date"] = forecastDate;
//         forecastObj["list"]["temp"] = forecastTemp;
//         forecastObj["list"]["humidity"] = forecastHumidity;
//         forecastObj["list"]["icon"] = forecastIcon;

//         forecastArray.push(forecastObj);
//         }

//         for (var j = 0; j < 5; j++) {
//             var forecastArrDate = forecastArr[j].list.date;
//             var forecastIconURL = getWeatherIcon + forecastArr[j].list.icon + ".png";
//             var forecastArrTemp = Math.floor(forecastArr[j].list.temp);
//             var forecastArrHumidity = forecastArr[j].list.humidity;
//         }

// // second attempt follows

        $("#forecast").empty();

        Date.prototype.addDays = function(days) {
            var dat = new Date(this.valueOf())
            dat.setDate(dat.getDate() + days);
            return dat;
        }

        function getDates(startDate, stopDate) {
            var dateArray = new Array();
            var currentDate = startDate;
            while (currentDate <= stopDate) {
                dateArray.push(currentDate)
                currentDate = currentDate.addDays(1);
            }
            return dateArray;
        }

        var dateArray = getDates(new Date(), new Date().addDays());
        for (i = 0; i <= dateArray.length; i ++) {
            let day = Date;
            let hour = dateArray[i].dt_txt.split('-')[2].split(' ')[1];
            console.log(day);
            console.log(hour);
        }

            if(results[i].dt_txt.indexOf("12:00:00") !== -1){

                // get temp and revert to F
                let temp = (dateArray[i].main.temp - 273.15) * 1.80 + 32;
                let tempF = Math.floor(temp);

                    const card = $("<div>")
                        .addClass("card col-md-2 ml-4 bg-primary text-white");
                    const cardBody = $("<div>")
                        .addClass("card-body p-3 forecastBody");
                    const cityDate = $("<h4>")
                        .addClass("card-title").text(date.toLocaleDateString("en-US"));
                    // temp and currentTemp used elsewhere
                    const temperature = $("<p>")
                        .addClass("card-text forecastTemp").text("Temperature: " + tempF + "°F");
                    const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

                    const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" +results[i].weather[0].icon + ".png");

                    // append to card, append card to forecast div
                    cardBody.append(cityDate, image, temperature, humidity);
                        card.append(cardBody);
                        $("#forecast").append(card);
            }
        }
    );
}