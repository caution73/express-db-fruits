require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const Fruit = require('./models/fruit');
const Vegetable = require('./models/vegetables')
const { connect, connection } = require('mongoose');
const methodOverride = require('method-override')
const fruitsController = require('./controllers/fruitsController')
const vegetablesController = require('./controllers/vegetablesController')


// Database connection
connect(process.env.MONGO_URI, {
  // Having these two properties set to true is best practice when connecting to MongoDB
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// This line of code will run the function below once the connection to MongoDB has been established.
connection.once('open', () => {
  console.log('connected to mongo');
});

// View Engine Middleware Configure
const reactViewsEngine = require('jsx-view-engine').createEngine();
app.engine('jsx', reactViewsEngine);
// This line tells the render method the default file extension to look for.
app.set('view engine', 'jsx');
// This line sets the render method's default location to look for a jsx file to render. Without this line of code we would have to specific the views directory everytime we use the render method
app.set('views', './views');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// The line below tells the server to look for static assets in the public folder, like css, imgs, or fonts
app.use(express.static('public'))

// Custom Middleware
app.use((req, res, next) => {
  console.log('Middleware running...');
  next();
});


app.use('/fruits', fruitsController)
app.use('/vegetables', vegetablesController)



// Catch-all route

app.get('/*', (req, res) => {
  res.redirect('/fruits')
});

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});