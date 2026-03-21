import React from 'react';
import { translations, getLanguage } from '../i18n';
import '../styles/Gifts.css';

export default function Gifts() {
  const lang = getLanguage();
  const t = translations[lang];

  return (
    <div className='Gifts'>
      <h1>{t.giftsTitle}</h1>
      <p className='gifts-intro'>
        {t.giftsIntro}
      </p>

      <div className='gift-card'>
        <h3>{t.giftsCardTitle}</h3>
        <p>{t.giftsCardDescription}</p>
        <button>
          <a
            href='https://paypal.me/franziandchris'
            target='_blank'
            rel='noopener noreferrer'
          >
            {t.giftsButton}
          </a>
        </button>
      </div>

      <p className='gifts-footer'>
        {t.giftsFooter} <br />
        {t.giftsSignature}
      </p>
    </div>
  );
}
