import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../App.css';

const CountryPage = () => {
  const { country } = useParams();
  const [selectedCountry, setSelectedCountry] = useState();
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const getData = () =>{
    fetch(`https://restcountries.com/v3.1/name/${country.trim()}?fullText=true`)
    .then(response => response.json())
    .then(data => {
      setSelectedCountry(data[0]);
      setLoading(false);
    })
    .catch(error => {
      console.log(error)
      setLoading(false);
    })
  }

  useEffect(()=>{
    getData();
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        setCountries(data)
    })
    .catch(error => {
        console.log(error)
    })
  },[selectedCountry])

  const isNeighbouring = (value) => {
    const foundCountry = countries.find((country) => country.cca3 === value);
    if(foundCountry){
        return foundCountry;
    }
  }
  if (loading) return <div style={{marginTop: '-400px'}}>Loading...</div>;

  return (
    <div className='country-page'>
    <img src={selectedCountry.flags?.svg} alt='flag' className='country-flag' sizes=''></img>
      <div className='country-name'>
        <h1 style={{marginTop: "200px"}}>{selectedCountry.name?.common}</h1>
        <h4>{selectedCountry.name?.official}</h4>
      </div>
      <div className='population-area'>
        <div className='population'>
            <p>Population</p>
            <p>|</p>
            <p>{selectedCountry.population?.toLocaleString()}</p>
        </div>
        <div className='area'>
            <p>Area(km<sup>2</sup>)</p>
            <p>|</p>
            <p>{selectedCountry.population?.toLocaleString()}</p>
        </div>
      </div>
      <div className='others'>
        <div className='capital'>
            <p>Capital</p>
            <p>{selectedCountry.capital?.[0]}</p>
        </div>
        <div className='sub-reg'>
            <p>Sub Region</p>
            <p>{selectedCountry.subregion}</p>
        </div>
        <div className='languages'>
            <p>Language</p>
            <div className='list'>
            {selectedCountry.languages && Object.entries(selectedCountry.languages).slice(0,5).map(([key, value], idx) => (
              <p key={key}>{idx!==0 ? ',' + value : '' + value}</p>
            ))}
          </div>
        </div>
        <div className='languages'>
            <p>Currencies</p>
            <div className='list'>
            {Object.entries(selectedCountry.currencies).map(([key, value], idx) => (
                <p>{idx!==0 ? ',' + value.name : '' + value.name}</p>
            ))}
            </div>
        </div>
        <div className='languages'>
            <p>Continents</p>
            <p>{selectedCountry.continents[0]}</p>
        </div>
        <div className='neighbouring'>
            <p>Neigbouring Countries</p>
            <div className='neigh-countries'>
            {selectedCountry.borders? selectedCountry.borders.map((border) => {
              const neighbour = isNeighbouring(border);
              return neighbour ? (
                <div className='neigh-list'>
                    <img key={border} src={neighbour.flags.svg} alt={`${neighbour.name.common} flag`} style={{ width: "70px", height: "50px" }} />
                    <p>{neighbour.name.common}</p>
                </div>
              ) : null;
            }) : <p style={{fontSize: "10px", marginTop: "-10px"}}>No neighbouring countries</p>}
          </div>
        </div>
      </div> 
    </div>
  )
}
export default CountryPage;
