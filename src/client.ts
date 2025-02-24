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
  model: z.string(),
  prompt: z.string(),
  stream: z.boolean(),
  temperature: z.number(),
  user: z.number(),
  access_token: z.string(),
  sessionId: z.string(),
});

const FashionVideoRequestSchema = z.object({
  inputImages: z.array(z.string()),
  visionDescriptions: z.array(z.string()),
  prompts: z.array(z.string()),
  theme: z.string(),
  dimension: z.string(),
  videosPerImage: z.number(),
  videoUrls: z.array(z.string()).optional(),
  selectedVideoUrls: z.array(z.string()).optional(),
  bgColor: z.string().optional(),
  musicPath: z.string().optional(),
  logoPath: z.string().optional(),
  audioStartAt: z.number().optional(),
});

const FashionVideoResponseSchema = z.object({
  id: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  inputImages: z.array(z.string()),
  visionDescriptions: z.array(z.string()),
  prompts: z.array(z.string()),
  theme: z.string(),
  dimension: z.string(),
  videosPerImage: z.number(),
  videoUrls: z.array(z.string()),
  selectedVideoUrls: z.array(z.string()),
  videoOutputPath: z.string().optional(),
  videoOutputFileId: z.string().optional(),
  bgColor: z.string().optional(),
  musicPath: z.string().optional(),
  logoPath: z.string().optional(),
  audioStartAt: z.number().optional(),
  tasks: z.array(z.unknown()).optional(),
  watermark: z.boolean().optional(),
});

const NuvemshopUserDtoSchema = z.object({
  storeId: z.number(),
  accessToken: z.string(),
  tokenType: z.string(),
  scope: z.string(),
});

const NuvemshopConnectDtoSchema = z.object({
  storeId: z.number(),
  arariaApiKey: z.string(),
});

const NuvemshopUserSchema = z.object({
  user_id: z.number(),
});

const VisionImageToTextRequestSchema = z.object({
  image: z.string(),
  model: z.string(),
});

const PromptGenerateRequestSchema = z.object({
  systemPrompt: z.string(),
  description: z.string(),
  model: z.string(),
});

const VisionImageToTextResponseSchema = z.string();
const PromptGenerateResponseSchema = z.string();

// Types
export type RunwareRequest = z.infer<typeof RunwareRequestSchema>;
export type UpscaleRequest = z.infer<typeof UpscaleRequestSchema>;
export type BackgroundRemovalRequest = z.infer<
  typeof BackgroundRemovalRequestSchema
>;
export type Decor8PrimeWallsRequest = z.infer<
  typeof Decor8PrimeWallsRequestSchema
>;
export type Decor8ImageRequest = z.infer<typeof Decor8ImageRequestSchema>;
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type FashionVideoRequest = z.infer<typeof FashionVideoRequestSchema>;
export type NuvemshopUserDto = z.infer<typeof NuvemshopUserDtoSchema>;
export type NuvemshopConnectDto = z.infer<typeof NuvemshopConnectDtoSchema>;
export type NuvemshopUser = z.infer<typeof NuvemshopUserSchema>;
export type VisionImageToTextRequest = z.infer<
  typeof VisionImageToTextRequestSchema
>;
export type PromptGenerateRequest = z.infer<typeof PromptGenerateRequestSchema>;
export type VisionImageToTextResponse = z.infer<
  typeof VisionImageToTextResponseSchema
>;
export type PromptGenerateResponse = z.infer<
  typeof PromptGenerateResponseSchema
>;
export type FashionVideoResponse = z.infer<typeof FashionVideoResponseSchema>;
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
        "x-araria-key": config.apiKey,
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
      url: `/${endpoint}`,
      data,
    });
    return response.data;
  }

  /**
   * Generate images using Runware
   */
  async generateRunware(request: RunwareRequest) {
    const validatedData = RunwareRequestSchema.parse(request);
    return this.makeRequest("POST", "img/generate", validatedData);
  }

  /**
   * Upscale an image using Runware
   */
  async upscaleImage(request: UpscaleRequest) {
    const validatedData = UpscaleRequestSchema.parse(request);
    return this.makeRequest("POST", "img/upscale", validatedData);
  }

  /**
   * Remove background from an image using Runware
   */
  async removeBackground(request: BackgroundRemovalRequest) {
    const validatedData = BackgroundRemovalRequestSchema.parse(request);
    return this.makeRequest("POST", "img/bkg-removal", validatedData);
  }

  /**
   * Generate prime walls using Decor8
   */
  async generateDecor8PrimeWalls(request: Decor8PrimeWallsRequest) {
    const validatedData = Decor8PrimeWallsRequestSchema.parse(request);
    return this.makeRequest("POST", "img/prime-walls", validatedData);
  }

  /**
   * Generate interior decoration images using Decor8
   */
  async generateDecor8Image(request: Decor8ImageRequest) {
    const validatedData = Decor8ImageRequestSchema.parse(request);
    return this.makeRequest("POST", "img/virtual-staging", validatedData);
  }

  /**
   * Get available models
   */
  async getModels() {
    return this.makeRequest("GET", "models");
  }

  /**
   * Connect the Nuvemshop app to the Araria app
   */
  async nuvemshopConnect(request: NuvemshopConnectDto) {
    const validatedData = NuvemshopConnectDtoSchema.parse(request);
    return this.makeRequest("POST", "nuvemshop/connect", validatedData);
  }

  /**
   * Get the Nuvemshop user
   */
  async nuvemshopUser(storeId: number, TCS: string) {
    return this.makeRequest("GET", `nuvemshop/user/${storeId}/${TCS}`);
  }

  /**
   * Chat with the model
   */
  async nuvemshopChat(request: ChatRequest) {
    console.log("nuvemshopChat", request);
    const validatedData = ChatRequestSchema.parse(request);
    console.log("validatedData", validatedData);
    return this.makeRequest("POST", "nuvemshop/chat", validatedData);
  }

  /**
   * Initialize a new chat session
   */
  async nuvemshopInitChatSession() {
    return this.makeRequest("POST", "nuvemshop/chat/init");
  }

  /**
   * Get messages for a specific chat session
   */
  async nuvemshopGetSessionMessages(sessionId: string) {
    return this.makeRequest("GET", `nuvemshop/chat/session/${sessionId}`);
  }

  /**
   * Delete a chat session
   */
  async nuvemshopDeleteSession(sessionId: string) {
    return this.makeRequest("DELETE", `nuvemshop/chat/session/${sessionId}`);
  }

  /**
   * File upload
   */
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return this.makeRequest("POST", "files/upload", formData);
  }

  /**
   * Delete a file
   */
  async deleteFile(id: string) {
    return this.makeRequest("DELETE", `files/${id}`);
  }

  /**
   * Vision
   */
  async visionImageToText(
    request: VisionImageToTextRequest
  ): Promise<VisionImageToTextResponse> {
    const validatedData = VisionImageToTextRequestSchema.parse(request);
    return this.makeRequest("POST", "vision/img-to-text", validatedData);
  }

  /**
   * LLM
   */
  async promptGenerate(
    request: PromptGenerateRequest
  ): Promise<PromptGenerateResponse> {
    const validatedData = PromptGenerateRequestSchema.parse(request);
    return this.makeRequest("POST", "llm/prompt-generate", validatedData);
  }

  /**
   * Get all fashion videos
   */
  async getFashionVideos() {
    return this.makeRequest("GET", "fashion-video");
  }

  /**
   * Get a specific fashion video
   */
  async getFashionVideo(id: string): Promise<FashionVideoResponse> {
    return this.makeRequest("GET", `fashion-video/${id}`);
  }

  /**
   * Create a new fashion video
   */
  async createFashionVideo(request: FashionVideoRequest) {
    const validatedData = FashionVideoRequestSchema.parse(request);
    return this.makeRequest("POST", "fashion-video", validatedData);
  }

  /**
   *  Create video generation task
   *
   * @param request
   * @returns
   */
  async createFashionVideoTask(fashionVideoId: string) {
    return this.makeRequest("POST", `fashion-video/generate/${fashionVideoId}`);
  }

  /**
   * Update a fashion video
   */
  async updateFashionVideo(
    fashionVideoId: string,
    request: FashionVideoRequest
  ) {
    return this.makeRequest("PUT", `fashion-video/${fashionVideoId}`, request);
  }

  /**
   * Finalize a fashion video
   */
  async finalizeFashionVideo(fashionVideoId: string) {
    return this.makeRequest("POST", `fashion-video/finalize/${fashionVideoId}`);
  }

  /**
   * Get all files
   */
  async getFiles() {
    return this.makeRequest("GET", "files");
  }

  /**
   * Get a specific file
   */
  async getFile(id: string) {
    return this.makeRequest("GET", `files/${id}`);
  }
}
