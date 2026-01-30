import ReactMarkdown from 'react-markdown';
import { parseSuggestionLinks, extractSources } from '../utils';

export function Message({ message, docsURL }) {
  const sources = message.role === 'assistant' ? extractSources(message.parts) : [];

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-lg px-4 py-2 ${
          message.role === 'user'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        {message.role === 'user' ? (
          <div className="text-sm whitespace-pre-wrap wrap-break-word">
            {message.content}
          </div>
        ) : (
          <>
            <div className="overflow-x-hidden text-left">
              <ReactMarkdown
                className="prose prose-sm max-w-none text-sm wrap-break-word"
                components={{
                  code: ({ node, inline, className, children, ...props }) => {
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
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
            {sources.length > 0 && (
              <div className="mt-2 text-xs border-t border-gray-300 pt-2">
                <p className="font-semibold text-gray-700">Sources:</p>
                {sources.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline block"
                  >
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
}
