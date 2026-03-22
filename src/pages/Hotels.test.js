import { render, screen } from '@testing-library/react';
import Hotels from './Hotels';

// Mock react-leaflet components
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }) => <div>{children}</div>,
}));

// Mock leaflet
jest.mock('leaflet', () => ({
  Icon: class MockIcon {
    constructor(options) {
      this.options = options;
    }
    static Default = class {
      static prototype = {};
      static mergeOptions = jest.fn();
    };
  }
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

  describe('Content rendering', () => {
    it('renders the hotels page', () => {
      render(<Hotels />);
      expect(screen.getByText(/Where to Stay/i)).toBeInTheDocument();
    });

    it('displays introduction text', () => {
      render(<Hotels />);
      expect(screen.getByText(/In case you need a hotel/i)).toBeInTheDocument();
    });

    it('displays all hotels', () => {
      render(<Hotels />);
      expect(screen.getByText(/Hotel NH Collection Heidelberg/i)).toBeInTheDocument();
      expect(screen.getByText(/Qube Hotel Bergheim/i)).toBeInTheDocument();
      expect(screen.getByText(/Premier Inn Heidelberg/i)).toBeInTheDocument();
      expect(screen.getByText(/ATLANTIC Hotel Heidelberg/i)).toBeInTheDocument();
      expect(screen.getByText(/Hotel Bergheim41/i)).toBeInTheDocument();
      expect(screen.getByText(/Aparthotel Adagio Heidelberg/i)).toBeInTheDocument();
      expect(screen.getByText(/IntercityHotel Heidelberg/i)).toBeInTheDocument();
      expect(screen.getByText(/The Heidelberg Exzellenz Hotel/i)).toBeInTheDocument();
    });

    it('displays hotel addresses', () => {
      render(<Hotels />);
      expect(screen.getByText(/Bergheimer Str. 91/i)).toBeInTheDocument();
      expect(screen.getByText(/Bergheimer Str. 74/i)).toBeInTheDocument();
      expect(screen.getByText(/Rohrbacher Str. 14/i)).toBeInTheDocument();
    });
  });

  describe('Wedding venue highlighting', () => {
    it('highlights the wedding location with badge', () => {
      render(<Hotels />);
      expect(screen.getByText(/Wedding Venue/i)).toBeInTheDocument();
      expect(screen.getByText(/Wedding Location \(Schilling Roofbar\)/i)).toBeInTheDocument();
    });

    it('applies wedding-location class to first hotel card', () => {
      const { container } = render(<Hotels />);
      const weddingCard = container.querySelector('.wedding-location');
      expect(weddingCard).toBeInTheDocument();
      expect(weddingCard).toHaveClass('hotel-card', 'wedding-location');
    });

    it('displays wedding venue badge only once', () => {
      render(<Hotels />);
      const badges = screen.getAllByText(/Wedding Venue/i);
      expect(badges).toHaveLength(1);
    });
  });

  describe('Map integration', () => {
    it('renders the map container', () => {
      render(<Hotels />);
      expect(screen.getByTestId('map-container')).toBeInTheDocument();
    });

    it('renders markers for all hotels', () => {
      render(<Hotels />);
      const markers = screen.getAllByTestId('marker');
      expect(markers.length).toBe(9); // 8 hotels + 1 wedding location
    });
  });

  describe('External links', () => {
    it('has website links for all hotels', () => {
      render(<Hotels />);
      const links = screen.getAllByText(/View Website/i);
      expect(links.length).toBe(9);
    });

    it('all hotel links open in new tab with security attributes', () => {
      render(<Hotels />);
      const links = screen.getAllByText(/View Website/i);

      links.forEach((link) => {
        const anchor = link.closest('a');
        expect(anchor).toHaveAttribute('target', '_blank');
        expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
        expect(anchor).toHaveAttribute('href');
      });
    });
  });

  describe('Internationalization', () => {
    it('displays German content when language is German', () => {
      mockNavigatorLanguage('de-DE');
      render(<Hotels />);
      expect(screen.getByText(/Übernachtungsmöglichkeiten/i)).toBeInTheDocument();
      expect(screen.getByText(/Hochzeitslocation/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Zur Webseite/i).length).toBeGreaterThan(0);
    });

    it('switches intro text based on language', () => {
      render(<Hotels />);
      expect(screen.getByText(/In case you need a hotel/i)).toBeInTheDocument();

      mockNavigatorLanguage('de-DE');
      render(<Hotels />);
      expect(screen.getByText(/Falls ihr eine Unterkunft braucht/i)).toBeInTheDocument();
    });
  });

  describe('Layout and structure', () => {
    it('renders hotels in list format', () => {
      const { container } = render(<Hotels />);
      const hotelsList = container.querySelector('.hotels-list');
      expect(hotelsList).toBeInTheDocument();

      const hotelCards = container.querySelectorAll('.hotel-card');
      expect(hotelCards.length).toBe(9);
    });

    it('each hotel card has address with proper styling', () => {
      const { container } = render(<Hotels />);
      const addresses = container.querySelectorAll('.hotel-address');
      expect(addresses.length).toBe(9);

      addresses.forEach(address => {
        expect(address.textContent.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<Hotels />);

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();

      const h4s = screen.getAllByRole('heading', { level: 4 });
      expect(h4s.length).toBe(9);
    });

    it('all links have accessible text content', () => {
      render(<Hotels />);
      const links = screen.getAllByRole('link');

      links.forEach(link => {
        expect(link.textContent.trim().length).toBeGreaterThan(0);
      });
    });
  });
});
