const express = require('express'); //require là cú pháp để import thư viện vào
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const path = require('path');
const app = express(); //gọi hàm express để trả về 1 đối tượng qua đó có thể xây dựng website
const port = 3000;

const sortMiddleware = require('./app/middlewares/sortMiddleware');
const route = require('./routes');
const db = require('./config/db');

//connect db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

//app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

app.use(sortMiddleware);

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//Routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
