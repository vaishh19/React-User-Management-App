import { useEffect, useState } from "react";
import { validateForm } from "../utils/validators";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  department: "",
};

function UserForm({
  user,
  users,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData(initialState);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const validationErrors = validateForm(formData);

  const emailExists = users.some((existingUser) => {
    return (
      existingUser.email.toLowerCase() ===
        formData.email.toLowerCase() &&
      existingUser.id !== formData.id
    );
  });

  if (emailExists) {
    validationErrors.email =
      "Email already exists.";
  }

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  onSave(formData);
};

  return (
    <div className="modal-overlay">

      <div className="user-form-card">

        <div className="form-header">

          <h2>
            {user ? "Edit User" : "Add New User"}
          </h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✖
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>First Name</label>

            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={handleChange}
            />

            {errors.firstName && (
              <span className="error">
                {errors.firstName}
              </span>
            )}

          </div>

          <div className="input-group">

            <label>Last Name</label>

            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />

            {errors.lastName && (
              <span className="error">
                {errors.lastName}
              </span>
            )}

          </div>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <span className="error">
                {errors.email}
              </span>
            )}

          </div>

          <div className="input-group">

            <label>Department</label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">
                Select Department
              </option>

              <option value="IT">
                IT
              </option>

              <option value="HR">
                HR
              </option>

              <option value="Finance">
                Finance
              </option>

              <option value="Sales">
                Sales
              </option>

              <option value="Marketing">
                Marketing
              </option>

            </select>

            {errors.department && (
              <span className="error">
                {errors.department}
              </span>
            )}

          </div>

          <div className="form-buttons">

            <button
              type="submit"
              className="save-btn"
            >
              {user
                ? "Update User"
                : "Add User"}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default UserForm;