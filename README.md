# Mintlify assistant embed example

A working example of embedding the Mintlify assistant widget into a Vite app. This example demonstrates how to integrate the assistant via the API.

See [Tutorial: Build an in-app documentation assistant](https://wwww.mintlify.com/docs/guides/assistant-embed) or step-by-step instructions to embed and customize the widget.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and add your Mintlify assistant API token:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and replace `mint_dsc_your_token_here` with your actual token from the [Mintlify dashboard](https://dashboard.mintlify.com/settings/organization/api-keys).

3. Update `src/config.js` with your Mintlify project details:
   - Replace `domain="your-domain"` with your project domain (the last part of your dashboard URL `https://dashboard.mintlify.com/org-name/your-domain`).
   - Replace `docsURL="https://yourdocs.mintlify.app"` with your documentation site URL.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the URL shown in your terminal (usually `http://localhost:5173`)

## Testing

1. Click the "Ask" button to open the assistant widget.
2. Ask a question about your documentation.

## Project structure

```
├── src/
│   ├── components/
│   │   └── AssistantWidget.jsx    # The reusable widget component (copy to your project)
│   ├── App.css                    # App stylesintegration
│   ├── App.jsx                    # Example app with widget 
│   ├── index.css                  # Global styles (includes Tailwind imports)
│   └── main.jsx                   # React entry point
├── .env.example                   # Template for environment variables
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── README.md                      # This file
└── vite.config.js                 # Vite configuration
```

## Key files to customize

- **`src/components/AssistantWidget.jsx`** - Copy this component into your project and reuse it
- **`src/App.jsx`** - Update `domain` and `docsURL` props with your Mintlify project details
- **`.env`** - Add your assistant API token (not committed to git)
