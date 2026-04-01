import { AppRegistry } from 'react-native';
import App from '../App';
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: any) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: 'red', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
          <h2>App Crashed</h2>
          {String(this.state.error)}
          <hr />
          {(this.state.error as any)?.stack}
        </div>
      );
    }
    return this.props.children;
  }
}

const RootApp = () => (
  <ErrorBoundary>
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', width: '100%' }}>
      <App />
    </div>
  </ErrorBoundary>
);

// react-native-web: registers the component and mounts to the DOM
AppRegistry.registerComponent('Farmlytics', () => RootApp);
AppRegistry.runApplication('Farmlytics', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
