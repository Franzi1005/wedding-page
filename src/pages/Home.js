import React, { useState } from 'react';
import RvspModal from './components/RvspModal';

export default function Home() {
  let [isOpen, setIsOpen] = useState(false);
  function openModal() {
    alert('whoop');
  }

  function sendRvsp() {
    alert('RVSP sent');
  }
  return (
    <div className='home'>
      <h1>We're getting married!</h1>
      <h2>12.09.2026, 6:00 pm</h2>
      <h3>📍Schilling Roofbar, Alte Glockengießerei 9, 69115 Heidelberg</h3>
      <p className='dressCode'>
        👗🥻👔👞👠 Dress Code: Cocktail / Semi-formal / Festive{' '}
      </p>
      <p>
        To allow everyone to fully relax and enjoy the celebration, we’ve chosen
        to make our wedding an adults-only event. Thank you so much for your
        understanding — we can’t wait to celebrate with you! 💕
      </p>
      <img src='./pictures/CuF.jpeg' />
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        RVSP
      </button>

      <RvspModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sendRvsp={sendRvsp}
      />
    </div>
  );
}
