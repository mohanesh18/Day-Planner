import React, {Component} from 'react';
import fire from './Fire';
import Task from './Task';
import './TaskList.css';

class TaskList extends Component{
    constructor(props){
        super(props);
        let messagesRef = fire.database().ref('tasks').orderByKey().limitToLast(100);
        console.info(messagesRef);
        this.state = {
            taskID: this.props.listID,
            tasks: [{name: 'Jim', isCompleted: false},{name: 'Sally', isCompleted: true}, {name: 'Blender', isCompleted: true}], 
            newTaskName: {name: '', isCompleted: false}
        };
        this.addNewTask = this.addNewTask.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        //this.renderTasks = this.renderTasks.bind(this);
        this.removeTask = this.removeTask.bind(this);

    }
    handleUpdate(event){
        this.setState({newTaskName: {name: event.target.value, isCompleted: false}});
        console.info(this.state.newTaskName);
    }
    addNewTask(newName){
        this.setState({tasks: [...this.state.tasks, this.state.newTaskName]});
        this.setState({newTaskName: {name: ''}});
    }
    _handleKeyPress = (e) =>{
        if(e.key === "Enter"){
            this.addNewTask(e.target.value);
        }
    }
    removeTask(removeName){
        const filteredTasks = this.state.tasks.filter(obj => {
            return obj.name !== removeName;
        });
        this.setState({ tasks: filteredTasks });
    }

    renderTasks(){
        console.info(this.state.tasks)
        return this.state.tasks.map(obj =>(
            <Task key = {obj.name} name = {obj.name} isCompleted = {obj.isCompleted} id = {this.state.taskID}
            removeTask={this.removeTask}
            />
        ));
    }
    render(){
        return(
            
            <div className = "date-container">
                <h1> Day {this.props.listID} </h1>
                <div className = "record-container">
                    <div className="data-record">
                        <input type = "text" onChange={this.handleUpdate} onKeyPress={this._handleKeyPress} className="new-todo" placeholder="What needs to done?" value={this.state.newTaskName.name}/>
                    </div>
                    {this.renderTasks()}
                    
                </div>    
            </div>
        )    
    }
}
export default TaskList;