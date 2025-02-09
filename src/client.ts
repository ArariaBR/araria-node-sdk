import axios, { AxiosInstance } from "axios";
import { z } from "zod";

// Request schemas
const RunwareRequestSchema = z.object({
  prompt: z.string(),
  negative_prompt: z.string().optional(),
});

const UpscaleRequestSchema = z.object({
  image_url: z.string(),
});

const BackgroundRemovalRequestSchema = z.object({
  image_url: z.string(),
});

const Decor8PrimeWallsRequestSchema = z.object({
  prompt: z.string(),
});

const Decor8ImageRequestSchema = z.object({
  prompt: z.string(),
});

const ChatRequestSchema = z.object({
  message: z.string(),
  session_id: z.string().optional(),
});

// Types
type RunwareRequest = z.infer<typeof RunwareRequestSchema>;
type UpscaleRequest = z.infer<typeof UpscaleRequestSchema>;
type BackgroundRemovalRequest = z.infer<typeof BackgroundRemovalRequestSchema>;
type Decor8PrimeWallsRequest = z.infer<typeof Decor8PrimeWallsRequestSchema>;
type Decor8ImageRequest = z.infer<typeof Decor8ImageRequestSchema>;
type ChatRequest = z.infer<typeof ChatRequestSchema>;

export interface ArariaClientConfig {
  apiKey: string;
  baseUrl?: string;
}

export class ArariaClient {
  private client: AxiosInstance;

  constructor(config: ArariaClientConfig) {
    const baseURL = config.baseUrl || "https://prod-api.araria.com.br";

    this.client = axios.create({
      baseURL: baseURL.replace(/\/$/, ""),
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
    });
  }

  private async makeRequest<T>(
    method: string,
    endpoint: string,
    data?: unknown
  ): Promise<T> {
    const response = await this.client.request({
      method,
      url: `/araria/${endpoint}`,
      data,
    });
    return response.data;
  }

  /**
   * Generate images using Runware
   */
  async generateRunware(request: RunwareRequest) {
    const validatedData = RunwareRequestSchema.parse(request);
    return this.makeRequest("POST", "runware/generate", validatedData);
  }

  /**
   * Upscale an image using Runware
   */
  async upscaleImage(request: UpscaleRequest) {
    const validatedData = UpscaleRequestSchema.parse(request);
    return this.makeRequest("POST", "runware/upscale", validatedData);
  }

  /**
   * Remove background from an image using Runware
   */
  async removeBackground(request: BackgroundRemovalRequest) {
    const validatedData = BackgroundRemovalRequestSchema.parse(request);
    return this.makeRequest(
      "POST",
      "runware/background-removal",
      validatedData
    );
  }

  /**
   * Generate prime walls using Decor8
   */
  async generateDecor8PrimeWalls(request: Decor8PrimeWallsRequest) {
    const validatedData = Decor8PrimeWallsRequestSchema.parse(request);
    return this.makeRequest("POST", "decor8/prime-walls", validatedData);
  }

  /**
   * Generate interior decoration images using Decor8
   */
  async generateDecor8Image(request: Decor8ImageRequest) {
    const validatedData = Decor8ImageRequestSchema.parse(request);
    return this.makeRequest("POST", "decor8/image", validatedData);
  }

  /**
   * Get available models
   */
  async getModels() {
    return this.makeRequest("GET", "models");
  }

  /**
   * Chat with the model
   */
  async chat(request: ChatRequest) {
    const validatedData = ChatRequestSchema.parse(request);
    return this.makeRequest("POST", "chat", validatedData);
  }

  /**
   * Initialize a new chat session
   */
  async initChatSession() {
    return this.makeRequest("POST", "chat/init");
  }

  /**
   * Get messages for a specific chat session
   */
  async getSessionMessages(sessionId: string) {
    return this.makeRequest("GET", `chat/session/${sessionId}`);
  }
}
