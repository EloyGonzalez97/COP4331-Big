var slideIndex = 0;
carousel();
var urlBase = 'http://COP4331.hosted.nfoservers.com';
var extension = "php";

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none"; 
    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1} 
    x[slideIndex-1].style.display = "block"; 
    setTimeout(carousel, 2000); // Change image every 2 seconds
}

function loginUser(){
    var url = urlBase + '/user.' + extension;
		
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        
            
    }
    catch(err){
        
    }
    

}