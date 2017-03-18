import axios from 'axios';

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
    state.todos.push(data);
  },
  updateStatus(state, tid) {
    const idx = state.todos.findIndex((todo) => todo._id === tid);
    state.todos[idx].checked = !state.todos[idx].checked;
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
  },
  async add({commit}, {diff, lid}) {
    console.log(`http://localhost:3000/api/todo-lists/${lid}/todos`);
    let {data} = await axios.post(`http://localhost:3000/api/todo-lists/${lid}/todos`, diff);
    commit('add', data);
  },
  async updateStatus({commit, state}, tid) {
    tid = Number(tid);
    const sendData = Object.assign({}, state.todos.find((todo) => todo._id === tid));
    sendData.checked = !sendData.checked;
    try {
      await axios.put(`http://localhost:3000/api/todos/${tid}`, sendData);
      commit('updateStatus', tid);
    } catch (e) {}
  }
};
