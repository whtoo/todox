<template>
    <div class="todo-searchbar" v-show="$store.hasTodoItems()">
        <div></div>
        <div class="todo-searchbar-inner">
            <i class="fa fa-search fa-lg search-icon"></i>
            <input type="text" v-model="searchKey" :placeholder="$t('message.searchTips')" />
        </div>
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
    flex: 1;
    border: none;
    background: transparent;
    outline: thin;
}

div.todo-searchbar div {
    flex: 1;
}
.search-icon {
    margin: 0 0.25em 0 -0.25em;
}
div.todo-searchbar div.todo-searchbar-inner {
    display: inline-flex;
    border: 2px solid rgb(64, 150, 117);
    flex: 8;
    padding: 0.5em 1em;
}

</style>