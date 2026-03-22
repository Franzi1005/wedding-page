import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RvspModal from './components/RvspModal';
import { translations, getLanguage } from '../i18n';

export default function Home() {
  let [isOpen, setIsOpen] = useState(false);
  const lang = getLanguage();
  const t = translations[lang];

  return (
    <div className='home'>
      <h1>{t.homeTitle}</h1>
      <img src='./pictures/CuF6.jpg' alt='Christoph and Franzi' />
      <div className='event-info'>
        <h2>{t.homeDate}</h2>
        <h3>{t.homeLocation}</h3>
        <p className='dressCode'>{t.homeDressCode}</p>
      </div>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {t.rsvpButton}
      </button>
      <p className='general-info'>
        {t.homeInfo}
        <b>{t.homeRsvpDate}</b>
        {t.homeUpdateUs}
        <Link to='/ContactUs'>
          {' '}
          <u>{t.homeViaEmail}</u>
        </Link>
        {t.homeCelebrate}
      </p>
      <RvspModal open={isOpen} close={() => setIsOpen(false)} />
    </div>
  );
}
