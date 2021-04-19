<template>
  <div class="todos" >
    <div>
      <input type="text" v-model="todoitem" placeholder="input your task description" v-on:keyup.enter="submit"/>
      <h4> {{ todoitem }} </h4>
    </div>
    <ul v-if="seen">
      <li v-for="item in $store.getTodoItems()" :key="item.id" class="todo-item">
        <input class="todo-item-checkbox" type="checkbox" v-model="item.checked" v-on:click="$store.checkTodoItem(item.id)"/>
        <div class="todo-item-title">{{ item.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    msg: String,
    seen: Boolean,
    todos: Array
  },
  data() {
    return {
      seconds: 0,
      checked: false,
      todoitem: ""
    }
  },
  created() {
    console.log(`Component ${this.$store} is created.`)
  },
  methods: {
    submit: function() {
        if(this.todoitem.length == 0) return;

        this.$store.addTodoItem({name:this.todoitem,checked: false});

        this.todoitem = null;
    },
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
