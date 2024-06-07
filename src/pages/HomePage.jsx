import React,{useEffect, useState} from 'react'
import '../App.css';
const HomePage = () => {
  useEffect(()=>{
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
      setCountries(data);
      console.log(countries)
    })
    .catch(error => {
      console.log(error)
    })
  },[])

  const [countries, setCountries] = useState([]);
  return (
    <div className='content'>
      <div className='home-header'>
        <h4>Found 2 countries</h4>
        <form>
            <input type='text' placeholder='Search by Name, Region, Subregion' className='searchinput'></input>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='search'>
                <circle cx="11" cy="11" r="7" stroke="#6C727F" strokeWidth="2"/>
                <path d="M20 20L17 17" stroke="#6C727F" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        </form>
      </div>
      <div className='home-page'>
        <div className='filter'>
          <div className='filter-1'>
            <p>Sort by</p>
            <form>
                <div className='select'>
                    <select name="sort-filters" id="sort-filters">
                        <option value="Population">Population</option>
                        <option value="Area">Area</option>
                        <option value="Name">Name</option>
                    </select>
                </div>
            </form>
          </div>
        <div className='filter-2'>
            <p>Region</p>
            <div className='options'>
                <div className='option1'>
                  <button className='option'>Americas</button>
                  <button className='option'>Antarctic</button>
                </div>
                <div className='option1'>
                  <button className='option'>Africa</button>
                  <button className='option'>Asia</button>
                  <button className='option'>Europe</button>
                </div>
                <div className='option1'><button className='option'>Oceania</button></div>
            </div>
        </div>
        <div className='filter-3'>
            <p>Status</p>
            <div className='option1'>
              <input type="checkbox"/>
              <label>Member of the United Nations</label>
            </div>
            <div className='option1'>
              <input type="checkbox"/>
              <label>Independent</label>
            </div>
        </div>
        </div>
        <div className='table'>
          <table>
            <thead>
              <tr>
                <th>Flag</th>
                <th>Name</th>
                <th>Population</th>
                <th>Area(km<sup>2</sup>)</th>
                <th>Region</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => (
                <tr key={country.flag}>
                  <td style={{fontSize: '40px'}}>{country.flag}</td>
                  <td>{country.name.common}</td>
                  <td>{country.population.toLocaleString()}</td>
                  <td>{country.area.toLocaleString()}</td>
                  <td>{country.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default HomePage;
