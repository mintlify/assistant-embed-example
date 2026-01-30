'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Message } from './Message';

export function AssistantWidget({ domain, docsURL }) {
  const [isOpen, setIsOpen] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: `https://api-dsc.mintlify.com/v1/assistant/${domain}/message`,
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MINTLIFY_TOKEN}`,
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
        className="fixed bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {isOpen ? 'Close' : 'Ask'}
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-4 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col z-50 border border-gray-200">
          <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <h3 className="font-semibold text-gray-900">Documentation assistant</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                docsURL={docsURL}
              />
            ))}

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
