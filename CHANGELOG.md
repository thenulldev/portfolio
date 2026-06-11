# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- System status page at `/status` with real-time service health monitoring
- `/api/status` endpoint checking GitHub, Cloudflare, Ghost CMS, Credly, MS Learn, TryHackMe
- CHANGELOG.md following Keep a Changelog format
- `/api/changelog` endpoint for programmatic access to release notes
- PR preview deployments: every PR gets a unique `portfolio-preview-{branch}.workers.dev` URL
- Enhanced PR comments with deployment status tables and preview links
- Certification timeline visualization grouped by year with issuer color coding
- Automatic PR comment updates on redeployment (no duplicate comments)
- Post-merge comments on PRs confirming production deployment


## [1.0.0] - 2026-06-11

### Added
- GitHub Actions deployment pipeline for Cloudflare Workers
- pnpm store caching and OpenNext build caching for faster CI
- Automatic PR deployment comments with live preview URLs
- System status page at `/status` with real-time service monitoring
- Build artifact uploads on failure for offline debugging
- 10-minute job timeout to prevent runaway builds
- Paths-ignore rules to skip builds on README/docs-only changes
