const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "usersTwo", "usersThree"]})
});

app.listen(3000, () => {console.log("Server started on port 5000")})