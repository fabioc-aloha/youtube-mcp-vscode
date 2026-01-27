# Changelog

All notable changes to **YouTube MCP Tools** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-01-27

### Changed

- 📚 Polished documentation (README, CHANGELOG, SUPPORT)
- ✨ Added dynamic marketplace badges (Version, Installs, Rating)
- 📦 Added `author`, `pricing`, and `qna` fields to package manifest
- 🎨 Improved table formatting throughout documentation
- 📋 Added SUPPORT.md with troubleshooting guide and FAQ

## [0.1.0] - 2026-01-27

### Added

- 🔍 **YouTube Search** - Search videos directly from VS Code with configurable results
- 📊 **Video Analysis** - Get AI-powered summaries, key concepts, and quality assessments
- 📝 **Transcript Extraction** - Extract timestamped transcripts from any video with captions
- 🎴 **Flashcard Generation** - Automatically create study flashcards from video content
- 📈 **Quota Monitoring** - Track YouTube API usage in real-time
- ⚙️ **Flexible Configuration** - Support for API key via VS Code settings or `.env` file
- 🎯 **Activity Bar Views** - Dedicated views for Search Results, Recent Videos, and Flashcards
- 📊 **Status Bar** - Quick indicator showing extension state

### Technical

- Zero external runtime dependencies
- Self-sufficient architecture (no MCP server required)
- Direct YouTube Data API v3 integration
- Native HTTPS implementation for maximum compatibility
