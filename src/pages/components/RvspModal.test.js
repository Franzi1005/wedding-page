import { render, screen, fireEvent } from '@testing-library/react';
import RvspModal from './RvspModal';

const mockNavigatorLanguage = (lang) => {
  Object.defineProperty(window.navigator, 'language', {
    writable: true,
    configurable: true,
    value: lang,
  });
};

describe('RvspModal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockNavigatorLanguage('en-US');
    mockOnClose.mockClear();
  });

  it('does not render when open is false', () => {
    render(<RvspModal open={false} onClose={mockOnClose} />);
    expect(screen.queryByText('RSVP')).not.toBeInTheDocument();
  });

  it('renders when open is true', () => {
    render(<RvspModal open={true} onClose={mockOnClose} />);
    expect(screen.getByText('RSVP')).toBeInTheDocument();
  });

  it('displays all form fields', () => {
    render(<RvspModal open={true} onClose={mockOnClose} />);
    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bringing a Plus One/i)).toBeInTheDocument();
  });

  it('shows plus one name field when checkbox is checked', () => {
    render(<RvspModal open={true} onClose={mockOnClose} />);

    const checkbox = screen.getByLabelText(/bringing a Plus One/i);
    expect(screen.queryByPlaceholderText(/Plus One name/i)).not.toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(screen.getByPlaceholderText(/Plus One name/i)).toBeInTheDocument();
  });

  it('hides plus one name field when checkbox is unchecked', () => {
    render(<RvspModal open={true} onClose={mockOnClose} />);

    const checkbox = screen.getByLabelText(/bringing a Plus One/i);
    fireEvent.click(checkbox);
    expect(screen.getByPlaceholderText(/Plus One name/i)).toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(screen.queryByPlaceholderText(/Plus One name/i)).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<RvspModal open={true} onClose={mockOnClose} />);
    const closeButton = screen.getByRole('button', { name: /✕/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('has correct form action for Formspree', () => {
    const { container } = render(<RvspModal open={true} onClose={mockOnClose} />);
    const form = container.querySelector('form');
    expect(form).toHaveAttribute('action', 'https://formspree.io/f/mnjgynoy');
    expect(form).toHaveAttribute('method', 'POST');
  });

  it('marks name and email fields as required', () => {
    render(<RvspModal open={true} onClose={mockOnClose} />);
    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const emailInput = screen.getByPlaceholderText(/email address/i);

    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
  });

  it('displays German text when language is German', () => {
    mockNavigatorLanguage('de-DE');
    render(<RvspModal open={true} onClose={mockOnClose} />);
    expect(screen.getByText('Zusage')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Namen ein/i)).toBeInTheDocument();
  });

  it('updates input values when typing', () => {
    render(<RvspModal open={true} onClose={mockOnClose} />);

    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const emailInput = screen.getByPlaceholderText(/email address/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
  });
});
