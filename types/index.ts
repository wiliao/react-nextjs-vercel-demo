export interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  pinned: boolean;
}

export type CreateSnippetInput = Omit<Snippet, "id" | "createdAt" | "updatedAt">;
export type UpdateSnippetInput = Partial<CreateSnippetInput>;

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
