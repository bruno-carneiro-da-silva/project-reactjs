import { Component } from 'react'


export class Home extends Component {
  state = {
    counter: 0
  }

  handleClick = () => {

    //checking the previous value of the state
    this.setState(
      (prevState, prevProps) => {
        return { counter: prevState.counter + prevProps.numberToIncrement }
      },
      () => {
        console.log('POST', this.state.counter);
      }
    );
  }

  render() {
    return (
      <div className="container">
        <h1>{this.state.counter}</h1>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}