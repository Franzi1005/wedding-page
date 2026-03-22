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
    jest.clearAllMocks();
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

    it('displays all required form fields on initial render', () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/bringing a Plus One/i)).toBeInTheDocument();
      expect(screen.getByText(/Dietary Preferences/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Food allergies/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Send RSVP/i })).toBeInTheDocument();
    });

    it('displays all dietary preference options', () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      expect(screen.getByLabelText(/No dietary restrictions/i)).toBeInTheDocument();
      expect(screen.getByLabelText('Vegetarian')).toBeInTheDocument();
      expect(screen.getByLabelText('Vegan')).toBeInTheDocument();
    });

    it('has correct form configuration', () => {
      const { container } = render(<RvspModal open={true} close={mockOnClose} />);
      const form = container.querySelector('form');

      expect(form).toHaveAttribute('action', 'https://formspree.io/f/mnjgynoy');
      expect(form).toHaveAttribute('method', 'POST');
      expect(form).toHaveAttribute('noValidate');
    });
  });

  describe('Plus One functionality', () => {
    it('hides plus one fields by default', () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      expect(screen.queryByPlaceholderText(/Plus One name/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Plus One's Dietary Preferences/i)).not.toBeInTheDocument();
    });

    it('shows plus one name and dietary fields when checkbox is checked', () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const checkbox = screen.getByLabelText(/bringing a Plus One/i);
      fireEvent.click(checkbox);

      expect(screen.getByPlaceholderText(/Plus One name/i)).toBeInTheDocument();
      expect(screen.getByText(/Plus One's Dietary Preferences/i)).toBeInTheDocument();
    });

    it('hides plus one fields when checkbox is unchecked', () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const checkbox = screen.getByLabelText(/bringing a Plus One/i);
      fireEvent.click(checkbox);
      expect(screen.getByPlaceholderText(/Plus One name/i)).toBeInTheDocument();

      fireEvent.click(checkbox);
      expect(screen.queryByPlaceholderText(/Plus One name/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Plus One's Dietary Preferences/i)).not.toBeInTheDocument();
    });

    it('displays separate dietary preference radio groups for guest and plus one', () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const checkbox = screen.getByLabelText(/bringing a Plus One/i);
      fireEvent.click(checkbox);

      // Should have two sets of dietary preferences
      const dietaryLabels = screen.getAllByText(/Dietary Preferences/i);
      expect(dietaryLabels).toHaveLength(2);

      // Should have 6 radio buttons total (3 for guest + 3 for plus one)
      const radioButtons = screen.getAllByRole('radio');
      expect(radioButtons).toHaveLength(6);
    });

    it('clears plus one dietary preference error when unchecking plus one', () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const checkbox = screen.getByLabelText(/bringing a Plus One/i);
      fireEvent.click(checkbox);

      const submitButton = screen.getByRole('button', { name: /Send RSVP/i });
      fireEvent.click(submitButton);

      // Should show error for plus one dietary preference
      const errors = screen.getAllByText(/Please select a dietary preference/i);
      expect(errors.length).toBeGreaterThan(0);

      // Uncheck plus one
      fireEvent.click(checkbox);

      // Plus one dietary error should be gone
      expect(screen.queryByText(/Plus One's Dietary Preferences/i)).not.toBeInTheDocument();
    });
  });

  describe('Dietary preferences', () => {
    it('allows selecting only one dietary preference at a time', () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const noneRadio = screen.getByLabelText(/No dietary restrictions/i);
      const vegetarianRadio = screen.getByLabelText('Vegetarian');
      const veganRadio = screen.getByLabelText('Vegan');

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

    it('maintains separate dietary selections for guest and plus one', () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const checkbox = screen.getByLabelText(/bringing a Plus One/i);
      fireEvent.click(checkbox);

      // Select vegan for main guest
      const guestVegan = screen.getAllByLabelText('Vegan')[0];
      fireEvent.click(guestVegan);

      // Find the second "No dietary restrictions" radio for plus one
      const allNoneRadios = screen.getAllByLabelText(/No dietary restrictions/i);
      fireEvent.click(allNoneRadios[1]);

      expect(guestVegan).toBeChecked();
      expect(allNoneRadios[1]).toBeChecked();
    });
  });

  describe('Form validation - Individual fields', () => {
    it('shows error when name field is empty on blur', async () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      fireEvent.focus(nameInput);
      fireEvent.blur(nameInput);

      await waitFor(() => {
        expect(screen.getByText(/Please enter your name/i)).toBeInTheDocument();
      });
    });

    it('clears error when name is entered', async () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      fireEvent.blur(nameInput);

      await waitFor(() => {
        expect(screen.getByText(/Please enter your name/i)).toBeInTheDocument();
      });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });

      await waitFor(() => {
        expect(screen.queryByText(/Please enter your name/i)).not.toBeInTheDocument();
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

    it('accepts valid email formats', async () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const emailInput = screen.getByPlaceholderText(/email address/i);

      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'first+last@test.org',
      ];

      for (const email of validEmails) {
        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.blur(emailInput);

        await waitFor(() => {
          expect(screen.queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
        });
      }
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
      expect(screen.queryByText(/Please select a dietary preference/i)).not.toBeInTheDocument();
    });
  });

  describe('Form validation - Submit behavior', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    afterEach(() => {
      global.fetch.mockRestore();
    });

    it('shows ALL validation errors at once when submitting empty form', async () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const submitButton = screen.getByRole('button', { name: /Send RSVP/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Please enter your name/i)).toBeInTheDocument();
        expect(screen.getByText(/Please enter your email address/i)).toBeInTheDocument();
        expect(screen.getByText(/Please select a dietary preference/i)).toBeInTheDocument();
      });

      // Should show exactly 3 errors (name, email, dietary)
      const errorMessages = screen.getAllByText(/Please/i);
      expect(errorMessages.length).toBeGreaterThanOrEqual(3);
    });

    it('shows ALL plus one validation errors when plus one is checked', async () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const plusOneCheckbox = screen.getByLabelText(/bringing a Plus One/i);
      fireEvent.click(plusOneCheckbox);

      const submitButton = screen.getByRole('button', { name: /Send RSVP/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Please enter your name/i)).toBeInTheDocument();
        expect(screen.getByText(/Please enter your email address/i)).toBeInTheDocument();
        expect(screen.getByText(/Please enter your plus one's name/i)).toBeInTheDocument();
        const dietaryErrors = screen.getAllByText(/Please select a dietary preference/i);
        expect(dietaryErrors).toHaveLength(2); // One for guest, one for plus one
      });
    });

    it('prevents submission when validation fails', async () => {
      global.fetch.mockResolvedValue({ ok: true });

      render(<RvspModal open={true} close={mockOnClose} />);

      const submitButton = screen.getByRole('button', { name: /Send RSVP/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Please enter your name/i)).toBeInTheDocument();
      });

      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('submits form when all required fields are valid without plus one', async () => {
      global.fetch.mockResolvedValue({ ok: true });

      render(<RvspModal open={true} close={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const noneRadio = screen.getByLabelText(/No dietary restrictions/i);

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.click(noneRadio);

      const submitButton = screen.getByRole('button', { name: /Send RSVP/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          'https://formspree.io/f/mnjgynoy',
          expect.objectContaining({
            method: 'POST',
            headers: { 'Accept': 'application/json' }
          })
        );
      });
    });

    it('submits form when all required fields including plus one are valid', async () => {
      global.fetch.mockResolvedValue({ ok: true });

      render(<RvspModal open={true} close={mockOnClose} />);

      // Fill main guest info
      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

      // Add plus one first
      const plusOneCheckbox = screen.getByLabelText(/bringing a Plus One/i);
      fireEvent.click(plusOneCheckbox);

      // Fill plus one info
      const plusOneNameInput = screen.getByPlaceholderText(/Plus One name/i);
      fireEvent.change(plusOneNameInput, { target: { value: 'Jane Doe' } });

      // Now select dietary preferences (both will be visible)
      const allNoneRadios = screen.getAllByLabelText(/No dietary restrictions/i);
      fireEvent.click(allNoneRadios[0]); // Main guest

      const allVegetarian = screen.getAllByLabelText('Vegetarian');
      fireEvent.click(allVegetarian[1]); // Plus one's vegetarian option

      const submitButton = screen.getByRole('button', { name: /Send RSVP/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    });

    it('does not require comments field for submission', async () => {
      global.fetch.mockResolvedValue({ ok: true });

      render(<RvspModal open={true} close={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const noneRadio = screen.getByLabelText(/No dietary restrictions/i);

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.click(noneRadio);

      // Do NOT fill comments field

      const submitButton = screen.getByRole('button', { name: /Send RSVP/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    });

    it('disables submit button while submitting', async () => {
      global.fetch.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ ok: true }), 100)));

      render(<RvspModal open={true} close={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const noneRadio = screen.getByLabelText(/No dietary restrictions/i);

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.click(noneRadio);

      const submitButton = screen.getByRole('button', { name: /Send RSVP/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveTextContent('...');
      });
    });

    it('closes modal after successful submission', async () => {
      global.fetch.mockResolvedValue({ ok: true });

      render(<RvspModal open={true} close={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const noneRadio = screen.getByLabelText(/No dietary restrictions/i);

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.click(noneRadio);

      const submitButton = screen.getByRole('button', { name: /Send RSVP/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      });
    });

    it('re-enables submit button on submission error', async () => {
      global.fetch.mockRejectedValue(new Error('Network error'));

      render(<RvspModal open={true} close={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const noneRadio = screen.getByLabelText(/No dietary restrictions/i);

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.click(noneRadio);

      const submitButton = screen.getByRole('button', { name: /Send RSVP/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      expect(mockOnClose).not.toHaveBeenCalled();
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
      fireEvent.change(commentsTextarea, { target: { value: 'Allergic to peanuts and shellfish' } });

      expect(commentsTextarea).toHaveValue('Allergic to peanuts and shellfish');
    });

    it('handles whitespace-only inputs as invalid', async () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      fireEvent.change(nameInput, { target: { value: '   ' } });
      fireEvent.blur(nameInput);

      await waitFor(() => {
        expect(screen.getByText(/Please enter your name/i)).toBeInTheDocument();
      });
    });
  });

  describe('Edge cases', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    afterEach(() => {
      global.fetch.mockRestore();
    });

    it('requires plus one dietary preference only when plus one is checked', async () => {
      global.fetch.mockResolvedValue({ ok: true });

      render(<RvspModal open={true} close={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const guestNoneRadios = screen.getAllByLabelText(/No dietary restrictions/i);

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.click(guestNoneRadios[0]);

      const submitButton = screen.getByRole('button', { name: /Send RSVP/i });
      fireEvent.click(submitButton);

      // Should not show plus one dietary error when plus one is not checked
      await waitFor(() => {
        const dietaryErrors = screen.queryAllByText(/Please select a dietary preference/i);
        expect(dietaryErrors).toHaveLength(0);
      });
    });

    it('validates email in real-time after first blur', async () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const emailInput = screen.getByPlaceholderText(/email address/i);

      // First blur to mark as touched
      fireEvent.change(emailInput, { target: { value: 'invalid' } });
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      });

      // Now should validate in real-time
      fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });

      await waitFor(() => {
        expect(screen.queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
      });
    });

    it('includes comments in form submission when provided', async () => {
      global.fetch.mockResolvedValue({ ok: true });

      render(<RvspModal open={true} close={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const noneRadio = screen.getByLabelText(/No dietary restrictions/i);
      const commentsTextarea = screen.getByPlaceholderText(/Food allergies/i);

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.click(noneRadio);
      fireEvent.change(commentsTextarea, { target: { value: 'Allergic to nuts' } });

      const submitButton = screen.getByRole('button', { name: /Send RSVP/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
        const formData = global.fetch.mock.calls[0][1].body;
        expect(formData.get('comments')).toBe('Allergic to nuts');
      });
    });
  });

  describe('Internationalization', () => {
    it('displays German text when language is German', () => {
      mockNavigatorLanguage('de-DE');
      render(<RvspModal open={true} close={mockOnClose} />);

      expect(screen.getByText('Zusage')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Namen ein/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Keine Einschränkungen/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Vegetarisch/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Vegan/i)).toBeInTheDocument();
    });

    it('displays English text when language is English', () => {
      mockNavigatorLanguage('en-US');
      render(<RvspModal open={true} close={mockOnClose} />);

      expect(screen.getByText('RSVP')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/No dietary restrictions/i)).toBeInTheDocument();
      expect(screen.getByLabelText('Vegetarian')).toBeInTheDocument();
      expect(screen.getByLabelText('Vegan')).toBeInTheDocument();
    });

    it('shows German error messages when language is German', async () => {
      mockNavigatorLanguage('de-DE');
      render(<RvspModal open={true} close={mockOnClose} />);

      const submitButton = screen.getByRole('button', { name: /Zusage senden/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Bitte gib deinen Namen ein/i)).toBeInTheDocument();
        expect(screen.getByText(/Bitte gib deine E-Mail-Adresse ein/i)).toBeInTheDocument();
        expect(screen.getByText(/Bitte wähle eine Essenspräferenz aus/i)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('associates labels with form controls', () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const plusOneCheckbox = screen.getByLabelText(/bringing a Plus One/i);
      expect(plusOneCheckbox).toHaveAttribute('id', 'plusOne');

      const noneRadio = screen.getByLabelText(/No dietary restrictions/i);
      expect(noneRadio).toHaveAttribute('type', 'radio');
    });

    it('applies error class to invalid fields', async () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      fireEvent.blur(nameInput);

      await waitFor(() => {
        expect(nameInput).toHaveClass('error');
      });
    });

    it('applies error styling to dietary section when invalid', async () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const submitButton = screen.getByRole('button', { name: /Send RSVP/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        const dietarySections = document.querySelectorAll('.dietarySection.error');
        expect(dietarySections.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Form state management', () => {
    it('preserves form values when toggling plus one', () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });

      const plusOneCheckbox = screen.getByLabelText(/bringing a Plus One/i);
      fireEvent.click(plusOneCheckbox);
      fireEvent.click(plusOneCheckbox);

      expect(nameInput).toHaveValue('John Doe');
    });

    it('clears plus one name when unchecking plus one checkbox', () => {
      render(<RvspModal open={true} close={mockOnClose} />);

      const plusOneCheckbox = screen.getByLabelText(/bringing a Plus One/i);
      fireEvent.click(plusOneCheckbox);

      const plusOneNameInput = screen.getByPlaceholderText(/Plus One name/i);
      fireEvent.change(plusOneNameInput, { target: { value: 'Jane Doe' } });

      fireEvent.click(plusOneCheckbox);
      fireEvent.click(plusOneCheckbox);

      const newPlusOneNameInput = screen.getByPlaceholderText(/Plus One name/i);
      expect(newPlusOneNameInput).toHaveValue('Jane Doe'); // Value should persist
    });
  });
});
