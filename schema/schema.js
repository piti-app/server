const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLdate
} = require('graphql')
const axios = require('axios')

const User = new GraphQLObjectType({
  name : "UserType",
  fields : {
    _id : { type : GraphQLID },
    name : { type : GraphQLString },
    expenses : { type : GraphQLString },
    email : { type : GraphQLString }
  }
})

// const Expense = new GraphQLObjectType({
//   name : "ExpenseType",
//   fields : {
//     _id : { type : GraphQLID },
//     description : { type : GraphQLString },
//     price : { type : GraphQLString },
//     date : { type : GraphQLString },
//     type : { type : GraphQLString },
//   }
// })

const schema = new GraphQLSchema({
  query : new GraphQLObjectType({
    name : 'RootQuery',
    fields : {
      user : {
        type :new GraphQLList(User),
        async resolve(){
          // const response = await axios.get('http://localhost:3001/movies')
          // return response.data.data
          return {
            _id : '123',
            name : 'John',
            expenses : 'Beli baju',
            email : 'john@mail.com'
          }
        }
      }
    }
  })
})

module.exports  = schema;