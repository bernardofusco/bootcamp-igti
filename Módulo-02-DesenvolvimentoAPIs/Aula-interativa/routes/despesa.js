import express from 'express';
import { promises } from 'fs';

const router = express.Router();
const readFile = promises.readFile;
const writeFile = promises.writeFile;

router.post('/', async (req, res) => {
  try {
    const json = JSON.parse(await readFile(global.fileName));
    const lancamento = { id: json.nextId++, ...req.body };
    lancamento.valor = lancamento.valor * -1;
    json.lancamentos.push(lancamento);
    await writeFile(global.fileName, JSON.stringify(json, null, 2));
    res.send(json);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
