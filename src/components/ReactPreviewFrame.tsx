import { useEffect, useRef } from 'react';

interface ReactPreviewFrameProps {
  component: string;
  styles: string;
  props: string;
  className?: string;
  framework?: 'react' | 'nextjs';
}

export const ReactPreviewFrame = ({ 
  component, 
  styles, 
  props, 
  className = '',
  framework = 'react'
}: ReactPreviewFrameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const document = iframe.contentDocument || iframe.contentWindow?.document;
    if (!document) return;

    // Parse props safely
    let parsedProps = {};
    try {
      parsedProps = JSON.parse(props || '{}');
    } catch (e) {
      console.warn('Invalid props JSON:', e);
      parsedProps = {};
    }

    // Transform JSX component to runnable code
    const transformedComponent = transformReactComponent(component, parsedProps, framework);

    // Create the complete HTML document with React
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React Preview</title>
        
        <!-- React & Babel -->
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        
        <style>
          /* Base styles for preview */
          * {
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #fff;
          }
          
          #root {
            min-height: 100vh;
          }
          
          /* User styles */
          ${styles}
        </style>
      </head>
      <body>
        <div id="root"></div>
        
        <script type="text/babel">
          const { React, ReactDOM } = window;
          const { useState, useEffect, useCallback, useMemo, useRef } = React;
          
          // Error boundary component
          class ErrorBoundary extends React.Component {
            constructor(props) {
              super(props);
              this.state = { hasError: false, error: null };
            }
            
            static getDerivedStateFromError(error) {
              return { hasError: true, error };
            }
            
            componentDidCatch(error, errorInfo) {
              console.error('React Error:', error, errorInfo);
            }
            
            render() {
              if (this.state.hasError) {
                return (
                  <div style={{
                    padding: '2rem',
                    background: '#fee',
                    border: '1px solid #fcc',
                    borderRadius: '8px',
                    margin: '1rem',
                    fontFamily: 'monospace'
                  }}>
                    <h3 style={{ color: '#c33', margin: '0 0 1rem 0' }}>
                      ⚠️ Component Error
                    </h3>
                    <pre style={{ 
                      color: '#666', 
                      fontSize: '14px',
                      whiteSpace: 'pre-wrap',
                      margin: 0
                    }}>
                      {this.state.error?.toString()}
                    </pre>
                  </div>
                );
              }
              
              return this.props.children;
            }
          }
          
          // User component code
          ${transformedComponent}
          
          // Render the component
          const container = document.getElementById('root');
          const root = ReactDOM.createRoot ? ReactDOM.createRoot(container) : null;
          
          try {
            if (root) {
              root.render(
                React.createElement(ErrorBoundary, null,
                  React.createElement(MyComponent, ${JSON.stringify(parsedProps)})
                )
              );
            } else {
              // Fallback for older React versions
              ReactDOM.render(
                React.createElement(ErrorBoundary, null,
                  React.createElement(MyComponent, ${JSON.stringify(parsedProps)})
                ),
                container
              );
            }
          } catch (error) {
            console.error('Render Error:', error);
            container.innerHTML = \`
              <div style="padding: 2rem; background: #fee; border: 1px solid #fcc; border-radius: 8px; margin: 1rem; font-family: monospace;">
                <h3 style="color: #c33; margin: 0 0 1rem 0;">⚠️ Render Error</h3>
                <pre style="color: #666; font-size: 14px; white-space: pre-wrap; margin: 0;">\${error.toString()}</pre>
              </div>
            \`;
          }
        </script>
      </body>
      </html>
    `;

    // Write the content to the iframe
    document.open();
    document.write(fullHtml);
    document.close();
  }, [component, styles, props, framework]);

  return (
    <iframe
      ref={iframeRef}
      className={`preview-frame border-0 w-full h-full ${className}`}
      title="React Component Preview"
      sandbox="allow-scripts allow-same-origin allow-modals"
    />
  );
};

// Transform React component code for execution
function transformReactComponent(componentCode: string, props: any, framework: string): string {
  // Remove import statements (they're not needed in the browser environment)
  let transformed = componentCode.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '');
  
  // Remove export default and just keep the function/class
  transformed = transformed.replace(/export\s+default\s+/, '');
  
  // If it's a named export, extract the component
  if (transformed.includes('export')) {
    const match = transformed.match(/export\s+(?:const|function|class)\s+(\w+)/);
    if (match) {
      transformed = transformed.replace(/export\s+/, '');
      // Ensure the component is named MyComponent for consistency
      if (match[1] !== 'MyComponent') {
        transformed = transformed.replace(new RegExp(`\\b${match[1]}\\b`, 'g'), 'MyComponent');
      }
    }
  }
  
  // Handle different component patterns
  if (!transformed.includes('MyComponent')) {
    // If no component name found, assume it's the main export and rename it
    transformed = transformed.replace(/(?:const|function|class)\s+\w+/, 'const MyComponent');
  }
  
  // Add React hooks if they're used but not imported
  const hooksUsed = [];
  if (transformed.includes('useState')) hooksUsed.push('useState');
  if (transformed.includes('useEffect')) hooksUsed.push('useEffect');
  if (transformed.includes('useCallback')) hooksUsed.push('useCallback');
  if (transformed.includes('useMemo')) hooksUsed.push('useMemo');
  if (transformed.includes('useRef')) hooksUsed.push('useRef');
  
  return transformed;
}
