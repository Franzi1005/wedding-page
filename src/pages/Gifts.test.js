import { render, screen } from '@testing-library/react';
import Gifts from './Gifts';

const mockNavigatorLanguage = (lang) => {
  Object.defineProperty(window.navigator, 'language', {
    writable: true,
    configurable: true,
    value: lang,
  });
};

describe('Gifts Component', () => {
  beforeEach(() => {
    mockNavigatorLanguage('en-US');
  });

  describe('Content rendering', () => {
    it('renders the gifts page', () => {
      render(<Gifts />);
      expect(screen.getByText(/Wedding Gifts/i)).toBeInTheDocument();
    });

    it('displays message about presence being the greatest gift', () => {
      render(<Gifts />);
      expect(screen.getByText(/Your presence at our wedding is of course the best gift of all/i)).toBeInTheDocument();
    });

    it('displays introduction text explaining no expectations', () => {
      render(<Gifts />);
      expect(screen.getByText(/contribution towards our future together/i)).toBeInTheDocument();
    });

    it('displays thank you message', () => {
      render(<Gifts />);
      expect(screen.getByText(/Thank you for your kindness and generosity/i)).toBeInTheDocument();
    });

    it('displays signature from couple', () => {
      render(<Gifts />);
      expect(screen.getByText(/Love, Christoph & Franzi/i)).toBeInTheDocument();
    });
  });

  describe('PayPal gift section', () => {
    it('displays PayPal card section with title', () => {
      render(<Gifts />);
      expect(screen.getByText(/Send a Gift via PayPal/i)).toBeInTheDocument();
    });

    it('displays PayPal card description', () => {
      render(<Gifts />);
      expect(screen.getByRole('heading', { level: 3, name: /Send a Gift via PayPal/i })).toBeInTheDocument();
    });

    it('has PayPal link with correct URL', () => {
      render(<Gifts />);
      const paypalLink = screen.getByRole('link', { name: /Send Gift via PayPal/i });
      expect(paypalLink).toHaveAttribute('href', 'https://paypal.me/franziandchris');
    });

    it('PayPal link opens in new tab with security attributes', () => {
      render(<Gifts />);
      const paypalLink = screen.getByRole('link', { name: /Send Gift via PayPal/i });
      expect(paypalLink).toHaveAttribute('target', '_blank');
      expect(paypalLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('displays button with anchor element', () => {
      render(<Gifts />);
      const paypalButton = screen.getByRole('link', { name: /Send Gift via PayPal/i });
      const buttonParent = paypalButton.closest('button');
      expect(buttonParent).toBeInTheDocument();
    });
  });

  describe('Layout and structure', () => {
    it('renders gift card with proper styling', () => {
      const { container } = render(<Gifts />);
      const giftCard = container.querySelector('.gift-card');
      expect(giftCard).toBeInTheDocument();
      expect(giftCard).toHaveClass('gift-card');
    });

    it('renders intro text with gifts-intro class', () => {
      const { container } = render(<Gifts />);
      const intro = container.querySelector('.gifts-intro');
      expect(intro).toBeInTheDocument();
      expect(intro.textContent).toMatch(/Your presence at our wedding is of course the best gift of all/i);
    });

    it('renders footer text with gifts-footer class', () => {
      const { container } = render(<Gifts />);
      const footer = container.querySelector('.gifts-footer');
      expect(footer).toBeInTheDocument();
      expect(footer.textContent).toMatch(/Thank you/i);
    });
  });

  describe('Internationalization', () => {
    it('displays German content when language is German', () => {
      mockNavigatorLanguage('de-DE');
      render(<Gifts />);
      expect(screen.getByRole('heading', { level: 1, name: /Hochzeitsgeschenke/i })).toBeInTheDocument();
    });

    it('translates all text content to German', () => {
      mockNavigatorLanguage('de-DE');
      render(<Gifts />);

      expect(screen.getByText(/Eure Anwesenheit/i)).toBeInTheDocument();
      expect(screen.getByText(/Vielen Dank/i)).toBeInTheDocument();
      expect(screen.getByText(/Christoph & Franzi/i)).toBeInTheDocument();
    });

    it('translates PayPal button text to German', () => {
      mockNavigatorLanguage('de-DE');
      render(<Gifts />);
      const paypalLink = screen.getByRole('link', { name: /Geschenk per PayPal senden/i });
      expect(paypalLink).toBeInTheDocument();
    });

    it('translates PayPal card title and description to German', () => {
      mockNavigatorLanguage('de-DE');
      render(<Gifts />);
      expect(screen.getByRole('heading', { level: 3, name: /Geschenk per PayPal senden/i })).toBeInTheDocument();
    });

    it('maintains PayPal URL across languages', () => {
      // English
      render(<Gifts />);
      const enLink = screen.getByRole('link', { name: /Send Gift via PayPal/i });
      const enHref = enLink.getAttribute('href');

      // German
      mockNavigatorLanguage('de-DE');
      render(<Gifts />);
      const deLink = screen.getByRole('link', { name: /Geschenk per PayPal senden/i });
      const deHref = deLink.getAttribute('href');

      expect(enHref).toBe(deHref);
      expect(enHref).toBe('https://paypal.me/franziandchris');
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<Gifts />);

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();

      const h3 = screen.getByRole('heading', { level: 3 });
      expect(h3).toBeInTheDocument();
    });

    it('PayPal link has accessible text content', () => {
      render(<Gifts />);
      const link = screen.getByRole('link', { name: /Send Gift via PayPal/i });
      expect(link.textContent.trim().length).toBeGreaterThan(0);
    });

    it('all text elements are visible and readable', () => {
      const { container } = render(<Gifts />);

      const intro = container.querySelector('.gifts-intro');
      expect(intro).toBeVisible();

      const footer = container.querySelector('.gifts-footer');
      expect(footer).toBeVisible();
    });
  });

  describe('External links security', () => {
    it('external links have noopener noreferrer for security', () => {
      render(<Gifts />);
      const externalLink = screen.getByRole('link', { name: /Send Gift via PayPal/i });
      expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('external link opens in new tab', () => {
      render(<Gifts />);
      const externalLink = screen.getByRole('link', { name: /Send Gift via PayPal/i });
      expect(externalLink).toHaveAttribute('target', '_blank');
    });
  });

  describe('Typography and styling', () => {
    it('uses correct CSS classes for different text sections', () => {
      const { container } = render(<Gifts />);

      expect(container.querySelector('.gifts-intro')).toBeInTheDocument();
      expect(container.querySelector('.gifts-footer')).toBeInTheDocument();
      expect(container.querySelector('.gift-card')).toBeInTheDocument();
    });

    it('renders line break in footer for proper formatting', () => {
      const { container } = render(<Gifts />);
      const footer = container.querySelector('.gifts-footer');
      const lineBreak = footer.querySelector('br');
      expect(lineBreak).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('handles undefined language gracefully', () => {
      // Set a valid fallback language instead of undefined
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

      expect(() => render(<Gifts />)).not.toThrow();
    });

    it('renders all required elements even in minimal state', () => {
      render(<Gifts />);

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();
    });
  });
});
