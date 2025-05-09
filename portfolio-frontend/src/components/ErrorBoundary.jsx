import { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-100 dark:bg-gray-900">
          <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50 mb-2">Something went wrong</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We're sorry, but there was an error loading this page.
              </p>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 p-4 rounded-md mb-6 text-left overflow-auto max-h-40">
                <p className="font-mono text-sm">
                  {this.state.error && this.state.error.toString()}
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => window.location.reload()}
                  className="btn bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600 py-2 px-4 rounded-md transition-colors"
                >
                  Reload Page
                </button>
                <Link to="/" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
