
import React, { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
            const response = await API.post(
                "/auth/login",
                formData
            );

            localStorage.setItem("token", response.data.token);

            setMessage("Login successful!");

            navigate("/dashboard");

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Book Management Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Login</button>

                {message && <p>{message}</p>}

                <p>
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
