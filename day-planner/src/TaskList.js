import React, {Component} from 'react';
import Task from './Task';
import './TaskList.css';

class TaskList extends Component{
    constructor(props){
        super(props);
        this.state = {newTaskName: ''};
        this.addTask = this.addTask.bind(this);
    }
    addTask(){
        //this.setState({addTask;})
    }
    render(){
        return(
            
            <div className = "date-container">
                <h1>Today</h1>
                <div className = "record-container">
                    <div className="data-record">
                        <input className="new-todo" placeholder="What needs to done?"/>
                    </div>
                    <Task/>
                </div>    
            </div>
        )    
    }
}
export default TaskList;