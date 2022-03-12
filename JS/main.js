//defining variables
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const date = new Date();
var weather;

//weather api response
async function getResponse(location) {
  var response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=dfc08c2d13cb46839ca225052220903&q=${location}&days=3&aqi=no&alerts=no`
  );
  weather = await response.json();
}

//search by city
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keyup", async function () {
  await getResponse(`${searchInput.value}`);
  await displayCurrentWeather();
  displayNextDayWeather();
});

//display Current Weather
function displayCurrentWeather() {
  document.getElementById("current-day").innerHTML = days[date.getDay()];
  document.getElementById("current-date").innerHTML = date.getDate() + "  " + months[date.getMonth()];
  document.getElementById("city").innerHTML = weather.location.name;
  document.getElementById("temp").innerHTML = weather.current.temp_c + "<sup>o</sup>C";
  document.getElementById("condition").innerHTML = weather.current.condition.text;
  document.getElementById("condition-icon").src = "https://" + weather.current.condition.icon;
  document.getElementById("condition-icon").style.width = "90px";
  document.getElementById("humidity").innerHTML = weather.current.humidity + " %";
  document.getElementById("wind-speed").innerHTML = weather.current.wind_kph + " Km/h";
  document.getElementById("wind_dir").innerHTML = weather.current.wind_dir;
}

//display next days weather
function displayNextDayWeather() {
  let nextDays = Array.from(document.getElementsByClassName("weather-next-day-card"));
  for (let i = 0; i < nextDays.length; i++) {
    if (days.length == date.getDay() + 1) {
      document.getElementsByClassName("next-day")[i].innerHTML = days[i];
    } else {
      document.getElementsByClassName("next-day")[i].innerHTML = days[date.getDay() + i + 1];
    }
    if (months.length == date.getMonth() + 1) {
      document.getElementsByClassName("next-date")[i].innerHTML = +date.getDate() + i + 1 + "  " + months[i];
    } else {
      document.getElementsByClassName("next-date")[i].innerHTML = +date.getDate() + i + 1 + "  " + months[date.getMonth() + i + 1];
    }
    document.getElementsByClassName("next-days-display")[i].src = "https://" + weather.forecast.forecastday[i + 1].day.condition.icon;
    document.getElementsByClassName("next-day-max-temp")[i].innerHTML = weather.forecast.forecastday[i + 1].day.maxtemp_c + "<sup>o</sup>C";
    document.getElementsByClassName("next-day-min-temp")[i].innerHTML = weather.forecast.forecastday[i + 1].day.mintemp_c + "<sup>o</sup>C";
    document.getElementsByClassName("condition")[i].innerHTML = weather.forecast.forecastday[i + 1].day.condition.text;
  }
}

//subscribe e-mail validator
(function validator() {
  const emailSubscribe = document.getElementById("email-subscribe");
  const subscribeBtn = document.getElementById("subscribe");
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  emailSubscribe.addEventListener("onkey", () => {
    if (regex.test(emailSubscribe.value) == false) {
      document.getElementsByClassName("invalid")[0].innerHTML = "Invalid Email Address!";
      document.getElementsByClassName("invalid")[0].classList.remove("d-none");
      subscribeBtn.classList.add("disabled");
    } else {
      document.getElementsByClassName("invalid")[0].classList.add("d-none");
      subscribeBtn.classList.remove("disabled");
      subscribeBtn.setAttribute("data-bs-toggle", "modal");
    }
  });
  subscribeBtn.removeAttribute("data-bs-toggle");
  subscribeBtn.addEventListener("click", () => {
    if (Boolean(emailSubscribe.value) == false) {
      document.getElementsByClassName("invalid")[0].innerHTML = "Please enter e-mail to subscribe";
      document.getElementsByClassName("invalid")[0].classList.remove("d-none");
    }
  });
  emailSubscribe.addEventListener("blur", function () {
    document.getElementsByClassName("invalid")[0].classList.add("d-none");
  });
})();

//calling functions with right order and default city
async function orderFunctions() {
  await getResponse("cairo");
  await displayCurrentWeather();
  displayNextDayWeather();
}
orderFunctions();
