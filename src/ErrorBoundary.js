import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // call error logging or reporting service
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Oh no! Thats an error. Please refresh...</div>;
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
