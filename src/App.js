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
  return (
    <div className="App">
      {countries.map(country => (
        <div>
            {country.name.common}
        </div>
      ))}
    </div>
  );
}

export default App;
