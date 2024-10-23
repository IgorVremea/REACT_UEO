import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries]  = useState([]);
  
  useEffect(()=> {
     
      let unvisitedCountries = {};
      let visitedCountries = {};
      const response = fetch("https://restcountries.com/v3.1/independent?status=true&fields=name,area,population,region")
          .then(response => response.json())
          .then(data => setCountries(data));    
  }, []);

  const groupedCountries = countries.reduce((acc, country) =>  {
    if(!acc[country.region]){
      acc[country.region] = [];
    }
    acc[country.region].push(country);
    return acc;
  }, {});
  return (
    <div className="App">
      {Object.entries(groupedCountries).map(([region, countries]) => (
        <div key = {region}>
            <h2>{region}</h2>
            <span>
              {countries.map(country => (
                <div key = {country.name.common}>
                  <div>{country.name.common}</div>
                </div>
              ))}
            </span>
        </div>
      ))}
    </div>
  );
}

export default App;
