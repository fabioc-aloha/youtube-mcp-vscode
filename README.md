# YouTube MCP Tools for VS Code

A **self-sufficient** VS Code extension that brings YouTube video intelligence directly into your editor. Search videos, analyze content, generate transcripts, and create study flashcards - all running entirely within the extension with zero external dependencies.

## ✨ Features

### 🔍 YouTube Search

Search for videos directly from VS Code and see results in a dedicated tree view.

### 📊 Video Analysis

Analyze any YouTube video to get AI-powered insights about its content, themes, key concepts, and quality assessment.

### 📝 Transcript Extraction

Get timestamped transcripts from any YouTube video for reference, note-taking, or content analysis.

### 🎴 Study Flashcards

Generate educational flashcards from video content - perfect for learning and retention.

### 📈 Quota Monitoring

Track your YouTube API quota usage to stay within limits.

## 🚀 Self-Sufficient Architecture

This extension requires **no external servers or MCP connections**. All functionality runs directly within VS Code:

- **Direct YouTube Data API v3** integration for search and video details
- **Built-in transcript extraction** from YouTube's caption system
- **Local content analysis** for summaries, concepts, and quality assessment
- **Intelligent flashcard generation** based on extracted concepts

## Commands

- `YouTube: Search Videos` - Search for YouTube videos
- `YouTube: Analyze Video` - Analyze a video by URL or ID
- `YouTube: Get Transcript` - Extract transcript from a video
- `YouTube: Generate Flashcards` - Create flashcards from video content
- `YouTube: Show Quota Status` - Check API quota usage
- `YouTube: Settings` - Configure extension settings
- `YouTube: Refresh Views` - Refresh all tree views

## Settings

- `youtube-mcp.apiKey` - Your YouTube Data API key
- `youtube-mcp.preferredDuration` - Preferred video duration filter
- `youtube-mcp.maxResults` - Maximum search results (1-50)
- `youtube-mcp.autoAnalyze` - Auto-analyze videos when selected
- `youtube-mcp.defaultRegion` - Default region for search results

## Requirements

- YouTube Data API key ([Get one here](https://console.cloud.google.com/apis/credentials))

## Getting Started

1. Install the extension
2. Open Command Palette (Ctrl+Shift+P)
3. Run `YouTube: Settings` to configure your API key
4. Start searching and analyzing videos!

## Activity Bar

Look for the YouTube icon in the Activity Bar to access:

- **Search Results** - Videos from your last search
- **Recent Videos** - Videos you've recently viewed
- **Flashcards** - Generated study flashcards

## License

MIT
