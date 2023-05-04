const express = require('express')
const router = express.Router()
const Vegetable = require('../models/vegetables')


// I.N.D.U.C.E.S
// ==============

// Index


router.get('/', async (req, res) => {
    console.log('Index Controller Func. running...');
    try {
      const foundVegetable = await Vegetable.find({})
      res.render('vegetables/Index', { vegetables: foundVegetable});
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // New // renders a form to create a new fruit
  
  
  router.get('/new', (req, res) => {
    res.render('vegetables/New');
  });
  
  // DELETE/DESTROY
  // This receives info the id of the fruit document and deletes it, then redirects back to index.
  
  
  router.delete('/:id', async (req, res) => {
    try{
      await Vegetable.findByIdAndDelete(req.params.id)
      res.redirect('/vegetables')
    }catch(err) {
      res.status(400).send(err)
    }
  });
  
  
  // Update / (PUT)
  
  
  
  router.put('/:id', async (req,res) => {
    try{
      req.body.readyToEat = req.body.readyToEat === 'on';
      const updatedVegetable = await Vegetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
      console.log(updatedVegetable);
      //console.log(fruits);
      // redirect is making a GET request to whatever path you specify
      res.redirect(`/vegetables/${req.params.id}`);
    }catch (err) {
      res.status(400).send(err)
    }
  })
  
  
  // Create // recieves info from new route to then create a new fruit w/ it
  
  
  router.post('/', async (req, res) => {
    try {
      req.body.readyToEat = req.body.readyToEat === 'on';
      const newVegetable = await Vegetable.create(req.body);
      console.log(newVegetable);
      //console.log(fruits);
      // redirect is making a GET request to whatever path you specify
      res.redirect('/vegetables');
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  
  // Edit
  
  
  router.get("/:id/edit", async (req, res) => {
    try{
      // Finding the document that we are about to edit, then giving the Edit.jsx the found document via props.
      const foundVegetable = await Vegetable.findById(req.params.id)
      res.render("vegetables/Edit", {
        vegetable: foundVegetable
      })
    }catch (err) {
      res.status(400).send(err)
    }
  })
  
  
  // Show
  
  
  router.get('/:id', async (req, res) => {
    try {
      // We are using the id given to us in the URL params to 
      // query our database.
      const foundVegetable = await Vegetable.findById(req.params.id)
      res.render('vegetables/Show', {
        //second param must be an object
        vegetable: foundVegetable
        //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
      });
    }catch(err) {
      res.status(400).send(err);
    }
  });
  

  module.exports = router