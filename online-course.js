const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8501;

// Serve static assets from the 'dist' folder
app.use(express.static(path.join(__dirname, "dist")));

// Serve the React app's HTML file for all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
