import express from 'express';
import { accountModel } from '../models/accountModel.js';

const app = express();

const WITHDRAW_TX = 1;
const TRANSFER_TX = 8;

app.patch('/deposit', async (req, res) => {
  const { agencia, conta, balance } = req.body;

  try {
    const updateBalance = await accountModel.findOneAndUpdate(
      { agencia: agencia, conta: conta },
      { $inc: { balance: balance } },
      { new: true }
    );
    if (!updateBalance) {
      res.sendStatus(404).send('Agência ou conta não encontrado!');
    } else {
      res.send(
        'Saldo atualizado com sucesso! Novo saldo: ' + updateBalance.balance
      );
    }
  } catch (err) {
    res.sendStatus(500).send(+err);
  }
});

app.post('/withdraw', async (req, res) => {
  const { agencia, conta, balance } = req.body;
  const withdrawValue = balance + WITHDRAW_TX;
  try {
    const verifyBalance = await accountModel.findOne({
      agencia: agencia,
      conta: conta,
    });
    if (withdrawValue > verifyBalance.balance)
      res.sendStatus(500).send('Saldo insuficiente!');

    const updateBalance = await accountModel.findOneAndUpdate(
      { agencia: agencia, conta: conta },
      { $inc: { balance: -withdrawValue } },
      { new: true }
    );
    if (!updateBalance) {
      res.sendStatus(404).send('Agência ou conta não encontrado!');
    } else {
      res.send(
        'Saque realizado com sucesso! Novo saldo: ' +
          updateBalance.balance +
          ' (Taxa de saque  1,00)'
      );
    }
  } catch (err) {
    res.sendStatus(500).send(+err);
  }
});

app.get('/balance/:agencia/:conta', async (req, res) => {
  const { agencia, conta } = req.params;
  try {
    const getBalance = await accountModel.findOne({
      agencia: agencia,
      conta: conta,
    });
    res
      .status(200)
      .send(
        'Agência: ' +
          getBalance.agencia +
          ' | Conta: ' +
          getBalance.conta +
          ' | Saldo disponível: ' +
          getBalance.balance
      );
  } catch (err) {
    res.sendStatus(500).send(+err);
  }
});

app.delete('/delete/:agencia/:conta', async (req, res) => {
  const { agencia, conta } = req.params;
  try {
    const deleteAccount = await accountModel.findOneAndDelete({
      agencia: agencia,
      conta: conta,
    });

    const currentAgency = await accountModel.find({ agencia: agencia });
    if (!deleteAccount) {
      res.status(404).send('Agência ou conta não encontrado!');
    } else {
      res
        .status(200)
        .send(
          'Conta deletada com sucesso! Agência: ' +
            agencia +
            ' - Total de contas ativas: ' +
            currentAgency.length
        );
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch('/transfer', async (req, res) => {
  const { originAccount, destinyAccount, value } = req.body;
  try {
    const currentOriginAccount = await accountModel.findOne({
      conta: originAccount,
    });
    const currentDestinyAccount = await accountModel.findOne({
      conta: destinyAccount,
    });

    if (
      currentOriginAccount.balance < value ||
      !currentOriginAccount ||
      !currentDestinyAccount
    ) {
      res
        .status(500)
        .send('Saldo insuficiente, ou alguma das contas não existe');
    } else {
      if (currentOriginAccount.agencia === currentDestinyAccount.agencia) {
        await currentOriginAccount
          .updateOne({ $inc: { balance: -value } }, { new: true })
          .then(() => {
            res.status(200).send({
              message:
                'Usuário atualizado com sucesso!' +
                (currentOriginAccount.balance - value),
            });
          })
          .catch((err) => {
            res.status(400).send({
              message: 'Falha ao atualizar o Usuário ',
              data: err,
            });
          });
      } else {
        await currentOriginAccount
          .updateOne(
            {
              $inc: { balance: -(value + TRANSFER_TX) },
            },
            { new: true }
          )
          .then(() => {
            res.status(200).send({
              message:
                'Usuário atualizado com sucesso!' +
                (currentOriginAccount.balance - (value + TRANSFER_TX)),
            });
          })
          .catch((err) => {
            res.status(400).send({
              message: 'Falha ao atualizar o Usuário ',
              data: err,
            });
          });
      }
      await currentDestinyAccount.updateOne(
        { $inc: { balance: value } },
        { new: true }
      );
      console.log(currentDestinyAccount.balance + value);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/average_balance/:agencia', async (req, res) => {
  const { agencia } = req.params;
  try {
    let averageBalance = await accountModel.aggregate([
      { $match: { agencia: parseInt(agencia) } },
      { $group: { _id: '$agencia', media: { $avg: '$balance' } } },
    ]);
    res.status(200).send(averageBalance);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/min_balance/:qnt', async (req, res) => {
  const { qnt } = req.params;
  try {
    let minAccountsBalance = await accountModel.aggregate([
      { $sort: { balance: 1 } },
      { $limit: parseInt(qnt) },
    ]);
    res.status(200).send(minAccountsBalance);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/max_balance/:qnt', async (req, res) => {
  const { qnt } = req.params;
  try {
    let lessAccountBalance = await accountModel.aggregate([
      { $sort: { balance: -1 } },
      { $limit: parseInt(qnt) },
    ]);
    res.status(200).send(lessAccountBalance);
  } catch (err) {
    res.status(500).send(err);
  }
});

export { app as bankRouter };
