import * as vscode from 'vscode';
import { YouTubeService, SearchResultItem, FlashcardItem } from './services/youtubeService';

export interface VideoSearchResult {
    id: string;
    title: string;
    channelTitle: string;
    description: string;
    publishedAt: string;
    thumbnailUrl?: string;
}

export interface VideoAnalysis {
    title: string;
    channelTitle: string;
    description?: string;
    duration?: string;
    viewCount?: number;
    likeCount?: number;
    summary?: {
        brief: string;
        detailed: string;
        keyPoints: string[];
        topics: string[];
    };
    concepts?: {
        concepts: Array<{
            name: string;
            type: string;
            definition?: string;
            mentions: number;
        }>;
        difficulty: string;
        prerequisites: string[];
    };
    quality?: {
        overall: number;
        clarity: number;
        depth: number;
        structure: number;
        engagement: number;
    };
}

export interface Flashcard {
    id: string;
    front: string;
    back: string;
    difficulty: string;
    type?: string;
    tags?: string[];
}

export interface QuotaStatus {
    used: number;
    limit: number;
    remaining: number;
    resetsAt: string;
}

/**
 * YouTube MCP Client
 * 
 * Self-sufficient client that uses the youtube-mcp-tools library directly.
 * No external MCP server required - all functionality runs within the extension.
 */
export class YouTubeMcpClient {
    private outputChannel: vscode.OutputChannel;
    private youtubeService: YouTubeService;

    constructor(outputChannel: vscode.OutputChannel) {
        this.outputChannel = outputChannel;
        this.youtubeService = new YouTubeService(outputChannel);
        this.outputChannel.appendLine('YouTube MCP Client initialized (self-sufficient mode)');
    }

    /**
     * Initialize storage for quota persistence and secure API key storage
     */
    initializeStorage(context: vscode.ExtensionContext): void {
        this.youtubeService.initializeStorage(context);
    }

    /**
     * Set API key securely
     */
    async setApiKey(apiKey: string): Promise<void> {
        await this.youtubeService.setApiKey(apiKey);
    }

    /**
     * Validate API key
     */
    async validateApiKey(apiKey: string): Promise<{ valid: boolean; error?: string }> {
        return await this.youtubeService.validateApiKey(apiKey);
    }

    /**
     * Check if API key is configured
     */
    async hasApiKey(): Promise<boolean> {
        try {
            await this.youtubeService.getApiKey();
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Search for YouTube videos
     */
    async search(query: string, maxResults: number = 10): Promise<VideoSearchResult[]> {
        this.outputChannel.appendLine(`Searching for: "${query}"`);
        
        try {
            const results = await this.youtubeService.search(query, maxResults);
            return results.map((r: SearchResultItem) => ({
                id: r.id,
                title: r.title,
                channelTitle: r.channelTitle,
                description: r.description,
                publishedAt: r.publishedAt,
                thumbnailUrl: r.thumbnailUrl
            }));
        } catch (error) {
            this.outputChannel.appendLine(`Search error: ${error}`);
            throw error;
        }
    }

    /**
     * Analyze a YouTube video
     */
    async analyzeVideo(videoId: string): Promise<VideoAnalysis> {
        this.outputChannel.appendLine(`Analyzing video: ${videoId}`);
        
        try {
            const analysis = await this.youtubeService.analyzeVideo(videoId);
            return {
                title: analysis.title,
                channelTitle: analysis.channelTitle,
                description: analysis.description,
                duration: analysis.duration,
                viewCount: analysis.viewCount,
                likeCount: analysis.likeCount,
                summary: {
                    brief: analysis.summary.brief,
                    detailed: analysis.summary.detailed,
                    keyPoints: analysis.summary.keyPoints,
                    topics: analysis.summary.topics
                },
                concepts: {
                    concepts: analysis.concepts.concepts.map(c => ({
                        name: c.name,
                        type: c.type,
                        definition: c.definition,
                        mentions: c.mentions
                    })),
                    difficulty: analysis.concepts.difficulty,
                    prerequisites: analysis.concepts.prerequisites
                },
                quality: {
                    overall: analysis.quality.overall,
                    clarity: analysis.quality.clarity,
                    depth: analysis.quality.depth,
                    structure: analysis.quality.structure,
                    engagement: analysis.quality.engagement
                }
            };
        } catch (error) {
            this.outputChannel.appendLine(`Analysis error: ${error}`);
            throw error;
        }
    }

    /**
     * Get video transcript
     */
    async getTranscript(videoId: string): Promise<string> {
        this.outputChannel.appendLine(`Getting transcript for: ${videoId}`);
        
        try {
            return await this.youtubeService.getFormattedTranscript(videoId);
        } catch (error) {
            this.outputChannel.appendLine(`Transcript error: ${error}`);
            throw error;
        }
    }

    /**
     * Generate flashcards from video content
     */
    async generateFlashcards(videoId: string): Promise<Flashcard[]> {
        this.outputChannel.appendLine(`Generating flashcards for: ${videoId}`);
        
        try {
            const flashcards = await this.youtubeService.generateFlashcards(videoId);
            return flashcards.map((f: FlashcardItem) => ({
                id: f.id,
                front: f.front,
                back: f.back,
                difficulty: f.difficulty,
                type: f.type,
                tags: f.tags
            }));
        } catch (error) {
            this.outputChannel.appendLine(`Flashcard error: ${error}`);
            throw error;
        }
    }

    /**
     * Get API quota status
     */
    async getQuotaStatus(): Promise<QuotaStatus> {
        const quota = this.youtubeService.getQuotaStatus();
        return {
            used: quota.used,
            limit: quota.limit,
            remaining: quota.remaining,
            resetsAt: quota.resetsAt
        };
    }

    /**
     * Reset the quota counter
     */
    resetQuota(): void {
        this.youtubeService.resetQuotaCounter();
    }
}
