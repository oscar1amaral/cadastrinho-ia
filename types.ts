
export interface FilePreview {
  file: File;
  previewUrl: string;
  type: 'image' | 'pdf';
}

export interface WebhookResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface AnalysisResult {
  summary: string;
  detectedItems: string[];
}
