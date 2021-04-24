<template>
  <div class="todos">
    <div class="search-box">
      <div class="fs"></div>
      <input
        type="text"
        v-show="!isEditing"
        v-model="todoitem"
        placeholder="input your task description"
        @keyup.enter.prevent="submit"
      />
      <div class="fs"></div>
    </div>
    <ul class="todo-items" v-if="$store.hasTodoItems()">
      <li
        v-for="item in $store.searchTitleInTodoItems()"
        :key="item.id"
        class="todo-item"
      >
        <input
          v-if="isEditing && item == editedTodo"
          v-model="item.name"
          v-todo-focus="item == editedTodo"
          @blur="doneEdit(item)"
          @keydown.enter="doneEdit(item)"
          @keydown.esc="cancelEdit(item)"
        />
        <div v-else>
          <input
            type="checkbox"
            :checked="checkStatus(item.id)"
            placeholder=""
            v-on:click="$store.checkTodoItem(item.id)"
          />
          <div
            :class="{
              'todo-item-title': true,
              completed: checkStatus(item.id),
            }"
            @dblclick.prevent="editTask(item)"
          >
            {{ item.name }}
          </div>
          <button
            type="button"
            class="todo-delete-btn"
            @click="removeTask(item.id)"
          >
            X
          </button>
        </div>
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
import TodoFilter from "./TodoFilter.vue";
import TodoSearchBar from "./TodoSearchBar.vue";

export default {
  name: "TodoList",
  data() {
    return {
      todoitem: null,
      isEditing: false,
      beforeEditCache: null,
    };
  },
  methods: {
    submit: function () {
      if (this.todoitem.length == 0) return;

      this.$store.addTodoItem({ name: this.todoitem });

      this.todoitem = null;
    },
    checkStatus: function (id) {
      return this.$store.getTodoItem(id).status === "completed";
    },
    removeTask: function (id) {
      this.$store.removeTodoItem(id);
    },
    editTask: function (todo) {
      this.beforeEditCache = todo.name;
      this.editedTodo = todo;
      this.isEditing = true;
    },
    doneEdit: function (todo) {
      if (!this.editedTodo) {
          return;
        }
        this.isEditing = false;
        this.editedTodo = null;
        todo.name = todo.name.trim();
        if (!todo.name) {
          this.removeTask(todo.id);
        }
    },
    cancelEdit: function(todo){
       if (!this) {
        return;
      }
      this.isEditing = false;
      todo.name = this.beforeEditCache;
      this.editedTodo = null;
    }
  },
  
  directives: {
    "todo-focus": function (el, binding) {
      if (binding.value) {
        console.log(el, binding.value);
        el.focus();
      }
    },
  },
  components: {
    TodoFilter,
    TodoSearchBar,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.search-box {
  margin: 0 auto;
  max-width: 524px;
  display: flex;
  justify-content: center;
}
div.search-box input {
  padding: 0.5em 1em;
  flex : 4;
  border: 1px solid #39862b;
}
div.search-box input:focus-visible{
  border: 1px solid #52bf3e;
}
div.search-box .fs {
  flex: 1
}

h3 {
  margin: 2em 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  overflow:scroll;
}
ul.todo-items {
    height: 10em;
    margin: 2em auto;
    max-width: 524px;
}
li.todo-item {
    display: inline-flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}

li.todo-item > div {
  display: inline-flex;
  width: 80%;
  margin: 0 10%;
  justify-content: center;
  padding: 0.25em 4px;
}

li.todo-item > div > input {
  width: 1em;
}

li.todo-item > div > button {
    width: 2em;
    font-size: 10px;
    padding: 2px;
}
li.todo-item > div > div.todo-item-title{
    flex: 1;
    text-align: left;
    border-bottom: 1px solid #bfbfbf;
}
li.todo-item div.completed {
  text-decoration: line-through;
}

a {
  color: #42b983;
}
</style>
