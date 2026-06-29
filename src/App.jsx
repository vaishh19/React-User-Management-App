import { useEffect, useMemo, useState } from "react";

import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "./api/userService";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterPopup from "./components/FilterPopup";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import Pagination from "./components/Pagination";
import ConfirmDelete from "./components/ConfirmDelete";

import "./styles/app.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  async function loadUsers() {
    try {
      setLoading(true);

      const localUsers = localStorage.getItem("users");

      if (localUsers) {
        setUsers(JSON.parse(localUsers));
        setLoading(false);
        return;
      }

      const response = await getUsers();

      const departments = [
        "IT",
        "HR",
        "Finance",
        "Sales",
        "Marketing",
      ];

      const mappedUsers = response.data.map((user, index) => {
        const names = user.name.split(" ");

        return {
          id: user.id,
          firstName: names[0],
          lastName: names.slice(1).join(" "),
          email: user.email,
          department:
            departments[index % departments.length],
        };
      });

      setUsers(mappedUsers);

      localStorage.setItem(
        "users",
        JSON.stringify(mappedUsers)
      );
    } catch (err) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  }
    const filteredUsers = useMemo(() => {
    let filtered = [...users];

    // Global Search
    if (search.trim()) {
      filtered = filtered.filter((user) => {
        return (
          user.firstName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          user.lastName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          user.email
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          user.department
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      });
    }

    // Advanced Filters
    filtered = filtered.filter((user) => {
      return (
        user.firstName
          .toLowerCase()
          .includes(filters.firstName.toLowerCase()) &&
        user.lastName
          .toLowerCase()
          .includes(filters.lastName.toLowerCase()) &&
        user.email
          .toLowerCase()
          .includes(filters.email.toLowerCase()) &&
        user.department
          .toLowerCase()
          .includes(filters.department.toLowerCase())
      );
    });

    // Sorting
    if (sortField) {
      filtered.sort((a, b) => {
        const valueA = a[sortField]
          .toString()
          .toLowerCase();

        const valueB = b[sortField]
          .toString()
          .toLowerCase();

        if (sortOrder === "asc") {
          return valueA.localeCompare(valueB);
        }

        return valueB.localeCompare(valueA);
      });
    }

    return filtered;
  }, [
    users,
    search,
    filters,
    sortField,
    sortOrder,
  ]);

  // Pagination
  const totalPages = Math.ceil(
    filteredUsers.length / pageSize
  );

  const startIndex =
    (currentPage - 1) * pageSize;

  const endIndex = startIndex + pageSize;

  const currentUsers =
    filteredUsers.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredUsers, pageSize]);
    // ==========================
  // Add / Update User
  // ==========================

  async function handleSave(user) {
  try {
    if (editingUser) {
      if (editingUser.id <= 10) {
        try {
          await updateUser(editingUser.id, user);
        } catch (error) {
          console.log("API update failed. Updating local data.");
        }
      }

      const updatedUsers = users.map((u) =>
        u.id === editingUser.id
          ? { ...user, id: editingUser.id }
          : u
      );

      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    } else {
      try {
        await addUser(user);
      } catch (error) {
        console.log("API add failed. Saving locally.");
      }

      const nextId =
        users.length > 0
          ? Math.max(...users.map((u) => u.id)) + 1
          : 1;

      const newUser = {
        ...user,
        id: nextId,
      };

      const updatedUsers = [...users, newUser];

      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    setShowForm(false);
    setEditingUser(null);
  } catch (error) {
    alert("Unable to save user.");
  }
}

  // ==========================
  // Edit User
  // ==========================

  function handleEdit(user) {
    setEditingUser(user);
    setShowForm(true);
  }

  // ==========================
  // Delete User
  // ==========================

 async function handleDelete() {
  try {
    if (deleteId <= 10) {
      try {
        await deleteUser(deleteId);
      } catch (error) {
        console.log("API delete failed. Removing local data.");
      }
    }

    const updatedUsers = users.filter(
      (user) => user.id !== deleteId
    );

    setUsers(updatedUsers);

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    setDeleteId(null);
  } catch (error) {
    alert("Unable to delete user.");
  }
}

  function handleSort(field) {
    if (sortField === field) {
      setSortOrder(
        sortOrder === "asc"
          ? "desc"
          : "asc"
      );
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }

  // ==========================
  // Add Button
  // ==========================

  function openAddForm() {
    setEditingUser(null);
    setShowForm(true);
  }

  // ==========================
  // Close Form
  // ==========================

  function closeForm() {
    setShowForm(false);
    setEditingUser(null);
  }
    return (
    <div className="app">

      <Header onAdd={openAddForm} />

      <div className="top-section">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <FilterPopup
          filters={filters}
          setFilters={setFilters}
        />

      </div>

      {loading && (
        <div className="loading">
          <h2>Loading Users...</h2>
        </div>
      )}

      {!loading && error && (
        <div className="error-box">
          <h3>{error}</h3>
        </div>
      )}

      {!loading && !error && (
        <>

          <UserTable
            users={currentUsers}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
            onEdit={handleEdit}
            onDelete={setDeleteId}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
            setPageSize={setPageSize}
          />

        </>
      )}

      {showForm && (
       <UserForm
      user={editingUser}
      users={users}
      onSave={handleSave}
      onClose={closeForm}
    />
      )}

      {deleteId !== null && (
        <ConfirmDelete
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}

    </div>
  );
}

export default App;