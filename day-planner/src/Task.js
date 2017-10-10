import React, {Component} from 'react';
import fire from './Fire';
import './Task.css';

class Task extends Component{
    constructor(props){
        super(props);
        this.removeTask = this.removeTask.bind(this);
        this.state = {'isCompleted': this.props.isCompleted};
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }
    componentWillReceiveProps(props){
    }
    removeTask(){
        this.props.removeTask(this.props.name);
        let a =  fire.database().ref('/tasks/'+ this.props.id).remove();
        let dateRef = fire.database().ref('/dates/'+ this.props.dateID+ '/taskIDs/').child(this.props.id).remove();
    }

    handleCheckboxChange(ev){
        this.setState({isCompleted: ev.target.checked});
        return fire.database().ref('/tasks/'+ this.props.id).update({isCompleted: ev.target.checked});
        
    }
    render(){
        return(<section>
            <ul>
                <li>
                    <div>   
                        <input type = "checkbox" id={this.props.name + this.props.id} onChange={this.handleCheckboxChange} checked = {this.state.isCompleted} className = "toggle-button"/>
                        <label  htmlFor = {this.props.name + this.props.id} className = {this.state.isCompleted ? 'completed': 'asd' }>{this.props.name}</label>
                        <button onClick={this.removeTask}>Delete</button>
                    </div>                
                    <input className = "edit" style ={{display: 'none'}}></input>
                </li>           
            </ul>    
        </section>);
    }
}
export default Task;