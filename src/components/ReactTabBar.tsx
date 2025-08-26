import { Button } from '@/components/ui/button';

type CodeType = 'component' | 'styles' | 'props';

interface ReactTabBarProps {
  activeTab: CodeType;
  onTabChange: (tab: CodeType) => void;
  framework?: 'react' | 'nextjs';
}

export const ReactTabBar = ({ activeTab, onTabChange, framework = 'react' }: ReactTabBarProps) => {
  const tabs: { id: CodeType; label: string; icon: string; description: string }[] = [
    { 
      id: 'component', 
      label: framework === 'nextjs' ? 'Component.tsx' : 'Component.jsx', 
      icon: framework === 'nextjs' ? '🔷' : '⚛️',
      description: 'React component code'
    },
    { 
      id: 'styles', 
      label: 'styles.css', 
      icon: '🎨',
      description: 'Component styles'
    },
    { 
      id: 'props', 
      label: 'props.json', 
      icon: '🔧',
      description: 'Component props'
    },
  ];

  return (
    <div className="flex border-b border-border bg-muted/20 overflow-x-auto">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          size="sm"
          onClick={() => onTabChange(tab.id)}
          className={`
            rounded-none border-b-2 transition-all duration-200 font-mono text-xs
            flex items-center space-x-2 px-3 py-2 min-w-fit
            ${activeTab === tab.id 
              ? 'tab-active text-primary border-primary bg-tab-active' 
              : 'tab-inactive border-transparent hover:bg-tab-active/50 text-muted-foreground hover:text-foreground'
            }
          `}
          title={tab.description}
        >
          <span className="text-sm">{tab.icon}</span>
          <span className="hidden sm:inline">{tab.label}</span>
          <span className="sm:hidden">{tab.id.charAt(0).toUpperCase()}</span>
          
          {/* Active indicator */}
          {activeTab === tab.id && (
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          )}
        </Button>
      ))}
      
      <div className="flex-1 border-b-2 border-transparent bg-tab-inactive min-w-0" />
      
      {/* Framework indicator */}
      <div className="flex items-center px-3 py-2 text-xs text-muted-foreground bg-muted/50 border-b-2 border-transparent">
        <span className="mr-1">{framework === 'nextjs' ? '🔷' : '⚛️'}</span>
        <span className="hidden md:inline">{framework === 'nextjs' ? 'Next.js' : 'React'}</span>
      </div>
    </div>
  );
};