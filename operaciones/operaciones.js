 

function operacion (){
        let  num1 = parseFloat(document.getElementById("n1").value)
        let num2 = parseFloat(document.getElementById("n2").value)
        let res = document.getElementById("resul")
    if(document.getElementById("suma").checked){
        res.textContent = num1 + num2;
    }else if(document.getElementById("resta").checked){
        res.textContent = num1 - num2;
    }else if(document.getElementById("multiplicacion").checked){
        res.textContent = num1 * num2;
    }else if(document.getElementById("divicion").checked){
        res.textContent = num2 !== 0 ? (num1 / num2) : "No se puede dividir por 0";
    }else{
        res.textContent = "seleccione una operacion";
    }

}