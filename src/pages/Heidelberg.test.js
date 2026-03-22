import { render, screen } from '@testing-library/react';
import Heidelberg from './Heidelberg';

const mockNavigatorLanguage = (lang) => {
  Object.defineProperty(window.navigator, 'language', {
    writable: true,
    configurable: true,
    value: lang,
  });
};

describe('Heidelberg Component', () => {
  beforeEach(() => {
    mockNavigatorLanguage('en-US');
  });

  describe('Content rendering', () => {
    it('renders the heidelberg page', () => {
      render(<Heidelberg />);
      expect(screen.getByText(/Welcome to Heidelberg/i)).toBeInTheDocument();
    });

    it('displays introduction about Heidelberg', () => {
      render(<Heidelberg />);
      expect(screen.getByText(/chosen home for the last few years/i)).toBeInTheDocument();
      expect(screen.getByText(/fell in love/i)).toBeInTheDocument();
    });

    it('displays signature from couple', () => {
      render(<Heidelberg />);
      expect(screen.getByText(/Love, Christoph & Franzi/i)).toBeInTheDocument();
    });
  });

  describe('Restaurants section', () => {
    it('displays restaurants section header', () => {
      render(<Heidelberg />);
      expect(screen.getByText(/Best Bars and Restaurants/i)).toBeInTheDocument();
    });

    it('displays all restaurant cards', () => {
      render(<Heidelberg />);
      expect(screen.getByRole('heading', { name: /Vetter's Alt Heidelberger Brauhaus/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Cenneto 🍷/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Bhukkad Dhaba/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Kulturbrauerei Heidelberg/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Bent Bar - Heidelberg/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Taif's/i })).toBeInTheDocument();
    });

    it('displays restaurant addresses', () => {
      render(<Heidelberg />);
      expect(screen.getByText(/Steingasse 9/i)).toBeInTheDocument();
      expect(screen.getAllByText(/69117 Heidelberg/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/Da-Vinci-Straße 16/i)).toBeInTheDocument();
    });

    it('has website links for all restaurants with proper attributes', () => {
      render(<Heidelberg />);
      const links = screen.getAllByRole('link');

      links.forEach((link) => {
        if (link.getAttribute('target') === '_blank') {
          expect(link).toHaveAttribute('rel');
          expect(link.getAttribute('rel')).toMatch(/noreferrer|noopener/);
        }
      });
    });
  });

  describe('Must Sees section', () => {
    it('displays must sees section header', () => {
      render(<Heidelberg />);
      expect(screen.getByText(/Must Sees in Heidelberg/i)).toBeInTheDocument();
    });

    it('displays Heidelberg Castle with hike recommendations', () => {
      render(<Heidelberg />);
      expect(screen.getByRole('heading', { name: /Heidelberger Schloss/i })).toBeInTheDocument();
      expect(screen.getAllByText(/Checkout/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(/this hike/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/best view of the castle/i)).toBeInTheDocument();
    });

    it('displays Königstuhl information', () => {
      render(<Heidelberg />);
      expect(screen.getByRole('heading', { name: /Königstuhl/i })).toBeInTheDocument();
    });

    it('displays Altstadt information', () => {
      render(<Heidelberg />);
      expect(screen.getByRole('heading', { name: /Heidelberger Altstadt/i })).toBeInTheDocument();
    });

    it('has komoot hiking links with proper attributes', () => {
      render(<Heidelberg />);
      const links = screen.getAllByRole('link');
      const komootLinks = links.filter(link =>
        link.getAttribute('href')?.includes('komoot.com')
      );

      expect(komootLinks.length).toBeGreaterThan(0);
      komootLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noreferrer');
      });
    });
  });

  describe('Maps integration', () => {
    it('embeds Google Maps iframes for all locations', () => {
      const { container } = render(<Heidelberg />);
      const iframes = container.querySelectorAll('iframe');

      expect(iframes.length).toBeGreaterThanOrEqual(9); // 6 restaurants + 3 must-sees

      iframes.forEach((iframe) => {
        expect(iframe).toHaveAttribute('loading', 'lazy');
        expect(iframe).toHaveAttribute('referrerPolicy', 'no-referrer-when-downgrade');
        expect(iframe).toHaveAttribute('title');
      });
    });

    it('has accessible iframe titles', () => {
      const { container } = render(<Heidelberg />);
      const iframes = container.querySelectorAll('iframe');

      iframes.forEach((iframe) => {
        const title = iframe.getAttribute('title');
        expect(title).toBeTruthy();
        expect(title.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Internationalization', () => {
    it('displays German content when language is German', () => {
      mockNavigatorLanguage('de-DE');
      render(<Heidelberg />);

      expect(screen.getByText(/Willkommen in Heidelberg/i)).toBeInTheDocument();
      expect(screen.getByText(/Die besten Bars und Restaurants/i)).toBeInTheDocument();
      expect(screen.getByText(/Christoph & Franzi/i)).toBeInTheDocument();
    });

    it('uses German text for must-sees content', () => {
      mockNavigatorLanguage('de-DE');
      render(<Heidelberg />);

      expect(screen.getAllByText(/Wir empfehlen/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(/diese Wanderung/i).length).toBeGreaterThanOrEqual(1);
    });

    it('maintains all external links in both languages', () => {
      // English
      const { unmount: unmountEn } = render(<Heidelberg />);
      const enLinks = screen.getAllByRole('link');
      const enCount = enLinks.length;
      unmountEn();

      // German
      mockNavigatorLanguage('de-DE');
      render(<Heidelberg />);
      const deLinks = screen.getAllByRole('link');

      expect(deLinks.length).toBe(enCount);
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<Heidelberg />);

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();

      const h3s = screen.getAllByRole('heading', { level: 3 });
      expect(h3s.length).toBeGreaterThan(0);

      const h4s = screen.getAllByRole('heading', { level: 4 });
      expect(h4s.length).toBeGreaterThan(0);
    });

    it('all links have accessible content', () => {
      render(<Heidelberg />);
      const links = screen.getAllByRole('link');

      links.forEach(link => {
        expect(link.textContent.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('Layout and structure', () => {
    it('renders restaurant cards in grid layout', () => {
      const { container } = render(<Heidelberg />);
      const restaurantGrid = container.querySelector('.places-in-HD');
      expect(restaurantGrid).toBeInTheDocument();

      const cards = container.querySelectorAll('.card');
      expect(cards.length).toBeGreaterThanOrEqual(9);
    });

    it('each card contains iframe and info section', () => {
      const { container } = render(<Heidelberg />);
      const cards = container.querySelectorAll('.card');

      cards.forEach(card => {
        const iframe = card.querySelector('iframe');
        const info = card.querySelector('.restaurant-info');
        expect(iframe).toBeInTheDocument();
        expect(info).toBeInTheDocument();
      });
    });
  });
});
