
const express = require("express");

const app = express();

app.use(express.json());

let blogs = [
    {
        id: 1,
        title: "My First Blog",
        content: "Learning Node.js"
    },
    {
        id: 2,
        title: "My Second Blog",
        content: "Learning Express.js"
    }
];

// Home route
app.get("/", (req, res) => {
    res.send("Blog API is running successfully!");
});

// Get all blogs
app.get("/api/blogs", (req, res) => {
    res.json(blogs);
});

// Get a single blog
app.get("/api/blogs/:id", (req, res) => {
    const blog = blogs.find(b => b.id === Number(req.params.id));

    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
});

// Create a new blog
app.post("/api/blogs", (req, res) => {
    const newBlog = {
        id: blogs.length ? Math.max(...blogs.map(b => b.id)) + 1 : 1,
        title: req.body.title,
        content: req.body.content
    };

    blogs.push(newBlog);

    res.status(201).json(newBlog);
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
