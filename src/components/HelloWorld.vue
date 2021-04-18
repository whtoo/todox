<template>
  <div class="todos" >
    <div >Remain {{ seconds }} seconds</div>
    <ul v-if="seen">
      <li v-for="item in todos" :key="item.id" class="todo-item">
        <input class="todo-item-checkbox" type="checkbox" v-model="item.checked" />
        <div class="todo-item-title">{{ item.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    seen: Boolean,
    todos: Array
  },
  data() {
    return {
      seconds: 0,
      checked: false
    }
  },
  created() {
    console.log(`Component ${this.name} is created.`)
    setInterval(() => {
      this.seconds++;
    },1000);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li.todo-item {
  display: flex;
  margin: 1em;
  align-items: center;
  justify-content: center;
}
a {
  color: #42b983;
}
</style>
