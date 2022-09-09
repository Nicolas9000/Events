const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
    trim: true,
  },
  organisateur: {
    type: String,
    required: true,
    trim: true,
  },
  coordonne: {
    type: [Number],
    required: true,
    trim: true,
  },
  photo: {
    type: String,
    trim: true,
  },
  visibility: {
    type: String,
    required: true,
    default: "public",
    trim: true,
  },
  participant: {
    type: [
      {
        participantId: String,
        participantPseudo: String,
      }
    ]
  },
  commentaire: {
    type: [
      {
        commentaireUserId: String,
        commentairePseudo: String,
        text: String,
      },
    ],
    required: true,
  },
});

const eventModel = mongoose.model("event", eventSchema);

module.exports = eventModel;
