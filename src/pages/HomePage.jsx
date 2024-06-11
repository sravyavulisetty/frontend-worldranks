import React,{useEffect, useState} from 'react'
import axios from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';
const HomePage = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);

      try {
        const response = await axios.get('https://restcountries.com/v3.1/all', {
          timeout: 10000,
        });
        setCountries(response.data);
        setFilteredCountries(response.data);
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedFilter, setSelectedFilter] = useState();
  const [selectedBtns, setSelectedBtns] = useState([]);


  const handleChange = (e) => {
    setSelectedCountry(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const foundCountry = countries.find((country) => country.name.common === selectedCountry);
    const foundRegion = countries.find((country) => country.region === selectedCountry);
    const foundSubRegion = countries.find((country) => country.subregion === selectedCountry);
    if(foundCountry){
      setFilteredCountries((countries.filter((country) => country.name.common === selectedCountry)))
    }
    else if(foundRegion){
      setFilteredCountries((countries.filter((country) => country.region === selectedCountry)))
    }
    else if(foundSubRegion){
      setFilteredCountries((countries.filter((country) => country.subregion === selectedCountry)))
    }
    else{
      alert("Not found");
    }
  }
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilter(e.target.value);
    if(value === 'population'){
      setFilteredCountries((filteredCountries.sort((a,b) => a.population - b.population)));
    }
    else if(value === 'area'){
      setFilteredCountries((filteredCountries.sort((a,b) => a.area - b.area)))
    }
    else if(value === 'name'){
      setFilteredCountries((filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common)))) ;
    }
  }

  const handleBtn = (value) => {
    if(!selectedBtns.includes(value)){
      setSelectedBtns((prev) => {
        const newSelectedBtns = [...prev, value];
        const filterCountries = (btn) => {
          return countries.filter((country) => country.region === btn);
        };
    
        const regionCountries = newSelectedBtns.flatMap((btn) => filterCountries(btn));
        setFilteredCountries(regionCountries);
        return newSelectedBtns;
      });
    }
    else if(selectedBtns.includes(value)){
      const unselected = selectedBtns.filter((btn) => btn !== value);
      setSelectedBtns(unselected);
      if(unselected.length===0){
        const filtered = [...countries];
        setFilteredCountries(filtered);
      }
      else{
        const filterCountries = (btn) => {
          return countries.filter((country) => country.region === btn);
        };
        const regionCountries = unselected.flatMap((btn) => filterCountries(btn));
        setFilteredCountries(regionCountries);
      } 
    } 
  };

  const handleCheckbox = (e) => {
    const {value, checked} = e.target;
    const originalData = [...filteredCountries];
    if(checked && value === 'independent'){
      const a = filteredCountries.filter((country) => country.independent === true)
      setFilteredCountries(a);
    }
    else if(checked && value === 'united nations'){
      const a = filteredCountries.filter((country) => country.independent === false)
      setFilteredCountries(a);
    }
    if(!checked && (value === 'independent' || 'united nations')){
        setFilteredCountries(originalData);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='page'>
    <div className='content'>
      <div className='home-header'>
        <h4>Found {filteredCountries.length} countries</h4>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Search by Name, Region, Subregion' className='searchinput' onChange={(e)=>handleChange(e)} style={{color: "#D2D5DA"}}></input>
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
                    <select name="sort-filters" id="sort-filters" value={selectedFilter} onChange={(e) => handleFilterChange(e)}>
                        <option value="population">Population</option>
                        <option value="area">Area</option>
                        <option value="name">Name</option>
                    </select>
                </div>
            </form>
          </div>
        <div className='filter-2'>
            <p>Region</p>
            <div className='options'>
                <div className='option1'>
                  <button className={selectedBtns.includes("Americas") ? "option-select" : "option"} onClick={(e)=>handleBtn('Americas',e)}>Americas</button>
                  <button className={selectedBtns.includes("Antarctic") ? "option-select" : "option"} onClick={(e)=>handleBtn('Antarctic',e)}>Antarctic</button>
                </div>
                <div className='option1'>
                  <button className={selectedBtns.includes("Africa") ? "option-select" : "option"} onClick={(e)=>handleBtn('Africa', e)}>Africa</button>
                  <button className={selectedBtns.includes("Asia") ? "option-select" : "option"} onClick={(e)=>handleBtn('Asia', e)}>Asia</button>
                  <button className={selectedBtns.includes("Europe") ? "option-select" : "option"} onClick={(e)=>handleBtn('Europe',e)}>Europe</button>
                </div>
                <div className='option1'>
                  <button className={selectedBtns.includes("Oceania") ? "option-select" : "option"} onClick={(e)=>handleBtn('Oceania',e)}>Oceania</button>
                </div>
            </div>
        </div>
        <div className='filter-3'>
            <p>Status</p>
            <div className='option1'>
              <input type="checkbox" id='united nations' value='united nations' onChange={(e) => handleCheckbox(e)}/>
              <label htmlFor='united nations'>Member of the United Nations</label>
            </div>
            <div className='option1'>
              <input type="checkbox" id='independent' value='independent' onChange={(e) => handleCheckbox(e)}/>
              <label htmlFor='independent'>Independent</label>
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
              {filteredCountries.map((country) => (
                <tr key={country.flag}>
                  <td style={{fontSize: '50px'}}><Link style={{textDecoration: 'none'}} to={`/${country.name.common}`}><img src={country.flags.svg} alt='flag' style={{width: '50px', height: "35px", borderRadius: '5px'}}></img></Link></td>
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
    </div>
  )
}

export default HomePage;
