<template>
    <div class="todo-searchbar" v-show="$store.hasTodoItems()">
        <div></div>
        <input type="text" v-model="searchKey" placeholder="input your search key" />
        <div></div>
    </div>
</template>

<script>
import _ from 'lodash';

export default {
    name: 'todo-searchbar',
    data: function (){
        return {
            inputKey : null,
            searchKeyAction : null,
        }
    },
    methods:{
        getSearchKeyService: function() {
            if(this.searchKeyAction == null){
                this.searchKeyAction = _.throttle(()=>{
                    this.$store.searchByKeyWords(this.inputKey);
                },100)
            }
            return this.searchKeyAction;
        }
    },
    computed : {
        searchKey: {
            set : function (newValue) {
                this.inputKey = newValue;
                this.getSearchKeyService()();
            },
            get : function () {
                return this.inputKey
            }
        },
        
    }
}
</script>

<style scoped>
div.todo-searchbar {
    max-width: 524px;
    display: flex;
    margin: 0.5em auto;
}

div.todo-searchbar input{
    border: 2px solid rgb(64, 150, 117);
    flex: 8;
    padding: 0.5em;
}
div.todo-searchbar div {
    flex: 1;
}
</style>