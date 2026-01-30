import { AssistantWidget } from './components/AssistantWidget';
import { ASSISTANT_CONFIG } from './config';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Assistant widget example
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Click the button in the bottom-right corner to test the assistant widget.
        </p>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Setup instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Create a <code className="bg-gray-100 px-2 py-1 rounded">.env</code> in this directory (<code className="bg-gray-100 px-2 py-1 rounded">vite/</code>)</li>
            <li>Add your assistant API token: <code className="bg-gray-100 px-2 py-1 rounded">VITE_MINTLIFY_TOKEN=mint_dsc_your_token_here</code></li>
            <li>Update the domain and docsURL in <code className="bg-gray-100 px-2 py-1 rounded">src/config.js</code></li>
            <li>Run <code className="bg-gray-100 px-2 py-1 rounded">npm install</code> and <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code></li>
          </ol>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Test questions</h3>
          <p className="text-blue-800 mb-3">Try asking the assistant questions about your documentation.</p>
          <ul className="list-disc list-inside space-y-1 text-blue-700">
            <li>How do I get started?</li>
            <li>What is the API reference?</li>
            <li>How do I authenticate?</li>
          </ul>
        </div>
      </div>

      <AssistantWidget {...ASSISTANT_CONFIG} />
    </div>
  );
}

export default App;
