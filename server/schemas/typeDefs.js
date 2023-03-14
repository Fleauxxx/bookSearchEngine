const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Book {
    bookID: ID
    authors:[String]!
    description: String
    title: String
    image: File!
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    savedBooks: [Book]
  }

  type Query {
    me: [User]
  }

  type Mutation {
    login(username: 
      )

  }
`;

module.exports = typeDefs;