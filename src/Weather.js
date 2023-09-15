import React, { useState, useEffect } from 'react';
import './Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState('');
  const apiKey = '0d85c50a70ce03c477cf4080908f7ec1';

  useEffect(() => {
    if (city === '') return;

    const lowercaseCity = city.toLowerCase(); // Convert to lowercase
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${lowercaseCity}&appid=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, [city]);

  const handleCityChange = (e) => {
    const lowercaseCity = e.target.value.toLowerCase(); // Convert to lowercase
    setCity(lowercaseCity);
  };

  return (
    <div className="Weather">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        onChange={handleCityChange}
        value={city}
      />
      {weatherData.main && (
        <div className="WeatherDetails">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <div className="Temperature">{Math.round(weatherData.main.temp - 273.15)}°C</div>
          <p>{weatherData.weather[0].description}</p>
          <div className="WeatherIcons">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
