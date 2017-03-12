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
  }
};

export default (data, kind) => validate(data, constraints[kind]) || null;
