const jwt =  require('jsonwebtoken');

const Sign = async  (data) => {return   jwt.sign( await data, process.env.SECRET,{ expiresIn: 60 * 60 * 2 })};

const Verify = token => {
  try {
      return jwt.verify(token, process.env.SECRET ).toString(); 
  } catch( e ){
      return `EL token es inválido. ${e}`
  }
}

exports.decodeToken = token =>jwt.decode( process.env.SECRET, token);
