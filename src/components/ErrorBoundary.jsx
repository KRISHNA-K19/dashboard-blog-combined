import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Log error for debugging
    console.error('Captured error in component tree:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="p-6">
          <h2 className="text-xl font-semibold text-red-700">Something went wrong</h2>
          <pre className="mt-4 p-3 bg-white border rounded text-sm text-slate-700 overflow-auto">{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
