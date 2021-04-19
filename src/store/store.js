const TODO_ITEMS = 'x-todo-items-key';

export let store = {
    debug :true,
    state : {
        todoList : localStorage.getItem(TODO_ITEMS) != null ? JSON.parse(localStorage.getItem(TODO_ITEMS)) : []
    },
    setTodoItem (id,item) {
        let ret = this.getTodoItem(id);
        if(ret != null) {
            Object.assign(item,ret);
        }
    },
    getTodoItem(id) {
        return this.state.todoList.find(val => val.id == id);
    },
    getTodoItems() {
        return this.state.todoList;
    },
    filterTodoItems(key) {
        if(key === 'all') {
            this.getTodoItem();
        } else {
            this.getTodoItem().filter(val => val.status === key);
        }
    },
    addTodoItem(item) {
        if(item != null) this.state.todoList.push(item)
    },
    removeTodoItem(id) {
        this.state.todoList = this.state.todoList.filter(val => val.id !== id);
    }
}
