const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const fs = require('fs').promises;
const path = require('path');
// const { isNumberObject } = require('util/types');
const talkerData = require('./talker.json');

const app = express();

app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const pathTalker = path.resolve(__dirname, '..', 'src', 'talker.json');

let passToken = { token: '3419db2a8aa4361f' };

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const managers = JSON.parse(await fs.readFile(pathTalker, 'utf8'));
  res.status(200).json(managers);
});

app.get('/talker/:id', (req, res) => {
  const idPar = Number(req.params.id);
  const manager = talkerData.find((e) => e.id === idPar);
  if (!manager) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } else {
    res.status(200).json(manager);
  }
});

app.post('/login', async (req, res) => {
  // https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/
  crypto.randomBytes(8, async (err, buf) => {
    if (err) {
      console.log(`log de erro: ${err}`);
      return err;
    } 
      const mytoken = await buf.toString('hex');
      passToken = { token: `${mytoken}` };
      return passToken;
  });
  res.status(200).json(passToken);
});

app.listen(PORT, () => {
  console.log('Online');
});
