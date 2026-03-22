import React, { useState } from 'react';
import './rvspModal.css';
import { translations, getLanguage } from '../../i18n';

export default function RvspModal({ open, close }) {
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState('');
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [plusOneDietaryPreference, setPlusOneDietaryPreference] = useState('');
  const [comments, setComments] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lang = getLanguage();
  const t = translations[lang];

  function handleChange(e) {
    e.preventDefault();
    setGuestName(e.target.value);
    if (touched.guestName) {
      validateField('guestName', e.target.value);
    }
  }

  function validateField(fieldName, value) {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'guestName':
        if (!value.trim()) {
          newErrors.guestName = t.rsvpErrorName;
        } else {
          delete newErrors.guestName;
        }
        break;
      case 'email':
        if (!value.trim()) {
          newErrors.email = t.rsvpErrorEmailRequired;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = t.rsvpErrorEmailInvalid;
        } else {
          delete newErrors.email;
        }
        break;
      case 'plusOneName':
        if (hasPlusOne && !value.trim()) {
          newErrors.plusOneName = t.rsvpErrorPlusOne;
        } else {
          delete newErrors.plusOneName;
        }
        break;
      case 'dietaryPreference':
        if (!value) {
          newErrors.dietaryPreference = t.rsvpErrorDietary;
        } else {
          delete newErrors.dietaryPreference;
        }
        break;
      case 'plusOneDietaryPreference':
        if (hasPlusOne && !value) {
          newErrors.plusOneDietaryPreference = t.rsvpErrorDietary;
        } else {
          delete newErrors.plusOneDietaryPreference;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleBlur(fieldName) {
    setTouched({ ...touched, [fieldName]: true });
    let value;
    switch (fieldName) {
      case 'guestName':
        value = guestName;
        break;
      case 'email':
        value = email;
        break;
      case 'plusOneName':
        value = plusOneName;
        break;
      case 'dietaryPreference':
        value = dietaryPreference;
        break;
      case 'plusOneDietaryPreference':
        value = plusOneDietaryPreference;
        break;
      default:
        return;
    }
    validateField(fieldName, value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = {
      guestName: true,
      email: true,
      plusOneName: hasPlusOne,
      dietaryPreference: true,
      plusOneDietaryPreference: hasPlusOne,
    };
    setTouched(allTouched);

    // Validate all fields at once and collect all errors
    const newErrors = {};

    if (!guestName.trim()) {
      newErrors.guestName = t.rsvpErrorName;
    }

    if (!email.trim()) {
      newErrors.email = t.rsvpErrorEmailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t.rsvpErrorEmailInvalid;
    }

    if (hasPlusOne && !plusOneName.trim()) {
      newErrors.plusOneName = t.rsvpErrorPlusOne;
    }

    if (!dietaryPreference) {
      newErrors.dietaryPreference = t.rsvpErrorDietary;
    }

    if (hasPlusOne && !plusOneDietaryPreference) {
      newErrors.plusOneDietaryPreference = t.rsvpErrorDietary;
    }

    // Set all errors at once
    setErrors(newErrors);

    // Only submit if no errors
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Use FormData to submit properly
      const formData = new FormData(e.target);
      fetch('https://formspree.io/f/mnjgynoy', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          close();
        } else {
          setIsSubmitting(false);
        }
      }).catch(() => {
        setIsSubmitting(false);
      });
    }
  }
  if (!open) return null;
  return (
    <div className='modalBackground'>
      <div>
        <div className='modalHeader'>
          <button onClick={close}>✕</button>
        </div>
        <h2>{t.rsvpTitle}</h2>
        <form action='https://formspree.io/f/mnjgynoy' method='POST' onSubmit={handleSubmit} noValidate>
          <div className='formField'>
            <input
              type='text'
              name='name'
              placeholder={t.rsvpNamePlaceholder}
              onChange={handleChange}
              onBlur={() => handleBlur('guestName')}
              value={guestName}
              className={errors.guestName && touched.guestName ? 'error' : ''}
            />
            {errors.guestName && touched.guestName && (
              <span className='errorMessage'>{errors.guestName}</span>
            )}
          </div>
          <div className={`dietarySection ${errors.dietaryPreference && touched.dietaryPreference ? 'error' : ''}`}>
            <label className='dietaryLabel'>{t.rsvpDietaryPreferences}</label>
            <div className='checkboxContainer'>
              <input
                type='radio'
                name='dietaryPreference'
                id='none'
                value='none'
                checked={dietaryPreference === 'none'}
                onChange={(e) => {
                  setDietaryPreference(e.target.value);
                  if (touched.dietaryPreference) {
                    validateField('dietaryPreference', e.target.value);
                  }
                }}
              />
              <label htmlFor='none'>{t.rsvpNoDietaryRestrictions}</label>
            </div>
            <div className='checkboxContainer'>
              <input
                type='radio'
                name='dietaryPreference'
                id='vegetarian'
                value='vegetarian'
                checked={dietaryPreference === 'vegetarian'}
                onChange={(e) => {
                  setDietaryPreference(e.target.value);
                  if (touched.dietaryPreference) {
                    validateField('dietaryPreference', e.target.value);
                  }
                }}
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
                onChange={(e) => {
                  setDietaryPreference(e.target.value);
                  if (touched.dietaryPreference) {
                    validateField('dietaryPreference', e.target.value);
                  }
                }}
              />
              <label htmlFor='vegan'>{t.rsvpVegan}</label>
            </div>
            {errors.dietaryPreference && touched.dietaryPreference && (
              <span className='errorMessage'>{errors.dietaryPreference}</span>
            )}
          </div>
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
            <>
              <div className='formField'>
                <input
                  type='text'
                  name='plusOneName'
                  placeholder={t.rsvpPlusOnePlaceholder}
                  value={plusOneName}
                  onChange={(e) => {
                    setPlusOneName(e.target.value);
                    if (touched.plusOneName) {
                      validateField('plusOneName', e.target.value);
                    }
                  }}
                  onBlur={() => handleBlur('plusOneName')}
                  className={errors.plusOneName && touched.plusOneName ? 'error' : ''}
                />
                {errors.plusOneName && touched.plusOneName && (
                  <span className='errorMessage'>{errors.plusOneName}</span>
                )}
              </div>
              <div className={`dietarySection ${errors.plusOneDietaryPreference && touched.plusOneDietaryPreference ? 'error' : ''}`}>
                <label className='dietaryLabel'>{t.rsvpPlusOneDietary}</label>
                <div className='checkboxContainer'>
                  <input
                    type='radio'
                    name='plusOneDietaryPreference'
                    id='plusOneNone'
                    value='none'
                    checked={plusOneDietaryPreference === 'none'}
                    onChange={(e) => {
                      setPlusOneDietaryPreference(e.target.value);
                      if (touched.plusOneDietaryPreference) {
                        validateField('plusOneDietaryPreference', e.target.value);
                      }
                    }}
                  />
                  <label htmlFor='plusOneNone'>{t.rsvpNoDietaryRestrictions}</label>
                </div>
                <div className='checkboxContainer'>
                  <input
                    type='radio'
                    name='plusOneDietaryPreference'
                    id='plusOneVegetarian'
                    value='vegetarian'
                    checked={plusOneDietaryPreference === 'vegetarian'}
                    onChange={(e) => {
                      setPlusOneDietaryPreference(e.target.value);
                      if (touched.plusOneDietaryPreference) {
                        validateField('plusOneDietaryPreference', e.target.value);
                      }
                    }}
                  />
                  <label htmlFor='plusOneVegetarian'>{t.rsvpVegetarian}</label>
                </div>
                <div className='checkboxContainer'>
                  <input
                    type='radio'
                    name='plusOneDietaryPreference'
                    id='plusOneVegan'
                    value='vegan'
                    checked={plusOneDietaryPreference === 'vegan'}
                    onChange={(e) => {
                      setPlusOneDietaryPreference(e.target.value);
                      if (touched.plusOneDietaryPreference) {
                        validateField('plusOneDietaryPreference', e.target.value);
                      }
                    }}
                  />
                  <label htmlFor='plusOneVegan'>{t.rsvpVegan}</label>
                </div>
                {errors.plusOneDietaryPreference && touched.plusOneDietaryPreference && (
                  <span className='errorMessage'>{errors.plusOneDietaryPreference}</span>
                )}
              </div>
            </>
          )}
          <div className='formField'>
            <input
              type='email'
              name='email'
              placeholder={t.rsvpEmailPlaceholder}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched.email) {
                  validateField('email', e.target.value);
                }
              }}
              onBlur={() => handleBlur('email')}
              className={errors.email && touched.email ? 'error' : ''}
            />
            {errors.email && touched.email && (
              <span className='errorMessage'>{errors.email}</span>
            )}
          </div>
          <textarea
            name='comments'
            placeholder={t.rsvpCommentsPlaceholder}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows='4'
          />
          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? '...' : t.rsvpSubmit}
          </button>
        </form>
      </div>
    </div>
  );
}
