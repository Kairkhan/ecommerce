//jshint esversion:8


const express = require('express');
const _ = require("lodash");
const app = express();


const bodyParser = require('body-parser');
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'));


const cards = [{title:"Washing machine",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
        {title:"TV",
        description:"At nec cibo dolore honestatis."},
        {title:"Fridge",
        description:"Per zril temporibus in, duo nullam invidunt molestiae eu, te per nullam minimum."}]


var card = "TV";
app.get("/",function(req,res){
  res.render("home",{pageTitle:"Home",cards:cards});
});


app.get("/good",function(req,res){
  cards.forEach(function(element){
    if(element.title === card){
      card = element
    }
  });
  res.render("good",{pageTitle:"Good",goodName:card.title,goodDescription:card.description});
});


app.post("/good",function(req,res){
  card = req.body.card;
  res.redirect("/good");
});

app.listen(3000,()=>{
  console.log("Server is running on port 3000");
});
