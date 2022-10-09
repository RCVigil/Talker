module.exports = function validatingSpeaker(req, res, next) {
  const talkerParam = req.body;

  if (!talkerParam.name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (talkerParam.name.length <= 2) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

    next();
};