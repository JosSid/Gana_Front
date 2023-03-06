export function validarDocumento(documento) {
    const dniRegex = /^\d{8}[a-zA-Z]$/;
    const nieRegex = /^[XYZ]\d{7}[a-zA-Z]$/;
    let valido = false;
  
    if (dniRegex.test(documento)) {
      const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
      const numero = documento.substr(0, 8);
      const letra = documento.charAt(8).toUpperCase();
      const resto = numero % 23;
  
      if (letra === letras.charAt(resto)) {
        valido = true;
      }
    } else if (nieRegex.test(documento)) {
      const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
      const numero = documento.substr(1, 7).replace("X", "0").replace("Y", "1").replace("Z", "2");
      const letra = documento.charAt(8).toUpperCase();
      const resto = numero % 23;
  
      if (letra === letras.charAt(resto)) {
        valido = true;
      }
    }
  
    return valido;
  };

  export function validarCodigoPostal(codigoPostal) {
    const regex = /^\d{5}$/; 
    let valido = false;
  
    if (regex.test(codigoPostal)) {
      valido = true;
    }
  
    return valido;
  };

  export function validarTelefono(telefono) {
    const regex = /^(6|7|8|9)\d{8}$/;
    let valido = false;
  
    if (regex.test(telefono)) {
      valido = true;
    }
  
    return valido;
  };