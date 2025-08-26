import { useEffect, useRef } from 'react';

interface ReactCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: 'component' | 'styles' | 'props';
  className?: string;
  placeholder?: string;
  framework?: 'react' | 'nextjs';
}

export const ReactCodeEditor = ({ 
  value, 
  onChange, 
  language, 
  className = '',
  placeholder,
  framework = 'react'
}: ReactCodeEditorProps) => {
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

    // Auto-complete JSX tags
    if (e.key === '>' && language === 'component') {
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const textBefore = value.substring(0, start);
      const match = textBefore.match(/<([a-zA-Z][a-zA-Z0-9]*)(?:\s|$)/);
      
      if (match && !textBefore.includes('/>') && !textBefore.includes(`</${match[1]}>`)) {
        e.preventDefault();
        const tagName = match[1];
        const newValue = value.substring(0, start) + `></${tagName}>` + value.substring(start);
        onChange(newValue);
        
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        }, 0);
      }
    }
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    
    switch (language) {
      case 'component':
        return framework === 'nextjs' 
          ? `import React from 'react';\n\nconst MyComponent = () => {\n  return (\n    <div>\n      <h1>Next.js Component</h1>\n    </div>\n  );\n};\n\nexport default MyComponent;`
          : `import React from 'react';\n\nconst MyComponent = () => {\n  return (\n    <div>\n      <h1>React Component</h1>\n    </div>\n  );\n};\n\nexport default MyComponent;`;
      case 'styles':
        return `.component {\n  padding: 1rem;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n\nh1 {\n  color: #333;\n  margin: 0;\n}`;
      case 'props':
        return `{\n  "title": "Hello World",\n  "count": 0,\n  "theme": "light"\n}`;
      default:
        return 'Start coding...';
    }
  };

  const getLanguageIcon = () => {
    switch (language) {
      case 'component':
        return framework === 'nextjs' ? '🔷' : '⚛️';
      case 'styles':
        return '🎨';
      case 'props':
        return '🔧';
      default:
        return '📄';
    }
  };

  return (
    <div className={`code-editor flex flex-col relative ${className}`}>
      {/* Language indicator */}
      <div className="absolute top-2 right-2 z-20 bg-muted/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono text-muted-foreground flex items-center space-x-1">
        <span>{getLanguageIcon()}</span>
        <span>{language === 'component' ? (framework === 'nextjs' ? 'TSX' : 'JSX') : language.toUpperCase()}</span>
      </div>

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
        className="flex-1 w-full min-h-full p-4 pl-14 pr-16 bg-editor-bg text-foreground font-mono text-sm leading-6 resize-none border-0 outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:ring-inset"
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
};