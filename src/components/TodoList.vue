<template>
  <div class="todos" >
    <div>
      <input type="text" v-model="todoitem" placeholder="input your task description" @keyup.enter="submit"/>
    </div>
    <ul class="todo-items" v-if="$store.hasTodoItems()">
      <li v-for="item in $store.searchTitleInTodoItems()" :key="item.id" class="todo-item">
        <input class="todo-item-checkbox" type="checkbox" :checked="checkStatus(item.id)" placeholder="" v-on:click="$store.checkTodoItem(item.id)"/>
        <div :class="{'todo-item-title':true, 'completed':checkStatus(item.id)}">{{ item.name }}</div>
        <button type="button" class="todo-delete-btn" @click="removeTask(item.id)">X</button>
      </li>
    </ul>  
    <div v-else>
      <p>快来添加你的第一个待办事项吧！</p>
    </div>
    <TodoSearchBar />  
    <TodoFilter filterString="All" />
  </div>
</template>

<script>
import TodoFilter from './TodoFilter.vue';
import TodoSearchBar from './TodoSearchBar.vue';

export default {
  name: 'TodoList',
  data() {
    return {
      todoitem: ""
    }
  },
  methods: {
    submit: function() {
        if(this.todoitem.length == 0) return;

        this.$store.addTodoItem({name:this.todoitem});

        this.todoitem = null;
    },
    checkStatus: function(id) {
        return this.$store.getTodoItem(id).status === 'completed';
    },
    removeTask: function(id) {
      this.$store.removeTodoItem(id);
    }
  },
  components: {
    TodoFilter,
    TodoSearchBar
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
