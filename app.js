const express = require("express");
const logger = require("morgan");

const app = express();

const Recipe = require('./models/Recipe.model')

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require('mongoose')

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res)=> {
  console.log(req)
  console.log(req.body)

  Recipe.create(req.body)
  .then((createdRecipe)=> {
    res.status(201).json(createdRecipe)
  })
  .catch(err=> {
    console.log(err)
    res.status(500).json(err)
  })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res)=> {
  Recipe.find()
  .then((allRecipes)=> {
    console.log(allRecipes)
    res.status(200).json(allRecipes)
  })
  .catch((err)=> {
    res.send(500).json(err)
  })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res)=> {
  console.log(req, 'req here')
  Recipe.findById(req.params.id)
  .then((specifiedRecipe)=> {
    console.log(specifiedRecipe)
    res.status(200).json(specifiedRecipe)
  })
  .catch((err)=> {
    res.status(500).json(err)
  })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req, res)=> {
  Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((updatedRecipe)=> {
    console.log(updatedRecipe)
    res.status(200).json(updatedRecipe)
  })
  .catch((err)=>{
    res.status(500).json(err)
  })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
// Delete the recipe using the query param 'id' from the url!!
app.delete('recipes/:id', (req, res)=> {
  Recipe.findByIdAndDelete(req.params.id)
  .then(()=> {
    res.status(204).send()    
  })
  .catch((err)=> {
    res.status(500).json({message: 'Error while deleting a single recipe'})
  })
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
