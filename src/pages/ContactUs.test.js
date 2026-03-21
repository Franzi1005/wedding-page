import { render, screen, fireEvent } from '@testing-library/react';
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

  it('renders the contact page', () => {
    render(<ContactUs />);
    expect(screen.getByText(/Got questions/i)).toBeInTheDocument();
  });

  it('displays contact button with email link', () => {
    render(<ContactUs />);
    const link = screen.getByRole('link', { name: /get in touch/i });
    expect(link).toHaveAttribute('href', 'mailto:fschallhorn@gmail.com');
  });

  it('displays promise message', () => {
    render(<ContactUs />);
    expect(screen.getByText(/get back to you as quickly as possible/i)).toBeInTheDocument();
  });

  it('displays German content when language is German', () => {
    mockNavigatorLanguage('de-DE');
    render(<ContactUs />);
    expect(screen.getByRole('heading', { name: /Fragen/i })).toBeInTheDocument();
  });
});
