import validate from 'validate.js';

const constraints = {
  TodoList: {
    name: {
      presence: true,
      length: {
        minimum: 1,
        maximum: 60
      }
    }
  },
  Todo: {
    lid: {
      presence: true,
      numericality: true
    },
    name: {
      presence: true,
      length: {
        minimum: 1,
        maximum: 60
      }
    },
    deadline: {
      presence: true,
      numericality: true
    },
    checked: {
      presence: true
    }
  }
};

export default (data, kind) => validate(data, constraints[kind]) || null;
