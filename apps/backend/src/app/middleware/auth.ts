import * as jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ errorMessage: 'Unauthorized' });

    const verified = jwt.verify(token, process.env.NX_JWT_SECRET) as {
      user: string;
    };

    req.user = verified.user;
    next();
  } catch (error) {
    res.status(401).json({ errorMessage: 'Unauthorized' });
  }
};

export default auth;
