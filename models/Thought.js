const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('./utils/dateFormat');

// Schema to create User model:
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Must leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timeStamp => dateFormat(timeStamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
