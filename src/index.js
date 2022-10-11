const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const fs = require('fs').promises;
const path = require('path');
const talkerData = require('./talker.json');
const autenticEmail = require('./middleware/autenticEmail');
const autenticPass = require('./middleware/autenticPass');
const validatingSpeaker = require('./middleware/autenticSpeaker');
const validatingToken = require('./middleware/autenticToken');
const validatingAge = require('./middleware/autenticAge');
const validatingT = require('./middleware/autenticTalk');
const validatingWatch = require('./middleware/autenticWatch');
const validatingRate = require('./middleware/autenticRate');

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

app.get('/talker/search?', validatingToken, async (req, res) => {
  const talker = JSON.parse(await fs.readFile(pathTalker, 'utf-8'));
  const text = req.query;
  if (!text) return res.status(400).json({ message: 'NOT FOUND' });
  const result = talker.filter((person) =>
    person.name.includes(text.q));
  console.log('Result é = ', result);
  if (result.length === 0) return res.status(400).json({ message: 'TEXT NOT FOUND' });
  res.status(200).json(result);
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

app.post('/login', autenticEmail, autenticPass, async (req, res) => {
  // https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/
  crypto.randomBytes(8, async (err, buf) => {
    if (err) {
      return err;
    }
    const mytoken = await buf.toString('hex');
    passToken = { token: `${mytoken}` };
    return passToken;
  });
  res.status(200).json(passToken);
});

app.post('/talker', validatingToken, validatingSpeaker, validatingAge,
  validatingT, validatingWatch, validatingRate, async (req, res) => {
    const talker = JSON.parse(await fs.readFile(pathTalker, 'utf-8'));
    const newTalker = { id: talker.length + 1, ...req.body };
    talker.push(newTalker);
    await fs.writeFile(pathTalker, JSON.stringify(talker));
    res.status(201).json(newTalker);
  });

app.put('/talker/:id', validatingToken, validatingSpeaker, validatingAge,
  validatingT, validatingWatch, validatingRate, async (req, res) => {
  const talker = JSON.parse(await fs.readFile(pathTalker, 'utf-8'));
  const { id } = req.params;
  const { name, age } = req.body;
  const { watchedAt, rate } = req.body.talk;
  let upDatedTalker;
  for (let index = 0; index < talker.length; index += 1) {
    const person = talker[index];
    if (person.id === Number(id)) {
      person.name = name;
      person.age = age;
      person.talk.watchedAt = watchedAt;
      person.talk.rate = rate;
      upDatedTalker = person;
    } 
}
    talker.push(upDatedTalker);
    await fs.writeFile(pathTalker, JSON.stringify(talker));
  res.status(200).json(upDatedTalker);
});

app.delete('/talker/:id', validatingToken, async (req, res) => {
    const talker = JSON.parse(await fs.readFile(pathTalker, 'utf-8'));
    const { id } = req.params;
    const talkerPerson = talker.filter((el) => el.id === Number(id));
    const deleteTalker = (talker.splice(talkerPerson, 1));

    await fs.writeFile(pathTalker, JSON.stringify(deleteTalker));
    res.status(204).json(deleteTalker);
  });

app.listen(PORT, () => {
  console.log('Online');
});
