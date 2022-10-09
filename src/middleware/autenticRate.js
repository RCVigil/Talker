module.exports = async function validatingRate(req, res, next) {
  const talkerParam = req.body.talk.rate;
  console.log(talkerParam);

  if (!Number.isInteger(talkerParam)) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (talkerParam < 1 || talkerParam > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  await next();
};