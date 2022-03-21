
class Ingress{
    static idIngress = 0;
    
    constructor(descripcion, valor) {
        this._idIngress = ++Ingress.idIngress
        this._descripcion = descripcion
        this._valor = valor
    }

    get descripcion(){
        return this._descripcion
    }
    get valor(){
        return this._valor
    }

    set descripcion(descripcion){
        this._descripcion = descripcion
    }
    set valor(valor){
        this._valor = valor
    }
}