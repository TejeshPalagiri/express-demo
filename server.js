require('dotenv').config(); // Initialzes all the process variables
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const v1 = require('./routes/v1');
const cors = require('cors');

// Middlewrre
// Body parser
app.use(express.json());
app.use(cors());
app.use('/api/v1', v1);

// Simple route
app.get('/', (req, res, next) => {
    // 2xx
    try {
        res.status(200).json({
            success: true,
            message: 'Welcome to Express!'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Welcome to Express!'
        })
    }
});


// Listening
app.listen(port, () => {
    console.log("server is up and listening on port", port)
})