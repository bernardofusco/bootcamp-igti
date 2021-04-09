import express from 'express';
import receitaRouter from './receita.js';
import despesaRouter from './despesa.js';

const router = express.Router();

router.use('/receita', receitaRouter);

router.use('/despesa', despesaRouter);

export default router;
