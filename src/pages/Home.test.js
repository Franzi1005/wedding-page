import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';

const mockNavigatorLanguage = (lang) => {
  Object.defineProperty(window.navigator, 'language', {
    writable: true,
    configurable: true,
    value: lang,
  });
};

describe('Home Component', () => {
  beforeEach(() => {
    mockNavigatorLanguage('en-US');
  });

  it('renders the wedding announcement', () => {
    render(<Home />);
    expect(screen.getByText(/getting married/i)).toBeInTheDocument();
  });

  it('displays wedding date and time', () => {
    render(<Home />);
    expect(screen.getByText(/12.09.2026, 6:00 pm/i)).toBeInTheDocument();
  });

  it('displays venue location', () => {
    render(<Home />);
    expect(screen.getByText(/Schilling Roofbar/i)).toBeInTheDocument();
  });

  it('displays dress code information', () => {
    render(<Home />);
    expect(screen.getByText(/Dress Code: Cocktail/i)).toBeInTheDocument();
  });

  it('shows RSVP button', () => {
    render(<Home />);
    const rsvpButton = screen.getByRole('button', { name: /rsvp/i });
    expect(rsvpButton).toBeInTheDocument();
  });

  it('opens RSVP modal when button is clicked', () => {
    render(<Home />);
    const rsvpButton = screen.getByRole('button', { name: /rsvp/i });
    fireEvent.click(rsvpButton);
    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
  });

  it('displays German content when language is German', () => {
    mockNavigatorLanguage('de-DE');
    render(<Home />);
    expect(screen.getByText(/Wir heiraten/i)).toBeInTheDocument();
    expect(screen.getByText(/18:00 Uhr/i)).toBeInTheDocument();
  });

  it('displays adults-only message', () => {
    render(<Home />);
    expect(screen.getByText(/adults-only/i)).toBeInTheDocument();
  });

  it('renders the couple photo', () => {
    render(<Home />);
    const image = screen.getByAltText(/Christoph and Franzi/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', './pictures/CuF.jpeg');
  });
});
