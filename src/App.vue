<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" >
    <TodoList msg="Welcome to Your Vue.js App" :seen="seen" :todos="todos"/>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  data ()  { 
    return { 
      todos: [
        {id: 1, name:'To init a Vue project.',checked: true},
        {id: 2, name:'To implement a list view.',checked: false},
    ],
    seen : true
    }
  },
  components: {
    TodoList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
