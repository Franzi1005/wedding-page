export const translations = {
  en: {
    // Home page
    homeTitle: "We're getting married!",
    homeDate: "12.09.2026, 6:00 pm",
    homeLocation: "📍Schilling Roofbar, Alte Glockengießerei 9, 69115 Heidelberg",
    homeDressCode: "👗🥻👔👞👠 Dress Code: Cocktail / Semi-formal / Festive",
    homeAdultsOnly: "To allow everyone to fully relax and enjoy the celebration, we've chosen to make our wedding an adults-only event. Thank you so much for your understanding — we can't wait to celebrate with you! 💕",
    rsvpButton: "RSVP",

    // Navigation
    navHome: "Home",
    navHotels: "Hotels",
    navHeidelberg: "Heidelberg",
    navGifts: "Gifts",
    navContact: "Contact Us",

    // Hotels page
    hotelsTitle: "Where to Stay",
    hotelsIntro: "We've selected some wonderful hotels near the venue for your convenience. All are within walking distance or a short ride to the celebration.",
    weddingVenueBadge: "💒 Wedding Venue",
    viewWebsite: "View Website →",

    // Heidelberg page
    heidelbergTitle: "Welcome to Heidelberg",
    heidelbergIntro: "Heidelberg has been our chosen home for the last few years and it's also the place we met and fell in love❣️",
    heidelbergDescription: "With it's beautiful castle ruins and charming little old town it's definitely a romantic place.",
    heidelbergCall: "In case you're coming from afar and have a few days to spend here, below you can find a selection of ToDos and some of our favourite places to go, eat and drink!🍽️🍹",
    heidelbergClosing: "We hope you'll enjoy your time here!",
    heidelbergSignature: "Love, Christoph & Franzi",
    heidelbergRestaurants: "Best Bars and Restaurants in Heidelberg",

    // Gifts page
    giftsTitle: "Wedding Gifts",
    giftsIntro: "Your presence at our wedding is the greatest gift of all! However, if you wish to honor us with a gift, we would be grateful for a contribution towards our future together.",
    giftsCardTitle: "Send a Gift via PayPal",
    giftsCardDescription: "You can send your gift securely through PayPal using the button below:",
    giftsButton: "Send Gift via PayPal",
    giftsFooter: "Thank you for your kindness and generosity! We can't wait to celebrate with you.",
    giftsSignature: "Love, Christoph & Franzi",

    // Contact page
    contactTitle: "Got questions?",
    contactSubtitle: "We're here to help with any questions you might have!",
    contactButton: "Please get in touch!",
    contactPromise: "We promise we'll get back to you as quickly as possible",

    // RSVP Modal
    rsvpTitle: "RSVP",
    rsvpNamePlaceholder: "Please enter your name",
    rsvpEmailPlaceholder: "Email address",
    rsvpPlusOne: "I'm bringing a Plus One",
    rsvpPlusOnePlaceholder: "Plus One name",
    rsvpSubmit: "Send RSVP",
  },
  de: {
    // Home page
    homeTitle: "Wir heiraten!",
    homeDate: "12.09.2026, 18:00 Uhr",
    homeLocation: "📍Schilling Roofbar, Alte Glockengießerei 9, 69115 Heidelberg",
    homeDressCode: "👗🥻👔👞👠 Dresscode: Cocktail / Semi-formal / Festlich",
    homeAdultsOnly: "Damit sich alle entspannen und die Feier genießen können, haben wir uns entschieden, unsere Hochzeit nur für Erwachsene auszurichten. Vielen Dank für euer Verständnis — wir freuen uns sehr darauf, mit euch zu feiern! 💕",
    rsvpButton: "Zusagen",

    // Navigation
    navHome: "Start",
    navHotels: "Hotels",
    navHeidelberg: "Heidelberg",
    navGifts: "Geschenke",
    navContact: "Kontakt",

    // Hotels page
    hotelsTitle: "Übernachtungsmöglichkeiten",
    hotelsIntro: "Wir haben für euch einige wunderbare Hotels in der Nähe der Location ausgewählt. Alle sind fußläufig oder mit einer kurzen Fahrt erreichbar.",
    weddingVenueBadge: "💒 Hochzeitslocation",
    viewWebsite: "Zur Webseite →",

    // Heidelberg page
    heidelbergTitle: "Willkommen in Heidelberg",
    heidelbergIntro: "Heidelberg ist seit einigen Jahren unsere Wahlheimat und auch der Ort, an dem wir uns kennengelernt und verliebt haben❣️",
    heidelbergDescription: "Mit seinen wunderschönen Schlossruinen und der charmanten Altstadt ist es definitiv ein romantischer Ort.",
    heidelbergCall: "Falls ihr von weiter her kommt und ein paar Tage hier verbringt, findet ihr unten eine Auswahl an Aktivitäten und unsere Lieblingsorte zum Essen und Trinken!🍽️🍹",
    heidelbergClosing: "Wir hoffen, ihr genießt eure Zeit hier!",
    heidelbergSignature: "Alles Liebe, Christoph & Franzi",
    heidelbergRestaurants: "Die besten Bars und Restaurants in Heidelberg",

    // Gifts page
    giftsTitle: "Hochzeitsgeschenke",
    giftsIntro: "Eure Anwesenheit bei unserer Hochzeit ist das größte Geschenk! Falls ihr uns dennoch mit einem Geschenk ehren möchtet, würden wir uns über einen Beitrag für unsere gemeinsame Zukunft freuen.",
    giftsCardTitle: "Geschenk per PayPal senden",
    giftsCardDescription: "Ihr könnt euer Geschenk sicher über PayPal senden:",
    giftsButton: "Geschenk per PayPal senden",
    giftsFooter: "Vielen Dank für eure Großzügigkeit! Wir freuen uns darauf, mit euch zu feiern.",
    giftsSignature: "Alles Liebe, Christoph & Franzi",

    // Contact page
    contactTitle: "Fragen?",
    contactSubtitle: "Wir helfen euch gerne bei allen Fragen weiter!",
    contactButton: "Kontaktiert uns!",
    contactPromise: "Wir melden uns so schnell wie möglich bei euch",

    // RSVP Modal
    rsvpTitle: "Zusage",
    rsvpNamePlaceholder: "Bitte gib deinen Namen ein",
    rsvpEmailPlaceholder: "E-Mail-Adresse",
    rsvpPlusOne: "Ich bringe eine Begleitung mit",
    rsvpPlusOnePlaceholder: "Name der Begleitung",
    rsvpSubmit: "Zusage senden",
  }
};

export function getLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.startsWith('de') ? 'de' : 'en';
}
