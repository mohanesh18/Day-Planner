import React, {Component} from 'react';
import './HelloWorld.css';

class HelloWorld extends Component{
    constructor(props){
        super(props);
        this.state = {greeting: 'Hello'};
        this.frenchify = this.frenchify.bind(this);
        this.removeGreeting = this.removeGreeting.bind(this);
    }
    frenchify(){
        this.setState({greeting: 'Bonjour'});
    }
    removeGreeting() {
        this.props.removeGreeting(this.props.name);
      }
    render(){
        return (
            <section>
                <ul>
                    <li>
                        <div>   
                            <input type = "checkbox" class = "toggle-button"></input>
                            <label>Text</label>
                            <button>Delete</button>
                        </div>                
                        {/* <input class = "edit" style = "display:none;"></input> */}
                    </li>           
                </ul>    
            </section>
            // <div className = "HelloWorld"> 
            //     {this.state.greeting} 
            //     {this.props.name}! 
            //     <br/>
            //     <button onClick = {this.frenchify}>Rename!</button>
            //     <button onClick={this.removeGreeting}>Remove task!</button>
            // </div>

        ); 
    }
}

export default HelloWorld;