import React, {Component} from 'react';
import './Task.css';

class Task extends Component{
    constructor(props){
        super(props);
        this.state = {newTaskName: ""};
    }
    render(){
        return(<section>
            <ul>
                <li>
                    <div>   
                        <input type = "checkbox" className = "toggle-button" value = {this.state.newTaskName}/>
                        <label>Text</label>
                        <button>Delete</button>
                    </div>                
                    <input className = "edit" style ={{display: 'none'}}></input>
                </li>           
            </ul>    
        </section>);
    }
}
export default Task;