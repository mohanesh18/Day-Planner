import React, {Component} from 'react';
import TaskList from './TaskList';
import './DateList.css';

class DateList extends Component{
 constructor(props){
    super(props);
    //this.renderTaskList = this.renderTaskList.bind(this);
    this.state = {taskListData: [1,2,3]};
 }  
 renderTaskList(){
     console.info(this.state.taskListData)
    return this.state.taskListData.map(val=>(
        <TaskList key = {val} listID = {val}/>
    ));
 }
    render(){
        return(
            <div className = "overal-container">
                {this.renderTaskList()}
            </div>    
        )
    }
}
export default DateList;