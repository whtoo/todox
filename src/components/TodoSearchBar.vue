<template>
    <div class="todo-searchbar" v-show="$store.hasTodoItems()">
        <input type="text" v-model="searchKey" placeholder="input your search key" />
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
                })
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
div.todo-searchbar input{
    border: 2px solid rgb(64, 150, 117);
}
</style>