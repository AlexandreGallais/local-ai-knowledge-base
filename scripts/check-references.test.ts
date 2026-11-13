// Tests of the checks of internal links and section references of the base.
import assert from 'node:assert/strict';
import {
  describe,
  it,
} from 'node:test';
import {
  checkInternalLinks,
  checkSectionRefs,
} from './check-base.ts';

const EXISTING = new Set([
  'docs/simulation/component-models.md',
  'templates/AGENTS.project.md',
]);
const OTHER = '# Component model interface\n\n## 1. The interface\n\nText.\n\n## 2. Save and restore\n\nText.\n';

function exists(path: string): boolean | undefined {
  return path.startsWith('library/') ? undefined : EXISTING.has(path);
}

function readDocument(path: string): string | undefined {
  return path === 'docs/simulation/component-models.md' ? OTHER : undefined;
}

describe('internal links', () => {
  it('accepts paths that exist, placeholders, sources and code', () => {
    const text = [
      '# Doc',
      '',
      'Read `docs/simulation/component-models.md` and `templates/AGENTS.project.md`.',
      'Open `docs/<topic>/index.md`, then `library/angular/index.md`.',
      '',
      '```sh',
      'cat `docs/missing.md`',
      '```',
      '',
      '## Sources',
      '',
      '- [S1] `docs/old.md`, cited.',
    ].join('\n');

    assert.deepEqual(checkInternalLinks(text, 'doc.md', exists), []);
  });
  it('refuses a link to a missing document', () => {
    const found = checkInternalLinks('Read `docs/synoptics/catalog-fluid-common.md`.\n', 'doc.md', exists);

    assert.deepEqual(found.map((item) => item.message), ['links to a missing file: docs/synoptics/catalog-fluid-common.md']);
  });
});
describe('section references', () => {
  it('accepts a section of this document and of another one', () => {
    const text = '# Doc\n\n## 1. Rules\n\nAs in section 2.\n\n## 2. Example\n\nRead `docs/simulation/component-models.md`, section 2.\n';

    assert.deepEqual(checkSectionRefs(text, 'doc.md', readDocument), []);
  });
  it('refuses a missing section of this document and of another one', () => {
    const text = '# Doc\n\n## 1. Rules\n\nAs in section 4.\n\nRead `docs/simulation/component-models.md`, section 7.\n';

    assert.deepEqual(checkSectionRefs(text, 'doc.md', readDocument).map((item) => item.message), [
      'names a missing section 4',
      'names a missing section 7 of docs/simulation/component-models.md',
    ]);
  });
});
