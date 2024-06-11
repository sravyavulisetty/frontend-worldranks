import logo from './Logo.svg';
import image from './hero-image-wr.jpg';
import './App.css';
import HomePage from './pages/HomePage';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import CountryPage from './pages/CountryPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={image} className="App-logo" alt="world" />
        <img src={logo} className='logo' alt='logo'></img>
      </header>
      <main className='main'>
          <Router>
          <Routes>
            <Route path='/' Component={HomePage}></Route>
            <Route path='/:country' Component={CountryPage}></Route>
          </Routes>
          </Router>
      </main>
    </div>
  );
}

export default App;
