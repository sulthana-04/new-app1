const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Import routes
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');

require('dotenv/config');

//middlwares
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));
app.use('/posts', postsRoute);
app.use('/api/user', authRoute);

app.use(express.json());
//middlewares
//app.use('/posts', () =>{
    //console.log('This is a middleware running');
//})

//ROUTES
app.get('/', (req, res) => {
    res.send('Crud Application');

});


app.get('/posts', (req, res) => {
    res.send('Crud Application');

});
const mongoUri="mongodb+srv://sulthana:sulthana@crud.xngbi.mongodb.net/sulthana?retryWrites=true&w=majority"
//cnnct to db
mongoose.connect(
 mongoUri,
{useNewUrlParser: true },
() => console.log('connect to DB!')
);



//hw to strt listening to server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("listening to 5000 ");
});