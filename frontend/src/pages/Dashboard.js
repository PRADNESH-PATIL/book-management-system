
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const response = await API.get("/books");
      setBooks(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Book deleted successfully!");
      fetchBooks();
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Failed to delete book."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <h2>Loading books...</h2>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Book Management System</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h2>All Books</h2>

      <button onClick={() => navigate("/add-book")}>
        Add New Book
      </button>

      {error && <p>{error}</p>}

      {books.length === 0 ? (
        <p>No books found. Add your first book!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Published Year</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.publishedYear}</td>
                <td>₹{book.price}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/edit-book/${book._id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
