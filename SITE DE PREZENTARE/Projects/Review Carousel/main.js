class Person{
    constructor(foto,firstName,lasName,position,description,){
        this.foto = foto;
        this.firstName = firstName
        this.lasName = lasName;
        this.position = position;
        this.description = description;
    }
    fullName(){
        return (`${this.lasName} ${this.firstName}`)
    }

}
let person1 = new Person("da","Andrei" , "ggv" , "web dev", "lorem");

