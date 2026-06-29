import UserRow from "./UserRow";

function UserTable({
  users,
  sortField,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
}) {
  const getSortIcon = (field) => {
    if (sortField !== field) return "⇅";
    return sortOrder === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className="table-container">
      <table>

        <thead>
          <tr>

            <th>ID</th>

            <th onClick={() => onSort("firstName")}>
              First Name {getSortIcon("firstName")}
            </th>

            <th onClick={() => onSort("lastName")}>
              Last Name {getSortIcon("lastName")}
            </th>

            <th onClick={() => onSort("email")}>
              Email {getSortIcon("email")}
            </th>

            <th onClick={() => onSort("department")}>
              Department {getSortIcon("department")}
            </th>

            <th width="180">Actions</th>

          </tr>
        </thead>

        <tbody>

          {users.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="empty-row"
              >
                No Users Found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}

        </tbody>

      </table>
    </div>
  );
}

export default UserTable;