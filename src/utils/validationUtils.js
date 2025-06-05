/**
 * Valida una cédula ecuatoriana.
 * Adaptado de varias fuentes en línea.
 * @param {string} cedula El número de cédula a validar.
 * @returns {boolean | string} true si es válida, o un string con el mensaje de error.
 */
export const isValidEcuadorianCedula = (cedula) => {
  if (typeof cedula !== 'string') return 'La cédula debe ser una cadena de texto.';
  if (!/^\d+$/.test(cedula)) return 'La cédula debe contener solo números.';
  if (cedula.length !== 10) return 'La cédula debe tener 10 dígitos.';

  const provincia = parseInt(cedula.substring(0, 2), 10);
  if (provincia < 1 || (provincia > 24 && provincia !== 30)) {
    return 'Código de provincia inválido.';
  }

  const tercerDigito = parseInt(cedula[2], 10);
  if (tercerDigito >= 6) {
    return 'Tercer dígito inválido.';
  }

  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let suma = 0;

  for (let i = 0; i < 9; i++) {
    let producto = parseInt(cedula[i], 10) * coeficientes[i];
    if (producto >= 10) {
      producto -= 9;
    }
    suma += producto;
  }

  const digitoVerificadorCalculado = suma % 10 === 0 ? 0 : 10 - (suma % 10);
  const digitoVerificadorReal = parseInt(cedula[9], 10);

  if (digitoVerificadorCalculado !== digitoVerificadorReal) {
    return 'Dígito verificador incorrecto. La cédula no es válida.';
  }

  return true; // Cédula válida
};