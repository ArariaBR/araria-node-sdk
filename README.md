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
  baseUrl: "https://prod-api.araria.com.br", // Optional, defaults to prod URL
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

// Generate Decor8 Image (Virtual Staging)
const decor8Image = await client.generateDecor8Image({
  prompt: "your prompt",
});

// Get available models
const models = await client.getModels();

// Nuvemshop Integration
const connected = await client.nuvemshopConnect({
  storeId: 123,
  arariaApiKey: "your-api-key",
});

const user = await client.nuvemshopUser(123, "TCS-value");

const chatResponse = await client.nuvemshopChat({
  model: "model-name",
  prompt: "your message",
  stream: false,
  temperature: 0.7,
  user: 123,
  access_token: "your-token",
  sessionId: "session-id",
});

const session = await client.nuvemshopInitChatSession();
const messages = await client.nuvemshopGetSessionMessages("session-id");
await client.nuvemshopDeleteSession("session-id");

// File Management
const uploadedFile = await client.uploadFile(fileObject);
const files = await client.getFiles();
const file = await client.getFile("file-id");
await client.deleteFile("file-id");

// Vision & LLM
const visionResult = await client.visionImageToText({
  image: "image-data",
  model: "model-name",
});

const promptResult = await client.promptGenerate({
  systemPrompt: "your-system-prompt",
  description: "your-description",
});

// Fashion Video
const videos = await client.getFashionVideos();
const video = await client.getFashionVideo("video-id");

const newVideo = await client.createFashionVideo({
  inputImages: ["url1", "url2"],
  visionDescriptions: ["desc1", "desc2"],
  prompts: ["prompt1", "prompt2"],
  theme: "your-theme",
  dimension: "dimension",
  videosPerImage: 1,
  bgColor: "#FFFFFF", // Optional
  musicPath: "path/to/music", // Optional
  logoPath: "path/to/logo", // Optional
  audioStartAt: 0, // Optional
});

await client.createFashionVideoTask("video-id");
await client.updateFashionVideo("video-id", videoUpdateData);
await client.finalizeFashionVideo("video-id");
```

## Features

- Full TypeScript support with Zod validation
- Promise-based API
- Comprehensive error handling
- All Araria API endpoints supported:
  - Image generation with Runware
  - Image upscaling
  - Background removal
  - Decor8 Prime Walls generation
  - Decor8 Virtual Staging
  - Nuvemshop integration
  - File management
  - Vision and LLM capabilities
  - Fashion video generation and management
  - Model listing

## Requirements

- Node.js 14+
- TypeScript 4.5+ (for TypeScript users)

## License

MIT License
