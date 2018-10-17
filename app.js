const express = require('express');
const expressGraphQL = require('express-graphql')
const app = express();
const cors = require('cors');
const schema = require('./schema/schema')
const mongoose = require('mongoose')

app.use('/graphql',expressGraphQL({
  schema,
  graphiql : true
}))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require('dotenv').config();

const url = `mongodb://${process.env.USER_MLAB}:${process.env.PASSWORD_MLAB}@ds247170.mlab.com:47170/piti-app`
const port = 4000;

mongoose.connect(url,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected to the database');
});

app.listen(port || '4000',()=>{
  console.log(`application is on port ${port}`)
});
