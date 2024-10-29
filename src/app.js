const express = require('express');
const cors = require('cors'); // Importing CORS middleware
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser'); // Importing cookie parser
const connection = require('./database'); // Import the database connection
const backendRoutes = require('./backend'); // Importing the backend.js file

const app = express();
const port = process.env.PORT || 8080; // Use the Azure-provided port or default to 3000

// Enable CORS for all routes with specific options to allow credentials
app.use(cors({
    origin: '*',
    credentials: true
}));


// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files (like images, CSS, JS) from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Register backend routes for /auth endpoints
app.use(backendRoutes);

// Serve the home page (home.html)
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../public', 'home.html');
    res.sendFile(filePath);
});

// Handle requests for missing routes (404 errors)
app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    connection.connect(function (err) {
        if (err) {
            console.error('Database connection error:', err);
        } else {
            console.log('Database Connected!');
        }
    });
});
