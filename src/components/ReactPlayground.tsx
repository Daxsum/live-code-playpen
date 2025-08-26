import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, RotateCcw, Zap } from 'lucide-react';
import { ReactCodeEditor } from './ReactCodeEditor';
import { ReactPreviewFrame } from './ReactPreviewFrame';
import { ReactTabBar } from './ReactTabBar';

type CodeType = 'component' | 'styles' | 'props';

interface ReactPlaygroundProps {
  initialComponent?: string;
  initialStyles?: string;
  initialProps?: string;
  height?: string;
  showTabs?: boolean;
  autoRun?: boolean;
  className?: string;
  framework?: 'react' | 'nextjs';
}

export const ReactPlayground = ({ 
  initialComponent = `import React, { useState } from 'react';

const MyComponent = ({ title = "Hello React!" }) => {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1>{title}</h1>
      <div className="counter">
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>
          Increment
        </button>
        <button onClick={() => setCount(count - 1)}>
          Decrement
        </button>
      </div>
    </div>
  );
};

export default MyComponent;`,
  initialStyles = `.container {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.counter {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  text-align: center;
}

button {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 20px;
  margin: 0 8px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

button:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
}

p {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}`,
  initialProps = `{
  "title": "Welcome to React Playground!",
  "theme": "dark",
  "showCounter": true
}`,
  height = '700px',
  showTabs = true,
  autoRun = true,
  className = '',
  framework = 'react'
}: ReactPlaygroundProps) => {
  const [activeTab, setActiveTab] = useState<CodeType>('component');
  const [code, setCode] = useState({
    component: initialComponent,
    styles: initialStyles,
    props: initialProps
  });
  const [previewKey, setPreviewKey] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Auto-run with debounce
  useEffect(() => {
    if (autoRun) {
      clearTimeout(timeoutRef.current);
      setIsRunning(true);
      timeoutRef.current = setTimeout(() => {
        setPreviewKey(prev => prev + 1);
        setIsRunning(false);
      }, 800);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [code, autoRun]);

  const handleCodeChange = (value: string) => {
    setCode(prev => ({ ...prev, [activeTab]: value }));
  };

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setPreviewKey(prev => prev + 1);
      setIsRunning(false);
    }, 200);
  };

  const resetCode = () => {
    setCode({
      component: initialComponent,
      styles: initialStyles,
      props: initialProps
    });
    setPreviewKey(prev => prev + 1);
  };

  return (
    <Card className={`editor-glow bg-card border-border ${className}`}>
      <div className="flex flex-col h-full" style={{ height }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-destructive rounded-full" />
              <div className="w-3 h-3 bg-accent rounded-full" />
              <div className="w-3 h-3 bg-primary rounded-full" />
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center space-x-2">
              {framework === 'nextjs' ? (
                <div className="w-5 h-5 bg-foreground rounded text-background text-xs font-bold flex items-center justify-center">N</div>
              ) : (
                <div className="w-5 h-5 text-primary">⚛️</div>
              )}
              <span className="text-sm font-mono text-muted-foreground">
                {framework === 'nextjs' ? 'Next.js' : 'React'} Playground
              </span>
            </div>
            {isRunning && (
              <div className="flex items-center space-x-1 text-xs text-primary">
                <Zap className="w-3 h-3 animate-pulse" />
                <span>Running...</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              onClick={resetCode}
              variant="ghost" 
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            {!autoRun && (
              <Button 
                onClick={runCode}
                size="sm"
                className="gradient-primary text-primary-foreground hover:opacity-90"
                disabled={isRunning}
              >
                <Play className="w-4 h-4 mr-1" />
                {isRunning ? 'Running...' : 'Run'}
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 min-h-0">
          {/* Editor Panel */}
          <div className="flex flex-col w-1/2 border-r border-border">
            {showTabs && (
              <ReactTabBar 
                activeTab={activeTab}
                onTabChange={setActiveTab}
                framework={framework}
              />
            )}
            
            <div className="flex-1">
              <ReactCodeEditor
                value={code[activeTab]}
                onChange={handleCodeChange}
                language={activeTab}
                className="h-full"
                framework={framework}
              />
            </div>
          </div>

          {/* Preview Panel */}
          <div className="w-1/2 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border">
              <span className="text-sm font-mono text-muted-foreground">Live Preview</span>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span>Hot Reload</span>
              </div>
            </div>
            <div className="flex-1">
              <ReactPreviewFrame
                key={previewKey}
                component={code.component}
                styles={code.styles}
                props={code.props}
                className="h-full w-full"
                framework={framework}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};