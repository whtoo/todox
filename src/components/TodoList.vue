<template>
  <div class="todos">
    <div>
      <input
        type="text"
        v-show="!isEditing"
        v-model="todoitem"
        placeholder="input your task description"
        @keyup.enter.prevent="submit"
      />
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
            class="todo-item-checkbox"
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
ul.todo-items {
  height: 10em;
}
li.todo-item {
  display: flex;
  margin: 1em;
  align-items: center;
  justify-content: center;
}

li.todo-item > div {
  display: inline-flex;
}

li.todo-item div.completed {
  text-decoration: line-through;
}
a {
  color: #42b983;
}
</style>
