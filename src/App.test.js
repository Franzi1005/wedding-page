import { render, screen } from '@testing-library/react';
import { translations, getLanguage } from './i18n';

// Mock navigator.language
const mockNavigatorLanguage = (lang) => {
  Object.defineProperty(window.navigator, 'language', {
    writable: true,
    configurable: true,
    value: lang,
  });
};

describe('App Navigation', () => {
  beforeEach(() => {
    mockNavigatorLanguage('en-US');
  });

  it('uses correct language detection', () => {
    mockNavigatorLanguage('en-US');
    expect(getLanguage()).toBe('en');
    expect(translations[getLanguage()].navHome).toBe('Home');
  });

  it('switches to German when language is German', () => {
    mockNavigatorLanguage('de-DE');
    expect(getLanguage()).toBe('de');
    expect(translations[getLanguage()].navHome).toBe('Start');
  });

  it('has all required navigation items in English', () => {
    const t = translations.en;
    expect(t.navHome).toBe('Home');
    expect(t.navHotels).toBe('Hotels');
    expect(t.navHeidelberg).toBe('Heidelberg');
    expect(t.navGifts).toBe('Gifts');
    expect(t.navContact).toBe('Contact Us');
  });

  it('has all required navigation items in German', () => {
    const t = translations.de;
    expect(t.navHome).toBe('Start');
    expect(t.navHotels).toBe('Hotels');
    expect(t.navHeidelberg).toBe('Heidelberg');
    expect(t.navGifts).toBe('Geschenke');
    expect(t.navContact).toBe('Kontakt');
  });
});
