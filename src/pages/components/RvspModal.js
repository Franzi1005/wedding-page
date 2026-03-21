import React, { useState } from 'react';
import './rvspModal.css';

export default function RvspModal({ open, onClose, sendRvsp }) {
  const [guestName, setGuestName] = useState('');

  function handleChange(e) {
    e.preventDefault();
    setGuestName(e.target.value);
  }
  if (!open) return null;
  return (
    <div className='modalBackground'>
      <div className='modalHeader'>
        <button onClick={onClose}>X</button>
      </div>
      <form>
        <input
          placeholder='Please enter your name'
          onChange={handleChange}
        ></input>
        <input type='checkbox' name='plusOne'></input>
        <label for='plusOne'>I'm bringing a Plus One</label>
        <input type='submit' value='Send RVSP' onSubmit={sendRvsp} />
      </form>
    </div>
  );
}
