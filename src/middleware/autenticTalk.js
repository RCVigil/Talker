module.exports = function validatingT(req, res, next) {
  const talkerParam = req.body;

  if (!talkerParam.talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  next();
};