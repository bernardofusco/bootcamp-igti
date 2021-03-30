import { promises as fs } from 'fs';

let brasileirao = [];
const times = [];

const DIR = './files/';

async function readFiles() {
  try {
    brasileirao = JSON.parse(await fs.readFile(`${DIR}data.json`));

    brasileirao[0].partidas.forEach((partida) => {
      times.push({ Time: partida.mandante, Pontos: 0 });
      times.push({ Time: partida.visitante, Pontos: 0 });
    });
  } catch (err) {
    console.log(err);
  }
}

async function pontuacaoTimes() {
  brasileirao.forEach((rodada) => {
    rodada.partidas.forEach((partida) => {
      const timeMandante = times.find((item) => item.Time === partida.mandante);
      //prettier-ignore
      const timeVisitante =
      times.find((item) => item.Time === partida.visitante);
      if (partida.placar_mandante > partida.placar_visitante) {
        timeMandante.Pontos += 3;
      } else if (partida.placar_visitante > partida.placar_mandante) {
        timeVisitante.Pontos += 3;
      } else {
        timeMandante.Pontos += 1;
        timeVisitante.Pontos += 1;
      }
    });
  });
}

function timeCampeao() {
  times.sort((a, b) => {
    if (a.Pontos < b.Pontos) return 1;
    else if (a.Pontos > b.Pontos) return -1;
    else return 0;
  });
  console.log('O campeão foi: ' + times[0].Time);
}

async function salvaTimes() {
  await fs.writeFile(
    `${DIR}classificacao.json`,
    JSON.stringify(times, null, 2)
  );
}

async function start() {
  await readFiles();
  await pontuacaoTimes();
  timeCampeao();
  salvaTimes();
  console.log(times);
}

start();
