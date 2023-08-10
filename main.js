var init = true;
const el = document.body;
let arrTheme = [
    "theme-1",
    "theme-2",
    "theme-3"
];

window.addEventListener("load", function(){
    if (init){
        init = false;
        let theme = localStorage.getItem("theme");
        if (theme) changeTheme(theme);
    }
});

el.addEventListener("keyup", function(key){    
    
    let reg = new RegExp("[0-9]|[+,/,*,--,.]|Enter|Backspace|Escape");
    
    if (reg.test(key.key)){
        btnPress(key.key);        
    }
});

function changeTheme(position){
    let selectorBody = document.getElementById("selector-body");
    localStorage.setItem("theme", position);

    let arrPosition = [
        "selector-body selector-start",
        "selector-body selector-center",
        "selector-body selector-end"        
    ];   

    if (position === 0){            
        position = arrPosition.findIndex(element => element === selectorBody.className);
        position === 2 ? position = 0 : position += 1;
    } else {
        position -= 1;
    }

    selectorBody.className = arrPosition[position];
    document.body.className = arrTheme[position];
}

var result = 0;
var operation = "";
var lastOperation = "";
var operationDone = false;

function resolveOperation(){

    let numberDisplay = parseFloat(display.innerHTML);

    switch (operation){

    case "":
        
        return numberDisplay;        

    case "+":
        
        return result + numberDisplay;                
        
    case "-":

        return result - numberDisplay;        

    case "*":

        return result * numberDisplay;        

    case "/":

        if (operationDone) return numberDisplay / result;
        return result / numberDisplay;        
    }
        
}

function btnPress(someBtn){
    let display = document.getElementById("display");

    let arrChar = display.innerHTML.split("");                    
    if (arrChar.includes(",")) {
        arrChar = arrChar.filter(element => element != ',');
    }

    display.innerHTML = arrChar.join("");
        
    switch (someBtn){
        
    case "Enter":
        
        if (operation === "" && lastOperation != "") operation = lastOperation;

        let numberDisplay = parseFloat(display.innerHTML);        
        display.innerHTML = resolveOperation();
        if (!operationDone) result = numberDisplay;

        if (lastOperation === "") lastOperation = operation;
        operation = "";

        operationDone = true;
        break;
        

    case "+":

        if (!operationDone){
            result = resolveOperation();
            display.innerHTML = result;            
            operationDone = true;
        } else {
            operation = "";
            result = resolveOperation();
        }
        operation = "+";
        break;

    case "-":
        if (!operationDone){
            result = resolveOperation();
            display.innerHTML = result;
            operationDone = true;
        } else {
            operation = "";
            result = resolveOperation();
        }
        operation = "-";
        break;

    case "*":

        if (!operationDone){
            result = resolveOperation();
            display.innerHTML = result;
            operationDone = true;
        } else {
            operation = "";
            result = resolveOperation();
        }
        operation = "*";
        break;

    case "/":

        
        if (!operationDone){
            result = resolveOperation();
            display.innerHTML = result;
            operationDone = true;
        } else {
            operation = "";
            result = resolveOperation();
        }
        operation = "/";
        break;

    case "Escape":
        display.innerHTML = "0";
        result = 0;
        operation = "";
        operationDone = false;
        break;

    case "Backspace":
        if (!operationDone) {
            display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length -1);
            operationDone = false;
        }
        if (display.innerHTML.length === 0) display.innerHTML = 0;
        break;

    default:
        
        if (operationDone) { 
            display.innerHTML = "0";
            lastOperation = "";
        }

        if (display.innerHTML === "0" && someBtn != ".") display.innerHTML = "";
        display.innerHTML += someBtn;
        operationDone = false;
    } 
   
    

    if (display.innerHTML.length > 3){
        
        arrChar = display.innerHTML.split("");        
        
        let dotIndex = arrChar.findIndex(element => element === ".") ;
        if (dotIndex < 0) dotIndex = arrChar.length;

        display.innerHTML = "";
        for (let i = 0; i < arrChar.length; i++){

            let numberIndex = arrChar.length -1 -i;
            let digitsBeforeDot = dotIndex - numberIndex -1;

            if (digitsBeforeDot > 0 && numberIndex < dotIndex && digitsBeforeDot % 3 === 0) {
                display.innerHTML = arrChar[numberIndex] + "," + display.innerHTML;
            }
            else {
                display.innerHTML = arrChar[numberIndex] + display.innerHTML;
            }


        }   

    }
    
}