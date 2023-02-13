 var resurse = {
    wood : 0,
    rock : 0
}
var armata = {
    lancieri : {
        numar : 0,
        wood_R : 2,
        rock_R : 1,
        dmg : 1
    },
    spadasin : {
        numar : 0,
        wood_R : 5,
        rock_R : 5,
        dmg : 6
    },
    toporisti : {
        numar : 0,
        wood_R : 2,
        rock_R : 10,
        dmg : 4
    },
    arcasi : {
        numar : 0,
        wood_R : 10,
        rock_R : 3,
        dmg : 3
    }

}


function incTree (){
    document.getElementById("tr").innerHTML = ++resurse.wood;
    
}

function incRock (){
    document.getElementById("rock").innerHTML = ++resurse.rock;
    
}
function display(){
    document.getElementById("tr").innerHTML = resurse.wood;
    document.getElementById("rock").innerHTML = resurse.rock;
}

function lancie(){
    if( resurse.wood >= armata.lancieri.wood_R && resurse.rock >=armata.lancieri.rock_R){
        resurse.wood -= armata.lancieri.wood_R;
        resurse.rock -= armata.lancieri.rock_R;
        document.getElementById("lancier").innerHTML= ++armata.lancieri.numar;
        display();
        
    }
}

function spad(){
    if(resurse.wood >= armata.spadasin.wood_R && resurse.rock >= armata.spadasin.rock_R ){
        resurse.wood -= armata.spadasin.wood_R;
        resurse.rock -= armata.spadasin.rock_R;
        document.getElementById("spad").innerHTML = ++armata.spadasin.numar;
       display();
    }
}
function topo(){
    if(resurse.wood >= armata.toporisti.wood_R && resurse.rock>= armata.toporisti.rock_R){
        resurse.wood -= armata.toporisti.wood_R;
        resurse.rock -= armata.toporisti.rock_R;
        document.getElementById("top").innerHTML = ++armata.toporisti.numar;
        display();
    }
}
function arc (){
    if(resurse.wood >= armata.arcasi.wood_R && resurse.rock >= armata.arcasi.rock_R){
        resurse.wood -= armata.arcasi.wood_R;
        resurse.rock -= armata.arcasi.rock_R;
        document.getElementById("arca").innerHTML = ++armata.arcasi.numar;
        display();
    }
}

//trupele inamice random
setTimeout(inamici,120000);
var i;
function inamici(){
    var la =  Math.floor(Math.random() * 10) + 1; 
    var sp = Math.floor(Math.random() * 10) + 1; 
    var to = Math.floor(Math.random() * 10) + 1; 
    var arc = Math.floor(Math.random() * 10) + 1; 
    document.getElementById("lancieri_inamici").innerHTML =  la;
    document.getElementById("spadasini_inamici").innerHTML = sp;
    document.getElementById("toporisti_inamici").innerHTML = to;
    document.getElementById("arcasi_inamici").innerHTML =  arc;

    
    i = (la*armata.lancieri.dmg) + (sp * armata.spadasin.dmg) + (to * armata.toporisti.dmg)+ (arc *armata.arcasi.dmg)
    document.getElementById("dmg_inamic").innerHTML = i;
    
    
    
}


setInterval(damage,1000);
var s ;
function damage(){
    
    s = (armata.lancieri.numar*armata.lancieri.dmg) + (armata.spadasin.numar*armata.spadasin.dmg) + (armata.toporisti.numar*armata.toporisti.dmg) + (armata.arcasi.numar*armata.arcasi.dmg);
    document.getElementById("dmg").innerHTML = s;
    
}



function start(){
    let id = null;
    const wood = document.getElementById("wood");   
    const rock = document.getElementById("rokk");   
    let pos_wood = 300;
    let pos_rock = -301;
    clearInterval(id);
    id = setInterval(frame, 5);
       
    function frame() {
            if (pos_wood == 0) {
            clearInterval(id);
            } else {
            pos_wood--; 
            
            wood.style.left = pos_wood + "px"; 
            }
            if (pos_rock == 250) {
                clearInterval(id);
                } else {
                pos_rock++; 
                
                rock.style.left = pos_rock + "px"; 
                }
        }
        
    function tim(){
       var timeH = document.getElementById("timp");
       var timeSecond = 120;

       displayTime(timeSecond)
       var countDown = setInterval(()=>{
        timeSecond--;
        displayTime(timeSecond);
        if(timeSecond <= 0 || timeSecond <1){
            clearInterval(countDown);
        }
       },1000)

       function displayTime(second){
        var min = Math.floor(second / 60);
        var sec = Math.floor(second % 60);
        timeH.innerHTML = `${min<10 ? '0' : ''}${min}:${sec<10 ? '0' : ''}${sec}`;
       }
    }
    
    tim();
    setTimeout(castig,120000);
    
    function castig(){

        if(i>s){
            document.getElementById("timp").innerHTML=("You lost");
        }
        else if(i == s){
            document.getElementById("timp").innerHTML=("Tie");
        }
        else{
            document.getElementById("timp").innerHTML=("You won");
        }
        
    }
    setTimeout(reload,130000);
    function reload(){
        location.reload();
    }
    
}