<template>
  <nuxt-link tag="section" :to="`/list/${this.lid}`" class="list-overview">
    <div class="list-left">
      <div class="list-name">{{name}}</div>
    </div>
    <div class="list-right">
      <div class="has-child" v-if="hasChild">
        <div class="list-count">
          {{count}}個中{{checkedCount}}個がチェック済み
        </div>
        <div class="list-deadline">〜{{parsedDeadline}}</div>
      </div>
      <div class="has-no-child" v-else>
        TODOなし　クリックでTODOを作成
      </div>
    </div>
  </nuxt-link>
</template>

<style scoped>
.list-overview {
  cursor: pointer;
  color: white;
  padding: 20px 40px;
  border-top: 1px solid rgba(255,255,255,0.6);
  background: rgba(254,245,228,0.02);
  display: flex;
  justify-content: flex-start;
}
.list-name {
}
.list-left {
  width: 440px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 26px;
  padding-right: 30px;
  border-right: 1px solid rgba(160,160,160,0.3);
}
.list-right {
  padding-left: 30px;
  display: flex;
  align-items: center;
}
</style>

<script>
export default {
  computed: {
    parsedDeadline() {
      return dateFormat(this.deadline);
    }
  },
  props: {
    lid: {
      type: Number,
      required: true
    },
    hasChild: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    count: {
      type: Number
    },
    checkedCount: {
      type: Number
    },
    deadline: {
      type: Date
      // required: false,
      // default: _ => ''
    }
  },
  methods: {

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
