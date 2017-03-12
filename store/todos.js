export const state = {
  todos: []
};

export const mutations = {
  update(state, data) {
    console.log(state);
    // console.log('update:', data);
    state.todos = data;
    console.log(state);
  },
  add(state, data) {
    console.log(state);
    console.log('add:', data);
    state.todos.push(data);
  }
};
