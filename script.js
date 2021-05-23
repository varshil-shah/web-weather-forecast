let search = document.getElementById("search");
let loading = document.getElementById("loading");

search.addEventListener("click", async () => {
  try {
    let data = await fetchData();
    setData(data);
  } catch (error) {
    swal("Oops", "Place not found !", "error");
    setTimeout(() => {
      location.reload();
    }, 3000);
    console.log(`Error: ${error}`);
  }
});

async function fetchData() {
  let place = document.getElementById("input").value;
  displayLoading();
  url = `https://api.weatherapi.com/v1/forecast.json?key=875cfefd83744d318e471501211805&q=${place}&aqi=no&alerts=yes`;
  const response = await fetch(url);
  const data = response.json();
  hideLoading();
  return data;
}

let displayLoading = () => {
  loading.classList.add("display");

  setTimeout(() => {
    loading.classList.remove("display");
  }, 5000);
};

let hideLoading = () => {
  loading.classList.remove("display");
};

let setData = (data) => {
  document.getElementById("currentCountry").textContent = data.location.country;
  document.getElementById("currentTemp").textContent = data.current.temp_c;
  document.getElementById("currentHumidity").textContent =
    data.current.humidity;
  document.getElementById("currentLat").textContent = data.location.lat;
  document.getElementById("currentLon").textContent = data.location.lon;
  document.getElementById("sunrise").textContent =
    data.forecast.forecastday[0].astro.sunrise;
  document.getElementById("sunset").textContent =
    data.forecast.forecastday[0].astro.sunset;
  document.getElementById("cloud").textContent = data.current.cloud;
  document.getElementById("uv").textContent = data.current.uv;
  document.getElementById("windSpeed").textContent = data.current.wind_kph;
  let win_dir = data.current.wind_dir;
  switch (win_dir) {
    case "N":
      document.getElementById("windDirection").textContent = "North";
      break;
    case "S":
      document.getElementById("windDirection").textContent = "South";
      break;
    case "E":
      document.getElementById("windDirection").textContent = "East";
    case "W":
      document.getElementById("windDirection").textContent = "West";
      break;
  }
  let date = new Date();
  let hour = date.getHours();
  let afterTwoHour = (hour + 2) % 24;
  let afterFourHour = (hour + 4) % 24;
  let afterTwoHourData = data.forecast.forecastday[0].hour[afterTwoHour];
  let afterFourHourData = data.forecast.forecastday[0].hour[afterFourHour];
  document.getElementById("humidity_two").textContent =
    afterTwoHourData.humidity;
  document.getElementById("dew_point_two").textContent =
    afterTwoHourData.dewpoint_c;
  document.getElementById("temp_two").textContent = afterTwoHourData.temp_c;
  document.getElementById("pressure_two").textContent =
    afterTwoHourData.pressure_mb;
  document.getElementById("message_one").textContent =
    afterTwoHourData.condition.text;
  document.getElementById("humidity_four").textContent =
    afterFourHourData.humidity;
  document.getElementById("dew_point_four").textContent =
    afterFourHourData.dewpoint_c;
  document.getElementById("temp_four").textContent = afterFourHourData.temp_c;
  document.getElementById("pressure_four").textContent =
    afterFourHourData.pressure_mb;
  document.getElementById("message_two").textContent =
    afterFourHourData.condition.text;
};
