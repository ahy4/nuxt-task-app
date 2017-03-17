<template>
  <section class="todo-detail">
    <div class="todo-left">
      <div class="todo-name">{{name}}</div>
    </div>
    <div class="todo-middle">
      <div>
        <div class="todo-createdAt">作成日: {{parsedCreatedAt}}</div>
        <div class="todo-deadline">〆切: {{parsedDeadline}}</div>
      </div>
    </div>
    <div class="todo-right">
      <button @click="updateCompleted" :class="completedState ? 'icon-heart-fill' : 'icon-heart-stroke'"></button>
    </div>

  </section>
</template>

<style scoped>
.todo-detail {
  color: white;
  padding: 20px 40px;
  border-top: 1px solid rgba(255,255,255,0.6);
  background: rgba(254,245,228,0.02);
  display: flex;
  justify-content: flex-start;
}
.todo-left {
  width: 350px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 50px;
}
.todo-middle {
  display: flex;
  width: 230px;
  color: #ccc;
  align-content: center;
}
.todo-right {
  display: flex;
  align-items: center;
  padding-left: 50px;
}
.todo-right button {
  height: 48px;
  width: 48px;
  border: none;
  background: rgba(0,0,0,0.15);
  color: white;
  font-size: 22px;
  font-weight: 100;
}
.todo-right button.icon-heart-fill {
  color: #fc9bb4;
}
</style>

<script>
export default {
  computed: {
    parsedDeadline() {
      return dateFormat(this.deadline);
    },
    parsedCreatedAt() {
      return dateFormat(this.createdAt);
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    deadline: {
      type: Date,
      required: false,
      default: _ => ''
    },
    createdAt: {
      type: Date,
      required: true
    },
    completed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      completedState: this.completed
    };
  },
  methods: {
    updateCompleted() {
      this.completedState = !this.completedState;
    }
  }
};

function dateFormat(date) {
  console.log(date);
  date = new Date(date);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var w = date.getDay();
  var wNames = ['日', '月', '火', '水', '木', '金', '土'];

  if (m < 10) {
    m = '0' + m;
  }
  if (d < 10) {
    d = '0' + d;
  }

  // フォーマット整形済みの文字列を戻り値にする
  return y + '年' + m + '月' + d + '日 (' + wNames[w] + ')';
}
</script>

</script>
