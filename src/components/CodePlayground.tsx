import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, RotateCcw } from 'lucide-react';
import { CodeEditor } from './CodeEditor';
import { PreviewFrame } from './PreviewFrame';
import { TabBar } from './TabBar';

type CodeType = 'html' | 'css' | 'js';

interface CodePlaygroundProps {
  initialHtml?: string;
  initialCss?: string;
  initialJs?: string;
  height?: string;
  showTabs?: boolean;
  autoRun?: boolean;
  className?: string;
}

export const CodePlayground = ({ 
  initialHtml = '<h1>Hello World!</h1>',
  initialCss = 'h1 { color: #3b82f6; font-family: Arial, sans-serif; }',
  initialJs = 'console.log("Hello from the playground!");',
  height = '600px',
  showTabs = true,
  autoRun = true,
  className = ''
}: CodePlaygroundProps) => {
  const [activeTab, setActiveTab] = useState<CodeType>('html');
  const [code, setCode] = useState({
    html: initialHtml,
    css: initialCss,
    js: initialJs
  });
  const [previewKey, setPreviewKey] = useState(0);
  
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Auto-run with debounce
  useEffect(() => {
    if (autoRun) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setPreviewKey(prev => prev + 1);
      }, 500);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [code, autoRun]);

  const handleCodeChange = (value: string) => {
    setCode(prev => ({ ...prev, [activeTab]: value }));
  };

  const runCode = () => {
    setPreviewKey(prev => prev + 1);
  };

  const resetCode = () => {
    setCode({
      html: initialHtml,
      css: initialCss,
      js: initialJs
    });
    setPreviewKey(prev => prev + 1);
  };

  return (
    <Card className={`editor-glow bg-card border-border ${className}`}>
      <div className="flex flex-col h-full" style={{ height }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-destructive rounded-full" />
            <div className="w-3 h-3 bg-accent rounded-full" />
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="ml-4 text-sm font-mono text-muted-foreground">
              Code Playground
            </span>
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
              >
                <Play className="w-4 h-4 mr-1" />
                Run
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 min-h-0">
          {/* Editor Panel */}
          <div className="flex flex-col w-1/2 border-r border-border">
            {showTabs && (
              <TabBar 
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            )}
            
            <div className="flex-1">
              <CodeEditor
                value={code[activeTab]}
                onChange={handleCodeChange}
                language={activeTab}
                className="h-full"
              />
            </div>
          </div>

          {/* Preview Panel */}
          <div className="w-1/2 flex flex-col">
            <div className="flex items-center px-4 py-2 bg-muted/30 border-b border-border">
              <span className="text-sm font-mono text-muted-foreground">Preview</span>
            </div>
            <div className="flex-1">
              <PreviewFrame
                key={previewKey}
                html={code.html}
                css={code.css}
                js={code.js}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};