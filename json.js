const fs = require('fs');
module.exports= {
  read,update,remove,edit
}
function read(){
  var jsonData = fs.readFileSync(__dirname + "/public/data/products.json")
  var data = JSON.parse(jsonData)
  return data
}
function update(newdata, type, jenis) {
  var jsonData = read()
  jsonData[type][jenis].push(newdata)
  var jsonContent = JSON.stringify(jsonData)
  fs.writeFileSync(__dirname + "/public/data/products.json",jsonContent)
  return setTimeout(function() {console.log('Sucessfully Add Your Products');}, 2000);
}
function remove(type, jenis, id){
  var jsonData = read()
  console.log(id)
  jsonData[type][jenis].splice(id,1)
  var jsonContent = JSON.stringify(jsonData)
  fs.writeFileSync(__dirname + "/public/data/products.json",jsonContent)
  return setTimeout(function(){console.log('Sucessfully Remove Your Products')}, 2000);
}
function edit(newdata, type, jenis){
  var jsonData = read()
  jsonData[type][jenis][Number(newdata.special_id)].id = newdata.name.replaceAll(" ","").toLowerCase()
  jsonData[type][jenis][Number(newdata.special_id)].name = newdata.name
  jsonData[type][jenis][Number(newdata.special_id)].desc = newdata.desc
  jsonData[type][jenis][Number(newdata.special_id)].harga = newdata.harga
  var jsonContent = JSON.stringify(jsonData)
  fs.writeFileSync(__dirname + "/public/data/products.json",jsonContent)
  return setTimeout(function(){console.log('Sucessfully Remove Your Products')}, 2000);
}
