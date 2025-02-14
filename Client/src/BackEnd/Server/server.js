const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: "https://localhost:5173",
}
app.use(cors(corsOptions));

app.get('/api', (req, res) => {
    res.json({ fruits: ["apple", "oranges", "bananas"] });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});