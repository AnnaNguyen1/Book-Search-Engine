const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (root, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user.id });
        return user;
      }
      throw new AuthenticationError("Please log in!");
    },
  },
  Mutation: {
    addUser: async (root, args) => {
      const newUser = await User.create(args);
      const token = signToken(newUser);
      return { token, newUser };
    },
    login: async (root, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { newBook }, context) => {
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: newBook } },
          { new: true, runValidators: true }
        );
        return updateUser;
      }
      throw new AuthenticationError("Please log in!");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updateUser;
      }
      throw new AuthenticationError("Please log in!");
    },
  },
};

module.exports = resolvers;
