// src/components/ErrorBoundary.tsx
'use client';

import { Component, type ReactNode, type ErrorInfo } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('ErrorBoundary caught:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-red-900 p-4">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl font-bold">Something went wrong</h1>
            <p className="text-xl text-gray-300">Please try again.</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Back to Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
