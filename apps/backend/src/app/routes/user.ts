import * as express from 'express';
import models from '../models';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    if (!email || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: 'Please enter required fields' });

    if (password.length < 6)
      return res
        .status(400)
        .json({ errorMessage: 'Please provide better password' });

    if (password !== passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: 'Please enter same password twice' });

    const existingUser = await models.User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ errorMessage: 'Already exists' });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new models.User({
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.NX_JWT_SECRET
    );

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: 'Please enter required fields' });

    const existingUser = await models.User.findOne({ email });

    if (!existingUser)
      return res.status(401).json({ errorMessage: 'Wrong email or password' });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect)
      return res.status(400).json({ errorMessage: 'Wrong email or password' });

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.NX_JWT_SECRET
    );

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/logout', (req, res) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    })
    .send();
});

router.get('/loggedIn', (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.NX_JWT_SECRET);

    res.send(true);
  } catch (err) {
    res.json(false);
  }
});

export default router;
