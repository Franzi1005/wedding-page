import React from 'react';
import { translations, getLanguage } from '../i18n';
import '../styles/ContactUs.css';

export default function ContactUs() {
  const lang = getLanguage();
  const t = translations[lang];

  return (
    <div className='ContactUs'>
      <h1>{t.contactTitle}</h1>
      <p className='contact-subtitle'>{t.contactSubtitle}</p>
      <button>
        <a href='mailto:fschallhorn@gmail.com'>{t.contactButton}</a>
      </button>
      <p>{t.contactPromise}</p>
    </div>
  );
}
