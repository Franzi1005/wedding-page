import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Heidelberg from './pages/Heidelberg';
import ContactUs from './pages/ContactUs';
import './App.css';

function App() {
  return (
    <div>
      <nav className='flex'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/hotels'>Hotels</Link>
          </li>
          <li>
            <Link to='/heidelberg'>Heidelberg</Link>
          </li>
          <li>
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
