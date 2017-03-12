import axios from 'axios';
// import Promise from 'bluebird';

export const state = {
  listName: '',
  todos: []
};

export const mutations = {
  initialize(state, {listName, todos}) {
    state.listName = listName;
    state.todos = todos;
  },
  add(state, data) {
    console.log(state);
    console.log('add:', data);
    state.todos.push(data);
  }
};

export const actions = {
  async initialize({commit}, lid) {
    const p1 = axios.get(`http://localhost:3000/api/todo-lists/${lid}`);
    const p2 = axios.get(`http://localhost:3000/api/todo-lists/${lid}/todos`);
    const [res1, res2] = await Promise.all([p1, p2]);
    commit('initialize', {
      listName: res1.data.name,
      todos: res2.data
    });
  }
};
