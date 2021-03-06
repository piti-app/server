const express = require('express');
const expressGraphQL = require('express-graphql')
const app = express();
const cors = require('cors');
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const route = require('./route')

app.use('/graphql',expressGraphQL({
  schema,
  graphiql : true
}))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require('dotenv').config();

let url = "";
if(process.env.NODE_ENV === 'test'){
  url = `mongodb://localhost:27017/piti`;
}
else{
  // url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds159772.mlab.com:59772/blog`;
  url = `mongodb://${process.env.USER_MLAB}:${process.env.PASSWORD_MLAB}@ds247170.mlab.com:47170/piti-app`;
  // url='mongodb://movie:movie17@ds129233.mlab.com:29233/movie'
}

const port = 4000;

mongoose.connect(url,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected to the database');
  console.log(url)
});

app.use('/', route)

app.listen(port || '4000',()=>{
  console.log(`application is on port ${port}`)
});

module.exports = app