import { render, screen, fireEvent, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

const mockNavigatorLanguage = (lang) => {
  Object.defineProperty(window.navigator, 'language', {
    writable: true,
    configurable: true,
    value: lang,
  });
};

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Home Component', () => {
  beforeEach(() => {
    mockNavigatorLanguage('en-US');
  });

  describe('Content rendering', () => {
    it('renders the wedding announcement', () => {
      renderWithRouter(<Home />);
      expect(screen.getByText(/getting married/i)).toBeInTheDocument();
    });

    it('displays wedding date and time', () => {
      renderWithRouter(<Home />);
      expect(screen.getByText(/12. September 2026, 6:00 pm/i)).toBeInTheDocument();
    });

    it('displays venue location', () => {
      renderWithRouter(<Home />);
      expect(screen.getByText(/Schilling Roofbar/i)).toBeInTheDocument();
      expect(screen.getByText(/Alte Glockengießerei 9/i)).toBeInTheDocument();
    });

    it('displays dress code information', () => {
      renderWithRouter(<Home />);
      expect(screen.getByText(/Dress Code: Cocktail/i)).toBeInTheDocument();
    });

    it('renders the couple photo', () => {
      renderWithRouter(<Home />);
      const image = screen.getByAltText(/Christoph and Franzi/i);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', './pictures/CuF6.jpg');
    });

    it('displays general information with email link', () => {
      renderWithRouter(<Home />);
      expect(screen.getByText(/won't send out invitation cards/i)).toBeInTheDocument();
      const emailLink = screen.getByText(/via Email/i);
      expect(emailLink.closest('a')).toHaveAttribute('href', '/ContactUs');
    });
  });

  describe('Event info card styling', () => {
    it('renders event info with proper card styling', () => {
      const { container } = renderWithRouter(<Home />);
      const eventInfo = container.querySelector('.event-info');
      expect(eventInfo).toBeInTheDocument();
      expect(eventInfo).toHaveClass('event-info');
    });

    it('renders general info with proper card styling', () => {
      const { container } = renderWithRouter(<Home />);
      const generalInfo = container.querySelector('.general-info');
      expect(generalInfo).toBeInTheDocument();
      expect(generalInfo).toHaveClass('general-info');
    });
  });

  describe('RSVP Modal interaction', () => {
    it('shows RSVP button', () => {
      renderWithRouter(<Home />);
      const rsvpButton = screen.getByRole('button', { name: /rsvp/i });
      expect(rsvpButton).toBeInTheDocument();
    });

    it('opens RSVP modal when button is clicked', () => {
      renderWithRouter(<Home />);
      const rsvpButton = screen.getByRole('button', { name: /rsvp/i });

      expect(screen.queryByPlaceholderText(/enter your name/i)).not.toBeInTheDocument();

      fireEvent.click(rsvpButton);
      expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    });

    it('closes RSVP modal when close button is clicked', () => {
      renderWithRouter(<Home />);
      const rsvpButton = screen.getByRole('button', { name: /rsvp/i });
      fireEvent.click(rsvpButton);

      const closeButton = screen.getByRole('button', { name: /✕/i });
      fireEvent.click(closeButton);

      expect(screen.queryByPlaceholderText(/enter your name/i)).not.toBeInTheDocument();
    });
  });

  describe('Internationalization', () => {
    it('displays German content when language is German', () => {
      mockNavigatorLanguage('de-DE');
      renderWithRouter(<Home />);

      expect(screen.getByText(/Wir heiraten/i)).toBeInTheDocument();
      expect(screen.getByText(/18:00 Uhr/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Zusagen/i })).toBeInTheDocument();
    });

    it('switches button text based on language', () => {
      renderWithRouter(<Home />);
      expect(screen.getByRole('button', { name: /RSVP/i })).toBeInTheDocument();

      mockNavigatorLanguage('de-DE');
      renderWithRouter(<Home />);
      expect(screen.getByRole('button', { name: /Zusagen/i })).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      renderWithRouter(<Home />);
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
    });

    it('has alt text for images', () => {
      renderWithRouter(<Home />);
      const image = screen.getByAltText(/Christoph and Franzi/i);
      expect(image).toHaveAttribute('alt');
    });
  });
});
