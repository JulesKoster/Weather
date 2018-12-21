// makes sure that https always has priority, if there is no HTTPS it will auto switch to http:

function fetchData (cityName) {
      fetch('//api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=6fdffba214c3c38f07ba3454f2b27f65&units=metric')
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          console.log(data);
          showData(data);
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

  function showData(data) { 
      console.log (data.name);
      console.log (data.main.temp);
      console.log (data.weather[0].description);
      console.log (data.wind.speed);
      document.getElementById("cityName").innerHTML = (data.name);
      document.getElementById("cityTemp").innerHTML = (data.main.temp).toFixed(0);
      document.getElementById("weatherCondition").innerHTML = (data.weather[0].main);
      document.getElementById("windSpeed").innerHTML = (data.wind.speed);
      document.getElementById("weatherIcon").innerHTML = (data.weather[0].icon);

      var iconCode = data.weather[0].icon;
      var iconUrl = "//openweathermap.org/img/w/" + iconCode + ".png";
      $('#weatherIcon').attr('src', iconUrl);
  };

  document.addEventListener("DOMContentLoaded", function() {
    fetchData("breda");

    $('#cityForm').on('submit', function (event) {
      event.preventDefault();

      var cityInput = $('#yourCity').val();

      fetchData(cityInput);

      fetchForecastData(cityInput); // 21.12 put forcast... here
          });
  });

 fetchForecastData("breda");

function fetchForecastData(cityName){
  fetch('//api.openweathermap.org/data/2.5/forecast?q='+cityName+'&appid=6fdffba214c3c38f07ba3454f2b27f65&units=metric')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      
      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data); 
        showForeCast(data);       
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}
  
  function showForeCast(data) { 
    console.log (data.list);
    // console.log (data.list[0]);
     var index = 0;
     var showDays = ["showDay1","showDay2", "showDay3","showDay4", "showDay5"];
     
     for(let i=7; i<40; i+=8){ //check 40 03 39 on diff cities // edit 21/12 9.36am needs to be 40 for last day
         

      // console.log("showDay index:" + index);
      // console.log("ForecastArray[40] index:" + i);
      // // console.log(data.list[8].dt);
      // console.log(epochToJsDate(data.list[i].dt));
      //   showWeather(i);
   
    document.getElementById("tempForecast"+i).innerHTML = (data.list[i].main.temp).toFixed(0);
    document.getElementById(showDays[index]).innerHTML = "";
    document.getElementById(showDays[index]).innerHTML += (epochToJsDate(data.list[i].dt));

    
    // document.getElementById("minTemp").innerHTML = (data.list[8].main.temp_min).toFixed(0);
    // document.getElementById("cityTemp").innerHTML = (data.main.temp);
    // document.getElementById("weatherCondition").innerHTML = (data.weather[0].main);
    // document.getElementById("windSpeed").innerHTML = (data.wind.speed);
    // document.getElementById("weatherIcon").innerHTML = (data.weather[0].icon);
      index++;
      
    }

    function showForecast(index){
      console.log(data.list[index]);
    }
}; 

  function epochToJsDate(ts){
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var utcSeconds = ts;
        var d = new Date(0); 
        d.setUTCSeconds(utcSeconds);
        var day = d.getDay();
        return days[day];        
   }

  // var dayIndex = 0;
  // var showDays = ["tempForecast1","tempForecast2", "tempForecast3","tempForecast4", "tempForecast5"];
  
  // Make sure sw are supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw_cached_site.js')
      .then(reg => console.log('Service Worker: Registered (Site)'))
      .catch(err => console.log(`Service Worker: Error: ${err}`));
  });
}




