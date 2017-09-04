import React, {Component} from 'react';
import TaskList from './TaskList';
import './DateList.css';

class DateList extends Component{
 constructor(props){
     super(props)
 }   
    render(){
        return(
            <div className = "overal-container">
                <TaskList/>
            </div>    
        )
    }
}
export default DateList;