const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();

      const thoughtObj = {
        thought,
      };

      res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json({
        thought,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Add a thought to a thought
  async createThought(req, res) {
    console.log("You are adding a thought");
    console.log(req.body);

    try {
      const thought = await Thought.create(req.body);

      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove thought from a user
  async deleteThought(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {
          thoughts: req.params.thoughtId,
        },
        { $pull: { thoughts: req.params.thoughtId } },
        {
          new: true,
        }
      );

      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID :(" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create Reaction
  async createReaction(req, res) {
    console.log("You are adding a Reaction");
    console.log(req.body);

    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } }
      );

      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        {
          runValidators: true,
          new: true,
        }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete Reaction
  async deleteReaction(req, res) {
    console.log("You are deleting a Reaction");

    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } }
      );

      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
