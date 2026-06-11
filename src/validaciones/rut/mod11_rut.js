export { mod11_rut };

/**
 * @description algoritmo que verifica que un rut de ya sea de 8 o 7 digitos sea valido.
 * @param {string} rut - el rut debe estar con digito verificador incluido.
 * @returns {boolean}
 */
function mod11_rut(rut){

    let rut_array = rut.split(""); //separamos el rut para convertirlo en un array

    let digito_verificador = rut[rut.length - 1];

    rut_array.pop();

    /*verificamos si el string contiene un numero para luego
    convertirlo en un int.*/

    if (!isNaN(digito_verificador)){

        digito_verificador = parseInt(digito_verificador);
    }

    //eliminimos el digito verificador del array ya que no se toma en cuenta en la multiplicación.

    const rut_alreves = rut_array.reverse();

    let num = 2; //este es el numero al que se multplicaran los digitos del rut
    let total = 0;


    for (let i = 0; i < rut_alreves.length; i++){     


        if (rut_alreves[i] !== '-'){

            total += num * parseInt(rut_alreves[i]);
            
            num += 1

        }

        if (num > 7){

            num = 2;
        }

    }

    const resto_division = total % 11;
    const resultado = 11 - resto_division;

    //si el resultado es igual al digito verificador entonces es valido y regresamos true...
    if (resultado === digito_verificador){

        return true;
    
    } else if (resultado === 11 && digito_verificador === 0){

        return true;
    
    } else if (resultado === 10 && digito_verificador === 'k'){

        return true;
    }

    //..de lo contrario, regresamos false.
    else{

        return false;
    }
}