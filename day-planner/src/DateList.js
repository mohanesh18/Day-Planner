import React, {Component} from 'react';
import TaskList from './TaskList';
import fire from './Fire';
import './DateList.css';

class DateList extends Component{
 constructor(props){
    super(props);
    console.info(this.props.currUser);
    this.state = {taskListData: []};
 }
 componentWillMount(){
    let datesRef = fire.database().ref('dates').orderByKey().limitToLast(100);
    datesRef.once('value').then((snapshot) => {
        if(snapshot.val()){
            Object.keys(snapshot.val()).map(key => {
                var newArray = [];
                newArray.push({id: key, name: snapshot.val()[key].name});
                this.setState({taskListData:newArray.concat(this.state.taskListData)})
            })
        }
    }); 
 }
 renderTaskList(){
    return this.state.taskListData.map(obj=>(
        <TaskList key = {obj.id} listID = {obj.id} dateName = {obj.name}/>
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