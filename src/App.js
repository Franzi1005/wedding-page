import { Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Heidelberg from './pages/Heidelberg';
import Gifts from './pages/Gifts';
import ContactUs from './pages/ContactUs';
import { translations, getLanguage } from './i18n';
import './styles/App.css';
import 'leaflet/dist/leaflet.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const lang = getLanguage();
  const t = translations[lang];

  return (
    <div>
      <nav>
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label='Toggle menu'
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={menuOpen ? 'nav-open' : ''}>
          <li className='nav-item'>
            <Link to='/' onClick={() => setMenuOpen(false)}>{t.navHome}</Link>
          </li>
          <li className='nav-item'>
            <Link to='/hotels' onClick={() => setMenuOpen(false)}>{t.navHotels}</Link>
          </li>
          <li className='nav-item'>
            <Link to='/heidelberg' onClick={() => setMenuOpen(false)}>{t.navHeidelberg}</Link>
          </li>
          <li className='nav-item'>
            <Link to='/gifts' onClick={() => setMenuOpen(false)}>{t.navGifts}</Link>
          </li>
          <li className='nav-item'>
            <Link to='/contactus' onClick={() => setMenuOpen(false)}>{t.navContact}</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels' element={<Hotels />} />
        <Route path='/heidelberg' element={<Heidelberg />} />
        <Route path='/gifts' element={<Gifts />} />
        <Route path='/contactUs' element={<ContactUs />} />
      </Routes>
    </div>
  );
}

export default App;
