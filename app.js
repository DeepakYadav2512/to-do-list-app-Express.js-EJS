const express = require("express");
const bodyParser = require("body-parser")

const ejs = require("ejs");

const app = express();

var items=["exercise","meditate","read book"];
var workItems =[]


app.set('view engine', 'ejs');





app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))




app.get("/",function(req,res)
{
  var options = { weekday: 'long', month: 'long', day: 'numeric' };
  var today  = new Date();

  var day =today.toLocaleDateString("en-US", options);

res.render("list",{listTitle : day, newListItems : items})

})


app.post("/",function(req,res)
{

  item = req.body.newItem;
  if(req.body.list==="Work")
  {
    workItems.push(item)
    res.redirect("/work")
  }else{
     items.push(item)
       res.redirect("/")
  }
})



app.get("/work",function(req,res){

res.render("list",{listTitle:"Work List",newListItems: workItems})


})


app.post("/work",function(req,res)
{
  let item = req.body.newItem;
  workItems.push(item)
  res.redirect("/work")

})





app.listen(3000,function(){
  console.log("server listening at port 3000")
})
