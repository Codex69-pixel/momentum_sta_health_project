import { Component } from "react";

class Salute extends Component {
    constructor() {
        super();
        this.state = {
            Msg: "Hello, Guest"
        };
         this.clicker = this.clicker.bind(this);
       
    }

    clicker () {
        this.setState({ Msg: "Button clicked" });
    };


    render() {
        return (
            <div className="app4">
                <h1>{this.state.Msg}</h1>
                <button onClick={this.clicker}>Click Me</button>
            </div>
        );
    }
}

export default Salute;
