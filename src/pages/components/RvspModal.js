import React, { useState } from 'react';
import './rvspModal.css';
import { translations, getLanguage } from '../../i18n';

export default function RvspModal({ open, close }) {
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState('');
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [comments, setComments] = useState('');
  const lang = getLanguage();
  const t = translations[lang];

  function handleChange(e) {
    e.preventDefault();
    setGuestName(e.target.value);
  }
  if (!open) return null;
  return (
    <div className='modalBackground'>
      <div>
        <div className='modalHeader'>
          <button onClick={close}>✕</button>
        </div>
        <h2>{t.rsvpTitle}</h2>
        <form action='https://formspree.io/f/mnjgynoy' method='POST'>
          <input
            type='text'
            name='name'
            placeholder={t.rsvpNamePlaceholder}
            onChange={handleChange}
            value={guestName}
            required
          />
          <div className='checkboxContainer'>
            <input
              type='checkbox'
              name='plusOne'
              id='plusOne'
              checked={hasPlusOne}
              onChange={(e) => setHasPlusOne(e.target.checked)}
            />
            <label htmlFor='plusOne'>{t.rsvpPlusOne}</label>
          </div>
          {hasPlusOne && (
            <input
              type='text'
              name='plusOneName'
              placeholder={t.rsvpPlusOnePlaceholder}
              value={plusOneName}
              onChange={(e) => setPlusOneName(e.target.value)}
            />
          )}
          <input
            type='email'
            name='email'
            placeholder={t.rsvpEmailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className='dietarySection'>
            <label className='dietaryLabel'>{t.rsvpDietaryPreferences}</label>
            <div className='checkboxContainer'>
              <input
                type='radio'
                name='dietaryPreference'
                id='vegetarian'
                value='vegetarian'
                checked={dietaryPreference === 'vegetarian'}
                onChange={(e) => setDietaryPreference(e.target.value)}
              />
              <label htmlFor='vegetarian'>{t.rsvpVegetarian}</label>
            </div>
            <div className='checkboxContainer'>
              <input
                type='radio'
                name='dietaryPreference'
                id='vegan'
                value='vegan'
                checked={dietaryPreference === 'vegan'}
                onChange={(e) => setDietaryPreference(e.target.value)}
              />
              <label htmlFor='vegan'>{t.rsvpVegan}</label>
            </div>
          </div>
          <textarea
            name='comments'
            placeholder={t.rsvpCommentsPlaceholder}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows='4'
          />
          <input type='submit' value={t.rsvpSubmit} onSubmit={close} />
        </form>
      </div>
    </div>
  );
}
