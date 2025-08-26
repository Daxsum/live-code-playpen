import { Button } from '@/components/ui/button';

type CodeType = 'html' | 'css' | 'js';

interface TabBarProps {
  activeTab: CodeType;
  onTabChange: (tab: CodeType) => void;
}

const tabs: { id: CodeType; label: string; icon: string }[] = [
  { id: 'html', label: 'HTML', icon: '🏗️' },
  { id: 'css', label: 'CSS', icon: '🎨' },
  { id: 'js', label: 'JS', icon: '⚡' },
];

export const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  return (
    <div className="flex border-b border-border bg-muted/20">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          size="sm"
          onClick={() => onTabChange(tab.id)}
          className={`
            rounded-none border-b-2 transition-all duration-200 font-mono
            ${activeTab === tab.id 
              ? 'tab-active text-primary border-primary bg-tab-active' 
              : 'tab-inactive border-transparent hover:bg-tab-active/50 text-muted-foreground hover:text-foreground'
            }
          `}
        >
          <span className="mr-2">{tab.icon}</span>
          {tab.label}
        </Button>
      ))}
      
      <div className="flex-1 border-b-2 border-transparent bg-tab-inactive" />
    </div>
  );
};