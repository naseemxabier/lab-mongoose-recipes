const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app ';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create ({
        title: "Spanish Omelette",
        level: "Amateur Chef",
        ingredients: ["4 eggs", "6 potatoes", "1 onion"],
        cuisine: "Mediterranean",
        dishType: "breakfast",
        image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
        duration: 40,
        creation: "Chef Xabier", 
        created: 2023,

    })
    
  })
  .then((result) => {
    console.log(result.title)
  })
  // Run your code here, after you have insured that the connection was made

  .then (() => {
    return Recipe.insertMany(data);
  })
  .then((result)=> {
    result.forEach((res)=> {
      console.log(res.title)
    })
    
  })

  .then (() => {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
  })
  .then(() => {
    console.log("You updated a recipe!")
  })
  .then(()=> {
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then (() => {
    console.log(`You removed a recipe!`)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(()=> {
    console.log(`Disconnected`)
    mongoose.disconnect()
    
  });
