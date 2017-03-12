module.exports = {
  url: 'mongodb://localhost/test',
  schema: {
    TodoList: {
      _id: {
        type: Number
      },
      name: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        required: true
      }
    },
    Todo: {
      _id: {
        type: Number
      },
      lid: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        required: true
      },
      deadline: {
        type: Date
      },
      completed: {
        type: Boolean,
        required: true
      }
    },
    Counter: {
      _id: {
        type: String,
        required: true
      },
      seq: {
        type: Number,
        default: 0
      }
    }
  }
};
