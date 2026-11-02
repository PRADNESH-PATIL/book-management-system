
import React, { useState } from "react";
import API from "../services/api";

function AddBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
    price: ""
  });

  const [message, setMessage] = useState("");

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

      await API.post("/books", {
        ...formData,
        publishedYear: Number(formData.publishedYear),
        price: Number(formData.price)
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage("Book added successfully!");

      setFormData({
        title: "",
        author: "",
        genre: "",
        publishedYear: "",
        price: ""
      });

    } catch (error) {
      console.error("Error adding book:", error);
      setMessage(
        error.response?.data?.message || "Failed to add book."
      );
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Add New Book</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="publishedYear"
          placeholder="Published Year"
          value={formData.publishedYear}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Book</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AddBook;
