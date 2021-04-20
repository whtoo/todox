<template>
  <div class="todos" >
    <div>
      <input type="text" v-model="todoitem" placeholder="input your task description" v-on:keyup.enter="submit"/>
      <h4> {{ todoitem }} </h4>
    </div>
    <ul class="todo-items">
      <li v-for="item in $store.filtedTodoItems()" :key="item.id" class="todo-item">
        <input class="todo-item-checkbox" type="checkbox" :checked="checkStatus(item.id)" placeholder="" v-on:click="$store.checkTodoItem(item.id)"/>
        <div :class="{'todo-item-title':true, 'completed':checkStatus(item.id)}">{{ item.name }}</div>
      </li>
    </ul>    
    <TodoFilter filterString="Completed" />
  </div>
</template>

<script>
import TodoFilter from './TodoFilter.vue';

export default {
  name: 'TodoList',
  data() {
    return {
      todoitem: ""
    }
  },
  created() {
    console.log(`Component ${this.$store} is created.`)
  },
  methods: {
    submit: function() {
        if(this.todoitem.length == 0) return;

        this.$store.addTodoItem({name:this.todoitem});

        this.todoitem = null;
    },
    checkStatus: function(id) {
      console.log(this.$store.getTodoItem(id).status);
        return this.$store.getTodoItem(id).status === 'completed';
    }
  },
  components:{TodoFilter}
 
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
ul.todo-items{
  height: 10em;
}
li.todo-item {
  display: flex;
  margin: 1em;
  align-items: center;
  justify-content: center;
}
li.todo-item  div.completed{
  text-decoration: line-through;
}
a {
  color: #42b983;
}
</style>
