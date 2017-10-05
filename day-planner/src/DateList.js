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
    datesRef.once('value').then((snapshot) => {
        if(snapshot.val()){
            Object.keys(snapshot.val()).map(key => {
                var newArray = []
                newArray.push(key);
                this.setState({taskListData:newArray.concat(this.state.taskListData)})
            })
        }
    }); 
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