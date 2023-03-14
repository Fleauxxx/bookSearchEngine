const { User, Book } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    books: async () => {
      return await Book.find({}).populate('books')
    }
  }
};

module.exports = resolvers;
