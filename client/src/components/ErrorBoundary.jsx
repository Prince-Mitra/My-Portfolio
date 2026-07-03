import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Unhandled UI error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-base px-6 text-center text-ink">
          <p className="eyebrow">runtime error</p>
          <h1 className="font-display text-2xl">Something broke on this page.</h1>
          <p className="max-w-sm text-sm text-muted">
            The rest of the site is fine — reloading usually fixes it.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-base"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
