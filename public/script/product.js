// shake effect
jQuery.fn.shake = function(interval, distance, times) {
  interval = typeof interval == "undefined" ? 100 : interval;
  distance = typeof distance == "undefined" ? 10 : distance;
  times = typeof times == "undefined" ? 3 : times;
  var jTarget = $(this);
  jTarget.css('position', 'relative');
  for (var iter = 0; iter < (times + 1); iter++) {
    jTarget.animate({
      left: ((iter % 2 == 0 ? distance : distance * -1))
    }, interval);
  }
  return jTarget.animate({
    left: 0
  }, interval);
}

function total_price(){
  var data = document.querySelectorAll("div.shoppingcart-desc > div > input")
  var total = document.querySelector(".total_price")
  var sum = Number(0)
  for (var i = 0; i<data.length; i++){
    var key = data[i].id.split("_")
    var ammount = data[i].value;
    var price = Number(document.getElementById("harga" + key[1]).innerHTML).toFixed(3);
    sum += price*ammount
  }
  total.innerHTML = sum.toFixed(3);

}

var searchquery = document.querySelectorAll('.card-title')
var searchresultbox = document.getElementById("searchqueryresult")
var searchresult = ""
for (i = 0; i < searchquery.length; i++) {
  var prev = searchresultbox.innerHTML
  searchresult = prev +'<div class="searchresult">'+ searchquery[i].innerHTML +'</div>'
  searchresultbox.innerHTML = searchresult
}
var searchquerytarget = document.getElementsByClassName('searchresult');
for (i = 0; i < searchquerytarget.length; i++) {
  searchquerytarget[i].addEventListener("click", function() {
    var section = this.innerHTML.toLowerCase().split(" ").join("");
    var id = document.getElementById(section);
    document.getElementById("searchbox").value=""
    search_product()
    window.scrollTo({
      top: id.offsetTop - 200,
      behavior: 'smooth'
    });
    setTimeout(function() {
      $("#" + section).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
    }, 1000);
  });
}


function search_product() {
  let input = document.getElementById('searchbox').value
  if (input.length > 0) {
    document.getElementById('searchqueryresult').style.display = "block";
  } else {
    document.getElementById('searchqueryresult').style.display = "none";
  }
  input = input.toLowerCase();
  let x = document.getElementsByClassName('searchresult');

  for (i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "block";
    }
  }
}

function add_products(nametitle, id, img) {
  var name = nametitle.toLowerCase()
  var namenospace = name.split(" ").join("")
  var nameunderscore = name.split(" ").join("_")
  var image = img
  var target = document.getElementById("cart" + namenospace);
  var ammount = document.getElementById(id).value;
  if (target == null) {
    var curr = document.querySelector("#formdata > .row").innerHTML;
    var reddot = document.querySelector("#notification-dot");
    var add = '<div id="cart' + namenospace + '" class="col-12 shoppingcart-items"><img src="images/'+image+'" class="shoppingcart-pictures " alt="products"><div class="shoppingcart-desc"><h3>' + nametitle + '</h3><div class="number"><span class="minus" onclick="cartminus(this,\''+id+'\')">-</span><input id="' + namenospace + '_' + id + '" name="'+nameunderscore+'" type="text" value="' + ammount + '"><span class="plus" onclick="cartplus(this,\'' +id+ '\')">+</span></div></div><div class="remove-shoppingcart" onclick="delete_product(cart' + namenospace + ')"><i class="fa-solid fa-trash"></i></i></div></div>';
    document.querySelector("#formdata > .row").innerHTML = curr + "\n" + add;
    reddot.innerHTML = document.querySelectorAll(".shoppingcart-items").length;
    if (!reddot.innerHTML=="0"){
      reddot.classList.add("red-dot");
    }else{
      reddot.classList.remove("red-dot");
    }
  } else {
    document.querySelector("#cart" + namenospace + " > div.shoppingcart-desc > div > input[type=text]").value = document.getElementById(id).value;
  }
  total_price()
  $('.pull-left').shake(100, 10, 3);;
}

function cartminus(e,id) {
  var $input = $(e).parent().find('input');
  var count = parseInt($input.val()) - 1;
  count = count < 1 ? 1 : count;
  $input.val(count);
  $("#"+id).val(parseInt($input.val()));
  console.log($("#"+id));
  console.log($("#"+id).value);
  total_price();
}

function cartplus(e,id) {
  var $input = $(e).parent().find('input');
  $input.val(parseInt($input.val()) + 1);
  $("#"+id).val(parseInt($input.val()));
  console.log($("#"+id));
  console.log($("#"+id).value);
  total_price();
}


function delete_product(id) {
  var reddot = document.querySelector("#notification-dot");
  var element_id = id.id;
  $("#" + element_id).remove();
  reddot.innerHTML = document.querySelectorAll(".shoppingcart-items").length;
  total_price();
  if (reddot.innerHTML=="0"){
    reddot.classList.remove("red-dot");
    document.querySelector(".empty_shopping_cart").style.display = "flex";
    document.querySelector(".proceed-order-button").style.display = "none";
    document.getElementById("total_price_section").style.display = "none";
    document.querySelector(".shopingcart_items_box").style.display = "none";
  }
}

$('#shopping-cart').on('click', function(e) {
  if (e.target == this) {
    $('#formdata').animate({left:"980px"}, 500);
    $('#shopping-cart').fadeOut(500);
    setTimeout(function() {
      document.getElementById('shopping-cart').classList.toggle("hide");
    }, 500);
  }
});

function shoping_cart_menu() {
  var shoppingcart = document.getElementById('shopping-cart');
  if ($('#shopping-cart').hasClass('hide')) {
    if (document.querySelectorAll(".shoppingcart-items").length == 0){
      document.querySelector(".empty_shopping_cart").style.display = "flex";
      document.querySelector(".proceed-order-button").style.display = "none";
      document.getElementById("total_price_section").style.display = "none";
      document.querySelector(".shopingcart_items_box").style.display = "none";
    }else{
      document.querySelector(".empty_shopping_cart").style.display = "none";
      document.querySelector(".proceed-order-button").style.display = "block";
      document.getElementById("total_price_section").style.display = "flex";
      document.querySelector(".shopingcart_items_box").style.display = "flex";
    }
    shoppingcart.classList.toggle("hide");
    $('#shopping-cart').fadeIn(500);
    $('#formdata').animate({left:"0"}, 500);
  } else {
    $('#formdata').animate({left:"980px"}, 500);
    $('#shopping-cart').fadeOut(500);
    setTimeout(function() {
      shoppingcart.classList.toggle("hide");
    }, 500);
  }

}



function minus(e) {
  var $input = $(e).parent().find('input');
  var count = parseInt($input.val()) - 1;
  count = count < 1 ? 1 : count;
  $input.val(count);
}

function plus(e) {
  var $input = $(e).parent().find('input');
  $input.val(parseInt($input.val()) + 1);
}
