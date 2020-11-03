$(document).ready(function(){


$("#date1").text(moment().format("(M/D/YYYY)"))

//Local Storage
local()

function local() {
    var li = $("<li>")
    li.addClass("list-group-item")
    li.text(localStorage.getItem("City"))
    $(".list-group").append(li)
}
//End Local Storage

$("li, #btn1").on("click", function(event){
    event.preventDefault()
if ($("#user-input").val() != "") {
    var city = $("#user-input").val()
    localStorage.setItem("City", $("#user-input").val())
    local()
} else {
var city = $(this).text()
}
$("#user-input").val("")
console.log(city)

//First Ajax call
var APIKey = "61ad5ebc9addcd46a81c7eab6b4c758b";
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    console.log(response)

    $("#city").text(response.city.name + "  " + moment().format("(M/D/YYYY)"))

    var kel = response.list[0].main.temp
    var far = (kel - 273.15) * 1.8 + 32
    $("#temp").text("Temperature: " + far.toFixed() + " degrees")
    $("#hum").text("Humidity: " + response.list[0].main.humidity + "%")
    $("#wind").text("Wind Speed: " + response.list[0].wind.speed)


    var iconcode = response.list[0].weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $("#icon").attr("src", iconurl);

//Second AJAX call
var lat = response.city.coord.lat;
var lon = response.city.coord.lon;
var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
$.ajax({
    url: queryURL2,
    method: "GET"
}).then(function(response) {

    console.log(response.value)

    $("#uv").text("UV Index: " + response.value)




})

    



})


})






})