const express = require('express')
const router = express.Router()
const Fruit = require('../models/fruit')


// Seed Route
router.get('/seed', async (req, res) => {
    try {
      await Fruit.create([
        {
          name: 'grapefruit',
          color: 'pink',
          readyToEat: true,
        },
        {
          name: 'grape',
          color: 'purple',
          readyToEat: false,
        },
        {
          name: 'avocado',
          color: 'green',
          readyToEat: true,
        },
      ]);
      res.redirect('/fruits');
    } catch (err) {
      res.status(400).send(err);
    }
  });


router.get('/', async (req, res) => {
    console.log('Index Controller Func. running...');
    try {
      const foundFruit = await Fruit.find({})
      res.render('fruits/Index', { fruits: foundFruit});
    } catch (err) {
      res.status(400).send(err);
    }
  });

router.get('/new', (req, res) => {
  res.render('fruits/New');
  });


  router.delete('/:id', async (req, res) => {
    try{
      await Fruit.findByIdAndDelete(req.params.id)
      res.redirect('/fruits')
    }catch(err) {
      res.status(400).send(err)
    }
  });

  router.put('/:id', async (req,res) => {
    try{
      req.body.readyToEat = req.body.readyToEat === 'on';
      const updatedFruit = await Fruit.findByIdAndUpdate(req.params.id, req.body, { new: true });
      console.log(updatedFruit);
      //console.log(fruits);
      // redirect is making a GET request to whatever path you specify
      res.redirect(`/fruits/${req.params.id}`);
    }catch (err) {
      res.status(400).send(err)
    }
  });

  router.post('/', async (req, res) => {
    try {
      req.body.readyToEat = req.body.readyToEat === 'on';
      const newFruit = await Fruit.create(req.body);
      console.log(newFruit);
      //console.log(fruits);
      // redirect is making a GET request to whatever path you specify
      res.redirect('/fruits');
    } catch (err) {
      res.status(400).send(err);
    }
  });

  router.get("/:id/edit", async (req, res) => {
    try{
      // Finding the document that we are about to edit, then giving the Edit.jsx the found document via props.
      const foundFruit = await Fruit.findById(req.params.id)
      res.render("fruits/Edit", {
        fruit: foundFruit
      })
    }catch (err) {
      res.status(400).send(err)
    }
  })

  router.get('/:id', async (req, res) => {
    try {
      // We are using the id given to us in the URL params to 
      // query our database.
      const foundFruit = await Fruit.findById(req.params.id)
      res.render('fruits/Show', {
        //second param must be an object
        fruit: foundFruit
        //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
      });
    }catch(err) {
      res.status(400).send(err);
    }
  });

  module.exports = router