import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api/name";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${name}`);
        if (!ignore) {
          setCountry(response.data);
        }
      } catch (error) {
        if (!ignore) {
          setCountry({ error: true });
        }
      }
    };

    if (name !== "") fetchData();

    return () => {
      ignore = true;
    };
  }, [name]);

  return country;
};
