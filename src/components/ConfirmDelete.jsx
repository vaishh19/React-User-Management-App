function ConfirmDelete({ onConfirm, onCancel }) {
  return (
    <div className="delete-overlay">

      <div className="delete-modal">

        <div className="delete-icon">
          ⚠️
        </div>

        <h2>Delete User</h2>

        <p>
          Are you sure you want to delete this user?
          <br />
          This action cannot be undone.
        </p>

        <div className="delete-actions">

          <button
            className="cancel-delete-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="confirm-delete-btn"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmDelete;