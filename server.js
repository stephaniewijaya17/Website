const express = require("express");
const bodyParser = require("body-parser")
const nunjucks = require("nunjucks")
const multer = require("multer")
const fs = require('fs')
const path = require('path')
const json = require(__dirname+'/json.js')


const app = express();
nunjucks.configure(__dirname + '/templates', {
  autoescape: true,
  express: app
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })



app.get("/", function(req, res) {
  res.render(__dirname + "/templates/index.html");
});

app.get("/products", function(req, res) {
  var data = json.read()
  res.render(__dirname + "/templates/products.html", data);
})

app.get("/admin", function(req, res) {
  var data = json.read()
  res.render(__dirname + "/templates/productssubmit.html", data);
})

app.get("/editproducts", function(req, res) {
  var data = json.read()
  res.render(__dirname + "/templates/editproducts.html", data);
})

app.post("/addproducts", upload.single('image',1), function(req, res) {
  var data= json.read()
  var newdata = {
    id : req.body.name.replaceAll(" ","").toLowerCase(),
    id_harga: req.body.id_harga,
    name: req.body.name,
    img: req.file.originalname,
    desc: req.body.desc,
    harga: req.body.harga,
    jenis: req.body.jenis
  }
  // add if block if jenis not selected
  json.update(newdata, req.body.type, req.body.jenis)
  res.redirect("/success")
})

app.post("/editproducts/", function(req, res) {
  console.log(req.body)
  json.edit(req.body, req.body.type, req.body.jenis)
  res.redirect("/success")
})

app.get("/removeproducts/:type/:id", function(req,res) {
  json.remove(req.params.type, req.params.jenis,Number(req.params.id))
  res.redirect("/success")
})

app.get("/success", function(req,res) {
  res.redirect("/admin")
})

app.post("/sendrequest", function(req, res) {
  var data = req.body
  console.log(data);
  const whatsapplink = 'https://api.whatsapp.com/send?phone=62881081943699&text=Hello my order is:\n'
  var messege = ""
  for (var k in data) {
    messege = messege + "⁍ " + k[0].toUpperCase() + (k.slice(1, )).split("_").join(" ") + " : " + data[k] + " pcs\n";
  }
  res.redirect(whatsapplink + messege);
})

app.listen(2000, function() {
  console.log("Server is running on port 2000");
});
//3000,"192.168.1.12"
//192.168.7.129
// 192.168.18.147
// 192.168.1.12
