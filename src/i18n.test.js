import { translations, getLanguage } from './i18n';

describe('i18n utilities', () => {
  const originalLanguage = window.navigator.language;

  afterEach(() => {
    Object.defineProperty(window.navigator, 'language', {
      writable: true,
      configurable: true,
      value: originalLanguage,
    });
  });

  describe('getLanguage', () => {
    it('returns "de" for German language codes', () => {
      Object.defineProperty(window.navigator, 'language', {
        writable: true,
        configurable: true,
        value: 'de-DE',
      });
      expect(getLanguage()).toBe('de');
    });

    it('returns "de" for Austrian German', () => {
      Object.defineProperty(window.navigator, 'language', {
        writable: true,
        configurable: true,
        value: 'de-AT',
      });
      expect(getLanguage()).toBe('de');
    });

    it('returns "de" for Swiss German', () => {
      Object.defineProperty(window.navigator, 'language', {
        writable: true,
        configurable: true,
        value: 'de-CH',
      });
      expect(getLanguage()).toBe('de');
    });

    it('returns "en" for English language codes', () => {
      Object.defineProperty(window.navigator, 'language', {
        writable: true,
        configurable: true,
        value: 'en-US',
      });
      expect(getLanguage()).toBe('en');
    });

    it('returns "en" for non-German languages', () => {
      Object.defineProperty(window.navigator, 'language', {
        writable: true,
        configurable: true,
        value: 'fr-FR',
      });
      expect(getLanguage()).toBe('en');
    });

    it('handles userLanguage fallback', () => {
      Object.defineProperty(window.navigator, 'language', {
        writable: true,
        configurable: true,
        value: undefined,
      });
      Object.defineProperty(window.navigator, 'userLanguage', {
        writable: true,
        configurable: true,
        value: 'de-DE',
      });
      expect(getLanguage()).toBe('de');
    });
  });

  describe('translations', () => {
    it('contains English translations', () => {
      expect(translations.en).toBeDefined();
      expect(translations.en.homeTitle).toBe("We're getting married!");
      expect(translations.en.rsvpButton).toBe('RSVP');
    });

    it('contains German translations', () => {
      expect(translations.de).toBeDefined();
      expect(translations.de.homeTitle).toBe('Wir heiraten!');
      expect(translations.de.rsvpButton).toBe('Zusagen');
    });

    it('has matching keys in both languages', () => {
      const enKeys = Object.keys(translations.en).sort();
      const deKeys = Object.keys(translations.de).sort();
      expect(enKeys).toEqual(deKeys);
    });

    it('has no empty translation values', () => {
      Object.values(translations.en).forEach((value) => {
        expect(value).toBeTruthy();
        expect(value.length).toBeGreaterThan(0);
      });

      Object.values(translations.de).forEach((value) => {
        expect(value).toBeTruthy();
        expect(value.length).toBeGreaterThan(0);
      });
    });
  });
});
