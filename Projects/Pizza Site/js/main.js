let btnNav = document.getElementById("btnNav");
let dropDown = document.getElementById("drop_down");
let d = false;
btnNav.addEventListener("click",function(e){
   
   if(!d){
    dropDown.classList.remove("dF")
    d =true;
   }else{
    dropDown.classList.add("dF")
    d = false;
   }
    
    
})


let slideIndex = 0;
showSlides();

function showSlides() {
   
   let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000);
}