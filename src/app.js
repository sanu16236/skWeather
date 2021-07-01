const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 8080;
//path static
const staticpath = path.join(__dirname, "../public");
const temppath = path.join(__dirname, "../templetes/views");
const partial_path = path.join(__dirname, "../templetes/partials");

app.set('views', temppath);
app.set('view engine', 'hbs');
hbs.registerPartials(partial_path);

app.use(express.static(staticpath));
app.get("/", (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/weather', (req, res) => {
    res.render('weather');
});

app.get('*', (req, res) => {
    res.render('404', {
        errmsg: "Opps! page not found"
    });
});

app.listen(port, () => {
    console.log(`listening to the port ${port}`);
});