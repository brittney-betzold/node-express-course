const express = require("express");
const app = express();
const peopleRouter = require('./routes/people');
const productRouter = require('./routes/products');
const cookieParser = require('cookie-parser')

// Middleware
app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logger Middleware
const logger = (req,res,next) => { 
    const method = req.method;
    const url = req.url;
    const date = new Date().getFullYear();
    console.log(method,url,date);
    next();
};

//Middleware for the parse cookie
app.use(cookieParser());

const auth = (req, res, next) => {
    const userName = req.cookies.name;
    if (userName) {
        req.user = userName;
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};
app.post("/logon", (req, res) => {
    const { name } = req.body;
    if (name) {
        res.cookie("name", req.body.name);
        res.status(201).json({ message: `Hello, ${name}!` });
    } else {
        res.status(400).json({ message: "Name is required" });
    }
});
app.delete("/logoff", (req, res) => {
    res.clearCookie("name");
    res.status(200).json({ message: "Logged off" });
});
app.get("/test", auth, (req, res) => {
    res.status(200).json({ message: `Welcome, ${req.user}!` });
});

// Routes
app.get('/home', logger, (req,res) => {
    res.send("home");
});

// People Routes
app.use("/api/v1/people", peopleRouter);
app.use("/api/v1/product", productRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).send('Internal Server Error');
});


// Catch-All Route
app.all('*', (req,res)=> {
    res.status(404).send('<h1>Page Not Found<h1>');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
