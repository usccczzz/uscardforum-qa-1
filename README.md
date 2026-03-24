# USCardForum QA Bot

Tampermonkey userscript that embeds an AI-powered QA bot on [USCardForum](https://www.uscardforum.com). Uses Gemini 3.1 Pro via the Vercel AI SDK to answer questions by querying the forum's Discourse API in real-time.

## Architecture

```
src/
  main.js           Entry point - wires settings, agent, and UI
  settings.js       Persistent settings via GM_getValue/GM_setValue
  http.js           GM_xmlhttpRequest wrapper for forum API calls
  forum-api.js      10 Discourse API tool functions
  tools.js          Zod-schema tool definitions for Vercel AI SDK
  agent.js          ToolLoopAgent with @ai-sdk/google provider
  markdown.js       Lightweight markdown-to-HTML renderer
  ui.js             Floating chat panel (shadow DOM isolated)
  system-prompt.js  System prompt for the AI agent
```

The source modules are bundled by esbuild into a single `dist/uscardforum-qa.user.js` (~550KB minified) that can be installed directly in Tampermonkey.

## Stack

- **[Vercel AI SDK](https://ai-sdk.dev)** (`ai` v6) - Agent loop with `ToolLoopAgent`, parallel tool execution, streaming
- **[@ai-sdk/google](https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai)** - Gemini provider handling all protocol details
- **[Zod](https://zod.dev)** - Tool input schema validation
- **[esbuild](https://esbuild.github.io)** - Bundler (dev dependency only)

## Setup

```bash
npm install
```

## Build

```bash
# Production (minified)
npm run build

# Development (watch mode, sourcemaps)
npm run dev
```

Output: `dist/uscardforum-qa.user.js`

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) in your browser
2. Run `npm run build`
3. Open `dist/uscardforum-qa.user.js` in your browser, or create a new Tampermonkey script and paste its contents
4. Navigate to https://www.uscardforum.com - the bot toggle button appears in the bottom-right corner

## Usage

1. Click the blue chat button (bottom-right) to open the QA panel
2. (Optional) Click the gear icon to configure your API key and model
3. Type a question about USCardForum and press Enter
4. The bot searches the forum, reads topics, and synthesizes an answer with source references

## Tools Available to the Agent

| Tool | Description |
|------|-------------|
| `search_forum` | Full-text search with Discourse operators |
| `get_hot_topics` | Currently trending topics |
| `get_new_topics` | Latest topics by creation time |
| `get_top_topics` | Top topics by period (daily/weekly/monthly/yearly) |
| `get_topic_posts` | Read posts from a specific topic |
| `get_categories` | List all forum categories |
| `get_user_summary` | User profile and stats |
| `get_user_topics` | Topics created by a user |
| `get_user_replies` | Replies posted by a user |
| `get_user_actions` | User activity feed with filters |

## Configuration

Default settings (editable in the UI):

- **API Key**: Pre-configured Gemini API key
- **Model**: `gemini-3.1-pro-preview`

Settings persist across page reloads via Tampermonkey's `GM_setValue`.
