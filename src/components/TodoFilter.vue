<template>
  <div id="todo-filter" v-show="$store.hasTodoItems()">
    <button type="button" :class="{active : selectedID === 0,inactive : selectedID !== 0}" @click="submit('all',0)" >All</button>
    <button type="button" :class="{active : selectedID === 1,inactive : selectedID !== 1}" @click="submit('active',1)" >Active</button>
    <button type="button" :class="{active : selectedID === 2,inactive : selectedID !== 2}" @click="submit('completed',2)">Completed</button>
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
button.active {
    background-color:lightseagreen;
}

button.inactive {
    background-color: #94e6db;
}

</style>