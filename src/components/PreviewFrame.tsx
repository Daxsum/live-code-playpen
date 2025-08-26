import { useEffect, useRef } from 'react';

interface PreviewFrameProps {
  html: string;
  css: string;
  js: string;
  className?: string;
}

export const PreviewFrame = ({ html, css, js, className = '' }: PreviewFrameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const document = iframe.contentDocument || iframe.contentWindow?.document;
    if (!document) return;

    // Create the complete HTML document
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <style>
          /* Base styles for preview */
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 16px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #fff;
          }
          
          /* User CSS */
          ${css}
        </style>
      </head>
      <body>
        ${html}
        
        <script>
          // Error handling
          window.onerror = function(msg, url, line, col, error) {
            console.error('Preview Error:', msg, 'at line', line);
            return false;
          };
          
          // Console redirection for better debugging
          const originalLog = console.log;
          const originalError = console.error;
          const originalWarn = console.warn;
          
          console.log = function(...args) {
            originalLog.apply(console, args);
            // Could send to parent window for log display
          };
          
          console.error = function(...args) {
            originalError.apply(console, args);
            // Could send to parent window for error display
          };
          
          console.warn = function(...args) {
            originalWarn.apply(console, args);
            // Could send to parent window for warning display
          };
          
          // User JavaScript
          try {
            ${js}
          } catch (error) {
            console.error('JavaScript Error:', error.message);
          }
        </script>
      </body>
      </html>
    `;

    // Write the content to the iframe
    document.open();
    document.write(fullHtml);
    document.close();
  }, [html, css, js]);

  return (
    <iframe
      ref={iframeRef}
      className={`preview-frame border-0 w-full h-full ${className}`}
      title="Code Preview"
      sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
    />
  );
};