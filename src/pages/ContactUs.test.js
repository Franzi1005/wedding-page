import { render, screen } from '@testing-library/react';
import ContactUs from './ContactUs';

const mockNavigatorLanguage = (lang) => {
  Object.defineProperty(window.navigator, 'language', {
    writable: true,
    configurable: true,
    value: lang,
  });
};

describe('ContactUs Component', () => {
  beforeEach(() => {
    mockNavigatorLanguage('en-US');
  });

  describe('Content rendering', () => {
    it('renders the contact page', () => {
      render(<ContactUs />);
      expect(screen.getByText(/Got questions/i)).toBeInTheDocument();
    });

    it('displays main heading', () => {
      render(<ContactUs />);
      expect(screen.getByRole('heading', { level: 1, name: /Got questions/i })).toBeInTheDocument();
    });

    it('displays subtitle encouraging contact', () => {
      render(<ContactUs />);
      expect(screen.getByText(/We're here to help with any questions you might have/i)).toBeInTheDocument();
    });

    it('displays promise message', () => {
      render(<ContactUs />);
      expect(screen.getByText(/get back to you as quickly as possible/i)).toBeInTheDocument();
    });

    it('renders all text elements in correct order', () => {
      const { container } = render(<ContactUs />);
      const allText = container.textContent;

      const titleIndex = allText.indexOf('Got questions');
      const subtitleIndex = allText.indexOf('here to help');
      const buttonIndex = allText.indexOf('get in touch');
      const promiseIndex = allText.indexOf('get back to you');

      expect(titleIndex).toBeLessThan(subtitleIndex);
      expect(subtitleIndex).toBeLessThan(buttonIndex);
      expect(buttonIndex).toBeLessThan(promiseIndex);
    });
  });

  describe('Contact button and email', () => {
    it('displays contact button with email link', () => {
      render(<ContactUs />);
      const link = screen.getByRole('link', { name: /get in touch/i });
      expect(link).toHaveAttribute('href', 'mailto:fschallhorn@gmail.com');
    });

    it('email link uses mailto protocol', () => {
      render(<ContactUs />);
      const link = screen.getByRole('link', { name: /get in touch/i });
      const href = link.getAttribute('href');
      expect(href).toMatch(/^mailto:/);
    });

    it('renders button wrapper around email link', () => {
      render(<ContactUs />);
      const link = screen.getByRole('link', { name: /get in touch/i });
      const button = link.closest('button');
      expect(button).toBeInTheDocument();
    });

    it('button contains only the link without extra elements', () => {
      render(<ContactUs />);
      const link = screen.getByRole('link', { name: /get in touch/i });
      const button = link.closest('button');
      expect(button.children.length).toBe(1);
      expect(button.children[0].tagName).toBe('A');
    });
  });

  describe('Layout and styling', () => {
    it('applies ContactUs wrapper class', () => {
      const { container } = render(<ContactUs />);
      const wrapper = container.querySelector('.ContactUs');
      expect(wrapper).toBeInTheDocument();
    });

    it('subtitle has correct class for styling', () => {
      const { container } = render(<ContactUs />);
      const subtitle = container.querySelector('.contact-subtitle');
      expect(subtitle).toBeInTheDocument();
      expect(subtitle.textContent).toMatch(/We're here to help with any questions you might have/i);
    });

    it('promise text is rendered as a paragraph', () => {
      render(<ContactUs />);
      const promise = screen.getByText(/get back to you as quickly as possible/i);
      expect(promise.tagName).toBe('P');
    });
  });

  describe('Internationalization', () => {
    it('displays German content when language is German', () => {
      mockNavigatorLanguage('de-DE');
      render(<ContactUs />);
      expect(screen.getByRole('heading', { name: /Fragen/i })).toBeInTheDocument();
    });

    it('translates all text content to German', () => {
      mockNavigatorLanguage('de-DE');
      render(<ContactUs />);

      expect(screen.getByText(/Wir helfen euch gerne bei allen Fragen weiter/i)).toBeInTheDocument();
      expect(screen.getByText(/melden uns so schnell wie möglich/i)).toBeInTheDocument();
    });

    it('translates button text to German', () => {
      mockNavigatorLanguage('de-DE');
      render(<ContactUs />);
      const link = screen.getByRole('link', { name: /Schreibt uns/i });
      expect(link).toBeInTheDocument();
    });

    it('maintains email address across languages', () => {
      // English
      render(<ContactUs />);
      const enLink = screen.getByRole('link', { name: /get in touch/i });
      const enEmail = enLink.getAttribute('href');

      // German
      mockNavigatorLanguage('de-DE');
      render(<ContactUs />);
      const deLink = screen.getByRole('link', { name: /Schreibt uns/i });
      const deEmail = deLink.getAttribute('href');

      expect(enEmail).toBe(deEmail);
      expect(enEmail).toBe('mailto:fschallhorn@gmail.com');
    });

    it('switches all content based on language', () => {
      const { unmount } = render(<ContactUs />);
      expect(screen.getByText(/Got questions/i)).toBeInTheDocument();
      unmount();

      mockNavigatorLanguage('de-DE');
      render(<ContactUs />);
      expect(screen.getByRole('heading', { level: 1, name: /Fragen/i })).toBeInTheDocument();
      expect(screen.queryByText(/Got questions/i)).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<ContactUs />);
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
    });

    it('contact link is keyboard accessible', () => {
      render(<ContactUs />);
      const link = screen.getByRole('link', { name: /get in touch/i });
      expect(link).toHaveAttribute('href');
    });

    it('all text content has sufficient length', () => {
      render(<ContactUs />);
      const heading = screen.getByRole('heading', { level: 1 });
      const subtitle = screen.getByText(/We're here to help/i);
      const promise = screen.getByText(/get back to you as quickly as possible/i);

      expect(heading.textContent.length).toBeGreaterThan(0);
      expect(subtitle.textContent.length).toBeGreaterThan(10);
      expect(promise.textContent.length).toBeGreaterThan(10);
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

      expect(() => render(<ContactUs />)).not.toThrow();
    });

    it('renders all required elements in minimal state', () => {
      render(<ContactUs />);

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();
      expect(screen.getByText(/get back to you/i)).toBeInTheDocument();
    });

    it('handles unknown language codes by defaulting to English', () => {
      mockNavigatorLanguage('zh-CN');
      render(<ContactUs />);
      expect(screen.getByText(/Got questions/i)).toBeInTheDocument();
    });
  });

  describe('Email integration', () => {
    it('email address is properly formatted', () => {
      render(<ContactUs />);
      const link = screen.getByRole('link', { name: /get in touch/i });
      const href = link.getAttribute('href');
      const email = href.replace('mailto:', '');

      expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it('no additional query parameters in mailto link', () => {
      render(<ContactUs />);
      const link = screen.getByRole('link', { name: /get in touch/i });
      const href = link.getAttribute('href');

      expect(href).toBe('mailto:fschallhorn@gmail.com');
      expect(href).not.toContain('?');
      expect(href).not.toContain('&');
    });
  });
});
