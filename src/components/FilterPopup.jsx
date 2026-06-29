import { useState } from "react";

function FilterPopup({ filters, setFilters }) {
  const [showFilter, setShowFilter] = useState(false);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const clearFilters = () => {
    setFilters({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });
  };

  return (
    <div className="filter-wrapper">

      <button
        className="filter-btn"
        onClick={() => setShowFilter(!showFilter)}
      >
        {showFilter ? "✖ Close Filters" : "⚙ Filters"}
      </button>

      {showFilter && (
        <div className="filter-popup">

          <div className="filter-grid">

            <div className="filter-group">
              <label>First Name</label>

              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                value={filters.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="filter-group">
              <label>Last Name</label>

              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={filters.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="filter-group">
              <label>Email</label>

              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                value={filters.email}
                onChange={handleChange}
              />
            </div>

            <div className="filter-group">
              <label>Department</label>

              <select
                name="department"
                value={filters.department}
                onChange={handleChange}
              >
                <option value="">All Departments</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

          </div>

          <div className="filter-actions">

            <button
              className="clear-btn"
              onClick={clearFilters}
            >
              Reset
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default FilterPopup;