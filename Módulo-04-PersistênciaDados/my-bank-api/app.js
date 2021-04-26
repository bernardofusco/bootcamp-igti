import mongoose from 'mongoose';
import express from 'express';

import { bankRouter } from './routes/bankRouter.js';

const app = express();
app.use(express.json());
app.use(bankRouter);

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
