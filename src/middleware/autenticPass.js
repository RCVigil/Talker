module.exports = function autenticPass(req, res, next) {
  const passwordPost = req.body.password;
  
  if (!passwordPost) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (passwordPost.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};