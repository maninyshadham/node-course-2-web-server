const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname+"/views/partials");
hbs.registerHelper("getCurrentYear",() => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt",(text) => {
  return text.toUpperCase();
});

app.set("view engine","hbs");


app.use((request,response,next) => {
  var now = new Date().toString();
  var log = `${now} ${request.method} ${request.url}`;

  fs.appendFile("server.log",log + "\n", (err) => {
    if(err){
      console.log("Unable to Log");
    }
  });
  next();
});

/*app.use((request,response,next) => {
  response.render("maintainance.hbs");
})*/
app.use(express.static(__dirname+"/public"));
app.get("/",(request,response) => {
  //response.send('<h1>Hello Express</h1>');
  /*response.send({
    name : "Mani",
    likes : ['Music','cricket']
  });*/
  response.render("home.hbs",{
    pageTitle : "Home Page",
    welcomeNote : "Welcome to Our website"
  });
});

app.get("/about",(request,response) => {
  //response.send("About Us");
  response.render("about.hbs",{
    pageTitle : "About Us Page",
    aboutUs : "About my webseite"
  });
});

app.get("/bad",(request,response) => {
    response.send({
      error : "bad request"
    });
});

app.listen(10000,() => {
  console.log("Server Started");
});
