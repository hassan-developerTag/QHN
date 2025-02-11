const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const path = require('path');

require("dotenv").config();
require("./Models/db");

const app = express();

app.use(bodyParser.json());
app.use(cors());
// app.use(cors({
//   origin: [
//       'http://localhost:5173',  // Your local development URL
//       'https://your-frontend-domain.vercel.app' // Your production frontend URL
//   ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
// }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use("/auth", AuthRouter);

// Serve static files from the dist folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));

  // PATH CONFIGURATION TO RESPOND TO A REQUEST TO STATIC ROUTE REQUEST BY SERVING index.html
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
}

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
