/**
 * YouTube Service
 * 
 * Self-sufficient YouTube API integration.
 * No external MCP server required - all functionality runs within the extension.
 * 
 * Uses direct YouTube Data API v3 calls and transcript extraction.
 */
import * as vscode from 'vscode';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// TYPES
// ============================================================================

export interface YouTubeSearchResult {
    id: string;
    type: string;
    title: string;
    description: string;
    channelId: string;
    channelTitle: string;
    publishedAt: string;
    thumbnailUrl: string;
}

export interface YouTubeVideo {
    id: string;
    title: string;
    description: string;
    channelId: string;
    channelTitle: string;
    publishedAt: string;
    thumbnailUrl: string;
    tags: string[];
    categoryId: string;
    duration: string;
    definition: string;
    caption: boolean;
    viewCount: number;
    likeCount: number;
    commentCount: number;
}

export interface TranscriptSegment {
    text: string;
    offset: number;
    duration: number;
}

export interface VideoTranscript {
    videoId: string;
    segments: TranscriptSegment[];
    fullText: string;
    language?: string;
}

export interface ContentSummary {
    brief: string;
    detailed: string;
    keyPoints: string[];
    topics: string[];
}

export interface ExtractedConcept {
    name: string;
    type: 'term' | 'technique' | 'tool' | 'person' | 'theory';
    definition?: string;
    mentions: number;
}

export interface ConceptExtraction {
    concepts: ExtractedConcept[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    prerequisites: string[];
}

export interface QualityAssessment {
    overall: number;
    clarity: number;
    depth: number;
    structure: number;
    engagement: number;
}

export interface VideoAnalysisResult {
    videoId: string;
    title: string;
    channelTitle: string;
    description: string;
    publishedAt: string;
    duration: string;
    viewCount: number;
    likeCount: number;
    commentCount: number;
    summary: ContentSummary;
    concepts: ConceptExtraction;
    quality: QualityAssessment;
}

export interface SearchResultItem {
    id: string;
    title: string;
    channelTitle: string;
    description: string;
    publishedAt: string;
    thumbnailUrl?: string;
}

export interface FlashcardItem {
    id: string;
    front: string;
    back: string;
    difficulty: 'easy' | 'medium' | 'hard';
    type: string;
    tags: string[];
}

export interface QuotaInfo {
    used: number;
    limit: number;
    remaining: number;
    resetsAt: string;
}

// ============================================================================
// YOUTUBE API RESPONSE TYPES
// ============================================================================

interface YouTubeApiThumbnail {
    url: string;
    width?: number;
    height?: number;
}

interface YouTubeApiThumbnails {
    default?: YouTubeApiThumbnail;
    medium?: YouTubeApiThumbnail;
    high?: YouTubeApiThumbnail;
    standard?: YouTubeApiThumbnail;
    maxres?: YouTubeApiThumbnail;
}

interface YouTubeApiSnippet {
    title?: string;
    description?: string;
    channelId?: string;
    channelTitle?: string;
    publishedAt?: string;
    thumbnails?: YouTubeApiThumbnails;
    tags?: string[];
    categoryId?: string;
}

interface YouTubeApiContentDetails {
    duration?: string;
    definition?: string;
    caption?: string;
}

interface YouTubeApiStatistics {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
}

interface YouTubeApiSearchItem {
    id?: { videoId?: string };
    snippet?: YouTubeApiSnippet;
}

interface YouTubeApiVideoItem {
    id?: string;
    snippet?: YouTubeApiSnippet;
    contentDetails?: YouTubeApiContentDetails;
    statistics?: YouTubeApiStatistics;
}

interface YouTubeApiSearchResponse {
    items?: YouTubeApiSearchItem[];
}

interface YouTubeApiVideoResponse {
    items?: YouTubeApiVideoItem[];
}

// ============================================================================
// YOUTUBE SERVICE
// ============================================================================

/**
 * Self-sufficient YouTube service that runs entirely within the extension.
 * 
 * Features:
 * - Secure API key storage via VS Code SecretStorage
 * - Automatic quota persistence across sessions
 * - Rate limiting with exponential backoff
 * - API key validation
 */
export class YouTubeService {
    private outputChannel: vscode.OutputChannel;
    private globalState: vscode.Memento | null = null;
    private secretStorage: vscode.SecretStorage | null = null;
    private quotaUsed: number = 0;
    private quotaResetDate: string = '';
    private readonly DAILY_QUOTA_LIMIT = 10000;
    private readonly API_BASE = 'https://www.googleapis.com/youtube/v3';
    
    // Rate limiting
    private readonly MAX_RETRIES = 3;
    private readonly BASE_DELAY_MS = 1000;
    private lastRequestTime: number = 0;
    private readonly MIN_REQUEST_INTERVAL_MS = 100; // 10 requests/second max

    constructor(outputChannel: vscode.OutputChannel) {
        this.outputChannel = outputChannel;
        this.log('YouTube Service initialized (self-sufficient mode)');
    }

    /**
     * Initialize with VS Code context for persistence and secure storage
     */
    initializeStorage(context: vscode.ExtensionContext): void {
        this.globalState = context.globalState;
        this.secretStorage = context.secrets;
        this.loadPersistedQuota();
        this.log('Storage initialized for quota persistence and secure API key storage');
    }

    private log(message: string): void {
        this.outputChannel.appendLine(`[YouTubeService] ${message}`);
    }

    /**
     * Load persisted quota from globalState
     */
    private loadPersistedQuota(): void {
        if (!this.globalState) { return; }
        
        const today = new Date().toISOString().split('T')[0];
        const savedDate = this.globalState.get<string>('quotaResetDate', '');
        
        if (savedDate === today) {
            this.quotaUsed = this.globalState.get<number>('quotaUsed', 0);
            this.log(`Loaded persisted quota: ${this.quotaUsed}/${this.DAILY_QUOTA_LIMIT}`);
        } else {
            // New day, reset quota
            this.quotaUsed = 0;
            this.quotaResetDate = today;
            this.saveQuota();
            this.log('Quota reset for new day');
        }
    }

    /**
     * Save quota to globalState
     */
    private saveQuota(): void {
        if (!this.globalState) { return; }
        
        const today = new Date().toISOString().split('T')[0];
        this.globalState.update('quotaUsed', this.quotaUsed);
        this.globalState.update('quotaResetDate', today);
    }

    /**
     * Get API key from secure storage, settings, .env file, or environment
     * Priority: SecretStorage > VS Code settings > .env file > environment variable
     */
    async getApiKey(): Promise<string> {
        // 1. Check SecretStorage first (most secure)
        if (this.secretStorage) {
            const secretKey = await this.secretStorage.get('youtubeMcp.apiKey');
            if (secretKey) {
                return secretKey;
            }
        }

        // 2. Check VS Code settings
        const config = vscode.workspace.getConfiguration('youtubeMcp');
        const settingsKey = config.get<string>('apiKey', '');
        if (settingsKey) {
            // Migrate to secure storage
            if (this.secretStorage) {
                await this.secretStorage.store('youtubeMcp.apiKey', settingsKey);
                this.log('Migrated API key to secure storage');
            }
            return settingsKey;
        }

        // 3. Check .env file in workspace
        const envKey = this.readEnvFile();
        if (envKey) {
            this.log('Using API key from .env file');
            return envKey;
        }

        // 4. Check process environment variable
        if (process.env.YOUTUBE_API_KEY) {
            this.log('Using API key from environment variable');
            return process.env.YOUTUBE_API_KEY;
        }

        throw new Error('YouTube API key not configured. Use "YouTube MCP: Set API Key" command or add to settings.');
    }

    /**
     * Store API key securely
     */
    async setApiKey(apiKey: string): Promise<void> {
        if (!this.secretStorage) {
            throw new Error('Secret storage not initialized');
        }
        await this.secretStorage.store('youtubeMcp.apiKey', apiKey);
        this.log('API key stored securely');
    }

    /**
     * Validate API key by making a test request
     */
    async validateApiKey(apiKey: string): Promise<{ valid: boolean; error?: string }> {
        try {
            const params = new URLSearchParams({
                part: 'snippet',
                q: 'test',
                type: 'video',
                maxResults: '1',
                key: apiKey
            });

            const url = `${this.API_BASE}/search?${params}`;
            await this.httpGet<unknown>(url);
            return { valid: true };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            if (message.includes('API key not valid') || message.includes('forbidden') || message.includes('403')) {
                return { valid: false, error: 'Invalid API key' };
            }
            if (message.includes('quota')) {
                return { valid: true, error: 'API key valid but quota exceeded' };
            }
            return { valid: false, error: message };
        }
    }

    /**
     * Read YOUTUBE_API_KEY from .env file in workspace root
     */
    private readEnvFile(): string | null {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            return null;
        }

        const envPath = path.join(workspaceFolders[0].uri.fsPath, '.env');
        
        try {
            if (!fs.existsSync(envPath)) {
                return null;
            }

            const content = fs.readFileSync(envPath, 'utf-8');
            const match = content.match(/^YOUTUBE_API_KEY=(.+)$/m);
            
            if (match && match[1]) {
                return match[1].trim();
            }
        } catch (error) {
            this.log(`Could not read .env file: ${error}`);
        }

        return null;
    }

    private trackQuota(cost: number): void {
        this.quotaUsed += cost;
        this.saveQuota();
        this.log(`Quota used: ${this.quotaUsed}/${this.DAILY_QUOTA_LIMIT}`);
        
        // Warn if approaching limit
        if (this.quotaUsed > this.DAILY_QUOTA_LIMIT * 0.8) {
            vscode.window.showWarningMessage(
                `YouTube API quota is ${Math.round(this.quotaUsed / this.DAILY_QUOTA_LIMIT * 100)}% used. Consider limiting requests.`
            );
        }
    }

    /**
     * Apply rate limiting - wait between requests
     */
    private async applyRateLimit(): Promise<void> {
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;
        
        if (timeSinceLastRequest < this.MIN_REQUEST_INTERVAL_MS) {
            const waitTime = this.MIN_REQUEST_INTERVAL_MS - timeSinceLastRequest;
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
        
        this.lastRequestTime = Date.now();
    }

    /**
     * Sleep helper for retry delays
     */
    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Make an HTTP GET request with retry logic and rate limiting
     */
    private async httpGet<T>(url: string): Promise<T> {
        await this.applyRateLimit();
        
        let lastError: Error | null = null;
        
        for (let attempt = 0; attempt < this.MAX_RETRIES; attempt++) {
            try {
                const result = await this.httpGetInternal<T>(url);
                return result;
            } catch (error) {
                lastError = error instanceof Error ? error : new Error(String(error));
                
                // Check if it's a retryable error
                const isRetryable = lastError.message.includes('429') || 
                                   lastError.message.includes('503') ||
                                   lastError.message.includes('ECONNRESET') ||
                                   lastError.message.includes('ETIMEDOUT');
                
                if (!isRetryable || attempt === this.MAX_RETRIES - 1) {
                    throw lastError;
                }
                
                // Exponential backoff
                const delay = this.BASE_DELAY_MS * Math.pow(2, attempt);
                this.log(`Request failed, retrying in ${delay}ms (attempt ${attempt + 1}/${this.MAX_RETRIES})`);
                await this.sleep(delay);
            }
        }
        
        throw lastError ?? new Error('Request failed after retries');
    }

    /**
     * Internal HTTP GET without retry logic
     */
    private httpGetInternal<T>(url: string): Promise<T> {
        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try {
                        if (res.statusCode && res.statusCode >= 400) {
                            const errorData = JSON.parse(data);
                            const errorMessage = errorData.error?.message || `HTTP ${res.statusCode}`;
                            reject(new Error(`${res.statusCode}: ${errorMessage}`));
                        } else {
                            resolve(JSON.parse(data) as T);
                        }
                    } catch (e) {
                        reject(e);
                    }
                });
            }).on('error', reject);
        });
    }

    /**
     * Search for YouTube videos
     */
    async search(query: string, maxResults: number = 10): Promise<SearchResultItem[]> {
        this.log(`Searching for: "${query}" (max: ${maxResults})`);
        
        try {
            const apiKey = await this.getApiKey();
            const params = new URLSearchParams({
                part: 'snippet',
                q: query,
                type: 'video',
                maxResults: String(maxResults),
                key: apiKey
            });

            const url = `${this.API_BASE}/search?${params}`;
            const response = await this.httpGet<YouTubeApiSearchResponse>(url);
            
            this.trackQuota(100); // Search costs 100 quota units

            return (response.items || []).map((item: YouTubeApiSearchItem) => ({
                id: item.id?.videoId || '',
                title: item.snippet?.title || '',
                channelTitle: item.snippet?.channelTitle || '',
                description: item.snippet?.description || '',
                publishedAt: item.snippet?.publishedAt || '',
                thumbnailUrl: item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url
            }));
        } catch (error) {
            this.log(`Search error: ${error}`);
            throw error;
        }
    }

    /**
     * Get detailed video information
     */
    async getVideoDetails(videoId: string): Promise<YouTubeVideo> {
        this.log(`Getting video details for: ${videoId}`);
        
        try {
            const apiKey = await this.getApiKey();
            const params = new URLSearchParams({
                part: 'snippet,contentDetails,statistics',
                id: videoId,
                key: apiKey
            });

            const url = `${this.API_BASE}/videos?${params}`;
            const response = await this.httpGet<YouTubeApiVideoResponse>(url);
            
            this.trackQuota(1); // Video details cost 1 unit per video

            if (!response.items || response.items.length === 0) {
                throw new Error(`Video not found: ${videoId}`);
            }

            const item = response.items[0];
            return {
                id: item.id || videoId,
                title: item.snippet?.title || '',
                description: item.snippet?.description || '',
                channelId: item.snippet?.channelId || '',
                channelTitle: item.snippet?.channelTitle || '',
                publishedAt: item.snippet?.publishedAt || '',
                thumbnailUrl: item.snippet?.thumbnails?.medium?.url || '',
                tags: item.snippet?.tags || [],
                categoryId: item.snippet?.categoryId || '',
                duration: item.contentDetails?.duration || '',
                definition: item.contentDetails?.definition || '',
                caption: item.contentDetails?.caption === 'true',
                viewCount: parseInt(item.statistics?.viewCount || '0', 10),
                likeCount: parseInt(item.statistics?.likeCount || '0', 10),
                commentCount: parseInt(item.statistics?.commentCount || '0', 10)
            };
        } catch (error) {
            this.log(`Video details error: ${error}`);
            throw error;
        }
    }

    /**
     * Get video transcript using YouTube's timedtext API
     */
    async getTranscript(videoId: string): Promise<VideoTranscript> {
        this.log(`Fetching transcript for: ${videoId}`);
        
        try {
            // First, get the video page to extract caption track info
            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
            const html = await this.fetchPage(videoUrl);
            
            // Extract caption tracks from the page
            const captionUrl = this.extractCaptionUrl(html);
            
            if (!captionUrl) {
                throw new Error('No captions available for this video');
            }

            // Fetch the transcript
            const transcriptXml = await this.fetchPage(captionUrl);
            const segments = this.parseTranscriptXml(transcriptXml);
            
            const fullText = segments.map(s => s.text).join(' ');
            
            this.log(`Transcript fetched: ${segments.length} segments`);
            
            return {
                videoId,
                segments,
                fullText,
                language: 'en'
            };
        } catch (error) {
            this.log(`Transcript error: ${error}`);
            throw error;
        }
    }

    private async fetchPage(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const protocol = url.startsWith('https') ? https : require('http') as typeof https;
            protocol.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            }, (res) => {
                // Handle redirects
                if (res.statusCode === 301 || res.statusCode === 302) {
                    const location = res.headers.location;
                    if (location) {
                        this.fetchPage(location).then(resolve).catch(reject);
                    } else {
                        reject(new Error('Redirect without location header'));
                    }
                    return;
                }
                let data = '';
                res.on('data', (chunk: Buffer | string) => data += chunk.toString());
                res.on('end', () => resolve(data));
            }).on('error', reject);
        });
    }

    private extractCaptionUrl(html: string): string | null {
        // Look for caption track in the player response
        const match = html.match(/"captionTracks":\s*\[(.*?)\]/);
        if (!match) { return null; }

        try {
            // Find the baseUrl in the caption tracks
            const urlMatch = match[1].match(/"baseUrl":\s*"([^"]+)"/);
            if (urlMatch) {
                // Decode and return the URL
                return urlMatch[1].replace(/\\u0026/g, '&').replace(/\\\//g, '/');
            }
        } catch {
            // Fallback: try to find timedtext URL directly
            const timedTextMatch = html.match(/https:\/\/www\.youtube\.com\/api\/timedtext[^"]+/);
            if (timedTextMatch) {
                return timedTextMatch[0].replace(/\\u0026/g, '&');
            }
        }

        return null;
    }

    private parseTranscriptXml(xml: string): TranscriptSegment[] {
        const segments: TranscriptSegment[] = [];
        const regex = /<text start="([\d.]+)" dur="([\d.]+)"[^>]*>([^<]*)<\/text>/g;
        
        let match;
        while ((match = regex.exec(xml)) !== null) {
            const text = this.decodeHtmlEntities(match[3]);
            segments.push({
                text: text.trim(),
                offset: parseFloat(match[1]),
                duration: parseFloat(match[2])
            });
        }
        
        return segments;
    }

    private decodeHtmlEntities(text: string): string {
        return text
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&apos;/g, "'")
            .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)));
    }

    /**
     * Get formatted transcript text
     */
    async getFormattedTranscript(videoId: string): Promise<string> {
        this.log(`Getting formatted transcript for: ${videoId}`);
        
        const transcript = await this.getTranscript(videoId);
        
        return transcript.segments.map(seg => {
            const time = this.formatTimestamp(seg.offset);
            return `[${time}] ${seg.text}`;
        }).join('\n');
    }

    private formatTimestamp(seconds: number): string {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        
        if (h > 0) {
            return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

    /**
     * Analyze a video comprehensively
     */
    async analyzeVideo(videoId: string): Promise<VideoAnalysisResult> {
        this.log(`Analyzing video: ${videoId}`);

        try {
            // Get video details
            const video = await this.getVideoDetails(videoId);
            
            // Get transcript
            let transcript: VideoTranscript;
            try {
                transcript = await this.getTranscript(videoId);
            } catch {
                // If transcript unavailable, create placeholder
                transcript = {
                    videoId,
                    segments: [],
                    fullText: video.description || 'No transcript available'
                };
            }
            
            // Generate analysis locally
            const summary = this.generateSummary(video, transcript);
            const concepts = this.extractConcepts(video, transcript);
            const quality = this.assessQuality(video, transcript);

            this.log(`Analysis complete for: ${video.title}`);

            return {
                videoId,
                title: video.title,
                channelTitle: video.channelTitle,
                description: video.description,
                publishedAt: video.publishedAt,
                duration: video.duration,
                viewCount: video.viewCount,
                likeCount: video.likeCount,
                commentCount: video.commentCount,
                summary,
                concepts,
                quality
            };
        } catch (error) {
            this.log(`Analysis error: ${error}`);
            throw error;
        }
    }

    /**
     * Generate content summary
     */
    private generateSummary(video: YouTubeVideo, transcript: VideoTranscript): ContentSummary {
        const text = transcript.fullText || video.description;
        
        // Extract sentences
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
        
        // Generate brief (first meaningful sentence or title-based)
        const brief = sentences[0]?.trim() || `Video about ${video.title}`;
        
        // Generate detailed summary (first few sentences)
        const detailed = sentences.slice(0, 5).join('. ').trim() + '.';
        
        // Extract key points (sentences with important indicators)
        const keyPointIndicators = /\b(important|key|main|first|second|third|step|tip|remember|note|crucial)\b/i;
        const keyPoints = sentences
            .filter(s => keyPointIndicators.test(s))
            .slice(0, 5)
            .map(s => s.trim());
        
        // If no key points found, extract from tags or create from title
        if (keyPoints.length === 0 && video.tags.length > 0) {
            keyPoints.push(...video.tags.slice(0, 3).map(t => `Topic: ${t}`));
        }
        
        // Extract topics from tags and content
        const topics = this.extractTopics(video, text);

        return { brief, detailed, keyPoints, topics };
    }

    private extractTopics(video: YouTubeVideo, text: string): string[] {
        const topics = new Set<string>();
        
        // Add video tags as topics
        video.tags.slice(0, 5).forEach(tag => topics.add(tag.toLowerCase()));
        
        // Extract common topic patterns from text
        const topicPatterns = [
            /\b(tutorial|guide|how to|introduction|overview|review)\b/gi,
            /\b(programming|coding|development|software)\b/gi,
            /\b(javascript|typescript|python|react|node|api)\b/gi,
            /\b(machine learning|ai|data science|analytics)\b/gi
        ];
        
        for (const pattern of topicPatterns) {
            const matches = text.match(pattern);
            if (matches) {
                matches.slice(0, 2).forEach(m => topics.add(m.toLowerCase()));
            }
        }
        
        return Array.from(topics).slice(0, 8);
    }

    /**
     * Extract concepts from content
     */
    private extractConcepts(video: YouTubeVideo, transcript: VideoTranscript): ConceptExtraction {
        const text = transcript.fullText || video.description;
        const concepts: ExtractedConcept[] = [];
        
        // Technical terms pattern
        const techTerms = text.match(/\b[A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*\b/g) || [];
        const termCounts = new Map<string, number>();
        
        techTerms.forEach(term => {
            if (term.length > 3) {
                const lower = term.toLowerCase();
                termCounts.set(lower, (termCounts.get(lower) || 0) + 1);
            }
        });
        
        // Convert to concepts (top 10 by frequency)
        Array.from(termCounts.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .forEach(([name, count]) => {
                concepts.push({
                    name: name.charAt(0).toUpperCase() + name.slice(1),
                    type: 'term',
                    mentions: count
                });
            });

        // Determine difficulty based on technical term density
        const wordCount = text.split(/\s+/).length;
        const techDensity = techTerms.length / wordCount;
        let difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
        if (techDensity > 0.1) { difficulty = 'advanced'; }
        else if (techDensity > 0.05) { difficulty = 'intermediate'; }

        return {
            concepts,
            difficulty,
            prerequisites: video.tags.slice(0, 3)
        };
    }

    /**
     * Assess content quality
     */
    private assessQuality(video: YouTubeVideo, transcript: VideoTranscript): QualityAssessment {
        const text = transcript.fullText;
        
        // Engagement score based on likes/views ratio
        const engagementRatio = video.viewCount > 0 ? video.likeCount / video.viewCount : 0;
        const engagement = Math.min(100, Math.round(engagementRatio * 2000));
        
        // Clarity score based on sentence structure
        const sentences = text.split(/[.!?]+/).filter(s => s.trim());
        const avgSentenceLength = sentences.length > 0 
            ? text.split(/\s+/).length / sentences.length 
            : 20;
        const clarity = avgSentenceLength < 15 ? 90 : avgSentenceLength < 25 ? 75 : 60;
        
        // Depth score based on content length
        const wordCount = text.split(/\s+/).length;
        const depth = Math.min(100, Math.round(wordCount / 50));
        
        // Structure score based on transcript availability
        const structure = transcript.segments.length > 0 ? 80 : 50;
        
        // Overall score
        const overall = Math.round((engagement + clarity + depth + structure) / 4);

        return { overall, clarity, depth, structure, engagement };
    }

    /**
     * Generate flashcards from video content
     */
    async generateFlashcards(videoId: string): Promise<FlashcardItem[]> {
        this.log(`Generating flashcards for: ${videoId}`);

        try {
            const video = await this.getVideoDetails(videoId);
            let transcript: VideoTranscript;
            
            try {
                transcript = await this.getTranscript(videoId);
            } catch {
                transcript = {
                    videoId,
                    segments: [],
                    fullText: video.description
                };
            }
            
            const flashcards: FlashcardItem[] = [];
            const concepts = this.extractConcepts(video, transcript);
            const summary = this.generateSummary(video, transcript);
            
            // Create flashcards from key points
            summary.keyPoints.forEach((point, i) => {
                flashcards.push({
                    id: `kp-${i}`,
                    front: `What is a key point from "${video.title}"?`,
                    back: point,
                    difficulty: 'easy',
                    type: 'key-point',
                    tags: summary.topics.slice(0, 3)
                });
            });
            
            // Create flashcards from concepts
            concepts.concepts.slice(0, 5).forEach((concept, i) => {
                flashcards.push({
                    id: `concept-${i}`,
                    front: `What is "${concept.name}" in the context of this video?`,
                    back: concept.definition || `A ${concept.type} mentioned ${concept.mentions} times in the video.`,
                    difficulty: concepts.difficulty === 'advanced' ? 'hard' : 
                               concepts.difficulty === 'intermediate' ? 'medium' : 'easy',
                    type: 'definition',
                    tags: [concept.type, ...summary.topics.slice(0, 2)]
                });
            });
            
            // Create topic summary flashcard
            if (summary.topics.length > 0) {
                flashcards.push({
                    id: 'topics-0',
                    front: `What topics are covered in "${video.title}"?`,
                    back: summary.topics.join(', '),
                    difficulty: 'easy',
                    type: 'application',
                    tags: summary.topics
                });
            }

            this.log(`Generated ${flashcards.length} flashcards`);
            return flashcards;
        } catch (error) {
            this.log(`Flashcard generation error: ${error}`);
            throw error;
        }
    }

    /**
     * Get current quota status
     */
    getQuotaStatus(): QuotaInfo {
        return {
            used: this.quotaUsed,
            limit: this.DAILY_QUOTA_LIMIT,
            remaining: this.DAILY_QUOTA_LIMIT - this.quotaUsed,
            resetsAt: this.getNextResetTime()
        };
    }

    private getNextResetTime(): string {
        const now = new Date();
        const pst = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
        const tomorrow = new Date(pst);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const hoursUntilReset = Math.ceil((tomorrow.getTime() - pst.getTime()) / (1000 * 60 * 60));
        return `~${hoursUntilReset} hours (midnight PT)`;
    }

    /**
     * Reset quota counter
     */
    resetQuotaCounter(): void {
        this.quotaUsed = 0;
        this.log('Quota counter reset');
    }
}
