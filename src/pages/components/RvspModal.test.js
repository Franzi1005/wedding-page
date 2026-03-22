import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  describe('Rendering', () => {
    it('does not render when open is false', () => {
      render(<RvspModal open={false} close={mockOnClose} />);
      expect(screen.queryByText('RSVP')).not.toBeInTheDocument();
    });

    it('renders when open is true', () => {
      render(<RvspModal open={true} close={mockOnClose} />);
      expect(screen.getByText('RSVP')).toBeInTheDocument();
    });

    it('displays all required form fields', () => {
      render(<RvspModal open={true} close={mockOnClose} />);
      expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/bringing a Plus One/i)).toBeInTheDocument();
      expect(screen.getByText(/Dietary Preferences/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Food allergies/i)).toBeInTheDocument();
    });

    it('displays dietary preference options', () => {
      render(<RvspModal open={true} close={mockOnClose} />);
      expect(screen.getByLabelText(/No dietary restrictions/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Vegetarian/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Vegan/i)).toBeInTheDocument();
    });
  });

  describe('Plus One functionality', () => {
    it('shows plus one name field when checkbox is checked', () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const checkbox = screen.getByLabelText(/bringing a Plus One/i);
      expect(screen.queryByPlaceholderText(/Plus One name/i)).not.toBeInTheDocument();

      fireEvent.click(checkbox);
      expect(screen.getByPlaceholderText(/Plus One name/i)).toBeInTheDocument();
    });

    it('hides plus one name field when checkbox is unchecked', () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const checkbox = screen.getByLabelText(/bringing a Plus One/i);
      fireEvent.click(checkbox);
      expect(screen.getByPlaceholderText(/Plus One name/i)).toBeInTheDocument();

      fireEvent.click(checkbox);
      expect(screen.queryByPlaceholderText(/Plus One name/i)).not.toBeInTheDocument();
    });
  });

  describe('Dietary preferences', () => {
    it('allows selecting only one dietary preference at a time', async () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const noneRadio = screen.getByLabelText(/No dietary restrictions/i);
      const vegetarianRadio = screen.getByLabelText(/Vegetarian/i);
      const veganRadio = screen.getByLabelText(/Vegan/i);

      fireEvent.click(noneRadio);
      expect(noneRadio).toBeChecked();
      expect(vegetarianRadio).not.toBeChecked();
      expect(veganRadio).not.toBeChecked();

      fireEvent.click(vegetarianRadio);
      expect(noneRadio).not.toBeChecked();
      expect(vegetarianRadio).toBeChecked();
      expect(veganRadio).not.toBeChecked();

      fireEvent.click(veganRadio);
      expect(noneRadio).not.toBeChecked();
      expect(vegetarianRadio).not.toBeChecked();
      expect(veganRadio).toBeChecked();
    });
  });

  describe('Form validation', () => {
    it('shows error when name field is empty on blur', async () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      fireEvent.focus(nameInput);
      fireEvent.blur(nameInput);

      await waitFor(() => {
        expect(screen.getByText(/Please enter your name/i)).toBeInTheDocument();
      });
    });

    it('shows error when email is empty on blur', async () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const emailInput = screen.getByPlaceholderText(/email address/i);
      fireEvent.focus(emailInput);
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.getByText(/Please enter your email address/i)).toBeInTheDocument();
      });
    });

    it('shows error when email format is invalid', async () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const emailInput = screen.getByPlaceholderText(/email address/i);
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    it('clears error when valid email is entered', async () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const emailInput = screen.getByPlaceholderText(/email address/i);
      fireEvent.change(emailInput, { target: { value: 'invalid' } });
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      });

      fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });

      await waitFor(() => {
        expect(screen.queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
      });
    });

    it('shows error when dietary preference is not selected on submit', async () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const submitButton = screen.getByDisplayValue(/Send RSVP/i);

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Please select a dietary preference/i)).toBeInTheDocument();
      });
    });

    it('shows error when plus one name is empty after checking plus one', async () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const plusOneCheckbox = screen.getByLabelText(/bringing a Plus One/i);
      fireEvent.click(plusOneCheckbox);

      const plusOneNameInput = screen.getByPlaceholderText(/Plus One name/i);
      fireEvent.focus(plusOneNameInput);
      fireEvent.blur(plusOneNameInput);

      await waitFor(() => {
        expect(screen.getByText(/Please enter your plus one's name/i)).toBeInTheDocument();
      });
    });

    it('does not show errors before user interaction', () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      expect(screen.queryByText(/Please enter your name/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Please enter your email/i)).not.toBeInTheDocument();
    });

    it('prevents form submission when required fields are missing', async () => {
      const { container } = render(<RvspModal open={true} close={mockOnClose} />);

      const form = container.querySelector('form');
      const submitButton = screen.getByDisplayValue(/Send RSVP/i);

      const formSubmitSpy = jest.fn();
      form.onsubmit = formSubmitSpy;

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Please enter your name/i)).toBeInTheDocument();
        expect(screen.getByText(/Please enter your email address/i)).toBeInTheDocument();
        expect(screen.getByText(/Please select a dietary preference/i)).toBeInTheDocument();
      });
    });
  });

  describe('User interactions', () => {
    it('calls close when close button is clicked', () => {
      render(<RvspModal open={true} close={mockOnClose} />);
      const closeButton = screen.getByRole('button', { name: /✕/i });
      fireEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('updates input values when typing', () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

      expect(nameInput).toHaveValue('John Doe');
      expect(emailInput).toHaveValue('john@example.com');
    });

    it('updates comments textarea when typing', () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const commentsTextarea = screen.getByPlaceholderText(/Food allergies/i);
      fireEvent.change(commentsTextarea, { target: { value: 'Allergic to peanuts' } });

      expect(commentsTextarea).toHaveValue('Allergic to peanuts');
    });
  });

  describe('Form submission', () => {
    it('has correct form action for Formspree', () => {
      const { container } = render(<RvspModal open={true} close={mockOnClose} />);
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('action', 'https://formspree.io/f/mnjgynoy');
      expect(form).toHaveAttribute('method', 'POST');
    });

    it('submits form when all required fields are valid', async () => {
      const { container } = render(<RvspModal open={true} close={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const noneRadio = screen.getByLabelText(/No dietary restrictions/i);

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.click(noneRadio);

      const form = container.querySelector('form');
      const submitSpy = jest.spyOn(form, 'submit').mockImplementation(() => {});

      const submitButton = screen.getByDisplayValue(/Send RSVP/i);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitSpy).toHaveBeenCalled();
      });

      submitSpy.mockRestore();
    });
  });

  describe('Internationalization', () => {
    it('displays German text when language is German', () => {
      mockNavigatorLanguage('de-DE');
      render(<RvspModal open={true} close={mockOnClose} />);
      expect(screen.getByText('Zusage')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Namen ein/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Keine Einschränkungen/i)).toBeInTheDocument();
    });

    it('displays English text when language is English', () => {
      mockNavigatorLanguage('en-US');
      render(<RvspModal open={true} close={mockOnClose} />);
      expect(screen.getByText('RSVP')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/No dietary restrictions/i)).toBeInTheDocument();
    });
  });
});
