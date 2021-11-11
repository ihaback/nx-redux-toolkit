import * as express from 'express';
import middleware from '../middleware';
import models from '../models';

const router = express.Router();

router.post('/', middleware.auth, async (req, res) => {
  try {
    const { name } = req.body;
    const newCustomer = new models.Customer({
      name,
    });

    const savedCustomer = await newCustomer.save();

    res.json(savedCustomer);
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/', middleware.auth, async (req, res) => {
  const { page = 1, limit = 10, searchString } = req.query;

  try {
    if (searchString) {
      const list = await models.Customer.find({
        name: { $regex: '.*' + searchString + '.*' },
      })
        .sort({ _id: -1 })
        .limit((limit as number) * 1)
        .skip(((page as number) - 1) * (limit as number))
        .exec();

      const count = await models.Customer.find({
        name: { $regex: '.*' + searchString + '.*' },
      });

      return res.json({ list, length: count.length });
    }

    const list = await models.Customer.find()
      .sort({ _id: -1 })
      .limit((limit as number) * 1)
      .skip(((page as number) - 1) * (limit as number))
      .exec();

    const count = await models.Customer.find();

    return res.json({ list, length: count.length });
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
