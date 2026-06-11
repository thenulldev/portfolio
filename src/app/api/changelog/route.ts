import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface ReleaseEntry {
  version: string;
  date: string;
  changes: {
    added?: string[];
    changed?: string[];
    fixed?: string[];
    removed?: string[];
  };
}

function parseChangelog(content: string): ReleaseEntry[] {
  const releases: ReleaseEntry[] = [];
  const lines = content.split('\n');
  
  let currentRelease: ReleaseEntry | null = null;
  let currentSection: keyof ReleaseEntry['changes'] | null = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Match version header like ## [1.0.0] - 2026-06-11
    const versionMatch = trimmed.match(/^## \[(\d+\.\d+\.\d+)\] - (\d{4}-\d{2}-\d{2})/);
    if (versionMatch) {
      if (currentRelease) releases.push(currentRelease);
      currentRelease = {
        version: versionMatch[1],
        date: versionMatch[2],
        changes: {},
      };
      currentSection = null;
      continue;
    }
    
    // Match unreleased header
    if (trimmed === '## [Unreleased]') {
      if (currentRelease) releases.push(currentRelease);
      currentRelease = {
        version: 'Unreleased',
        date: new Date().toISOString().split('T')[0],
        changes: {},
      };
      currentSection = null;
      continue;
    }
    
    // Match section headers
    if (trimmed === '### Added') { currentSection = 'added'; continue; }
    if (trimmed === '### Changed') { currentSection = 'changed'; continue; }
    if (trimmed === '### Fixed') { currentSection = 'fixed'; continue; }
    if (trimmed === '### Removed') { currentSection = 'removed'; continue; }
    
    // Match list items
    if (currentRelease && currentSection && trimmed.startsWith('- ')) {
      const item = trimmed.substring(2).trim();
      if (!currentRelease.changes[currentSection]) {
        currentRelease.changes[currentSection] = [];
      }
      currentRelease.changes[currentSection]!.push(item);
    }
  }
  
  if (currentRelease) releases.push(currentRelease);
  return releases;
}

export async function GET() {
  try {
    const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
    
    if (!fs.existsSync(changelogPath)) {
      return NextResponse.json(
        { releases: [], error: 'Changelog not found' },
        { status: 404 }
      );
    }
    
    const content = fs.readFileSync(changelogPath, 'utf-8');
    const releases = parseChangelog(content);
    
    return NextResponse.json({
      releases,
      latest: releases.length > 0 ? releases[0] : null,
    }, {
      headers: {
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { releases: [], error: 'Failed to parse changelog' },
      { status: 500 }
    );
  }
}
