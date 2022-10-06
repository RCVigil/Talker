module.exports = function autenticEmail(req, res, next) {
  const validationEmailReg = /\S+@\S+\.\S+/;

  const emailPost = req.body.email;
  
  if (!emailPost) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validationEmailReg.test(emailPost)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};
