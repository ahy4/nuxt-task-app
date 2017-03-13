import axios from 'axios';

export const state = {
  lists: [],
  todos: []
};

export const mutations = {
  exec(state, data) {
    console.log(data);
    state.lists = data.lists;
    state.todos = data.todos;
    console.log(state.lists, state.todos);
  }
};

export const actions = {
  async exec({commit}, q) {
    const option = { params: {q} };
    const p1 = await axios.get('http://localhost:3000/api/todo-lists/', option);
    const p2 = await axios.get('http://localhost:3000/api/todos/', option);
    const [lists, todos] = (await Promise.all([p1, p2])).map(({data}) => data);
    commit('exec', { lists, todos });
  }
};
