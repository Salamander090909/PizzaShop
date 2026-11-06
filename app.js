const express = require("express");
require("dotenv").config();
const argon2 = require("argon2");
const mongoose = require("mongoose");
const Food = require("./models/Food")
const User = require("./models/User")

const app = express();


app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}))

app.use(express.static("public"))

mongoose.connect(process.env.MONGODB_URI);

app.get("/", async (req, res) => {
    const food = await Food.find();
    console.log(food);

    res.render("index", {food});
    

})

app.get("/register-food", (req, res) => {
    res.render("registerFood")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/register-user", (req, res) => {
    res.render("registerUser")
})

app.post("/register-user", async (req, res) => {
    const {
        email,
        password,
        repeatPassword
    } = req.body;

    if(password == repeatPassword) {
        const hash = await argon2.hash(password);
    
        const user = new User({
            email,
            password: hash
        });
    
        await user.save();
        res.redirect("/login");
    } else {
        res.send("Passord stemmer ikke overens")
    }
})


app.post("/register-food", async (req, res) => {
    const {
        bildeurl,
        tittel, 
        beskrivelse, 
        ingredienser, 
        kategori, 
        pris
    } = req.body;
    console.log(req.body);

    const food = new Food({
        bildeurl,
        tittel, 
        beskrivelse, 
        ingredienser,
        kategori, 
        pris});

       await food.save();
    res.status(200).redirect("/register-food");
})

app.post("/login", async (req, res) => {
    const {
        email, 
        password
    } = req.body;

    const user = await User.findOne({email});
    console.log(user)

    if(!user) {
        res.status(404).send("Bruker eksisterer ikke")
    }

        let isPassword = argon2.verify(user.password, password);

        if(isPassword) {
            res.redirect("/register-food");
        } else {
            res.send("email eller passord stemmer ikke overens")
        }
})



app.listen(process.env.PORT);