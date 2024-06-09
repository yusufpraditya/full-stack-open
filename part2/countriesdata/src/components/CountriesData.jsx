import { useEffect, useState } from "react";

import axios from "axios";

const WeatherData = ({ data }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  return (
    <div>
      <h2>Weather in {data.name}</h2>
      <img src={iconUrl} alt="weather-icon" />
      <p>Temperature: {data.main.temp} °C</p>
      <p>Wind: {data.wind.speed} m/s</p>
    </div>
  );
};

const CountryData = ({ data }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const capital = data.capital[0];

    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`;

    axios
      .get(baseUrl)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  const imgStyle = {
    width: "10%",
    height: "10%",
  };

  return (
    <div>
      <h2>{data.name}</h2>
      <img src={data.flagLink} alt={data.name} style={imgStyle} />
      <p>Population: {data.population}</p>
      <p>Region: {data.region}</p>
      <p>Subregion: {data.subregion}</p>
      <p>Capital: {data.capital[0]}</p>
      <p>Languages:</p>
      <ul>
        {Object.values(data.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <p>Timezones:</p>
      <ul>
        {Object.values(data.timezones).map((timezone) => (
          <li key={timezone}>{timezone}</li>
        ))}
      </ul>

      {weatherData && <WeatherData data={weatherData} />}
    </div>
  );
};

const CountriesData = ({ data, visibilities, handleShow }) => {
  if (!data || data.length === 0) return null;

  if (data.length > 10) {
    return (
      <div>
        Too many matches {`(${data.length} countries found)`}, specify another
        filter
      </div>
    );
  }

  if (data.length > 1 && data.length <= 10) {
    return (
      <ul>
        {data.map((countryData) => {
          return (
            <li key={countryData.name}>
              {countryData.name}{" "}
              <button onClick={() => handleShow(countryData.name)}>
                {visibilities[countryData.name] ? "hide" : "show"}
              </button>
              {visibilities[countryData.name] && (
                <CountryData data={countryData} />
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  const countryData = data[0];

  return <CountryData data={countryData} />;
};

export default CountriesData;
