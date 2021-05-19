let input = document.getElementById("input");
let search = document.getElementById("search");
let currentTemp = document.getElementById("currentTemp");
let currentCountry = document.getElementById("currentCountry");
let currentHumidity = document.getElementById("currentHumidity");
let currentPressure = document.getElementById("currentPressure");
let currentLat = document.getElementById("currentLat");
let currentLon = document.getElementById("currentLon");
let sunrise = document.getElementById("sunrise");
let sunset = document.getElementById("sunset");
let cloud = document.getElementById("cloud");
let uv = document.getElementById("uv");
let windSpeed = document.getElementById("windSpeed");
let windDirection = document.getElementById("windDirection");
let humidity_two = document.getElementById("humidity_two");
let dew_point_two = document.getElementById("dew_point_two");
let temp_two = document.getElementById("temp_two");
let pressure_two = document.getElementById("pressure_two");
let humidity_four = document.getElementById("humidity_four");
let dew_point_four = document.getElementById("dew_point_four");
let temp_four = document.getElementById("temp_four");
let pressure_four = document.getElementById("pressure_four");
let message_two = document.getElementById("message_two");
let message_one = document.getElementById("message_one");

search.addEventListener("click", () => {
  fetchData();
});

let fetchData = () => {
  let place = document.getElementById("input").value;
  url = `https://api.weatherapi.com/v1/forecast.json?key=875cfefd83744d318e471501211805&q=${place}&aqi=no&alerts=yes`;
  console.log(url);
  fetch(url)
    .then((resolve) => {
      if (resolve.ok) {
        return resolve.json();
      } else {
        swal("Oops", "Place not found!", "error");
        console.log(`Error: ${fault}`);
        initialzeAllToNile();
      }
    })
    .then((data) => {
      console.log(data);
      setData(data);
    })
    .catch((fault) => {
      swal("Error", "Place not found!", "error");
      console.log(`Error: ${fault}`);
      initialzeAllToNile();
    });
};

let initialzeAllToNile = () => {
  currentTemp.innerHTML = "-";
  currentCountry.innerHTML = "-";
  currentHumidity.innerHTML = "-";
  currentPressure.innerHTML = "-";
  currentLat.innerHTML = "-";
  currentLon.innerHTML = "-";
  sunrise.innerHTML = "-";
  sunset.innerHTML = "-";
  cloud.innerHTML = "-";
  uv.innerHTML = "-";
  windSpeed.innerHTML = "-";
  windDirection.innerHTML = "-";
  humidity_two.innerHTML = "-";
  dew_point_two.innerHTML = "-";
  temp_two.innerHTML = "-";
  pressure_two.innerHTML = "-";
  humidity_four.innerHTML = "-";
  dew_point_four.innerHTML = "-";
  temp_four.innerHTML = "-";
  pressure_four.innerHTML = "-";
  message_two.innerHTML = "-";
  message_one.innerHTML = "-";
};

let setData = (data) => {
  currentCountry.innerHTML = data.location.country;
  currentTemp.innerHTML = data.current.temp_c;
  currentHumidity.innerHTML = data.current.humidity;
  currentPressure.innerHTML = data.current.pressure_mb;
  currentLat.innerHTML = data.location.lat;
  currentLon.innerHTML = data.location.lon;
  sunrise.innerHTML = data.forecast.forecastday[0].astro.sunrise;
  sunset.innerHTML = data.forecast.forecastday[0].astro.sunset;
  cloud.innerHTML = data.current.cloud;
  uv.innerHTML = data.current.uv;
  windSpeed.innerHTML = data.current.wind_kph;
  let win_dir = data.current.wind_dir;
  switch (win_dir) {
    case "N":
      windDirection.innerHTML = "North";
      break;
    case "S":
      windDirection.innerHTML = "South";
      break;
    case "E":
      windDirection.innerHTML = "East";
    case "W":
      windDirection.innerHTML = "West";
      break;
  }
  let date = new Date();
  let hour = date.getHours();
  console.log(hour);
  let afterTwoHour = (hour + 2) % 24;
  let afterFourHour = (hour + 4) % 24;
  let afterTwoHourData = data.forecast.forecastday[0].hour[afterTwoHour];
  let afterFourHourData = data.forecast.forecastday[0].hour[afterFourHour];
  humidity_two.innerHTML = afterTwoHourData.humidity;
  dew_point_two.innerHTML = afterTwoHourData.dewpoint_c;
  temp_two.innerHTML = afterTwoHourData.temp_c;
  pressure_two.innerHTML = afterTwoHourData.pressure_mb;
  message_one.innerHTML = afterTwoHourData.condition.text;
  humidity_four.innerHTML = afterFourHourData.humidity;
  dew_point_four.innerHTML = afterFourHourData.dewpoint_c;
  temp_four.innerHTML = afterFourHourData.temp_c;
  pressure_four.innerHTML = afterFourHourData.pressure_mb;
  message_two.innerHTML = afterFourHourData.condition.text;
};
