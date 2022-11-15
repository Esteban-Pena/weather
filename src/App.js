import React, { useState } from 'react';
import './App.css';


function App() {
  const api = {
    key: "9d023af9959b7a236992e220f2822449",
    url: "https://api.openweathermap.org/data/2.5/"
  }
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const search = evt => {
    
    if (evt.key === 'Enter') {
      fetch(`${api.url}weather?q=${query}&appid=${api.key}&units=imperial`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result)}
        );
    }
  }

  const getTodaysDate = (d) => {

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
      ];
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ]
  
    var day = days[d.getDay()]; // Fetches the day of the week
    var date = d.getDate(); // Fetches the date i.e. 1st - 31st day of the month
    var month = months[d.getMonth()]; // Fetches the month
    var year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined")
    ? ((weather.main.temp > 16)
    ? 'app warm' :'app') :'app'}>
      <main>
        <input type="text" className="search-bar" placeholder="Enter your city"
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}>
        </input>
        {(typeof weather.main != "undefined") ? (
        <div>
        <div className="weather-container">
          <div className="weather">
        <div className="temp">{Math.round(weather.main.temp)}°F</div>
        <div className='fmm'>
        <div className="feel">Feels Like: {Math.round(weather.main.feels_like)}°F</div>
        <div className='mm'>Min: {Math.round(weather.main.temp_min)}°F / Max: {Math.round(weather.main.temp_max)}°F</div>
        </div>
            <div className="condition">{weather.weather[0].main}</div>
            <div className="city">{weather.name}, {weather.sys.country}</div>
          <br></br>
          <div className="date">{getTodaysDate(new Date())}</div>
          <br></br>
          <a href="/" id="new">Reset</a>
          <br></br>

          </div>

        </div>
        </div>
        ) :('')}
      </main>
    </div>
  );
}

export default App;