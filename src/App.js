import logo from './Logo.svg';
import image from './hero-image-wr.jpg';
import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CountryPage from './pages/CountryPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={image} className="App-logo" alt="world" />
        <img src={logo} className='logo' alt='logo'></img>
      </header>
      <main className='main'>
          <BrowserRouter>
          <Routes>
            <Route path='/' Component={HomePage}></Route>
            <Route path='/:country' Component={CountryPage}></Route>
          </Routes>
          </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
