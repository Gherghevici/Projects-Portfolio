let nav = document.getElementById("nav");
let btnPers = document.getElementById("btnPers");       //declaratii de butoane si display uri
let disPers = document.getElementById("disPers");
let btnShop = document.getElementById("btnShop");
let disShop = document.getElementById("disShop");
let btnDungeon = document.getElementById("btnDungeon");
let disDungeon = document.getElementById("disDungeon");
let btnStatusSTR = document.getElementById("btnStatusSTR");
let btnStatusCostitution = document.getElementById("btnStatusCostitution");
let btnStatusLuck = document.getElementById("btnStatusLuck");
let disFight = document.getElementById("fight")
let disFightLog = document.getElementById("fightLog");
let shopItemBox = document.getElementsByClassName("shopItemBox");
let invElem = document.getElementsByClassName("invElem");
let increment = document.getElementById("increment");
let decrement = document.getElementById("decrement");
let poza = document.getElementById("poza");
let startBattle = document.getElementById("startBattle");
let statusDamageChar = document.getElementById("statusDamageChar");
let statusSTRChar = document.getElementById("statusSTRChar")
let statusCostitutionChar = document.getElementById("statusCostitutionChar")
let hpChar = document.getElementById("hpChar")
let statusLuckChar = document.getElementById("statusLuckChar")
let position =0;
function display(d1,d2,d3,d4,d5){
    d1.style.display ="none";
    d2.style.display ="none";
    d3.style.display ="none";
    d4.style.display ="none";
    d5.style.display ="initial";

}
function statusInstance(instance,name,hp,statusDamage,statusSTR,statusConst,statusLuck,pozaInamicBatalie){
    
    document.getElementById(name).innerHTML=instance.name;
    document.getElementById(hp).innerHTML = instance.hp;
    document.getElementById(statusDamage).innerHTML = (`Damage ${instance.dmg}`);
    document.getElementById(statusSTR).innerHTML = (`STR ${instance.str}`);
    document.getElementById(statusConst).innerHTML = (`Constitution ${instance.constitution}`);
    document.getElementById(statusLuck).innerHTML = (`Luck ${instance.luck}`);
}
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
    if(text ==="hero won" || text==="inamic won"||text ==="no one left alive"){
       setTimeout(()=>{
        while(element.hasChildNodes()){
            element.removeChild(element.firstChild); 
       }
       },30000)
    }
}
nav.addEventListener("click",function(e) {    //ev listener pt nav btn
    if(e.target ===btnPers){
        display(disShop,disDungeon,disFightLog,disFight,disPers);
        statusInstance(char,"nameChar","hpChar","statusDamageChar","statusSTRChar","statusCostitutionChar","statusLuckChar");
        
        showGold();
    }else if(e.target === btnShop){
        display(disPers,disDungeon,disFightLog,disFight,disShop);
        shop.displayItems();
        showGold();
    }else if(e.target === btnDungeon){
        display(disPers,disFightLog,disShop,disFight,disDungeon);
        document.getElementById("fight").style.display = "none";
    }
})      
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

disDungeon.addEventListener("click",function(e){ 
    if(e.target === increment && position <= 4){
       return position += 1, poza.src = dng[position].img;
        
    }else if(e.target === decrement && position >= 1){
       return position -= 1, poza.src = dng[position].img;
    }else if(e.target === startBattle){
        disDungeon.style.display = "none";
        document.getElementById("fight").style.display = "flex";
        statusInstance(char,"dungeonCharName","dungeonCharHp","dungeonCharDmg","dungeonCharStr","dungeonCharConst","dungeonCharLuck")
        statusInstance(dng[position],"dungeonEnemyName","dungeonEnemyHp","dungeonEnemyDamage","dungeonEnemyStr","dungeonEnemyConst","dungeonEnemyLuck")
        luptaDng[position].go();
        document.getElementById("pozaInamicBatalie").src = dng[position].img;
    }

})
document.getElementById("btnFightLog").addEventListener("click",function(){
    display(disPers,disShop,disDungeon,disFight,disFightLog);
    
})

disPers.addEventListener("click",function(e){
    if(e.target === btnStatusSTR){
        char.statusPointsSTR();
    }else if(e.target === btnStatusCostitution){
        char.statusPointsCONSTITUTION();
    }else if(e.target === btnStatusLuck){
        char.statusPointsLUCK();
    }
})

class Person {      //clasa personajului
    constructor(name){
        this.name = name;
        this.hp = 100;
        this.initialHP = this.hp;
        this.dmg = 10;
        this.gold = 50;
        this.str = 0;
        this.constitution = 0;
        this.luck = 0;
        this.doge = true;
        this.shield = 0;
        this.hpPotion = false;
        this.excalibur = false;
        this.armura = false;
    }
    itemCheck(){
        for(let i = 0; i <invElem.length;i++){
          if(invElem[i].innerHTML ==="Scut" && this.shield===0 &&this.gold >=scut.price){
            console.log("da")
            this.shield = 3;
            this.gold -=scut.price;
          }
          if(invElem[i].innerHTML ==="Hp potion" && this.hpPotion===false &&this.gold >=hpPotion.price){
            console.log("hp")
            this.gold -= hpPotion.price;
            this.hpPotion = true;
          }
          if(invElem[i].innerHTML ==="Excalibur" && this.excalibur === false &&this.gold >=sword.price){
            this.excalibur = true;
            this.dmg += 25;
            this.gold -= sword.price;
          }
          if(invElem[i].innerHTML ==="Armura de fier" && this.armura === false &&this.gold >=armor.price){
            this.armura = true;
            this.hp +=50;
            this.gold -=armor.price;
            this.initialHP = this.hp;
          }
          
        }
    }
    hit(dmg){   // metoda de aparare/primire dmg
        if(this.doge){
            let chance = Math.random();
            if(chance > 0.7){
                creatingText(`${this.name} doged the attack`,disFightLog);
                dmg = 0;
            }else if(this.shield<=3 && this.shield >0){
                dmg *= 0.8; //damageul scade cu 20%
                creatingText(`${this.name} defends with a shield*****`,disFightLog);
                this.shield--;
               
            }
        }
        
        if(this.hpPotion && this.hp <= 30 ){
            this.hp += 50;
            this.hpPotion = false;
            
            creatingText(`${this.name} healed with a HP potion!!`, disFightLog)
        }

        this.hp -= Math.floor(dmg);
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
            statusDamageChar.innerHTML = (`Damage ${this.dmg}`);
            statusSTRChar.innerHTML = (`STR ${this.str}`);
            showGold();
            return this.gold -= this.goldRequired(this.str);
        }
       
    }
    statusPointsCONSTITUTION(){     //metoda de incrementare a statusului
        if(this.gold>=this.goldRequired(this.constitution)){
            this.constitution += 1;
            this.hp = this.hp + 5;
            this.initialHP = this.hp;
            statusCostitutionChar.innerHTML = (`Constitution ${this.constitution}`);
            hpChar.innerHTML = this.hp;
            showGold();
            return this.gold -= this.goldRequired(this.constitution);
        }
        
    }
    statusPointsLUCK(){     //metoda de incrementare a statusului
        if(this.gold>=this.goldRequired(this.luck)){
            this.luck += 1;
            statusLuckChar.innerHTML = (`Luck ${this.luck}`);
            showGold()
            return this.gold -= this.goldRequired(this.luck);
        }
    }
    resetHP(){
        this.hp = this.initialHP;
    }
    goldIncrement(goldInamic){
       return this.gold += goldInamic;
    }

}
//declararea personajului
let char = new Person("Kapacioc",100,[]);




class Inamici extends Person{
    constructor(name,hp,str,dmg,constitution,luck,gold,img){
        super(name,hp,[])
        this.str = str;
        this.constitution = constitution;
        this.luck = luck;
        this.dmg = dmg;
        this.gold = gold;
        this.initialHP = hp;
        this.shield = false;
        this.img = img;
        this.alive = true;
    }
    dead(){
        if(this.alive !==true){
            console.log("Este mort!")
        }
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
            this.inamic.alive = false;
            this.hero.goldIncrement(this.inamic.gold);
        }else if(this.inamic.hp>0){
            creatingText("inamic won",disFightLog);
        }else{
            creatingText("no one left alive",disFightLog);
        }

    }
   
    go(){
        if(this.inamic.alive){
            do{
                this.performAttack();
                this.changeTurn();
            }while(this.hero.hp>0 &&this.inamic.hp>0)
            this.findWinner();
            this.inamic.resetHP();
            this.hero.resetHP();
            shop.resetShop();
        }else{
            this.inamic.dead();
        }
        
        
    }
}
let schSabie = new Inamici("Bone Sword",100,10,20,0,0,20,"./img/sabie.jpg");
let sulita = new Inamici("Bone Lancerot",100,10,20,0,0,10,"./img/sulita.jpg");
let regele = new Inamici("Bone King",100,10,20,0,0,50,"./img/regele.jpg");
let lupta02 = new Fight(char,schSabie);
let schelete = new Inamici("Bone Hand",100,10,20,0,0,5,"./img/inamic1.jpg");
let lupta = new Fight(char,schelete);
let lupta03 = new Fight(char,sulita);
let lupta04 = new Fight(char,regele);
 //!!!!!!!!!!!
 let dng = [schelete,schSabie,sulita,regele];
 let luptaDng = [lupta,lupta02,lupta03,lupta04];
class Shop {
    constructor(){
        this.arr = [];
    }
    addItems(item){
        return this.arr.push(item);
    }
    displayItems(){
        
       for(let i =0;i<shopItemBox.length;i++){
            if(this.arr[i]&&shopItemBox[i].innerHTML!=="sold"){
                shopItemBox[i].innerHTML = this.arr[i].name;
            }else{
                continue;
            }
       }
       this.sellItems();
       
    }
    sellItems(){
        let name = "";
        let itemArr = this.arr;
        for(let i = 0 ; i < shopItemBox.length; i++){
            
            shopItemBox[i].addEventListener("click",function(e){
                
                if(e.target.innerHTML === shopItemBox[i].innerHTML && itemArr[i].price<=char.gold){
                    name = e.target.innerHTML;
                    shopItemBox[i].innerHTML = "sold";
                    shopItemBox[i].classList.add("sold");
                    for(let y = 0 ; y < invElem.length; y++){
                        if(invElem[y].innerHTML==="" && invElem[y+5].innerHTML===""){
                            if(name !== "sold"){
                                invElem[y].innerHTML = name;
                                invElem[y+5].innerHTML = name;
                                return char.itemCheck(),showGold();
                            }else{
                                continue;
                            }
                            
                        }
                        
                    }
                }
            }) 
        }
        
    }
    resetShop(){
        let itemArr = this.arr;
        for( let i=0;i<shopItemBox.length;i++){
            if(itemArr[i]){
                shopItemBox[i].classList.remove("sold");
                shopItemBox[i].innerHTML = itemArr[i].name;
            }
            
        }
        if(char.excalibur || char.armura){
            shopItemBox[2].classList.add("sold");
            shopItemBox[3].classList.add("sold");
            shopItemBox[2].innerHTML ="sold";
            shopItemBox[3].innerHTML ="sold";
        }

        for(let i = 0;i<invElem.length;i++){
            if(char.shield===0||char.hpPotion===false){
                if(invElem[i].innerHTML === "Scut"||invElem[i].innerHTML === "Hp potion"){
                    invElem[i].innerHTML ="";
                    invElem[i+5].innerHTML ="";
                    break;
                }else{
                    i++;
                }
                
            }
            
        }
        
    }
}

class Items{
    constructor(name,price){
        this.name = name;
        this.price = price;
    }
}
let shop = new Shop();
let scut = new Items("Scut",10);
let hpPotion = new Items("Hp potion",5);
let sword = new Items("Excalibur" ,1);
let armor = new Items("Armura de fier",1);
let pant = new Items("Pantaloni de fier",15);
shop.addItems(scut);
shop.addItems(hpPotion);
shop.addItems(sword);
shop.addItems(armor);
/* shop.addItems(pant); */


