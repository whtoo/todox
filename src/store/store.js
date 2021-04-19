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

let todoItems = {
    properties : {
        todoList : localStorage.getItem(TODO_ITEMS) != null ? JSON.parse(localStorage.getItem(TODO_ITEMS)) : [],
        _maxAaviliableID : 0,
    },
    getters : {
        getTodoItem : function(id) {
            return this.todoList.find(val => val.id == id);
        },
        getTodoItems : function() {
            return this.todoList;
        },
        filterTodoItems : function(key) {
            if(key === 'all') {
                this.getTodoItem();
            } else {
                this.getTodoItem().filter(val => val.status === key);
            }
        },
        getAvaliableID : function() {
            if(this._maxAaviliableID === -1) {
                this._maxAaviliableID = Math.max(this.todoList.map(val => val.id),this._maxAaviliableID);
            }
    
            return this._maxAaviliableID;
        }
    },
    methods : {
        checkTodoItem : function(id) {
            const item = this.getTodoItem(id);
            item.checked = !item.checked;
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
                Object.assign(item,{id});
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
        }
    }
}


Vue.prototype.$store = createStore({
    ...todoItems.properties,
    ...todoItems.getters,
    ...todoItems.methods
})