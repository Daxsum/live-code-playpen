import { useEffect, useRef } from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: 'html' | 'css' | 'js';
  className?: string;
  placeholder?: string;
}

export const CodeEditor = ({ 
  value, 
  onChange, 
  language, 
  className = '',
  placeholder 
}: CodeEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Auto-resize textarea
    const resizeTextarea = () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    };

    textarea.addEventListener('input', resizeTextarea);
    resizeTextarea();

    return () => textarea.removeEventListener('input', resizeTextarea);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Insert 2 spaces for tab
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      // Move cursor
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    
    switch (language) {
      case 'html':
        return '<h1>Hello World!</h1>\n<p>Start coding your HTML here...</p>';
      case 'css':
        return 'body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n}';
      case 'js':
        return 'console.log("Hello World!");\n\n// Your JavaScript code here';
      default:
        return 'Start coding...';
    }
  };

  return (
    <div className={`code-editor flex flex-col relative ${className}`}>
      {/* Line numbers overlay */}
      <div className="absolute left-0 top-0 w-12 h-full bg-muted/10 border-r border-border/30 pointer-events-none z-10">
        <div className="p-4 pt-[1.1rem] font-mono text-xs text-muted-foreground leading-6">
          {value.split('\n').map((_, i) => (
            <div key={i} className="text-right pr-2">
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={getPlaceholder()}
        className="flex-1 w-full min-h-full p-4 pl-14 bg-editor-bg text-foreground font-mono text-sm leading-6 resize-none border-0 outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:ring-inset"
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
};