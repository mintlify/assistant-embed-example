import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const extractSources = (parts) => {
  return parts
    ?.filter(p => p.type === 'tool-invocation' && p.toolInvocation?.toolName === 'search')
    .flatMap(p => p.toolInvocation?.result || [])
    .map(source => ({
      url: source.url || source.path,
      title: source.metadata?.title || source.path,
    })) || [];
};

const parseSuggestionLinks = (markdown, docsURL) => {
  // Parse (text)[/path] format from suggestions code block
  const links = markdown
    .split('\n')
    .map((line) => {
      const match = line.match(/\(([^)]*)\)\[([^\]]*)\]/);
      if (match && match[1] && match[2]) {
        let url = match[2];
        // Convert relative paths to absolute URLs if docsURL is provided
        if (docsURL && url.startsWith('/')) {
          const baseURL = docsURL.endsWith('/') ? docsURL.slice(0, -1) : docsURL;
          url = `${baseURL}${url}`;
        }
        return { text: match[1], url };
      }
      return null;
    })
    .filter(Boolean);
  return links;
};

export function AssistantWidget({ domain, docsURL, buttonColor = '#2563eb', position = 'bottom-right' }) {
  const [isOpen, setIsOpen] = useState(false);

  const positions = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: `https://api-dsc.mintlify.com/v1/assistant/${domain}/message`,
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_MINTLIFY_TOKEN}`,
    },
    body: {
      fp: 'anonymous',
      retrievalPageSize: 5,
    },
    streamProtocol: 'data',
    sendExtraMessageFields: true,
  });

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed ${positions[position]} px-4 py-2 text-white rounded-lg hover:opacity-90`}
        style={{ backgroundColor: buttonColor }}
      >
        {isOpen ? 'Close' : 'Ask'}
      </button>

      {isOpen && (
        <div className={`fixed ${position === 'bottom-right' || position === 'bottom-left' ? 'bottom-16' : 'top-16'} ${positions[position].split(' ')[1]} w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col z-50 border border-gray-200`}>
          <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <h3 className="font-semibold text-gray-900">Documentation assistant</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => {
              const sources = message.role === 'assistant' ? extractSources(message.parts) : [];
              return (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-lg px-4 py-2 break-words ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    {message.role === 'user' ? (
                      <div className="text-sm whitespace-pre-wrap break-words">{message.content}</div>
                    ) : (
                      <>
                        <div className="overflow-x-hidden">
                          <ReactMarkdown
                            className="prose prose-sm max-w-none text-sm break-words"
                            components={{
                              code: ({node, inline, className, children, ...props}) => {
                                const match = /language-(\w+)/.exec(className || '');
                                const language = match ? match[1] : undefined;

                                // Handle suggestions code block
                                if (language === 'suggestions' && typeof children === 'string') {
                                  const links = parseSuggestionLinks(children, docsURL);
                                  return (
                                    <div className="space-y-2 my-2">
                                      {links.map((link, i) => (
                                        <a
                                          key={i}
                                          href={link.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="block px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm"
                                        >
                                          {link.text}
                                        </a>
                                      ))}
                                    </div>
                                  );
                                }

                                // Fallback to default code rendering
                                return (
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                );
                              }
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                        {sources.length > 0 && (
                          <div className="mt-2 text-xs border-t border-gray-300 pt-2">
                            <p className="font-semibold text-gray-700">Sources:</p>
                            {sources.map((s, i) => (
                              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block">
                                {s.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && <div className="text-gray-500 text-sm">Loading...</div>}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask a question..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 text-sm"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
