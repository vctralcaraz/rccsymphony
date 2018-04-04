
/* global $ */

// =============
//  HOME JS
// =============
var geocoder;
var map;
var address = "3890 University Ave, Riverside, CA 92501"
function initMap() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(33.9828421, -117.3767441);
    var myOptions = {
      zoom: 17,
      center: latlng,
    mapTypeControl: true,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
    navigationControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    if (geocoder) {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
          map.setCenter(results[0].geometry.location);

            var infowindow = new google.maps.InfoWindow(
                { content: '<a target="_blank" href="https://maps.google.com/maps?ll=33.982839,-117.376634&z=20&t=m&hl=en-US&gl=US&mapclient=apiv3&cid=10620331229790120619"><span>Click Me for Directions on Google Maps</span></a>',
                  size: new google.maps.Size(150,50)
                });

            var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map, 
                title: address
            }); 
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
            });

          } else {
            alert("No results found");
          }
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
}

// Instantiate the Bootstrap carousel
$('.multi-item-carousel').carousel({
  interval: 4000
});

$('.multi-item-carousel .item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));
  
  if (next.next().length>0) {
    next.next().children(':first-child').clone().appendTo($(this));
  }
  else {
  	$(this).siblings(':first').children(':first-child').clone().appendTo($(this));
  }
});

//when a picture in the carousel is clicked, pop it out in a modal
$(".carouselPic").on("click", function() {
   $('#imagepreview').attr('src', $(this).children('img').attr("src")); // here asign the image to the modal when the user click the enlarge link
   $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
});

//determine number of slides in carousel on load
$(document).ready(function(){
  if($(window).width()<=768){
      $("#theCarousel").css("display","none");
  }
  else {
      $("#myCarousel").css("display","none");
  }
});
$(window).resize(function() {
  if($(window).width()<=768) {
    //   $("#theCarousel").removeClass("multi-item-carousel");
        $("#theCarousel").css("display","none");
        $('#myCarousel').css("display","block");
  } else {
        $("#myCarousel").css("display","none");
        $('#theCarousel').css("display","block");
  }
});
      
// =============
//  CALENDAR JS
// =============
// function isEmpty(obj) {for(var x in obj) {return false;}return true;}
        // function addList(){
        //     if(!($("#cDesc").val()  === '')){
        //         var eventDate = document.getElementById("cDate").valueAsDate;
        //         eventDate.setDate(eventDate.getDate() + 1);
        //         $("#list").append("<li>" + eventDate.toDateString() + " - " + $("#cDesc").val() + "</li>");
        //     }
        // }
var calState = true;
$(".cal-icon").on("click",function(){
    if(!calState) {
        $(this).parent().next('div').animate({height:'toggle', opacity: 'toggle'},350);
        $(this).removeClass("rerotate-icon");
        $(this).addClass("rotate-icon");
    
        calState = true;
    }
    else if(calState) {
        $(this).parent().next("div").animate({height:'toggle', opacity: 'toggle'},350);
        $(this).removeClass("rotate-icon");
        $(this).addClass("rerotate-icon");
        calState = false;
    }
    
});

$('.calInfo').focus(function () {
    $(this).animate({ height: "20vh" }, 500);
});

$('.calInfo').focusout(function(){
    if($(this).val() === ""){
        $(this).animate({ height: "7vh" }, 500);
    }
});

function textConvert2(){
    var str = $(".calInfo").val();
    $(".calInfo").val(str.replace(/\n/g,'<br />').replace(/\r/g,'<br />').replace(/\r\n/g,'<br />'));
}

$('.calSpan').on('click', function(){
    $(this).closest('form').submit();
});

$('.calSpan2').on('click',function(){
    //toggle animated spinner
    $(this).children('i').toggleClass('fa-spin');
    //toggle active li styles
    $(this).parent().toggleClass('activeEdit');
    $(this).toggleClass('editOpen');
    $(this).siblings('.calSpan').toggleClass('editOpen');
    //unhide the edit form
    $(this).parent('form').next('div').animate({height:'toggle', opacity: 'toggle'},350);
});

$(document).ready(function(){
    $("#partForm").animate({height:'toggle'},0,function(){
            $("#partFormHidden").animate({height:'toggle',},0);
        });
        slideState = true;
});

var slideState = false;

$("#hidePF").on("click",function(){
    if(!slideState){
        $("#partForm").animate({height:'toggle', opacity: 'toggle'},350,function(){
            $("#partFormHidden").animate({height:'toggle', opacity: 'toggle'},350);
        });
        slideState = true;
    }
});

$("#showPF").on("click",function(){
    if(slideState){
        $("#partFormHidden").animate({height:'toggle', opacity: 'toggle'},350,function(){
            $("#partForm").animate({height:'toggle', opacity: 'toggle'},350);
        });
        slideState = false;
    }
});

// ==============
//  PARTS JS
// ==============
var addState = true;
$(".parts-icon").on("click",function(){
    if(!addState) {
        $(this).parent().next('div').animate({height:'toggle', opacity: 'toggle'},350);
        $(this).removeClass("rerotate-icon");
        $(this).addClass("rotate-icon");
        addState = true;
    }
    else if(addState) {
        $(this).parent().next("div").animate({height:'toggle', opacity: 'toggle'},350);
        $(this).removeClass("rotate-icon");
        $(this).addClass("rerotate-icon");
        addState = false;
    }
    
});

// $(".parts-li").hover(function(){
//     $(this).next(".calSpan").css("width","40px");
//     // $(this).next(".calSpan").css("opacity","1.0");
// });

// ==============
//  REHEARSAL JS
// ==============
$('#rehInfo').focus(function () {
    $(this).animate({ height: "20vh" }, 500);
});

$('#rehInfo').focusout(function(){
    if($(this).val() === ""){
        $(this).animate({ height: "7vh" }, 500);
    }
});

function textConvert(){
    var str = $("#rehInfo").val();
    $("#rehInfo").val(str.replace(/\n/g,'<br />').replace(/\r/g,'<br />').replace(/\r\n/g,'<br />'));
}

$('.rehSpan').on('click', function(){
    $(this).closest('form').submit();
});

$('.rehSpan2').on('click',function(){
    //toggle animated spinner
    $(this).children('i').toggleClass('fa-spin');
    //toggle active li styles
    $(this).parent().toggleClass('activeEdit');
    $(this).toggleClass('editOpen');
    $(this).siblings('.rehSpan').toggleClass('editOpen');
    //unhide the edit form
    $(this).parent('form').next('div').animate({height:'toggle', opacity: 'toggle'},350);
});

var slideState = false;

$("#hideRF").on("click",function(){
    if(!slideState){
        $("#rehForm").animate({height:'toggle', opacity: 'toggle'},350,function(){
            $("#formHidden").animate({height:'toggle', opacity: 'toggle'},350);
        });
        slideState = true;
    }
});

$("#showRF").on("click",function(){
    if(slideState){
        $("#formHidden").animate({height:'toggle', opacity: 'toggle'},350,function(){
            $("#rehForm").animate({height:'toggle', opacity: 'toggle'},350);
        });
        slideState = false;
    }
});

// ============
//  FACULTY JS
// ============
// $('#falcInfo').focus(function () {
//     $(this).animate({ height: "20vh" }, 500);
// });

// $('#falcInfo').focusout(function(){
//     if($(this).val() === ""){
//         $(this).animate({ height: "7vh" }, 500);
//     }
// });
var falcultyState = true;
$(".faculty-icon").on("click",function(){
    if(!falcultyState) {
        $(this).parent().next('div').animate({height:'toggle', opacity: 'toggle'},350);
        $(this).removeClass("rerotate-icon");
        $(this).addClass("rotate-icon");
    
        falcultyState = true;
    }
    else if(falcultyState) {
        $(this).parent().next("div").animate({height:'toggle', opacity: 'toggle'},350);
        $(this).removeClass("rotate-icon");
        $(this).addClass("rerotate-icon");
        falcultyState = false;
    }
    
});
function falcTextConvert(){
    var str = $("#falcInfo").val();
    $("#falcInfo").val(str.replace(/\n/g,'<br />').replace(/\r/g,'<br />').replace(/\r\n/g,'<br />'));
}

function falcEditTextConvert(){
    var str = $("#falcInfoEdit").val();
    $("#falcInfoEdit").val(str.replace(/\n/g,'<br />').replace(/\r/g,'<br />').replace(/\r\n/g,'<br />'));
}

var falcCheck = document.getElementById('falcCheck');
falcCheck.addEventListener("change", function(){
    if(this.checked){
        document.getElementById('portUp').disabled = true;
    } else {
        document.getElementById('portUp').disabled = false;
    }
})

// ===========
//  UPLOAD JS
// ===========
var inputs = document.querySelectorAll('.inputfile');
Array.prototype.forEach.call(inputs, function(input){
	var label	 = input.nextElementSibling,
		labelVal = label.innerHTML;

	input.addEventListener('change', function(e)
	{
		var fileName = '';
		if(this.files && this.files.length > 1){
			fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
		} else {
			fileName = e.target.value.split( '\\' ).pop();
		}
		if(fileName){
			label.querySelector('span').innerHTML = fileName;
		} else {
			label.innerHTML = labelVal;
		}
	});
});

// FAST LOG JS
// ==============================
window.onload = function(){
    document.getElementById("fastLogSubmit").click();
}

// password validation for creating a user
function pVldtn(){
    var pass = document.getElementById('nPassword').value();
}
