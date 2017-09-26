const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express = require('express');
const models = require('./models');

const PORT = process.env.PORT || 8000;


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts',
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);


app.use(require('./controllers'));


models.sequelize.sync({ force: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up and running on port: ${PORT}`)
    });
  })


