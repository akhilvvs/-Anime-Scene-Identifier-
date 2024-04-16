import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); 

//rendering home page
app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
})

app.post("/search", async (req, res) => {
    try {
        const query = req.body.imageUrl;
        const encodedUrl = encodeURIComponent(query);
        const response = await axios.get(`https://api.trace.moe/search?url=${encodedUrl}`);
        // Make request to anime search API
        const animeData = response.data;
        res.render('search.ejs', { animeData, query });
    } catch (error) {
        console.log('Error:', error.message)
        res.status(400).send('Invalid request');
    }
})

app.listen(port, (req, res) => {
    console.log(`listening on server ${port}`);
})