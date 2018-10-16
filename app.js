const express = require('express');
const expressGraphQL = require('express-graphql')
const app = express();
const cors = require('cors');
const schema = require('./schema/schema')

app.use('/graphql',expressGraphQL({
  schema,
  graphiql : true
}))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require('dotenv').config();

const port = 4000;

app.listen(port || '4000');
