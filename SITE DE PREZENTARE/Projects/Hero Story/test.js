let btnPers = document.getElementById("btnPers");       //declaratii de butoane si display uri
let disPers = document.getElementById("disPers");
let btnShop = document.getElementById("btnShop");
let disShop = document.getElementById("disShop");
let btnDungeon = document.getElementById("btnDungeon");
let disDungeon = document.getElementById("disDungeon");
let btnStatusSTR = document.getElementById("btnStatusSTR");
let btnStatusCostitution = document.getElementById("btnStatusCostitution");
let btnStatusLuck = document.getElementById("btnStatusLuck");
let disFightLog = document.getElementById("fightLog");


btnPers.addEventListener("click",function(){    //ev listener pt nav btn
    disShop.style.display = "none";
    disDungeon.style.display = "none";
    disPers.style.display = "initial";
    disFightLog.style.display = "none";
    document.getElementById("fight").style.display = "none";
    document.getElementById("name").innerHTML=char.name;
    document.getElementById("hp").innerHTML = char.hp;
    document.getElementById("statusDamage").innerHTML = (`Damage ${char.dmg}`);
    document.getElementById("statusSTR").innerHTML = (`STR ${char.str}`);
    document.getElementById("statusCostitution").innerHTML = (`Constitution ${char.constitution}`);
    document.getElementById("statusLuck").innerHTML = (`Luck ${char.luck}`);
    
    
    showGold();
})

btnShop.addEventListener("click",function(){    //ev listener pt nav btn
    disPers.style.display= "none";
    disDungeon.style.display = "none";
    disShop.style.display = "initial";
    disFightLog.style.display = "none";
    document.getElementById("fight").style.display = "none";
    
    
   
    showGold();
})

btnDungeon.addEventListener("click", function(){    //ev listener pt nav btn
    disPers.style.display = "none";
    disShop.style.display = "none";
    disDungeon.style.display = "initial";
    disFightLog.style.display = "none";
    document.getElementById("fight").style.display = "none";
    for(let i = 0 ;i<document.getElementsByClassName("startBattle").length;i++){
        document.getElementsByClassName("startBattle")[i].addEventListener("click",function(){
            disDungeon.style.display = "none";
            document.getElementById("fight").style.display = "flex";
            
                  
        })
    }
    document.getElementById("btnFight").addEventListener("click", function(){
        lupta.go();
        document.getElementById("btnFightLog").style.display = "initial";
        
    })
    document.getElementById("btnFightLog").addEventListener("click",function(){
        disPers.style.display = "none";
        disShop.style.display = "none";
        disDungeon.style.display = "none";
        disFightLog.style.display="initial";
        setTimeout(() => {
            disFightLog.innerHTML=" "
        }, 30000);
    })
    
})


btnStatusSTR.addEventListener("click",function(){       //incrementare status
    char.statusPointsSTR();
    document.getElementById("statusDamage").innerHTML = (`Damage ${char.dmg}`);
    document.getElementById("statusSTR").innerHTML = (`STR ${char.str}`);
    showGold();
})

btnStatusCostitution.addEventListener("click",function(){   //incrementare status
    char.statusPointsCONSTITUTION();
    document.getElementById("statusCostitution").innerHTML = (`Constitution ${char.constitution}`);
    document.getElementById("hp").innerHTML = char.hp;
    showGold();
})


btnStatusLuck.addEventListener("click", function(){     //incrementare status
    char.statusPointsLUCK();
    document.getElementById("statusLuck").innerHTML = (`Luck ${char.luck}`);
    showGold()
})


function showGold(){       //functie update gold care face loop prin CLASA bani
    for(let i=0;i<document.getElementsByClassName("bani").length;i++){
        document.getElementsByClassName("bani")[i].innerHTML = char.gold;
    }
}

function creatingText(text,element){
    let p = document.createElement("p");
    let textNode = document.createTextNode(`${text}`)
    p.appendChild(textNode);
    element.appendChild(p);
}
class Person {      //clasa personajului
    constructor(name,hp,arrItems){
        this.name = name;
        this.hp = hp;
        this.dmg = 10;
        this.arrItems = arrItems;
        this.gold = 50;
        this.str = 0;
        this.constitution = 0;
        this.luck = 0;
        this.doge = true;
        this.shield = true;
        this.initialHP = this.hp;
    }

    hit(dmg){   // metoda de aparare/primire dmg
        if(this.doge){
            let chance = Math.random();
            if(chance > 0.7){
                if(this.shield) {
                    this.shield = false;
                }
                creatingText(`${this.name} doged the attack`,disFightLog);
                dmg = 0;
            }
        }
        if(this.shield){
            dmg *= 0.8; //damageul scade cu 20%
            creatingText(`${this.name} defends with a shield`,disFightLog);
        }

        this.hp -= dmg;
        this.shield = true;
        creatingText(`${this.name} has been attacked. Hp reduce by ${dmg}. Hp remaining ${this.hp}.`,disFightLog);
    }
    attack(inamic){     //metoda de atac
        let hitP = this.dmg;
        let random = Math.random();
        if(this.luck > 0 && random > 0.7){
            hitP = this.dmg + (this.str*0.5) + (this.luck*5); 
            creatingText(`${this.name} stiked with a crittical attack and delt ${hitP} form the hp`,disFightLog)
        }else{
            creatingText(`${this.name} attaked with damage ${hitP}`,disFightLog)
            inamic.hit(hitP);
        }
        
    }
    //odata apasat pe buton statusul de str se incrementeaza cu 1 daca
    // avem destui bani -> 
    //trebuie sa avem un mode de a incrementa banii odata ce apasam pe plus
    //
    goldRequired(param){        //metoda care updateaza banii ceruri (adica de ex daca trece de 10 puncte la str sa se incrementeze banii ceruti)
        let goldRequired = 0;
        if(param <=  10){
            goldRequired = 5;
        }else if(param<20){
            goldRequired = 10;
        }
        return goldRequired;
    }
    
    statusPointsSTR(){      //metoda de incrementare a statusului
        if(this.gold>=this.goldRequired(this.str)){
            this.str += 1;
            this.dmg +=2 ;
            this.gold -= this.goldRequired(this.str);
        }
    }
    statusPointsCONSTITUTION(){     //metoda de incrementare a statusului
        if(this.gold>=this.goldRequired(this.constitution)){
            this.constitution += 1;
            this.hp = this.hp + 5;
            this.initialHP = this.hp;
            this.gold -= this.goldRequired(this.constitution);
        }
    }
    statusPointsLUCK(){     //metoda de incrementare a statusului
        if(this.gold>=this.goldRequired(this.luck)){
            this.luck += 1;
            this.gold -= this.goldRequired(this.luck);
        }
    }
    resetHP(){
        this.hp = this.initialHP;
    }

    /* displayInventory(){ ////!!!!!!!!!
        if(this.arrItems.length != 0){
            for(let i = 0;i<document.getElementsByClassName("invElem").length;i++){
                document.getElementsByClassName("invElem")[i].innerHTML = this.arrItems[i].name;
                document.getElementsByClassName("invElem")[i+5].innerHTML = this.arrItems[i].name;
            }
            
        }
        
    } */

    /* sellItems(arr){ /////!!!!!!!!
        let i=0;
        let price =arr[i].price;
        
        for( i=0;i<document.getElementsByClassName("shopItemBox").length;i++){
            document.getElementsByClassName("shopItemBox")[i].addEventListener("click",function(e){
               if(e.target == document.getElementsByClassName("shopItemBox")[0] && char.gold >= price  ){
                    if(arr[0] != "sold"){
                        char.arrItems.push(arr[0]);
                        
                        arr.splice(0,1,"sold")
                        document.getElementsByClassName("shopItemBox")[0].innerHTML=arr[0];
                        char.gold -= price;
                        showGold();

                    }else{
                        throw "e vandut!"
                    }
               }
            })
        }
        
    } */


}
//declararea personajului
let char = new Person("Kapacioc",100,[]);




class Inamici extends Person{
    constructor(name,hp,str,dmg,constitution,luck,gold){
        super(name,hp,[])
        this.str = str;
        this.constitution = constitution;
        this.luck = luck;
        this.dmg = dmg;
        this.gold = gold;
        this.initialHP = hp;
        this.shield = false;
    }
    
}

class Fight{
    constructor(hero,inamic){
        this.hero = hero;
        this.inamic = inamic;
        this.turn = 0;
        
        this.inamicFightHP = hero.hp;

    }
    performAttack(){
        if(this.turn === 0){
            this.hero.attack(this.inamic);
        }else{
            this.inamic.attack(this.hero);
        }
    }
    changeTurn(){
        this.turn = 1-this.turn;
    }
    findWinner(){
        if(this.hero.hp >0){
            creatingText("hero won",disFightLog);
            this.hero.gold +=this.inamic.gold;
        }else if(this.inamic.hp>0){
            creatingText("inamic won",disFightLog);
        }else{
            creatingText("no one left alive",disFightLog);
        }

    }
   
    go(){
        do{
            this.performAttack();
            this.changeTurn();
        }while(this.hero.hp>0 &&this.inamic.hp>0)
        this.findWinner();
        this.inamic.resetHP();
        this.hero.resetHP();
        
    }
}

let schelete = new Inamici("Schelete",100,10,5,0,0,10);
let lupta = new Fight(char,schelete);
 //!!!!!!!!!!!

class Shop {
    constructor(){
        this.arr = [];
    }
    addItems(item){
        this.arr.push(item);
    }
    displayItems(){
        for(let i=0;i<document.getElementsByClassName("shopItemBox").length;i++){
            document.getElementsByClassName("shopItemBox")[i].innerHTML=this.arr[i].name;
            
        }
    }
    
}

class Items{
    constructor(name,price,str,constitution,luck){
        this.name = name;
        this.price = price;
        this.str = str;
        this.constitution = constitution;
        this.luck = luck;
    }
}
let shop = new Shop();
let scut = new Items("Scut",10,5,10,0);
let hpPotion = new Items("Hp potion",5,0,25,0);
let sword = new Items("Excalibur" ,25,10,5,25);
let armor = new Items("Armura de fier",50,5,25,10);
let pant = new Items("Pantaloni de fier",15,0,15,10);
shop.addItems(scut);
shop.addItems(hpPotion);
shop.addItems(sword);
shop.addItems(armor);
shop.addItems(pant);


