# Araria Node.js SDK

A TypeScript/JavaScript SDK for interacting with the Araria API.

## Installation

```bash
npm install araria-sdk
# or
yarn add araria-sdk
```

## Usage

```typescript
import { ArariaClient } from "araria-sdk";

// Initialize the client
const client = new ArariaClient({
  apiKey: "your-api-key",
  baseUrl: "http://your-api-url", // Optional, defaults to http://localhost:3000
});

// Generate images with Runware
const images = await client.generateRunware({
  prompt: "your prompt",
  negative_prompt: "your negative prompt", // Optional
});

// Upscale an image
const upscaledImage = await client.upscaleImage({
  image_url: "your-image-url",
});

// Remove background from an image
const noBackgroundImage = await client.removeBackground({
  image_url: "your-image-url",
});

// Generate Decor8 Prime Walls
const primeWalls = await client.generateDecor8PrimeWalls({
  prompt: "your prompt",
});

// Generate Decor8 Image
const decor8Image = await client.generateDecor8Image({
  prompt: "your prompt",
});

// Chat with the model
const chatResponse = await client.chat({
  message: "your message",
  session_id: "optional-session-id",
});

// Initialize a chat session
const session = await client.initChatSession();

// Get session messages
const messages = await client.getSessionMessages("your-session-id");

// Get available models
const models = await client.getModels();
```

## Features

- Full TypeScript support
- Request validation using Zod
- Promise-based API
- Comprehensive error handling
- All Araria API endpoints supported:
  - Image generation with Runware
  - Image upscaling
  - Background removal
  - Decor8 Prime Walls generation
  - Decor8 Image generation
  - Chat functionality
  - Session management
  - Model listing

## Requirements

- Node.js 14+
- TypeScript 4.5+ (for TypeScript users)

## License

MIT License
