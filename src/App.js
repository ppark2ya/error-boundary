import React, { Component, Fragment } from "react";

const BoundaryHOC = ProtectedComponent =>
  class Boundary extends Component {
    state = {
      hasError: false
    };

    componentDidCatch = (error, info) => {
      console.error(`${error} info: ${JSON.stringify(info)}`);
      this.setState({
        hasError: true
      });
    };

    render() {
      const { hasError } = this.state;

      if (hasError) {
        return <ErrorFallback />;
      } else {
        return <ProtectedComponent />;
      }
    }
  };

class ErrorMaker extends Component {
  state = {
    friends: ["jisu", "flynn", "daal", "kneeprayer"]
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        friends: undefined
      });
    }, 2000);
  };

  render() {
    const { friends } = this.state;
    return friends.map(friend => ` ${friend}`);
  }
}

const ErrorFallback = () => " Sorry something went wrong";

class App extends Component {
  render() {
    return (
      <Fragment>
        <ErrorMaker />
      </Fragment>
    );
  }
}

export default BoundaryHOC(App);
