var ingreso1 = [
    new Ingress('Salario', 5000.00), 
    new Ingress('Venta', 1000.00)
]

var egreso1 = [
    new Egress('Ropa', 500.00),
    new Egress('Comida', 1000.00)
]

let totalIngress= ()=>{
    let total = 0
    ingreso1.forEach(element => {
        total += element.valor;
    });
    return total
}

let totalEgress = ()=>{
    let total = 0.0
    egreso1.forEach(element=>{
        total += element.valor
    });
    return total
}

let presupuesto = () =>{
    let presupuesto = 0
    presupuesto = totalIngress() - totalEgress()
    return presupuesto
}

let tablaIngress = () =>{
    let str = '';
    ingreso1.forEach((element, index) => {
        let val = formatoMoneda(element.valor)
        str += `<tr class="table-ingress__tr table-ingress__tr--td">`
        str += `<td>${element.descripcion}</td>`
        str += `<td>+ ${val}</td>`
        str += `<td><button onclick="deleteIngress(${index})" class="form__button"><ion-icon id="ion-color-ingress" name="close-circle-outline"></ion-icon></button></td>`
        str += `</tr>`
    });
    
    return str
}

let tablaEgress = () =>{
    let str = '';
    egreso1.forEach((element, index) => {
        let val = formatoMoneda(element.valor)
        let por = formatoPorcentaje((element.valor)/totalEgress())
        str += `<tr class="table-egress__tr table-egress__tr--td">`;
        str += `<td>${element.descripcion}</td>`;
        str += `<td>- ${val}</td>`;
        str += `<td>${por}</td>`;
        str += `<td><button onclick="deleteEgress(${index})" class="form__button"><ion-icon id="ion-color-egress" name="close-circle-outline"></ion-icon></button></td>`;
        str += `</tr>`;
    });
    
    return str
}

let deleteIngress = function(index){
    ingreso1.splice(index, 1);
    loadData()
}

let deleteEgress = function(index){
    egreso1.splice(index, 1);
    loadData()
}

let loadData = () =>{
    let tabla_ingress = tablaIngress()
    let tabla_egress = tablaEgress()
    let porEgress = totalEgress()/totalIngress()
    document.getElementById('ingreso').innerHTML = `INGRESOS:   ${formatoMoneda(totalIngress())}`;
    document.getElementById('egreso').innerHTML = `EGRESOS: ${formatoMoneda(totalEgress())}  - ${formatoPorcentaje(porEgress)}`;
    document.getElementById('presupuesto').innerHTML = `${formatoMoneda(presupuesto())}`;
    document.getElementById('table_ingress').innerHTML = `${formatoMoneda(tabla_ingress)}`;
    document.getElementById('table_egress').innerHTML = `${formatoMoneda(tabla_egress)}`;
}

const formatoMoneda = function(valor){
    return valor.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2});
}
const formatoPorcentaje = function(valor){
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2});
}


let cargar = () =>{
    const forma = document.getElementById('forma');
    let description = forma['description'];
    let value = forma['value'];
    let select = forma['select'];
    console.log(select.value)
    if (select.value == "+"){
        let newIngress = new Ingress(description.value, parseFloat(value.value))
        ingreso1.push(newIngress)
    }else if (select.value == "-"){
        let newEgress = new Egress(description.value, parseFloat(value.value))
        egreso1.push(newEgress)
    }
    loadData()
}