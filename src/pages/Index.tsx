import { CodePlayground } from '@/components/CodePlayground';

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
            Code Playground
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A powerful code editor with live preview. Write HTML, CSS, and JavaScript, 
            and see your changes instantly in the preview pane.
          </p>
        </header>

        {/* Main Playground */}
        <CodePlayground 
          height="700px"
          initialHtml={`<div class="container">
  <h1>Welcome to Code Playground!</h1>
  <p>This is a live code editor where you can experiment with HTML, CSS, and JavaScript.</p>
  <button onclick="changeColor()">Change Color</button>
  <div id="output"></div>
</div>`}
          initialCss={`body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 500px;
}

h1 {
  color: #333;
  margin-bottom: 1rem;
}

button {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

button:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
}

#output {
  margin-top: 1rem;
  font-weight: bold;
}`}
          initialJs={`function changeColor() {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  document.querySelector('button').style.background = randomColor;
  document.getElementById('output').textContent = \`Color changed to \${randomColor}!\`;
  document.getElementById('output').style.color = randomColor;
}

// Initialize with a welcome message
document.addEventListener('DOMContentLoaded', function() {
  console.log('Code Playground is ready!');
  document.getElementById('output').textContent = 'Click the button to see magic happen!';
});`}
        />

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="gradient-card p-6 rounded-lg text-center">
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Live Preview</h3>
            <p className="text-muted-foreground text-sm">
              See your changes instantly as you type with automatic updates
            </p>
          </div>
          
          <div className="gradient-card p-6 rounded-lg text-center">
            <div className="text-2xl mb-3">🎨</div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Multi-Language</h3>
            <p className="text-muted-foreground text-sm">
              Support for HTML, CSS, and JavaScript in separate tabs
            </p>
          </div>
          
          <div className="gradient-card p-6 rounded-lg text-center">
            <div className="text-2xl mb-3">🔧</div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Developer Friendly</h3>
            <p className="text-muted-foreground text-sm">
              Tab support, line numbers, and syntax-aware editing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
