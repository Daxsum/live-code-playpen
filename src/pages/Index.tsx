import { CodePlayground } from '@/components/CodePlayground';
import { ReactPlayground } from '@/components/ReactPlayground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

const Index = () => {
  const [activeDemo, setActiveDemo] = useState<'html' | 'react' | 'nextjs'>('react');

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">
            Code Playground Suite
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional code editors with live preview for HTML/CSS/JS and React/Next.js projects. 
            Perfect for building interactive documentation, tutorials, and development tools.
          </p>

          {/* Demo Selector */}
          <div className="flex justify-center space-x-2 mt-8">
            <Button
              variant={activeDemo === 'html' ? 'default' : 'outline'}
              onClick={() => setActiveDemo('html')}
              className="font-mono"
            >
              🌐 HTML/CSS/JS
            </Button>
            <Button
              variant={activeDemo === 'react' ? 'default' : 'outline'}
              onClick={() => setActiveDemo('react')}
              className="font-mono"
            >
              ⚛️ React
            </Button>
            <Button
              variant={activeDemo === 'nextjs' ? 'default' : 'outline'}
              onClick={() => setActiveDemo('nextjs')}
              className="font-mono"
            >
              🔷 Next.js
            </Button>
          </div>
        </header>

        {/* Main Playground */}
        {activeDemo === 'html' && (
          <CodePlayground 
            height="700px"
            initialHtml={`<div class="app">
  <header class="hero">
    <h1>🌟 Interactive Web Playground</h1>
    <p>Build amazing web experiences with live preview!</p>
    <button onclick="createMagic()" class="cta-button">
      Create Magic ✨
    </button>
  </header>
  
  <main class="features">
    <div class="feature-card" id="card1">
      <h3>⚡ Lightning Fast</h3>
      <p>Instant preview updates</p>
    </div>
    <div class="feature-card" id="card2">
      <h3>🎨 Beautiful Design</h3>
      <p>Modern UI components</p>
    </div>
    <div class="feature-card" id="card3">
      <h3>🔧 Developer Friendly</h3>
      <p>Professional tooling</p>
    </div>
  </main>
  
  <div id="magic-output"></div>
</div>`}
            initialCss={`* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  padding: 4rem 0;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero p {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.cta-button {
  background: rgba(255,255,255,0.2);
  border: 2px solid rgba(255,255,255,0.3);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: rgba(255,255,255,0.3);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255,255,255,0.2);
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

#magic-output {
  margin-top: 2rem;
  text-align: center;
  font-size: 1.2rem;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}`}
            initialJs={`function createMagic() {
  const output = document.getElementById('magic-output');
  const cards = document.querySelectorAll('.feature-card');
  
  // Animate cards
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.animation = 'bounce 0.6s ease';
    }, index * 200);
  });
  
  // Show magic message
  const messages = [
    '🎉 Magic created! Your playground is ready!',
    '✨ Beautiful components brought to life!',
    '🚀 Ready to build something amazing!',
    '🌟 The possibilities are endless!'
  ];
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  output.innerHTML = \`
    <div style="background: rgba(255,255,255,0.2); 
                padding: 1rem 2rem; 
                border-radius: 50px; 
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.3);
                animation: fadeInUp 0.5s ease;">
      \${randomMessage}
    </div>
  \`;
  
  // Add some dynamic styles
  const style = document.createElement('style');
  style.textContent = \`
    @keyframes bounce {
      0%, 20%, 60%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      80% { transform: translateY(-5px); }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  \`;
  document.head.appendChild(style);
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎮 HTML/CSS/JS Playground loaded!');
  
  // Add parallax effect to hero
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.transform = \`translateY(\${scrolled * 0.5}px)\`;
  });
});`}
          />
        )}

        {activeDemo === 'react' && (
          <ReactPlayground
            height="700px"
            framework="react"
          />
        )}

        {activeDemo === 'nextjs' && (
          <ReactPlayground
            height="700px"
            framework="nextjs"
            initialComponent={`import React, { useState, useEffect } from 'react';

const MyComponent = ({ title = "Next.js Playground!" }) => {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className={theme === 'dark' ? 'container dark' : 'container'}>
      <header className="header">
        <h1>{title}</h1>
        <button 
          className="theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? '☀️' : '🌙'} Toggle Theme
        </button>
      </header>

      <main className="main">
        <div className="counter-section">
          <h2>Interactive Counter</h2>
          <div className="counter-display">
            Count: {count}
          </div>
          <div className="button-group">
            <button 
              className="btn primary"
              onClick={() => setCount(count + 1)}
            >
              Increment
            </button>
            <button 
              className="btn secondary"
              onClick={() => setCount(count - 1)}
            >
              Decrement
            </button>
            <button 
              className="btn outline"
              onClick={() => setCount(0)}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="features">
          <div className="feature">
            <h3>🔥 Hot Reload</h3>
            <p>Changes update instantly</p>
          </div>
          <div className="feature">
            <h3>🎯 TypeScript Ready</h3>
            <p>Full TypeScript support</p>
          </div>
          <div className="feature">
            <h3>🚀 Next.js Optimized</h3>
            <p>Built for production</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyComponent;`}
            initialStyles={`.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 1.2rem;
  color: #666;
}

.container {
  min-height: 100vh;
  padding: 2rem;
  transition: all 0.3s ease;
}

.container.dark {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: white;
}

.container:not(.dark) {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  color: #333;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(255,255,255,0.1);
}

.header h1 {
  font-size: 2.5rem;
  margin: 0;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.theme-toggle {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: rgba(255,255,255,0.1);
  color: inherit;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.theme-toggle:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-2px);
}

.main {
  max-width: 800px;
  margin: 0 auto;
}

.counter-section {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  border: 1px solid rgba(255,255,255,0.1);
}

.counter-section h2 {
  margin: 0 0 1.5rem 0;
  font-size: 1.8rem;
}

.counter-display {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #667eea;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.btn.primary {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
}

.btn.secondary {
  background: rgba(255,255,255,0.2);
  color: inherit;
  backdrop-filter: blur(10px);
}

.btn.outline {
  background: transparent;
  border: 2px solid rgba(255,255,255,0.3);
  color: inherit;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.1);
  transition: all 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
  background: rgba(255,255,255,0.15);
}

.feature h3 {
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
}

.feature p {
  margin: 0;
  opacity: 0.8;
}`}
            initialProps={`{
  "title": "Welcome to Next.js Playground! 🚀",
  "initialCount": 0,
  "enableAnimations": true
}`}
          />
        )}

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <Card className="gradient-card p-6 text-center">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Live Preview</h3>
            <p className="text-muted-foreground text-sm">
              Instant updates with hot reloading for both HTML/JS and React components
            </p>
          </Card>
          
          <Card className="gradient-card p-6 text-center">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Multi-Framework</h3>
            <p className="text-muted-foreground text-sm">
              Support for vanilla HTML/CSS/JS, React, and Next.js development
            </p>
          </Card>
          
          <Card className="gradient-card p-6 text-center">
            <div className="text-3xl mb-4">🔧</div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Developer Tools</h3>
            <p className="text-muted-foreground text-sm">
              JSX auto-completion, error boundaries, and professional editing features
            </p>
          </Card>

          <Card className="gradient-card p-6 text-center">
            <div className="text-3xl mb-4">📦</div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">NPM Ready</h3>
            <p className="text-muted-foreground text-sm">
              Perfect for building documentation, tutorials, and interactive demos
            </p>
          </Card>
        </div>

        {/* Usage Examples */}
        <div className="mt-16 space-y-8">
          <h2 className="text-3xl font-bold text-center text-foreground">Perfect For</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="text-4xl">📚</div>
              <h3 className="text-xl font-semibold text-foreground">Documentation</h3>
              <p className="text-muted-foreground">
                Interactive code examples in your docs with live previews
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="text-4xl">🎓</div>
              <h3 className="text-xl font-semibold text-foreground">Learning Platforms</h3>
              <p className="text-muted-foreground">
                Build coding tutorials with hands-on practice environments
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="text-4xl">🎮</div>
              <h3 className="text-xl font-semibold text-foreground">Interactive Demos</h3>
              <p className="text-muted-foreground">
                Showcase your libraries and frameworks with live examples
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
