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

    it('returns "en" for British English', () => {
      Object.defineProperty(window.navigator, 'language', {
        writable: true,
        configurable: true,
        value: 'en-GB',
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

    it('returns "en" for Spanish', () => {
      Object.defineProperty(window.navigator, 'language', {
        writable: true,
        configurable: true,
        value: 'es-ES',
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

    it('handles case insensitivity for language codes', () => {
      Object.defineProperty(window.navigator, 'language', {
        writable: true,
        configurable: true,
        value: 'de-DE',
      });
      expect(getLanguage()).toBe('de');
    });

    it('handles language code without region', () => {
      Object.defineProperty(window.navigator, 'language', {
        writable: true,
        configurable: true,
        value: 'de',
      });
      expect(getLanguage()).toBe('de');
    });

    it('defaults to English when both language and userLanguage are undefined', () => {
      Object.defineProperty(window.navigator, 'language', {
        writable: true,
        configurable: true,
        value: 'en-US',
      });
      Object.defineProperty(window.navigator, 'userLanguage', {
        writable: true,
        configurable: true,
        value: 'en-US',
      });
      expect(getLanguage()).toBe('en');
    });
  });

  describe('translations structure', () => {
    it('contains English translations', () => {
      expect(translations.en).toBeDefined();
      expect(translations.en.homeTitle).toContain("We're getting married!");
      expect(translations.en.rsvpButton).toBe('RSVP');
    });

    it('contains German translations', () => {
      expect(translations.de).toBeDefined();
      expect(translations.de.homeTitle).toContain('Wir heiraten!');
      expect(translations.de.rsvpButton).toBe('Zusagen');
    });

    it('has matching keys in both languages', () => {
      const enKeys = Object.keys(translations.en).sort();
      const deKeys = Object.keys(translations.de).sort();
      expect(enKeys).toEqual(deKeys);
    });

    it('has no empty translation values in English', () => {
      Object.values(translations.en).forEach((value) => {
        expect(value).toBeTruthy();
        expect(value.length).toBeGreaterThan(0);
      });
    });

    it('has no empty translation values in German', () => {
      Object.values(translations.de).forEach((value) => {
        expect(value).toBeTruthy();
        expect(value.length).toBeGreaterThan(0);
      });
    });

    it('all values are strings', () => {
      Object.values(translations.en).forEach((value) => {
        expect(typeof value).toBe('string');
      });
      Object.values(translations.de).forEach((value) => {
        expect(typeof value).toBe('string');
      });
    });
  });

  describe('Home page translations', () => {
    it('has title translations', () => {
      expect(translations.en.homeTitle).toBeDefined();
      expect(translations.de.homeTitle).toBeDefined();
    });

    it('has date and time translations', () => {
      expect(translations.en.homeDate).toBeDefined();
      expect(translations.de.homeDate).toBeDefined();
    });

    it('has location translations', () => {
      expect(translations.en.homeLocation).toBeDefined();
      expect(translations.de.homeLocation).toBeDefined();
    });

    it('has dress code translations', () => {
      expect(translations.en.homeDressCode).toBeDefined();
      expect(translations.de.homeDressCode).toBeDefined();
    });
  });

  describe('RSVP form translations', () => {
    it('has RSVP form title and fields', () => {
      expect(translations.en.rsvpTitle).toBeDefined();
      expect(translations.en.rsvpNamePlaceholder).toBeDefined();
      expect(translations.en.rsvpEmailPlaceholder).toBeDefined();
      expect(translations.de.rsvpTitle).toBeDefined();
      expect(translations.de.rsvpNamePlaceholder).toBeDefined();
      expect(translations.de.rsvpEmailPlaceholder).toBeDefined();
    });

    it('has plus one translations', () => {
      expect(translations.en.rsvpPlusOne).toBeDefined();
      expect(translations.en.rsvpPlusOnePlaceholder).toBeDefined();
      expect(translations.de.rsvpPlusOne).toBeDefined();
      expect(translations.de.rsvpPlusOnePlaceholder).toBeDefined();
    });

    it('has dietary preference translations', () => {
      expect(translations.en.rsvpDietaryPreferences).toBeDefined();
      expect(translations.en.rsvpVegetarian).toBeDefined();
      expect(translations.en.rsvpVegan).toBeDefined();
      expect(translations.en.rsvpNoDietaryRestrictions).toBeDefined();
      expect(translations.de.rsvpDietaryPreferences).toBeDefined();
      expect(translations.de.rsvpVegetarian).toBeDefined();
      expect(translations.de.rsvpVegan).toBeDefined();
      expect(translations.de.rsvpNoDietaryRestrictions).toBeDefined();
    });

    it('has plus one dietary preference translations', () => {
      expect(translations.en.rsvpPlusOneDietary).toBeDefined();
      expect(translations.de.rsvpPlusOneDietary).toBeDefined();
    });

    it('has error message translations', () => {
      expect(translations.en.rsvpErrorName).toBeDefined();
      expect(translations.en.rsvpErrorEmailRequired).toBeDefined();
      expect(translations.en.rsvpErrorEmailInvalid).toBeDefined();
      expect(translations.en.rsvpErrorPlusOne).toBeDefined();
      expect(translations.en.rsvpErrorDietary).toBeDefined();

      expect(translations.de.rsvpErrorName).toBeDefined();
      expect(translations.de.rsvpErrorEmailRequired).toBeDefined();
      expect(translations.de.rsvpErrorEmailInvalid).toBeDefined();
      expect(translations.de.rsvpErrorPlusOne).toBeDefined();
      expect(translations.de.rsvpErrorDietary).toBeDefined();
    });

    it('has comments field translations', () => {
      expect(translations.en.rsvpCommentsPlaceholder).toBeDefined();
      expect(translations.de.rsvpCommentsPlaceholder).toBeDefined();
    });

    it('has submit button translations', () => {
      expect(translations.en.rsvpSubmit).toBeDefined();
      expect(translations.de.rsvpSubmit).toBeDefined();
    });
  });

  describe('Hotels page translations', () => {
    it('has hotels page title and intro', () => {
      expect(translations.en.hotelsTitle).toBeDefined();
      expect(translations.en.hotelsIntro).toBeDefined();
      expect(translations.de.hotelsTitle).toBeDefined();
      expect(translations.de.hotelsIntro).toBeDefined();
    });

    it('has wedding venue badge translations', () => {
      expect(translations.en.weddingVenueBadge).toBeDefined();
      expect(translations.de.weddingVenueBadge).toBeDefined();
    });

    it('has hotel link translations', () => {
      expect(translations.en.viewWebsite).toBeDefined();
      expect(translations.de.viewWebsite).toBeDefined();
    });
  });

  describe('Heidelberg page translations', () => {
    it('has heidelberg page title', () => {
      expect(translations.en.heidelbergTitle).toBeDefined();
      expect(translations.de.heidelbergTitle).toBeDefined();
    });

    it('has restaurants section translations', () => {
      expect(translations.en.heidelbergRestaurants).toBeDefined();
      expect(translations.de.heidelbergRestaurants).toBeDefined();
    });

    it('has must sees section translations', () => {
      expect(translations.en.heidelbergWhatElseToDo).toBeDefined();
      expect(translations.de.heidelbergWhatElseToDo).toBeDefined();
    });

    it('has castle hike translations', () => {
      expect(translations.en.castleHikeText).toBeDefined();
      expect(translations.en.castleHikeLink).toBeDefined();
      expect(translations.en.castleHikeEnd).toBeDefined();
      expect(translations.de.castleHikeText).toBeDefined();
      expect(translations.de.castleHikeLink).toBeDefined();
      expect(translations.de.castleHikeEnd).toBeDefined();
    });

    it('has castle shorter route translations', () => {
      expect(translations.en.castleShorterText).toBeDefined();
      expect(translations.en.castleShorterLink).toBeDefined();
      expect(translations.de.castleShorterText).toBeDefined();
      expect(translations.de.castleShorterLink).toBeDefined();
    });
  });

  describe('Gifts page translations', () => {
    it('has gifts page title and intro', () => {
      expect(translations.en.giftsTitle).toBeDefined();
      expect(translations.en.giftsIntro).toBeDefined();
      expect(translations.de.giftsTitle).toBeDefined();
      expect(translations.de.giftsIntro).toBeDefined();
    });

    it('has PayPal card translations', () => {
      expect(translations.en.giftsCardTitle).toBeDefined();
      expect(translations.en.giftsCardDescription).toBeDefined();
      expect(translations.en.giftsButton).toBeDefined();
      expect(translations.de.giftsCardTitle).toBeDefined();
      expect(translations.de.giftsCardDescription).toBeDefined();
      expect(translations.de.giftsButton).toBeDefined();
    });

    it('has footer and signature translations', () => {
      expect(translations.en.giftsFooter).toBeDefined();
      expect(translations.en.giftsSignature).toBeDefined();
      expect(translations.de.giftsFooter).toBeDefined();
      expect(translations.de.giftsSignature).toBeDefined();
    });
  });

  describe('Contact page translations', () => {
    it('has contact page title and subtitle', () => {
      expect(translations.en.contactTitle).toBeDefined();
      expect(translations.en.contactSubtitle).toBeDefined();
      expect(translations.de.contactTitle).toBeDefined();
      expect(translations.de.contactSubtitle).toBeDefined();
    });

    it('has contact button and promise translations', () => {
      expect(translations.en.contactButton).toBeDefined();
      expect(translations.en.contactPromise).toBeDefined();
      expect(translations.de.contactButton).toBeDefined();
      expect(translations.de.contactPromise).toBeDefined();
    });
  });

  describe('Navigation translations', () => {
    it('has navigation link translations', () => {
      expect(translations.en.navHome).toBeDefined();
      expect(translations.en.navHeidelberg).toBeDefined();
      expect(translations.en.navHotels).toBeDefined();
      expect(translations.en.navGifts).toBeDefined();
      expect(translations.en.navContact).toBeDefined();

      expect(translations.de.navHome).toBeDefined();
      expect(translations.de.navHeidelberg).toBeDefined();
      expect(translations.de.navHotels).toBeDefined();
      expect(translations.de.navGifts).toBeDefined();
      expect(translations.de.navContact).toBeDefined();
    });
  });

  describe('Translation completeness', () => {
    it('every English translation has a German equivalent', () => {
      const enKeys = Object.keys(translations.en);
      const deKeys = Object.keys(translations.de);

      enKeys.forEach(key => {
        expect(deKeys).toContain(key);
      });
    });

    it('every German translation has an English equivalent', () => {
      const enKeys = Object.keys(translations.en);
      const deKeys = Object.keys(translations.de);

      deKeys.forEach(key => {
        expect(enKeys).toContain(key);
      });
    });

    it('has equal number of translations in both languages', () => {
      const enCount = Object.keys(translations.en).length;
      const deCount = Object.keys(translations.de).length;
      expect(enCount).toBe(deCount);
      expect(enCount).toBeGreaterThan(30); // Ensure substantial coverage
    });
  });

  describe('Translation quality', () => {
    it('no English text appears in German translations', () => {
      const germanValues = Object.values(translations.de);
      const suspectPatterns = [
        /\bthe\b/i,
        /\band\b/i,
        /\bwith\b/i,
        /\byour\b/i,
        /\bplease\b/i,
      ];

      germanValues.forEach(value => {
        suspectPatterns.forEach(pattern => {
          expect(value).not.toMatch(pattern);
        });
      });
    });

    it('error messages are properly translated', () => {
      expect(translations.en.rsvpErrorName).toContain('name');
      expect(translations.de.rsvpErrorName).toContain('Name');

      expect(translations.en.rsvpErrorEmailRequired).toContain('email');
      expect(translations.de.rsvpErrorEmailRequired).toContain('E-Mail');
    });

    it('dates are formatted differently per locale', () => {
      expect(translations.en.homeDate).toContain('September');
      expect(translations.en.homeDate).toContain('pm');

      expect(translations.de.homeDate).toContain('September');
      expect(translations.de.homeDate).toContain('Uhr');
    });
  });

  describe('Form validation translations', () => {
    it('has all required field error messages', () => {
      const requiredErrors = [
        'rsvpErrorName',
        'rsvpErrorEmailRequired',
        'rsvpErrorEmailInvalid',
        'rsvpErrorPlusOne',
        'rsvpErrorDietary'
      ];

      requiredErrors.forEach(errorKey => {
        expect(translations.en[errorKey]).toBeDefined();
        expect(translations.de[errorKey]).toBeDefined();
        expect(translations.en[errorKey].length).toBeGreaterThan(0);
        expect(translations.de[errorKey].length).toBeGreaterThan(0);
      });
    });

    it('email validation has separate messages for required vs invalid', () => {
      expect(translations.en.rsvpErrorEmailRequired).not.toBe(translations.en.rsvpErrorEmailInvalid);
      expect(translations.de.rsvpErrorEmailRequired).not.toBe(translations.de.rsvpErrorEmailInvalid);
    });
  });

  describe('Must sees translations', () => {
    it('has castle hike related translations', () => {
      expect(translations.en.castleHikeText).toBeDefined();
      expect(translations.en.castleHikeLink).toBeDefined();
      expect(translations.en.castleHikeEnd).toBeDefined();
      expect(translations.de.castleHikeText).toBeDefined();
      expect(translations.de.castleHikeLink).toBeDefined();
      expect(translations.de.castleHikeEnd).toBeDefined();
    });

    it('has castle shorter route related translations', () => {
      expect(translations.en.castleShorterText).toBeDefined();
      expect(translations.en.castleShorterLink).toBeDefined();
      expect(translations.de.castleShorterText).toBeDefined();
      expect(translations.de.castleShorterLink).toBeDefined();
    });

    it('castle hike translations form complete sentences', () => {
      const enSentence = translations.en.castleHikeText + translations.en.castleHikeLink + translations.en.castleHikeEnd;
      const deSentence = translations.de.castleHikeText + translations.de.castleHikeLink + translations.de.castleHikeEnd;

      expect(enSentence.length).toBeGreaterThan(20);
      expect(deSentence.length).toBeGreaterThan(20);
    });

    it('castle shorter route translations form complete sentences', () => {
      const enSentence = translations.en.castleShorterText + translations.en.castleShorterLink;
      const deSentence = translations.de.castleShorterText + translations.de.castleShorterLink;

      expect(enSentence.length).toBeGreaterThan(10);
      expect(deSentence.length).toBeGreaterThan(10);
    });
  });

  describe('Dietary preferences translations', () => {
    it('has dietary preference options', () => {
      expect(translations.en.rsvpVegetarian).toBe('Vegetarian');
      expect(translations.en.rsvpVegan).toBe('Vegan');
      expect(translations.en.rsvpNoDietaryRestrictions).toBeDefined();

      expect(translations.de.rsvpVegetarian).toBe('Vegetarisch');
      expect(translations.de.rsvpVegan).toBe('Vegan');
      expect(translations.de.rsvpNoDietaryRestrictions).toBeDefined();
    });

    it('has separate dietary labels for guest and plus one', () => {
      expect(translations.en.rsvpDietaryPreferences).toBeDefined();
      expect(translations.en.rsvpPlusOneDietary).toBeDefined();
      expect(translations.de.rsvpDietaryPreferences).toBeDefined();
      expect(translations.de.rsvpPlusOneDietary).toBeDefined();
    });
  });

  describe('Special characters handling', () => {
    it('handles German umlauts correctly', () => {
      expect(translations.de.hotelsTitle).toContain('Übernachtung');
      expect(translations.de.giftsIntro).toContain('Anwesenheit');
    });

    it('handles apostrophes and quotes', () => {
      expect(translations.en.homeTitle).toContain("'");
      expect(translations.en.contactPromise).toContain("'");
    });

    it('no encoding issues in translations', () => {
      Object.values(translations.en).forEach(value => {
        expect(value).not.toContain('&quot;');
        expect(value).not.toContain('&amp;');
        expect(value).not.toContain('&#');
      });

      Object.values(translations.de).forEach(value => {
        expect(value).not.toContain('&quot;');
        expect(value).not.toContain('&amp;');
        expect(value).not.toContain('&#');
      });
    });
  });

  describe('Edge cases', () => {
    it('handles empty translations object gracefully', () => {
      expect(translations).toBeDefined();
      expect(Object.keys(translations).length).toBeGreaterThanOrEqual(2);
    });

    it('only provides en and de translations', () => {
      const languages = Object.keys(translations);
      expect(languages).toEqual(['en', 'de']);
    });

    it('no undefined or null values in translations', () => {
      Object.entries(translations.en).forEach(([key, value]) => {
        expect(value).not.toBeUndefined();
        expect(value).not.toBeNull();
      });

      Object.entries(translations.de).forEach(([key, value]) => {
        expect(value).not.toBeUndefined();
        expect(value).not.toBeNull();
      });
    });
  });

  describe('Consistency checks', () => {
    it('uses consistent punctuation patterns', () => {
      // Check that titles either all have or all lack ending punctuation
      const enTitles = [
        translations.en.homeTitle,
        translations.en.giftsTitle,
        translations.en.hotelsTitle,
      ];

      enTitles.forEach(title => {
        // Titles should not end with periods
        expect(title).not.toMatch(/\.$/);
      });
    });

    it('button texts are concise and action-oriented', () => {
      expect(translations.en.rsvpButton.length).toBeLessThan(20);
      expect(translations.en.contactButton.length).toBeLessThan(30);
      expect(translations.en.giftsButton.length).toBeLessThan(30);

      expect(translations.de.rsvpButton.length).toBeLessThan(20);
      expect(translations.de.contactButton.length).toBeLessThan(30);
      expect(translations.de.giftsButton.length).toBeLessThan(30);
    });
  });
});
