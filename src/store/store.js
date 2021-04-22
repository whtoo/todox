import Vue from 'vue';

const TODO_ITEMS = 'x-todo-items-key';

/**
 * Returns a Vue-observable store. For each property in storeData:
 * - In functions, 'this' refers to store Data.
 * - If a property with value 'false' ends with OBSERVE_SUFFIX, the corresponding propeprty will not be observed.
 * @param {object} storeData
 * @returns {object}
 */
 function createStore(storeData) {
    // make observable
    const store = Vue.observable({})
  
    for (let [key, value] of Object.entries(storeData)) {
      if (typeof value === 'function') {
        value = value.bind(store) // bind 'this' keyword
      }

      Vue.set(store, key, value) // reactive

    }
    return store
}

//onst conditions = ['all','completed','active'];

let todoItems = {
    properties : {
        todoList : localStorage.getItem(TODO_ITEMS) != null ? JSON.parse(localStorage.getItem(TODO_ITEMS)) : [],
        _maxAaviliableID : 0,
        _filterCondition : "all",
        _searchKey : null,
    },
    getters : {
        hasTodoItems : function() {
            return this.searchTitleInTodoItems().length > 0
        },
        getTodoItem : function(id) {
            return this.todoList.find(val => val.id == id);
        },
        getTodoItems : function() {
            return this.todoList;
        },
        filtedTodoItems : function() {
            if(this._filterCondition === 'all') {
                return this.getTodoItems();
            } else {
                return this.getTodoItems().filter(val => val.status === this._filterCondition);
            }
        },
        getAvaliableID : function() {
            if(this._maxAaviliableID === -1) {
                this._maxAaviliableID = Math.max(this.todoList.map(val => val.id),this._maxAaviliableID);
            }
            
            return this._maxAaviliableID++;
        },
        searchTitleInTodoItems: function() {
            if(this._searchKey === null || this._searchKey === '') return this.filtedTodoItems();
            const searchResults = [];
            const regex = new RegExp(this._searchKey);
            for(const item of this.filtedTodoItems()){
                if(regex.test(item.name)){
                    searchResults.push(item);
                }
            }
            return searchResults;
        }
    },
    methods : {
        checkTodoItem : function(id) {
            const item = this.getTodoItem(id);
            item.status = item.status === 'completed'? 'active' : 'completed';
            this.syncLocalStore();
        },
        setTodoItem : function(id,item) {
            let ret = this.getTodoItem(id);
            if(ret != null) {
                Object.assign(item,ret);
            }
            this.syncLocalStore();
        },
        addTodoItem : function(item) {
            if(item != null) {
                const id = this.getAvaliableID();
                Object.assign(item,{id,status:'active'});
                this.todoList.push(item)
            }
            this.syncLocalStore();
        },
        removeTodoItem : function(id) {
            this.todoList = this.todoList.filter(val => val.id !== id);
            this.syncLocalStore();
        },
        syncLocalStore : function() {
            localStorage.setItem(TODO_ITEMS,JSON.stringify(this.todoList));
        },
        changeFilterCondition : function(key){
            this._filterCondition = key;
        },
        searchByKeyWords : function(key){
            this._searchKey = key;
        }
    }
}


Vue.prototype.$store = createStore({
    ...todoItems.properties,
    ...todoItems.getters,
    ...todoItems.methods
})