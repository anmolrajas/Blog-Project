const express = require('express');
const cors = require('cors');
const connectMongoDB = require('./connection')
const blogRoutes = require('./routes/blogRoutes')
const userRoutes = require('./routes/userRoutes')
const app = express();
const PORT = 8000;

connectMongoDB("mongodb://127.0.0.1:27017/blogProjectDB").then(() => {
    console.log("MongoDB Connected Successfully");
}).catch((err) => {
    console.log("MogoDB Connection Error:- ", err);
})

app.use(cors());

app.use(express.json());

app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    return res.end('Hello from server');
})

app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`);
})