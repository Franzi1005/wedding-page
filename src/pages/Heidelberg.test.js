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

  it('renders the heidelberg page', () => {
    render(<Heidelberg />);
    expect(screen.getByText(/Welcome to Heidelberg/i)).toBeInTheDocument();
  });

  it('displays introduction about Heidelberg', () => {
    render(<Heidelberg />);
    expect(screen.getByText(/chosen home for the last few years/i)).toBeInTheDocument();
    expect(screen.getByText(/fell in love/i)).toBeInTheDocument();
  });

  it('displays restaurants section', () => {
    render(<Heidelberg />);
    expect(screen.getByText(/Best Bars and Restaurants/i)).toBeInTheDocument();
  });

  it('displays all restaurant cards', () => {
    render(<Heidelberg />);
    expect(screen.getAllByText(/Vetter's Alt Heidelberger Brauhaus/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: /Cenneto/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Bhukkad Dhaba/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Taif's/i).length).toBeGreaterThan(0);
  });

  it('displays restaurant addresses', () => {
    render(<Heidelberg />);
    expect(screen.getByText(/Steingasse 9/i)).toBeInTheDocument();
    expect(screen.getByText(/69117 Heidelberg/i)).toBeInTheDocument();
  });

  it('has website links for all restaurants', () => {
    render(<Heidelberg />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('embeds Google Maps iframes', () => {
    const { container } = render(<Heidelberg />);
    const iframes = container.querySelectorAll('iframe');
    expect(iframes.length).toBeGreaterThan(0);
    iframes.forEach((iframe) => {
      expect(iframe).toHaveAttribute('loading', 'lazy');
    });
  });

  it('displays German content when language is German', () => {
    mockNavigatorLanguage('de-DE');
    render(<Heidelberg />);
    expect(screen.getByText(/Willkommen in Heidelberg/i)).toBeInTheDocument();
    expect(screen.getByText(/Die besten Bars und Restaurants/i)).toBeInTheDocument();
  });

  it('displays signature from couple', () => {
    render(<Heidelberg />);
    expect(screen.getByText(/Love, Christoph & Franzi/i)).toBeInTheDocument();
  });
});
