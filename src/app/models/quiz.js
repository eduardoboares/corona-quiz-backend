const mongoose = require('../../database');

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: false,
    },
    questions: [{
      numberquestion: {
        type: String,
        require: true,
      },
      title: {
        type: String,
        required: true,
      },
      alternatives: [{
        option: {
          type: String,
          required: true
        },
        title: {
          type: String,
          required: true,
        },
        correct: {
          type: Boolean,
          required: true
        }
      }],
    }],
    references: [{
      url: {
        type: String,
        required: true
      }
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    usePushEach: true
  },
);

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;