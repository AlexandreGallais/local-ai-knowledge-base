import assert from 'node:assert/strict';
import {
  describe,
  it,
} from 'node:test';
import {
  newerTags,
  versionOf,
} from './update-tool.ts';

describe('update-tool', () => {
  it('lists the release tags newer than the current one, oldest first, without pre-releases', () => {
    const tags = [
      'v22.2.5',
      'v22.2.6',
      'v22.3.0-rc.0',
      'v23.0.0',
      'v22.3.0',
      'create-vite@9.3.4',
    ];

    assert.deepEqual(newerTags('v22.2.6', tags), [
      'v22.3.0',
      'v23.0.0',
    ]);
  });
  it('keeps no newer tag for a source that follows a branch', () => {
    assert.deepEqual(newerTags('main', ['v1.0.0']), []);
  });
  it('turns a tag into the version a document header keeps', () => {
    assert.equal(versionOf('v23.1.4'), '23.1');
    assert.equal(versionOf('17.16.0'), '17.16');
  });
});
