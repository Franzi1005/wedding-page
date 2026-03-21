import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Heidelberg from './pages/Heidelberg';
import ContactUs from './pages/ContactUs';
import './styles/App.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li className='nav-item'>
            <Link to='/'>Home</Link>
          </li>
          <li className='nav-item'>
            <Link to='/hotels'>Hotels</Link>
          </li>
          <li className='nav-item'>
            <Link to='/heidelberg'>Heidelberg</Link>
          </li>
          <li className='nav-item'>
            <Link to='/contactus'>Contact Us</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels' element={<Hotels />} />
        <Route path='/heidelberg' element={<Heidelberg />} />
        <Route path='/contactUs' element={<ContactUs />} />
      </Routes>
    </div>
  );
}

export default App;
