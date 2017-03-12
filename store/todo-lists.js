import axios from 'axios';

export const state = {
  lists: []
};

export const mutations = {
  initialize(state, data) {
    state.lists = data;
  },
  add(state, data) {
    state.lists.push(data);
  }
};

export const actions = {
  async initialize({commit}) {
    const {data} = await axios.get('http://localhost:3000/api/todo-lists/overview');
    commit('initialize', data);
  },
  async add({commit}, diff) {
    let {data} = await axios.post('http://localhost:3000/api/todo-lists', diff);
    data = Object.assign({
      count: 0,
      hasChild: false
    }, data);
    commit('add', data);
  }
};
