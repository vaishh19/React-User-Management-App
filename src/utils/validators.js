// Email Validation Regex
const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Name Validation Regex
const nameRegex =
  /^[A-Za-z\s]+$/;

export function validateForm(formData) {
  const errors = {};

  // =========================
  // First Name
  // =========================

  if (!formData.firstName.trim()) {
    errors.firstName = "First Name is required.";
  } else if (formData.firstName.trim().length < 2) {
    errors.firstName =
      "First Name must contain at least 2 characters.";
  } else if (
    !nameRegex.test(formData.firstName)
  ) {
    errors.firstName =
      "Only alphabets are allowed.";
  }

  // =========================
  // Last Name
  // =========================

  if (!formData.lastName.trim()) {
    errors.lastName = "Last Name is required.";
  } else if (formData.lastName.trim().length < 2) {
    errors.lastName =
      "Last Name must contain at least 2 characters.";
  } else if (
    !nameRegex.test(formData.lastName)
  ) {
    errors.lastName =
      "Only alphabets are allowed.";
  }

  // =========================
  // Email
  // =========================

  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (
    !emailRegex.test(formData.email)
  ) {
    errors.email =
      "Please enter a valid email address.";
  }

  // =========================
  // Department
  // =========================

  if (!formData.department.trim()) {
    errors.department =
      "Please select a department.";
  }

  return errors;
}