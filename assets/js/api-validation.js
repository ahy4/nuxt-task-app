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
      length: {
        minimum: 1,
        maximum: 30,
        message: '^TODOリスト名は1〜30文字で設定してください'
      }
    },
    deadline: {
      presence: {
        message: '^期限も入力してください'
      },
      numericality: {
        message: '^期限も入力してください'
      }
    },
    checked: {
      presence: true
    }
  }
};

export default (data, kind) => validate(data, constraints[kind]) || null;
