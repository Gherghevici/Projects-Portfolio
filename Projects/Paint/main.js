const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const toolButtons = document.querySelectorAll(".tool");
const fillColor = document.querySelector("#fillColor");
const slider = document.querySelector("#slider");
const colorPicker = document.querySelector("#colorPicker");
const colorBtn = document.querySelectorAll(".colors .option");
const clearBtn = document.querySelector(".clear");
const saveImg = document.querySelector(".save");

let selectedColor = "black";
let isDrawing = false;
let brushWidth = 5;
let selectedTool = "brush";
let prevMouseX;
let prevMouseY;
let snapShot;

function setCanvasBg() {
    ctx.fillStyle = "#fffffe";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = selectedColor;
}

window.addEventListener("load",function() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBg();

});
function drawRect(e) {
   if(!fillColor.checked){
        return ctx.strokeRect(e.offsetX,e.offsetY,prevMouseX-e.offsetX,prevMouseY-e.offsetY);
   }else{
        return ctx.fillRect(e.offsetX,e.offsetY,prevMouseX-e.offsetX,prevMouseY-e.offsetY)
   }
    
}
function drawCircle(e){
    ctx.beginPath();
    let radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke();
}
function drawTriangle(e){
    ctx.beginPath();
    ctx.moveTo(prevMouseX,prevMouseY);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

function startDraw(e) {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapShot = ctx.getImageData(0,0,canvas.width,canvas.height);

}   

function drawing(e){
    if(!isDrawing){
        return;
    }

    ctx.putImageData(snapShot,0,0);

    if(selectedTool === "brush" || selectedTool === "eraser"){
        ctx.strokeStyle = selectedTool === "eraser" ? "#fffffe" : selectedColor;
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
    }else if(selectedTool === "rectangle"){
        drawRect(e)
    }else if(selectedTool === "circle"){
        drawCircle(e);
    }else {
        drawTriangle(e);
    }
    
}
toolButtons.forEach(btn => {
    btn.addEventListener("click",()=> {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool)})

})
colorBtn.forEach(btn => {
    btn.addEventListener("click",() =>{
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    })
})

colorPicker.addEventListener("change",()=>{
    colorPicker.parentElement.style.backgroundColor = colorPicker.value;
    colorPicker.parentElement.click();
    
})
slider.addEventListener("change" , () => brushWidth = slider.value);
canvas.addEventListener("mousedown",startDraw);
canvas.addEventListener("mousemove",drawing);
canvas.addEventListener("mouseup",()=> (isDrawing = false));

clearBtn.addEventListener("click",() =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBg();
})
saveImg.addEventListener("click", () => {
    const link = document.createElement("a"); 
    link.download = `${Date.now()}.jpg`; 
    link.href = canvas.toDataURL(); 
    link.click(); 
  });

