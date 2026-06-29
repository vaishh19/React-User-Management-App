function Header({ onAdd }) {
  return (
    <header className="header">

      <div className="header-left">

        <h1>User Management Dashboard</h1>

        <p>
          Manage your users efficiently
        </p>

      </div>

      <div className="header-right">

        <button
          className="add-btn"
          onClick={onAdd}
        >
          + Add User
        </button>

      </div>

    </header>
  );
}

export default Header;