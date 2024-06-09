import Search from "./components/Search";
import CountriesData from "./components/CountriesData";

import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const App = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState(null);
  const [visibilities, setVisibilities] = useState(null);

  useEffect(() => {
    if (country) {
      axios.get(baseUrl).then((response) => {
        const mappedData = response.data.map((element) => {
          return {
            name: element.name.common,
            capital: element.capital,
            flagLink: element.flags.png,
            population: element.population,
            region: element.region,
            subregion: element.subregion,
            languages: element.languages,
            timezones: element.timezones,
          };
        });

        const filteredCountries = mappedData.filter((data) =>
          data.name.toLowerCase().includes(country.toLowerCase())
        );

        const initialVisibilities = Object.assign(
          {},
          ...filteredCountries.map((element) => {
            return {
              [element.name]: false,
            };
          })
        );

        setCountries(filteredCountries);
        setVisibilities(initialVisibilities);
      });
    } else {
      setCountries(null);
    }
  }, [country]);

  const handleSearch = (event) => {
    setCountry(event.target.value);
  };

  const handleShow = (countryName) => {
    setVisibilities({
      ...visibilities,
      [countryName]: !visibilities[countryName],
    });
  };

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <CountriesData
        data={countries}
        visibilities={visibilities}
        handleShow={handleShow}
      />
    </div>
  );
};

export default App;
