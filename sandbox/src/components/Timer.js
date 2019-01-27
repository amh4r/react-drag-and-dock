import React, { Component } from "react"; // eslint-disable-line import/no-extraneous-dependencies

class Foo extends Component {
  constructor() {
    super();

    this.state = {
      startTime: new Date(),
      now: new Date()
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ now: Date.now() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        {Math.round((this.state.now - this.state.startTime) / 1000)} seconds
        have elapsed since mount.
      </div>
    );
  }
}

export default Foo;
