import axios, { AxiosInstance } from "axios";
import { z } from "zod";

// Request schemas
const ImageGenerateRequestSchema = z.object({
  positivePrompt: z.string(),
  model: z.string(),
  scheduler: z.string().optional(),
  negativePrompt: z.string().optional(),
  seed: z.number().optional(),
  steps: z.number().optional(),
  checkNSFW: z.boolean().optional(),
  seedImage: z.string().optional(),
  maskImage: z.string().optional(),
  strength: z.number().optional(),
  height: z.number().optional(),
  width: z.number().optional(),
  CFGScale: z.number().optional(),
  clipSkip: z.number().optional(),
  usePromptWeighting: z.boolean().optional(),
  promptWeighting: z.string().optional(),
  numberResults: z.number().optional(),
  outputType: z.string().optional(),
  outputFormat: z.string().optional(),
  includeCost: z.boolean().optional(),
  customTaskUUID: z.string().optional(),
});

const UpscaleRequestSchema = z.object({
  image_url: z.string(),
});

const BackgroundRemovalRequestSchema = z.object({
  image_url: z.string(),
});

const DecorPrimeWallsRequestSchema = z.object({
  prompt: z.string(),
});

const DecorImageRequestSchema = z.object({
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

const FashionTryonRequestSchema = z.object({
  modelId: z.string(),
  model: z.string(),
  task_type: z.string(),
  input: z.object({
    model_input: z.string(),
    dress_input: z.string().optional(),
    upper_input: z.string().optional(),
    lower_input: z.string().optional(),
  }),
});

const FashionModelRequestSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  age: z.string(),
  gender: z.string(),
  bodyType: z.string(),
  ethnicity: z.string(),
  style: z.string(),
  prompt: z.string().optional(),
});

const FashionModelPromptRequestSchema = z.object({
  systemPrompt: z.string().optional(),
  prompt: z.string(),
  model: z.string(),
});

const ImageTaskRequestSchema = z.object({
  model: z.string(),
  task_type: z.string(),
  input: z.unknown(),
});
// Types
export type ImageGenerateRequest = z.infer<typeof ImageGenerateRequestSchema>;
export type UpscaleRequest = z.infer<typeof UpscaleRequestSchema>;
export type BackgroundRemovalRequest = z.infer<
  typeof BackgroundRemovalRequestSchema
>;
export type DecorPrimeWallsRequest = z.infer<
  typeof DecorPrimeWallsRequestSchema
>;
export type DecorImageRequest = z.infer<typeof DecorImageRequestSchema>;
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

export type FashionTryonRequest = z.infer<typeof FashionTryonRequestSchema>;
export type FashionModelRequest = z.infer<typeof FashionModelRequestSchema>;
export type ImageTaskRequest = z.infer<typeof ImageTaskRequestSchema>;
export type FashionModelPromptRequest = z.infer<
  typeof FashionModelPromptRequestSchema
>;
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
   * Generate image
   */
  async imgGenerate(request: ImageGenerateRequest) {
    const validatedData = ImageGenerateRequestSchema.parse(request);
    return this.makeRequest("POST", "img/generate", validatedData);
  }

  /**
   * Upscale an image
   */
  async upscaleImage(request: UpscaleRequest) {
    const validatedData = UpscaleRequestSchema.parse(request);
    return this.makeRequest("POST", "img/upscale", validatedData);
  }

  /**
   * Remove background from an image
   */
  async removeBackground(request: BackgroundRemovalRequest) {
    const validatedData = BackgroundRemovalRequestSchema.parse(request);
    return this.makeRequest("POST", "img/bkg-removal", validatedData);
  }

  /**
   * Generate prime walls
   */
  async generateDecorPrimeWalls(request: DecorPrimeWallsRequest) {
    const validatedData = DecorPrimeWallsRequestSchema.parse(request);
    return this.makeRequest("POST", "img/prime-walls", validatedData);
  }

  /**
   * Generate interior decoration images
   */
  async generateDecorImage(request: DecorImageRequest) {
    const validatedData = DecorImageRequestSchema.parse(request);
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
   * Create a new fashion tryon
   */
  async createFashionTryon(request: FashionTryonRequest) {
    return this.makeRequest("POST", "fashion-tryon", request);
  }

  /**
   * Get all fashion tryons
   */
  async getFashionTryons() {
    return this.makeRequest("GET", "fashion-tryon");
  }

  /**
   * Get a specific fashion tryon
   */
  async getFashionTryon(id: string) {
    return this.makeRequest("GET", `fashion-tryon/${id}`);
  }

  /**
   * Create a new fashion model
   */
  async createFashionModel(request: FashionModelRequest) {
    return this.makeRequest("POST", "fashion-model", request);
  }

  /**
   * Regenerate a fashion model
   */
  async regenerateFashionModel(id: string) {
    return this.makeRequest("POST", `fashion-model/regenerate/${id}`);
  }

  /**
   * Get all fashion models
   */
  async getFashionModels() {
    return this.makeRequest("GET", "fashion-model");
  }

  /**
   * Get a specific fashion model
   */
  async getFashionModel(id: string) {
    return this.makeRequest("GET", `fashion-model/${id}`);
  }

  /**
   * Delete a specific fashion model
   */
  async deleteFashionModel(id: string) {
    return this.makeRequest("DELETE", `fashion-model/${id}`);
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

  /**
   * Get a specific image task
   */
  async getImageTask(id: string) {
    return this.makeRequest("GET", `img/task/${id}`);
  }

  /**
   * Create a new image task
   */
  async createImageTask(request: ImageTaskRequest) {
    const validatedData = ImageTaskRequestSchema.parse(request);
    return this.makeRequest("POST", "img/midjourney", validatedData);
  }

  /**
   * Generate a random fashion model prompt
   */
  async generateFashionModelPrompt(prompt: FashionModelPromptRequest) {
    const validatedData = FashionModelPromptRequestSchema.parse(prompt);
    return this.makeRequest("POST", "fashion-model/prompt", validatedData);
  }

  /**
   * Load a random fashion model prompt
   */
  async loadRandomFashionModelPrompt() {
    return this.makeRequest("GET", "fashion-model/prompt/random");
  }
}
