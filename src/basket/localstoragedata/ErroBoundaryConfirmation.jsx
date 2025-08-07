// src/components/ErrorBoundary.jsx
import React, { Component } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

export class ErrorBoundaryConfirmation extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg my-4">
          <div className="flex items-center gap-2 text-red-800">
            <FaExclamationTriangle className="text-xl" />
            <h2 className="text-lg font-bold">Something went wrong</h2>
          </div>
          <p className="mt-2 text-red-600">{this.state.error?.message || 'Unknown error'}</p>
          <button
            onClick={this.handleReset}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Export as both named and default export for flexibility
export default ErrorBoundaryConfirmation;