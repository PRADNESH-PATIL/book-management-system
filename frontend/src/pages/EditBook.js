
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
    price: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await API.get(`/books/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error(error);
        setMessage("Unable to load book details.");
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/books/${id}`,
        {
          ...formData,
          publishedYear: Number(formData.publishedYear),
          price: Number(formData.price)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Book updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Failed to update book."
      );
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Edit Book</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book Title"
          required
        />

        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />

        <input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
        />

        <input
          type="number"
          name="publishedYear"
          value={formData.publishedYear}
          onChange={handleChange}
          placeholder="Published Year"
          required
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />

        <button type="submit">Update Book</button>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default EditBook;
