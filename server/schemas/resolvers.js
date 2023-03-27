const { User} = require('../models');



const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
  login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AuthenticationError('No user found with this email address');
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw new AuthenticationError('Incorrect credentials');
    }

    const token = signToken(user);

    return { token, user };
  },

  addUser: async (parent, { username, email, password }) => {
    try{
    const user = await User.create({ username, email, password });
    if (!user) {
      throw new AuthenticationError("Cannot add User!");
    }
    const token = signToken(user);
    return { token, user }
  } catch (error) {
    throw new AuthenticationError("error!");
  }

  },

  saveBook: async (parent, args, context) => {
    if (context.user) {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $push: { savedBooks: args.bookData } },
        { new: true }
      );
      return updatedUser;
    }
    throw new AuthenticationError("Not logged in");
  },
  // Make it so a logged in user can only remove a book from their own profile
  deleteBook: async (parent, args, context) => {
    if (context.user) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true, runValidators: true, useFindAndModify: false }
      );
      return updatedUser;
    }
    throw new AuthenticationError("Not logged in");
  },
}
};



module.exports = resolvers;
