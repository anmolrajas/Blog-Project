const express = require('express');
const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
    return res.end('Hello from server');
})

app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`);
})