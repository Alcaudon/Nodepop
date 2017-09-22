'use strict'

exports.errorMessage = function(mensageType,leng){ 
    if (mensageType==="findOne"){
        if (leng==="es"){
            return ("No se ha podido encontrar el elmeneto facilitado.")
        }else{
            return ("File not found.")
        }
     }
};

