import mongoose from 'mongoose';
import express from 'express';

import { studentRouter } from './routes/studentRouter.js';

const app = express();
app.use(express.json());
app.use(studentRouter);

{
  try {
    await mongoose.connect('<LINK_MONGODB_ATLAS>', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (err) {
    console.log('MongoDB não conectado' + err);
  }
}

app.listen(3000, () => console.log('API iniciada!'));
