import validate from 'validate.js';

const constraints = {
  TodoList: {
    name: {
      length: {
        minimum: 1,
        maximum: 30,
        message: '^TODOリスト名は1〜30文字で設定してください'
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
        maximum: 30,
        message: '^TODOリスト名は1〜30文字で設定してください'
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
