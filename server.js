const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require ('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }  
    }
});
const app = express();

app.use(bodyParser.json());
app.use(cors());

const saltRounds = 10;
 

app.get('/', (req, res) => { res.send('its working')})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt, saltRounds)});

app.get('/profile/:id', (req, res) => {msWriteProfilerMark.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)}),

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)});


app.listen(process.env.PORT || 3000, () => {
    console.log(`app running on port ${process.env.PORT}`);
});