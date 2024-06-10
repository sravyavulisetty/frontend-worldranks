import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../App.css';

const CountryPage = () => {
  const { country } = useParams();
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [countries, setCountries] = useState([]);
  const getData = async() =>{
    await fetch(`https://restcountries.com/v3.1/name/${country.trim()}?fullText=true`)
    .then(response => response.json())
    .then(data => {
      setSelectedCountry(data[0]);
    })
    .catch(error => {
      console.log(error)
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
  },[country])

  const isNeigbouring = (value) => {
    const foundCountry = countries.find((country) => country.cca3 === value);
    if(foundCountry){
        return foundCountry;
    }
  }

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
            <div className='list'>{Object.entries(selectedCountry.languages)?.map(([key, value])=>(
                <p>{value}</p>
            ))}
            </div>
        </div>
        <div className='languages'>
            <p>Currencies</p>
            <p>{selectedCountry.currencies.INR.name}</p>
            {/* {<div className='list'>{Object.entries(selectedCountry?.currencies.INR).map(([key, value])=>(
                <p>{value}</p>
            ))}
            </div>}  */}
        </div>
        <div className='languages'>
            <p>Continents</p>
            <p>{selectedCountry.continents[0]}</p>
        </div>
        <div className='neighbouring'>
            <p>Neigbouring Countries</p>
            <div className='neigh-countries'>
                {selectedCountry.borders.map((border) => (
                    <img src={isNeigbouring(border)?.flags.svg} alt='flag' style={{width:"70px", height: "50px"}}></img>
                ))}
            </div>
        </div>
      </div> 
    </div>
  )
}
export default CountryPage;
