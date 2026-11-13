import assert from 'node:assert/strict';
import {
  describe,
  it,
} from 'node:test';
import {
  lintedFile,
  lintNote,
  SubagentGate,
} from '../global/opencode/plugins/base-guard/guard.ts';

describe('the subagent gate', () => {
  it('lets one subagent run at a time per session, never in the background', () => {
    const gate = new SubagentGate();

    assert.equal(gate.start('parent', {}), undefined);
    assert.match(gate.start('parent', {}) ?? '', /already running/);
    assert.equal(gate.start('other', {}), undefined);
    gate.finish('parent');
    assert.equal(gate.start('parent', {}), undefined);
    assert.match(gate.start('third', { background: true }) ?? '', /Background subagents are off/);
  });
});
describe('the lint after a write', () => {
  it('reads the code files written by edit, write and patch only', () => {
    assert.equal(lintedFile('write', { path: 'src/app/user.ts' }), 'src/app/user.ts');
    assert.equal(lintedFile('edit', { filePath: 'src/app/user.html' }), 'src/app/user.html');
    assert.equal(lintedFile('read', { path: 'src/app/user.ts' }), undefined);
    assert.equal(lintedFile('write', { path: 'README.md' }), undefined);
  });
  it('adds the errors left, and nothing for a clean file', () => {
    assert.equal(lintNote(''), undefined);
    assert.equal(lintNote('src/a.ts:1:1 rule message\n1 error(s).\n'), 'The file was formatted. Lint errors left in it:\nsrc/a.ts:1:1 rule message\n1 error(s).');
  });
});
