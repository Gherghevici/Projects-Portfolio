let dis = document.getElementById("dis");
let btn = document.getElementById("btn");
let first = document.getElementById("first");
let second = document.getElementById("second");
let contCulori = document.getElementById("countCulori");
let arrOfColors = ["#ff0000","#00ff00","#0000ff"];
let newArr= [
    ["#a00000","#b00000","#c00000","#d00000","#e00000","#f00000"],
    ["#00a000","#00b000","#00c000","#00d000","#00e000","#00f000"],
    ["#0000a0","#0000b0","#0000c0","#0000d0","#0000e0","#0000f0"],
]


first.addEventListener("click",function(){
    btn.style.display="initial";
    contCulori.style.display = "none"
})
second.addEventListener("click",function(){
    btn.style.display="none";
    contCulori.style.display = "flex"
    
})

btn.addEventListener("click",function onclick(){
    
    let nr = Math.floor(Math.random()*3)
    dis.style.backgroundColor=arrOfColors[nr];
    for(let i=-1;i<nr;i++){
        for(let j=0; j<newArr[nr].length;j++){
            if(document.getElementById(`v${j}`).innerText!=""){
                document.getElementById(`v${j}`).innerText = "";
            }
            document.getElementById(`v${j}`).style.backgroundColor=newArr[nr][j]
            let text = document.createTextNode(`${newArr[nr][j]}`)

            document.getElementById(`v${j}`).appendChild(text);
          console.log(newArr[nr][j])
        }   
       break;
    }
 
})
