var AddTodo = React.createClass({
    getInitialState:function(){
        return{
            newTodo:''
        }
    },
    updateTodoList:function(e){
        this.setState({
            newTodo: e.target.value
        });
    },
    addNewTodo:function(e){
      this.props.addNewTodo(this.state.newTodo);
      this.setState({
          newTodo: ''
      });
    },
    render: function(){
        return(
            <div className="addTodo">
             <input
                type="text"
                placeholder="enter a todo"
                value={this.state.newTodo}
                onChange={this.updateTodoList}
             />
             <input
                type="button"
                disabled={this.state.newTodo.length===0}
                value="Add"
                onClick={this.addNewTodo}
             />
            </div>
        )
    }
});

var TodoList = React.createClass({
    getInitialState: function(){
      return{
          todos: this.props.todos
        }  
    },
    removeTodo:function(todo){
        var todos = this.props.todos;
        todos.splice(todos.indexOf(todo), 1);
        this.setState({todos : todos});
    },
    render: function(){
        var self = this;
        var listTodos = (function(todo){
            return <li>{todo}<input type="button" onClick={self.removeTodo} value="X"/></li>
        });
        return(
            <div className="todoList">
                <ul>
                   <span>{this.props.todos.map(listTodos)}</span>
                </ul>
            </div>
        )
    }    
});

var TodoApp = React.createClass({
    getInitialState:function(){
        return{
            todos:[]
        }
    },
    addTodo:function(todo){
        this.setState({
            todos: this.state.todos.concat([todo])
        })
    },
    render: function(){
        return(
            <div className="todoApp">
                <h1>React Todo App</h1>
                <AddTodo addNewTodo={this.addTodo}/>
                <TodoList todos={this.state.todos} />
            </div>
        )
    }    
});

ReactDOM.render(<TodoApp/>, document.getElementById('app'));