import React, {Component} from 'react';
import TaskList from './TaskList';
import fire from './Fire';
import './DateList.css';

class DateList extends Component{
 constructor(props){
    super(props);
    //this.renderTaskList = this.renderTaskList.bind(this);
    this.state = {taskListData: []};
 }
 componentWillMount(){
    let datesRef = fire.database().ref('dates').orderByKey().limitToLast(100);
    console.info(datesRef);
    datesRef.on('child_added', snapshot => {    
        let keys = Object.keys(snapshot.val().taskIDs);
        
        // for(index=0;index<keys.length;index++)
        // {
        //    console.log(keys[index]);
        // }
        
        /* Update React state when task is added at Firebase Database */
        this.setState({ taskListData: keys.concat(this.state.taskListData) });
    })   
 }
 renderTaskList(){
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