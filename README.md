# Mintlify assistant embed example

A working example of embedding the Mintlify assistant widget into a Next.js app. This example demonstrates how to integrate the assistant via the API.

See [Tutorial: Build an in-app documentation assistant](https://wwww.mintlify.com/docs/guides/assistant-embed) or step-by-step instructions to embed and customize the widget.

## AI SDK version requirements

This example uses Vercel AI SDK v4. If you upgrade to AI SDK v5, the `useChat` hook has significant breaking changes that require code updates:

- The `streamProtocol: 'data'` parameter is removed
- Message types have changed (UIMessage vs ModelMessage)
- Tool invocation handling has been redesigned

If you use AI SDK v5, refactor the `AssistantWidget.jsx` component to match the new API. For details on migrating to v5, see the [AI SDK migration guide](https://ai-sdk.dev/docs/migration-guides/migration-guide-5-0).

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and add your Mintlify assistant API token:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and replace `mint_dsc_your_token_here` with your actual token from the [Mintlify dashboard](https://dashboard.mintlify.com/settings/organization/api-keys).

3. Update `src/config.js` with your Mintlify project details:
   - Replace `domain: 'your-domain'` with your project domain (the last part of your dashboard URL `https://dashboard.mintlify.com/org-name/your-domain`).
   - Replace `docsURL: 'https://yourdocs.mintlify.app'` with your documentation site URL.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the URL shown in your terminal (usually `http://localhost:3000`)

## Testing

1. Click the "Ask" button to open the assistant widget.
2. Ask a question about your documentation.

## Project structure

```
src/
├── app/
│   ├── globals.css       # Global styles (Tailwind)
│   ├── layout.jsx        # Root layout
│   └── page.jsx          # Home page
├── config.js             # Configuration (domain and docsURL)
├── utils.js              # Helper functions for parsing suggestions and extracting sources
└── components/
    ├── AssistantWidget.jsx # Main widget component with chat state and API logic
    └── Message.jsx         # Individual message component for rendering user and assistant messages
```

## Key files to customize

- **`src/config.js`** - Update your Mintlify project domain and documentation URL
- **`src/components/AssistantWidget.jsx`** - Customize widget styling or behavior
- **`.env.local`** - Add your assistant API token (not committed to git)
