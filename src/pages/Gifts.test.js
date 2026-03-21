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

  it('renders the gifts page', () => {
    render(<Gifts />);
    expect(screen.getByText(/Wedding Gifts/i)).toBeInTheDocument();
  });

  it('displays message about presence being the greatest gift', () => {
    render(<Gifts />);
    expect(screen.getByText(/presence at our wedding is the greatest gift/i)).toBeInTheDocument();
  });

  it('displays PayPal card section', () => {
    render(<Gifts />);
    expect(screen.getByText(/Send a Gift via PayPal/i)).toBeInTheDocument();
  });

  it('has PayPal link with correct URL', () => {
    render(<Gifts />);
    const paypalLink = screen.getByRole('link', { name: /Send Gift via PayPal/i });
    expect(paypalLink).toHaveAttribute('href', 'https://paypal.me/franziandchris');
    expect(paypalLink).toHaveAttribute('target', '_blank');
    expect(paypalLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays thank you message', () => {
    render(<Gifts />);
    expect(screen.getByText(/Thank you for your kindness and generosity/i)).toBeInTheDocument();
  });

  it('displays German content when language is German', () => {
    mockNavigatorLanguage('de-DE');
    render(<Gifts />);
    expect(screen.getByRole('heading', { level: 1, name: /Hochzeitsgeschenke/i })).toBeInTheDocument();
    const paypalLink = screen.getByRole('link', { name: /Geschenk per PayPal senden/i });
    expect(paypalLink).toBeInTheDocument();
  });

  it('displays signature from couple', () => {
    render(<Gifts />);
    expect(screen.getByText(/Love, Christoph & Franzi/i)).toBeInTheDocument();
  });
});
