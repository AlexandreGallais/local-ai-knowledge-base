// The passes of a project: Stylelint only for a project with styles, and a missing package said in
// one line instead of a stack trace.
import assert from 'node:assert/strict';
import {
  mkdirSync,
  mkdtempSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import {
  dirname,
  join,
} from 'node:path';
import {
  describe,
  it,
} from 'node:test';
import {
  hasStyleFiles,
  runPass,
} from '../global/tools/lint-run.ts';

function project(files: Record<string, string>): string {
  const folder = mkdtempSync(join(tmpdir(), 'lint-run-'));

  for (const [
    path,
    text,
  ] of Object.entries(files)) {
    mkdirSync(dirname(join(folder, path)), { recursive: true });
    writeFileSync(join(folder, path), text);
  }
  return folder;
}

describe('the passes of a project', () => {
  it('find the styles of the project, never those of its packages', () => {
    assert.equal(hasStyleFiles(project({
      'src/a.ts': '',
      'node_modules/x/x.css': '',
    })), false);
    assert.equal(hasStyleFiles(project({ 'src/view/view.scss': '' })), true);
  });
  it('say in one line that a package is missing, and run no Stylelint without styles', async () => {
    const folder = project({
      'package.json': '{"type":"module"}',
      '.agents/lint/lint.config.mjs': 'export default [];\n',
      'src/a.ts': 'export const a = 1;\n',
    });
    const lines = await runPass(folder, 'lint', 'all');

    assert.deepEqual(lines, ['eslint is not installed in this project. Run node /opt/local-ai-base/tools/missing-packages.ts, then run the install command it gives (the user approves it).']);
  });
});
