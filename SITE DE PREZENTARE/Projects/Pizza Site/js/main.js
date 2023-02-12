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