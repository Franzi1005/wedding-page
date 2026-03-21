import { render, screen } from '@testing-library/react';
import Hotels from './Hotels';

// Mock react-leaflet components
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }) => <div>{children}</div>,
}));

const mockNavigatorLanguage = (lang) => {
  Object.defineProperty(window.navigator, 'language', {
    writable: true,
    configurable: true,
    value: lang,
  });
};

describe('Hotels Component', () => {
  beforeEach(() => {
    mockNavigatorLanguage('en-US');
  });

  it('renders the hotels page', () => {
    render(<Hotels />);
    expect(screen.getByText(/Where to Stay/i)).toBeInTheDocument();
  });

  it('displays introduction text', () => {
    render(<Hotels />);
    expect(screen.getByText(/wonderful hotels near the venue/i)).toBeInTheDocument();
  });

  it('renders the map container', () => {
    render(<Hotels />);
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  it('displays all hotels', () => {
    render(<Hotels />);
    expect(screen.getAllByText(/Hotel NH Collection Heidelberg/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Qube Hotel Bergheim/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Premier Inn Heidelberg/i).length).toBeGreaterThan(0);
  });

  it('highlights the wedding location with badge', () => {
    render(<Hotels />);
    expect(screen.getByText(/Wedding Venue/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Schilling Roofbar/i).length).toBeGreaterThan(0);
  });

  it('displays hotel addresses', () => {
    render(<Hotels />);
    expect(screen.getByText(/Bergheimer Str. 91/i)).toBeInTheDocument();
  });

  it('has website links for all hotels', () => {
    render(<Hotels />);
    const links = screen.getAllByText(/View Website/i);
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => {
      expect(link.closest('a')).toHaveAttribute('target', '_blank');
      expect(link.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('displays German content when language is German', () => {
    mockNavigatorLanguage('de-DE');
    render(<Hotels />);
    expect(screen.getByText(/Übernachtungsmöglichkeiten/i)).toBeInTheDocument();
    expect(screen.getByText(/Hochzeitslocation/i)).toBeInTheDocument();
  });

  it('applies wedding-location class to first hotel card', () => {
    const { container } = render(<Hotels />);
    const weddingCard = container.querySelector('.wedding-location');
    expect(weddingCard).toBeInTheDocument();
  });
});
