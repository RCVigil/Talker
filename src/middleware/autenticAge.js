module.exports = function validatingAge(req, res, next) {
  const talkerParam = req.body;

  if (!talkerParam.age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (talkerParam.age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};