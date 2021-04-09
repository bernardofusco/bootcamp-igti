import express from 'express';
import financesRouter from './routes/finances.js';
import { existsSync, promises } from 'fs';

const { writeFile } = promises;

const app = express();
global.fileName = './files/finance.json';

app.use(express.json());

app.use('/finance', financesRouter);

app.listen(3001, async () => {
  console.log('API Started!');
  const initialJson = { nextId: 1, lancamentos: [] };
  try {
    if (!existsSync('./files/')) promises.mkdir('./files/');
    await writeFile(global.fileName, JSON.stringify(initialJson), {
      flag: 'wx',
    });
  } catch (err) {
    //console.log(err);
  }
});
