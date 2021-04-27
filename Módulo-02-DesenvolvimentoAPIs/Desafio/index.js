import express from 'express';
import gradesRouter from './routes/grades.js';

const app = express();
global.fileName = './files/grades.json';

app.use(express.json());

app.use('/grade', gradesRouter);

app.listen(3001, () => {
  console.log('API Started!');
});
