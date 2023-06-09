const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Query {
  me: User
}

  type User {
    _id: ID
    username: String
    email: String
    bookCount: String
    savedBooks: [Book]
  }

  type Book {
    bookId: String
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

  input BookInput {
    authors: [String]
    bookId: String!
    description: String!
    image: String
    link: String
    title: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    deleteBook(bookId: ID!): User
  }

`;

module.exports = typeDefs;