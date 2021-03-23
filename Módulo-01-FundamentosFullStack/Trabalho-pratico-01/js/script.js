var rangeNumber = document.getElementById('range_number');
var showNumber = document.getElementById('show_number');
var extensionNumber = document.getElementById('extension_number');
function AlteraValorDoShow(alteracao) {
  showNumber.value = alteracao;
}
function verificarIndiceZero(x) {
  switch (x) {
    case '0':
      return 'zero';
      break;
    case '1':
      return 'um';
      break;
    case '2':
      return 'dois';
      break;
    case '3':
      return 'três';
      break;
    case '4':
      return 'quatro';
      break;
    case '5':
      return 'cinco';
      break;
    case '6':
      return 'seis';
      break;
    case '7':
      return 'sete';
      break;
    case '8':
      return 'oito';
      break;
    case '9':
      return 'nove';
      break;
  }
}
function verificarIndiceUm(x) {
  if (x > '10' && x < '20') {
    switch (x) {
      case '11':
        return 'onze';
        break;
      case '12':
        return 'doze';
        break;
      case '13':
        return 'treze';
        break;
      case '14':
        return 'quatorze';
        break;
      case '15':
        return 'quinze';
        break;
      case '16':
        return 'dezesseis';
        break;
      case '17':
        return 'dezessete';
        break;
      case '18':
        return 'dezoito';
        break;
      case '19':
        return 'dezenove';
        break;
    }
  } else if (x[1] === '0') {
    switch (x[0]) {
      case '1':
        return 'dez';
        break;
      case '2':
        return 'vinte';
        break;
      case '3':
        return 'trinta';
        break;
      case '4':
        return 'quarenta';
        break;
      case '5':
        return 'cinquenta';
        break;
      case '6':
        return 'sessenta';
        break;
      case '7':
        return 'setenta';
        break;
      case '8':
        return 'oitenta';
        break;
      case '9':
        return 'noventa';
        break;
    }
  } else {
    switch (x[0]) {
      case '2':
        return 'vinte' + ' e ' + verificarIndiceZero(x.slice(1));
        break;
      case '3':
        return 'trinta' + ' e ' + verificarIndiceZero(x.slice(1));
        break;
      case '4':
        return 'quarenta' + ' e ' + verificarIndiceZero(x.slice(1));
        break;
      case '5':
        return 'cinquenta' + ' e ' + verificarIndiceZero(x.slice(1));
        break;
      case '6':
        return 'sessenta' + ' e ' + verificarIndiceZero(x.slice(1));
        break;
      case '7':
        return 'setenta' + ' e ' + verificarIndiceZero(x.slice(1));
        break;
      case '8':
        return 'oitenta' + ' e ' + verificarIndiceZero(x.slice(1));
        break;
      case '9':
        return 'noventa' + ' e ' + verificarIndiceZero(x.slice(1));
        break;
    }
  }
}
function verificaIndiceDois(x) {
  if (x[1] === '0' && x[2] === '0') {
    switch (x[0]) {
      case '1':
        return 'cem';
        break;
      case '2':
        return 'duzentos';
        break;
      case '3':
        return 'trezentos';
        break;
      case '4':
        return 'quatrocentos';
        break;
      case '5':
        return 'quinhentos';
        break;
      case '6':
        return 'seiscentos';
        break;
      case '7':
        return 'setecentos';
        break;
      case '8':
        return 'oitocentos';
        break;
      case '9':
        return 'novecentos';
        break;
    }
  } else if (x[1] === '0' && x[2] !== '0') {
    switch (x[0]) {
      case '1':
        return 'cento' + ' e ' + verificarIndiceZero(x.slice(2));
        break;
      case '2':
        return 'duzentos' + ' e ' + verificarIndiceZero(x.slice(2));
        break;
      case '3':
        return 'trezentos' + ' e ' + verificarIndiceZero(x.slice(2));
        break;
      case '4':
        return 'quatrocentos' + ' e ' + verificarIndiceZero(x.slice(2));
        break;
      case '5':
        return 'quinhentos' + ' e ' + verificarIndiceZero(x.slice(2));
        break;
      case '6':
        return 'seiscentos' + ' e ' + verificarIndiceZero(x.slice(2));
        break;
      case '7':
        return 'setecentos' + ' e ' + verificarIndiceZero(x.slice(2));
        break;
      case '8':
        return 'oitocentos' + ' e ' + verificarIndiceZero(x.slice(2));
        break;
      case '9':
        return 'novecentos' + ' e ' + verificarIndiceZero(x.slice(2));
        break;
    }
  } else {
    switch (x[0]) {
      case '1':
        return 'cento' + ' e ' + verificarIndiceUm(x.slice(1));
        break;
      case '2':
        return 'duzentos' + ' e ' + verificarIndiceUm(x.slice(1));
        break;
      case '3':
        return 'trezentos' + ' e ' + verificarIndiceUm(x.slice(1));
        break;
      case '4':
        return 'quatrocentos' + ' e ' + verificarIndiceUm(x.slice(1));
        break;
      case '5':
        return 'quinhentos' + ' e ' + verificarIndiceUm(x.slice(1));
        break;
      case '6':
        return 'seiscentos' + ' e ' + verificarIndiceUm(x.slice(1));
        break;
      case '7':
        return 'setecentos' + ' e ' + verificarIndiceUm(x.slice(1));
        break;
      case '8':
        return 'oitocentos' + ' e ' + verificarIndiceUm(x.slice(1));
        break;
      case '9':
        return 'novecentos' + ' e ' + verificarIndiceUm(x.slice(1));
        break;
    }
  }
}
function firstLetter(letter) {
  return letter.charAt(0).toUpperCase() + letter.slice(1);
}
function imprimirPorExtenso(temp) {
  var porExtenso = '';
  if (temp.length === 1) porExtenso = verificarIndiceZero(temp);
  else if (temp.length === 2) porExtenso = verificarIndiceUm(temp);
  else porExtenso = verificaIndiceDois(temp);
  document.getElementById('extension_number').value = firstLetter(porExtenso);
}
window.onload = function () {
  AlteraValorDoShow(rangeNumber.value);
  imprimirPorExtenso(rangeNumber.value);
};
window.onchange = function () {
  AlteraValorDoShow(rangeNumber.value);
  imprimirPorExtenso(rangeNumber.value);
};
