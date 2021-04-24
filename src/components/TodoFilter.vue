<template>
  <div class="todo-filter" v-show="$store.hasTodoItems()">
    <span></span>
    <button type="button" :class="{active : selectedID === 0}" @click="submit('all',0)" >All</button>
    <span></span>
    <button type="button" :class="{active : selectedID === 1}" @click="submit('active',1)" >Active</button>
    <span></span>
    <button type="button" :class="{active : selectedID === 2}" @click="submit('completed',2)">Completed</button>
    <span></span>
  </div>
</template>

<script>
export default {
  name: "TodoFilter",
  props: {
  },
  data() {
    return {
       selectedID: 0
    };
  },
  methods: {
      submit: function(key,id) {
          this.selectedID = id;
          this.$store.changeFilterCondition(key);
      }
  },
 
  
};
</script>

<style scoped>

.todo-filter {
    margin: 1em auto;
    max-width: 524px;
    display: flex;
    justify-content: center;
}

button.active {
    background-color:lightseagreen;
}

span{
  flex: 3;
}

button{
    background-color: #94e6db;
    flex:4;
}

</style>