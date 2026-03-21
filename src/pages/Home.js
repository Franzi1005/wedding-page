import React, { useState } from 'react';
import RvspModal from './components/RvspModal';
import { translations, getLanguage } from '../i18n';

export default function Home() {
  let [isOpen, setIsOpen] = useState(false);
  const lang = getLanguage();
  const t = translations[lang];

  return (
    <div className='home'>
      <h1>{t.homeTitle}</h1>
      <img src='./pictures/CuF.jpeg' alt='Christoph and Franzi' />
      <h2 className='wedding-date'>{t.homeDate}</h2>
      <h3>{t.homeLocation}</h3>
      <p className='dressCode'>{t.homeDressCode}</p>
      <p>{t.homeAdultsOnly}</p>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {t.rsvpButton}
      </button>

      <RvspModal open={isOpen} close={() => setIsOpen(false)} />
    </div>
  );
}
