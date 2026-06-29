function UserRow({ user, onEdit, onDelete }) {
  return (
    <tr>

      <td>{user.id}</td>

      <td>{user.firstName}</td>

      <td>{user.lastName}</td>

      <td>{user.email}</td>

      <td>
        <span className={`department ${user.department.toLowerCase()}`}>
          {user.department}
        </span>
      </td>

      <td>

        <div className="action-buttons">

          <button
            className="edit-btn"
            onClick={() => onEdit(user)}
            title="Edit User"
          >
            ✏ Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(user.id)}
            title="Delete User"
          >
            🗑 Delete
          </button>

        </div>

      </td>

    </tr>
  );
}

export default UserRow;