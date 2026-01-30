# Mintlify assistant embed example

Working examples of embedding the Mintlify assistant widget: one using **Vite**, one using **Next.js**. Each demonstrates how to integrate the assistant via the API.

See [Tutorial: Build an in-app documentation assistant](https://www.mintlify.com/docs/guides/assistant-embed) for step-by-step instructions to embed and customize the widget.

## Choose an example

| Framework | Directory | Dev server |
|-----------|------------|------------|
| **Vite**  | `vite/`    | `http://localhost:5173` |
| **Next.js** | `nextjs/` | `http://localhost:3000` |

## Setup (either example)

1. **Pick a directory** and install dependencies:
   ```bash
   cd vite     # or  cd nextjs
   npm install
   ```

2. **Add your API token** in that directory:
   - **Vite:** Copy `vite/.env.example` to `vite/.env`. Set `VITE_MINTLIFY_TOKEN=...`
   - **Next.js:** Copy `nextjs/.env.example` to `nextjs/.env.local`. Set `NEXT_PUBLIC_MINTLIFY_TOKEN=...`

3. **Set your project in config:** Edit `src/config.js` inside that directory. Set `domain` (your Mintlify project slug) and `docsURL` (your docs site URL).

4. **Run the dev server:**
   ```bash
   npm run dev
   ```
   Then open the URL shown in the terminal.

## AI SDK version

Both examples use Vercel AI SDK v4. If you move to AI SDK v5, the `useChat` API and message types change; see the [AI SDK migration guide](https://ai-sdk.dev/docs/migration-guides/migration-guide-5-0).

## Repo structure

```
vite/          # Vite + React example
nextjs/        # Next.js App Router example
```

Each directory is a full app with its own `package.json`, config, and `src/`. Use one at a time from its directory.
