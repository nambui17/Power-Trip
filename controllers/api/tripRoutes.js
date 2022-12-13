const router = require('express').Router();
const {
  Trip,
  Destination,
  User,
  TripDestination,
  Companion,
  Image,
} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const tripData = await Trip.create(req.body);
    req.body.users.map(async (user) => {
      await Companion.create({
        trip_id: tripData.id,
        user_id: user,
      });
    });
    req.body.destinations.map(async (destination) => {
      await TripDestination.create({
        trip_id: tripData.id,
        destination_id: destination,
      });
    });
    res.status(200).json(tripData);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const tripData = await Trip.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tripData) {
      res.status(404).json({ message: 'No trip found with this id' });
      return;
    }
    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tripData = await Trip.update({
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      rating: req.body.rating,
      comment: req.body.comment,
      done: req.body.done,
      price: req.body.price
    }, {
      where: {
        id: req.params.id,
      },
    });
    console.log('hello');
    await Companion.destroy({
      where: {
        trip_id: req.params.id
      }
    });
    req.body.users.map(async (user) => {
      await Companion.create({
        trip_id: req.params.id,
        user_id: user
      });
    });
    await TripDestination.destroy({
      where: {
        trip_id: req.params.id
      }
    });
    req.body.destinations.map(async (dest) => {
      await TripDestination.create({
        trip_id: req.params.id,
        destination_id: dest
      });
    });

    if (!tripData) {
      res.status(404).json({ message: 'No trip found with this id' });
      return;
    }

    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const tripData = await Trip.findAll({
      include: [
        { model: Destination },
        { model: User, attributes: ['username', 'id'] },
        { model: Image, attributes: ['id','image_url'] },
      ],
    });
    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tripData = await Trip.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: Destination },
        { model: Image},
        { model: User, attributes: ['username'] },
      ],
    });
    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
