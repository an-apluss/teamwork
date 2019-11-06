import Helper from '../helper/helper';

export default class Auth {
  static checkToken(req, res, next) {
    try {
      const header = req.headers.authorization;

      if (!header) throw new Error('You do not have access to this page. No token was provided');

      const token = header.split(' ')[1];
      const decoded = Helper.verifyToken(token);

      req.user = decoded;

      return next();
    } catch (ex) {
      return res.status(401).json({
        status: 'error',
        message: `${ex.message}`
      });
    }
  }

  static isAdmin(req, res, next) {
    if (req.user.isAdmin !== true)
      return res.status(401).json({
        status: 'error',
        message: `You are unauthorized to perform this action. Only admin are allowed`
      });

    return next();
  }
}
