import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [visitedCountries, setVisitedCountries] = useState([]);
  useEffect(() => {
    const response = fetch("https://restcountries.com/v3.1/independent?status=true&fields=name,area,population,region")
        .then(response => response.json())
        .then(data => setCountries(data));
  }, []);

  const groupedCountries = countries.reduce((acc, country) => {
    if (!acc[country.region]) {
      acc[country.region] = [];
    }
    acc[country.region].push(country);
    return acc;
  } , {});

  const onVisitedClick = (country) => {
    setVisitedCountries([...visitedCountries, country.name.common]);
  }
  const onRemove = (country) => {
    setVisitedCountries(visitedCountries.filter(c => c !== country));
  }
  return (
    <div className="App" style={{display: "flex"}}>
      <div>
      <h2>Unvisited Countries</h2>
      {Object.entries(groupedCountries).map(([region, countries]) => (
        <div key={region}>
          <h2>{region}</h2>
          <span>
            {countries.filter(country => !visitedCountries.includes(country.name.common)).map(country => (
              <div key={country.name.common}>
                <div>{country.name.common}</div>
                <button onClick={() => onVisitedClick(country)}>visited</button>
              </div>
            ))}
          </span>
        </div>
      ))}
      </div>
      <div>
        <h2>Visited Countries</h2>
        <span>
          {visitedCountries.map(country => (
            <div>
              <div key={country}>{country}</div>
              <button onClick={() => onRemove(country)}>unvisited</button>
            </div>
          ))}
        </span>
      </div>
    </div>
  );
}

export default App;