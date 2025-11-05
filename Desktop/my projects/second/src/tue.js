import { Component } from "react";

class Hello extends Component {
  render() {
    return <div className="app2">
              Hello {this.props.name}
        </div>
  }
}

export default Hello;