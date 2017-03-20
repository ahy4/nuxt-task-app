module.exports = {
  url: process.env.MONGODB_URI || 'mongodb://localhost/nuxt-task-app',
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
      checked: {
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
