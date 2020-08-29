//jshint esversion:8


const express = require('express');
const _ = require("lodash");
const mongoose = require("mongoose");
const app = express();


mongoose.connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser: true,useUnifiedTopology: true});


const bodyParser = require('body-parser');
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'));


const goodsSchema = new mongoose.Schema({
  title:String,
  description:String,
  images:[String]
})

const Good = mongoose.model("Good",goodsSchema);


var defaultCard = {title:"Timberland Boots",
  description:"In 1973, the small town of Newmarket in New Hampshire played host to the birth of an American legend.",
  images:["https://images.timberland.com/is/image/TimberlandEU/10061713-hero?wid=720&hei=720&fit=constrain,1&qlt=85,1&op_usm=1,1,6,0"]
};


const personSchema = new mongoose.Schema({
  username:String,
  email:String,
  password:String
})


const Person = mongoose.model("Person",personSchema);


app.get("/",function(req,res){
  Good.find(function(err,products){
    res.render("home",{cards:products});
  });
});


app.get("/good",function(req,res){
  res.render("good",{card:defaultCard});
});


app.post("/goodDetailed",function(req,res){
  const cardTitle = req.body.card;

  Good.find({title:cardTitle},function(err,result){
    if(err){
      console.log(err);
    }else{
      defaultCard = result[0];
      res.redirect("/good");
    }
  });
});


app.get("/add",function(req,res){
  res.render("add");
});

app.post("/add",function(req,res){
  const body = req.body;
  const good = new Good({
    title:_.capitalize(body.title),
    description:body.description,
    images:[body.imageURL1,body.imageURL2,body.imageURL3]
  })

  good.save();

  res.redirect("/");
});


app.get("/signup",function(req,res){
  res.render("signup");
});

app.post("/signup",function(req,res){
  const privateData = req.body;
  if(privateData.password === privateData.password2){
    const person  = new Person({
      username:privateData.username,
      email:privateData.email,
      password:privateData.password
    });
    person.save();
    res.redirect("/")
  }else{
    res.redirect("/signup");
  }
});



app.get("/signin",function(req,res){
  res.render("signin");
});
app.listen(3000,()=>{
  console.log("Server is running on port 3000");
});
