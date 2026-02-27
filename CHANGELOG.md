# Changelog

All notable changes to **YouTube MCP Tools** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2026-02-27

### Changed

- 🎨 **New Banner** - AI-generated minimalist banner using Ideogram v2
- 📦 Updated dependencies to latest versions

## [0.2.0] - 2026-02-27

### Added

- 🔐 **Secure API Key Storage** - API keys now stored in VS Code SecretStorage (encrypted)
- ⌨️ **Keyboard Shortcuts** - Quick access to all commands:
  - `Ctrl+Shift+Y S` - Search YouTube
  - `Ctrl+Shift+Y A` - Analyze Video
  - `Ctrl+Shift+Y T` - Get Transcript
  - `Ctrl+Shift+Y F` - Generate Flashcards
- 🔑 **Set API Key Command** - New `YouTube MCP: Set API Key` command with validation
- 🔄 **Rate Limiting** - Automatic request throttling (10 req/sec max)
- 🔁 **Exponential Backoff** - Automatic retry with backoff for failed requests
- 💾 **Quota Persistence** - API quota now persists across VS Code sessions
- ⚠️ **Quota Warnings** - Visual warnings when approaching daily API limit (80%+)
- 🧪 **Comprehensive Tests** - 36 unit tests covering all core functionality

### Changed

- 🛡️ **Stronger Type Safety** - Eliminated all `any` types, full TypeScript strict mode
- 📏 **Stricter ESLint** - Added rules for explicit return types, no-explicit-any, unused vars
- 🏗️ **Improved Architecture** - Better separation of concerns in service layer
- 📝 **Better Error Messages** - More actionable error messages throughout

### Security

- API keys migrated from plain settings to encrypted SecretStorage
- Added API key validation before storage
- Rate limiting prevents accidental quota exhaustion

### Technical

- Full TypeScript strict mode compliance
- Proper API response type interfaces
- HTTP retry logic with exponential backoff
- Session-persistent quota tracking

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
