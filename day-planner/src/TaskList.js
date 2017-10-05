import React, {Component} from 'react';
import fire from './Fire';
import Task from './Task';
import './TaskList.css';

class TaskList extends Component{
    constructor(props){
        super(props);
        this.state = {
            tasks: [], 
            newTaskName: {name: '', isCompleted: false}
        };
        this.addNewTask = this.addNewTask.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        //this.renderTasks = this.renderTasks.bind(this);
        this.removeTask = this.removeTask.bind(this);

    }
    componentWillMount(){
        let dateRef = fire.database().ref('/dates/'+ this.props.listID);
        dateRef.once('value').then((snapshot) => {
            if(snapshot.val()){
                let keys = Object.keys(snapshot.val().taskIDs); 
                let index;
                let task=[];
                for(index=0;index<keys.length;index++){
                    let taskRef = fire.database().ref('/tasks/'+ keys[index]);
                    taskRef.once('value').then((record) => {
                        if(record.val()){
                            task.push({ name: record.val().name, isCompleted: record.val().isCompleted, 
                                id: record.key });
                            this.setState({ tasks: task });
                        }                        
                    });
                }
            }    
        });
        let datesRef = fire.database().ref('dates').orderByKey().limitToLast(100);    
        datesRef.on('child_changed', snapshot => {
            let keys = Object.keys(snapshot.val().taskIDs); 
            let index;
            let task=[];
            for(index=0;index<keys.length;index++){
                let taskRef = fire.database().ref('/tasks/'+ keys[index]);
                taskRef.once('value').then((record) => {
                    if(record.val()){
                        task.push({ name: record.val().name, isCompleted: record.val().isCompleted, 
                            id: record.key });
                        this.setState({ tasks: task });    
                    }                        
                });
            }    
            //let taskRef = fire.database().ref('/tasks/'+ keys[index]);
            //console.info(snapshot.val())
            /* Update React state when task is added at Firebase Database */
            // let task = { name: snapshot.val().name, isCompleted: snapshot.val().isCompleted, 
            //     id: snapshot.key };
            // this.setState({ tasks: [task].concat(this.state.tasks) });
          })
    }
    handleUpdate(event){
        this.setState({newTaskName: {name: event.target.value, isCompleted: false}});
    }
    addNewTask(newName){
        let a = fire.database().ref('tasks').push( this.state.newTaskName );
        let updates = {};
        updates[a.key] = true;        
        let b = fire.database().ref('/dates/'+ this.props.listID).child('taskIDs').update(updates);
        //this.setState({tasks: [...this.state.tasks, this.state.newTaskName]});
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
        return this.state.tasks.map(obj =>(
            <Task key = {obj.id} name = {obj.name} isCompleted = {obj.isCompleted}
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