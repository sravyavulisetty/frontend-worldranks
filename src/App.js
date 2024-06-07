import logo from './Logo.svg';
import image from './hero-image-wr.jpg';
import './App.css';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={image} className="App-logo" alt="world" />
        <img src={logo} className='logo' alt='logo'></img>
      </header>
      <main className='main'>
        <div className='page'>
          <HomePage/>
        </div>
      </main>
    </div>
  );
}

export default App;
