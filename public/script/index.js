// if (window.screen.availWidth>=420){
//   console.log(window.screen.availWidth);
//   document.querySelector("body").innerHTML="<div style='width:100%;height:100%'><div class='empty_shopping_cart' style='display:flex; flex-direction: column; align-items: center; justify-content: center; height:1000px;'><img src='images/logo_organic_new_pages-to-jpg-0001-removebg-preview.png' alt='Logo' style='width:40%''><br><h3>Still in development</h3><br><i class='fa-regular fa-hourglass icon'></i></div></div>"
// }


$('#searchbar-main').on('click', function(e) {
  if (e.target == this) {
    $('#searchbar-main').fadeOut(500);
    setTimeout(function() {
      document.getElementById('searchbar-main').classList.toggle("hide");
    }, 500);
  }
});

function searchbar_menu(){
  var shoppingcart = document.getElementById('searchbar-main');
  if ($('#searchbar-main').hasClass('hide')){
    shoppingcart.classList.toggle("hide");
    $('#searchbar-main').fadeIn(500);
  }else{
    $('#searchbar-main').fadeOut(500);
    setTimeout(function(){shoppingcart.classList.toggle("hide");}, 500);
  }

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

var searchquery = document.getElementsByClassName('searchresult');
for (i = 0; i < searchquery.length; i++) {
  searchquery[i].addEventListener("click", function() {
    $('#searchbar-main').fadeOut(300);
    setTimeout(function() {
      document.getElementById('searchbar-main').classList.toggle("hide");
    }, 300);
    var section = this.innerHTML.toLowerCase().split(" ").join("");
    var id = document.getElementById(section);
    window.scrollTo({
      top: id.offsetTop - 200,
      behavior: 'smooth'
    });
    setTimeout(function() {
      $("#" + section).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
    }, 1000);
  });
}

function minus(e) {
	var $input = $(e).parent().find('input');
	var count = parseInt($input.val()) - 1;
	count = count < 1 ? 1 : count;
	$input.val(count);
	$input.change();
	return false;
}
function plus(e) {
	var $input = $(e).parent().find('input');
	$input.val(parseInt($input.val()) + 1);
	$input.change();
  return false;
}
