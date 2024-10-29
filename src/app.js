const express = require('express');
const cors = require('cors'); // Importing CORS middleware
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser'); // Importing cookie parser
const connection = require('./database'); // Import the database connection
const backendRoutes = require('./backend'); // Importing the backend.js file

const app = express();
const port = process.env.PORT || 8080; // Use the Render-provided port or default to 8080

// Enable CORS for all origins temporarily
app.use(cors());

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files (like images, CSS, JS) from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Register backend routes for /auth endpoints
app.use('/api', backendRoutes); // Adjust the path based on your backend.js configuration

// Serve the home page (home.html)
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../public', 'home.html');
    res.sendFile(filePath);
});

// Handle requests for missing routes (404 errors) with an explicit response
app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>'); // Explicitly send a 404 status with a message
});

// Start the server
app.listen(port, (err) => {
    if (err) {
        console.error('Server startup error:', err);
        process.exit(1); // Exit if the server fails to start
    } else {
        console.log(`Server running on port ${port}`);
        // Attempt to connect to the database
        connection.connect((dbErr) => {
            if (dbErr) {
                console.error('Database connection error:', dbErr);
            } else {
                console.log('Database Connected!');
            }
        });
    }
});
