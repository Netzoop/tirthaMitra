export interface TranslationRequest {
  text: string
  sourceLang: string
  targetLang: string
}

export interface TranslationResponse {
  translatedText: string
  error?: string
}

// Language codes mapping for Bhashini
export const BHASHINI_LANG_CODES = {
  en: "en",
  hi: "hi",
} as const

export class BhashiniService {
  private apiKey: string
  private userId: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.BHASHINI_API_KEY || ""
    this.userId = process.env.BHASHINI_USER_ID || ""
    this.baseUrl = process.env.BHASHINI_BASE_URL || "https://meity-auth.ulcacontrib.org"
  }

  // Step 1: Pipeline Search - Find available translation models
  async searchPipeline(sourceLang: string, targetLang: string) {
    const response = await fetch(`${this.baseUrl}/pipeline/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        pipelineTasks: [
          {
            taskType: "translation",
            config: {
              language: {
                sourceLanguage: sourceLang,
                targetLanguage: targetLang,
              },
            },
          },
        ],
        pipelineRequestConfig: {
          pipelineId: "64392f96daac500b55c543cd",
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Pipeline search failed: ${response.statusText}`)
    }

    return response.json()
  }

  // Step 2: Pipeline Config - Get configuration for the selected pipeline
  async getPipelineConfig(pipelineId: string) {
    const response = await fetch(`${this.baseUrl}/pipeline/config`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        pipelineId,
      }),
    })

    if (!response.ok) {
      throw new Error(`Pipeline config failed: ${response.statusText}`)
    }

    return response.json()
  }

  // Step 3: Pipeline Compute - Perform the actual translation
  async translateWithBhashini(request: TranslationRequest): Promise<TranslationResponse> {
    try {
      // Implementation would include the full 3-step pipeline here

      // For now, return mock response - replace with actual Bhashini calls
      return {
        translatedText: request.text,
        error: "Bhashini API integration pending - using mock response",
      }
    } catch (error) {
      console.error("Bhashini translation error:", error)
      return {
        translatedText: request.text,
        error: error instanceof Error ? error.message : "Translation failed",
      }
    }
  }
}

let bhashiniService: BhashiniService | null = null

export function getBhashiniService(): BhashiniService {
  if (!bhashiniService) {
    bhashiniService = new BhashiniService()
  }
  return bhashiniService
}
