import { existsSync, promises } from 'fs';

let cidades = [];
let estados = [];
let cityDataArray = {};

const dir = './estados/';

async function start() {
  await readFilesJson();
  await creatEstatesFiles();
  await getFiveStatesMore();
  await getFiveStatesLess();
  await getBiggerNameStates();
  await getSmallerNameStates();
}

async function readFilesJson() {
  let cidadesTemp = [];
  let estadosTemp = [];
  try {
    cidadesTemp = await promises.readFile('./arquivos/Cidades.json');
    estadosTemp = await promises.readFile('./arquivos/Estados.json');
    cidades = JSON.parse(cidadesTemp);
    estados = JSON.parse(estadosTemp);
  } catch (err) {
    console.log(err);
  }
}

async function arrayCidades(state) {
  let cityData = [];
  let count = 0;
  cidades.forEach((cidade) => {
    if (cidade.Estado === state.ID) {
      count++;
      cityData = [...cityData, `${cidade.Nome}`];
    }
  });
  cityDataArray = {
    Sigla: `${state.Sigla}`,
    TotalCidades: `${count}`,
    NomeEstado: `${state.Nome}`,
    Cidades: cityData,
  };

  return cityDataArray;
}

async function creatEstatesFiles() {
  if (!existsSync(dir)) promises.mkdir(dir);
  for (let i = 0; i < estados.length; i++) {
    let temp = JSON.stringify(await arrayCidades(estados[i]));
    if (!existsSync(`${dir}${estados[i].Sigla}.json`))
      promises.writeFile(`${dir}${estados[i].Sigla}.json`, `${temp}`);
  }
}

async function getFiveStatesMore() {
  let list = [];
  for (let i = 0; i < estados.length; i++) {
    const total = await QtdCity(estados[i].Sigla);
    list.push({ Estado: estados[i].Sigla, Total: total });
  }
  list.sort((a, b) => {
    if (parseInt(a.Total) < parseInt(b.Total)) return 1;
    else if (parseInt(a.Total) > parseInt(b.Total)) return -1;
    else return 0;
  });
  const result = [];
  list
    .slice(0, 5)
    .forEach((item) => result.push(item.Estado + ' . ' + item.Total));
  console.log('\nOs 5 estados com maior número de cidades:');
  console.log(result + '\n');
}

async function getFiveStatesLess() {
  let list = [];
  for (let i = 0; i < estados.length; i++) {
    const total = await QtdCity(estados[i].Sigla);
    list.push({ Estado: estados[i].Sigla, Total: total });
  }
  list.sort((b, a) => {
    if (parseInt(a.Total) < parseInt(b.Total)) return 1;
    else if (parseInt(a.Total) > parseInt(b.Total)) return -1;
    else return 0;
  });
  const result = [];
  list
    .slice(0, 5)
    .forEach((item) => result.push(item.Estado + ' . ' + item.Total));
  console.log('\nOs 5 estados com menor número de cidades:');
  console.log(result + '\n');
}

async function QtdCity(uf) {
  try {
    if (existsSync(`${dir}${uf}.json`)) {
      let temp = JSON.parse(await promises.readFile(`${dir}${uf}.json`));
      return temp.TotalCidades;
    }
  } catch (err) {
    console.log(err);
  }
}

async function getBiggerNameStates() {
  let result = [];
  for (let i = 0; i < estados.length; i++) {
    let city = await getBiggerName(estados[i].Sigla);
    result.push({ Cidade: city, Estado: estados[i].Sigla });
  }
  result.sort((b, a) => {
    if (a < b) return 1;
    else if (a > b) return -1;
    else return 0;
  });

  const biggerName = result.reduce((prev, current) => {
    if (prev.Cidade.length > current.Cidade.length) return prev;
    else if (prev.Cidade.length < current.Cidade.length) return current;
  });

  console.log('\nCidades com maior número de caracteres - Estado');
  console.log(result);

  console.log('\nCidade com maior número de caracteres entre todos os estados');
  console.log(biggerName);
}

async function getSmallerNameStates() {
  let result = [];
  let smallerName = [];
  for (let i = 0; i < estados.length; i++) {
    let city = await getSmallerName(estados[i].Sigla);
    result.push({ Cidade: city, Estado: estados[i].Sigla });
  }

  result.sort((b, a) => {
    if (a < b) return 1;
    else if (a > b) return -1;
    else return 0;
  });

  console.log('\nCidades com menor número de caracteres - Estado');
  console.log(result);
}

async function getBiggerName(uf) {
  let maxSize = 0;
  let city = '';
  let cities = JSON.parse(await promises.readFile(`${dir}${uf}.json`));
  for (let i = 0; i < cities.Cidades.length; i++) {
    if (cities.Cidades[i].length > maxSize) {
      maxSize = cities.Cidades[i].length;
      city = cities.Cidades[i];
    } else if (
      cities.Cidades[i].length === maxSize &&
      cities.Cidades[i].toLowerCase() < city.toLowerCase()
    ) {
      city = cities.Cidades[i];
    }
  }
  return city;
}

async function getSmallerName(uf) {
  let minSize = 100;
  let city = '';
  let cities = JSON.parse(await promises.readFile(`${dir}${uf}.json`));
  for (let i = 0; i < cities.Cidades.length; i++) {
    if (cities.Cidades[i].length < minSize) {
      minSize = cities.Cidades[i].length;
      city = cities.Cidades[i];
    } else if (
      cities.Cidades[i].length === minSize &&
      cities.Cidades[i].toLowerCase() < city.toLowerCase()
    ) {
      city = cities.Cidades[i];
    }
  }
  return city;
}

start();
