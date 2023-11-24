const CommunityForum = require("../models/communityforum");
const cfreply = require("../models/cfreply")

module.exports = {
  postMessage: async (req, res) => {
    try {
      // Extract data from the request body
      const { name, msg } = req.body;

      // Create a new message in the database
      const newMessage = new CommunityForum({
        name: req.user._id, // Assuming you have user authentication and 'req.user' contains the user information
        message: msg, // Replacing 'poem' with 'msg'
      });

      // Save the message to the database
      await newMessage.save();

      // Fetch all messages from the database and populate the 'name' field with 'userName'
      const messages = await CommunityForum.find().populate('name', 'userName');

      // Render the page with the updated list of messages
      res.render("communityforum.ejs", { messages: messages });
    } catch (error) {
      console.error("Error posting message:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  replyToMessage: async (req, res) => {
    try {
      const { name, replyMessage } = req.body;

      const newReply = new CFReply({
        name: req.user._id,
        message: replyMessage,
        thumbUp: 0,
        reply: true,
      });

      await newReply.save();

      // You may need to associate the reply with the original message here

      res.redirect("/"); // Redirect to the appropriate page
    } catch (error) {
      console.error("Error replying to message:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  thumbUpMessage: async (req, res) => {
    try {
      // Extract data from the request body
      const { name } = req.body;

      // Find and update the message in the database
      const updatedMessage = await CommunityForum.findOneAndUpdate(
        { name: name.trim() },
        {
          $inc: {
            thumbUp: 1,
          },
        },
        {
          sort: { _id: -1 },
          upsert: false,
        }
      );

      res.send(updatedMessage);
    } catch (error) {
      console.error("Error updating thumbs-up:", error);
      res.status(500).send("Internal Server Error");
    }
  },

};
