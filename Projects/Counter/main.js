
let para= 0; 
let dec = document.getElementById("decrese");
let inc = document.getElementById("increse");
let reset = document.getElementById("reset");
let paragraf = document.getElementById("paragraf");
let increse5 = document.getElementById("increse5");
let decrese5 = document.getElementById("decrese5");


paragraf.innerHTML=para;
dec.addEventListener("click",function(){
    return paragraf.innerHTML=--para;
})
inc.addEventListener("click",function(){
    return paragraf.innerHTML=++para;
})
reset.addEventListener("click",function(){
    return para=0 ,paragraf.innerHTML=para;
})

increse5.addEventListener("click",function(){
    para +=5;
    return paragraf.innerHTML = para;
})
decrese5.addEventListener("click",function(){
    para -=5;
    return paragraf.innerHTML = para;
})