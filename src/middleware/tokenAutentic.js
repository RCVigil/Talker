// const fs = require('fs/promises');
const crypto = require('crypto');

module.exports = crypto.randomBytes(8, (err, buf) => {
  if (err) {
    console.log(err);
    return err;
  } 
    const mytoken = buf.toString('hex');
    return mytoken;
});

// module.exports = function tokenAutentic(request, response, next) {
//   const token = request.headers;

  // if (content-length >= 15) {
  //   return response.status(401).json({ message: 'token not found' });
  // }
//   console.log(token);
//   next();
// };

// function geraStringAleatoria(16) {
//   let stringAleatoria = '';
//   let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   for (var i = 0; i < 16; i++) {
//       stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
//   }
//   return stringAleatoria;
// }
