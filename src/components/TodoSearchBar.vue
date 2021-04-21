<template>
    <div class="todo-searchbar">
        <input type="text" v-model="searchKey" placeholder="input your search key" @keyup.enter="submit"/>
        <h4> {{ searchKey }} </h4>
    </div>
</template>

<script>
export default {
    name: 'todo-searchbar',
    data: function (){
        return {
            searchKey: null,
        }
    },
    methods : {
        submit : function() {
            this.$store.searchByKeyWords(this.searchKey);

        }
    }
}
</script>

<style scoped>
div.todo-searchbar input{
    border: 2px solid rgb(64, 150, 117);
}
</style>