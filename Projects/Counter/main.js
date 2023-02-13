
let para= 0; 
let dec = document.getElementById("decrese");
let inc = document.getElementById("increse");
let reset = document.getElementById("reset");
document.getElementById("paragraf").innerHTML=para;



dec.addEventListener("click",function(){
    return document.getElementById("paragraf").innerHTML=--para;
})
inc.addEventListener("click",function(){
    return document.getElementById("paragraf").innerHTML=++para;
})
reset.addEventListener("click",function(){
    return para = 0,document.getElementById("paragraf").innerHTML=para;
})

