const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

dotenv.config();

const app= express();

//middleware

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

//database connection

connectDB();

//test api

app.get("/", (req , res)=> {
    res.send(" Api is running ");
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});

