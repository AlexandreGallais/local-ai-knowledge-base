// Tests of AGENTS.project.md: the rules of a project, checked like the base and never touched by an
// update of the base.
import assert from 'node:assert/strict';
import {
  mkdtempSync,
  readFileSync,
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
import { fileURLToPath } from 'node:url';
import { importBase } from '../import.ts';
import { checkProjectRules } from './check-base.ts';
import { buildExport } from './export.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TEMPLATE = readFileSync(join(ROOT, 'code/templates/AGENTS.project.md'), 'utf8');

describe('rules of a project', () => {
  it('accepts the template and names it in AGENTS.md', () => {
    assert.deepEqual(checkProjectRules(TEMPLATE, 'AGENTS.project.md'), []);
    assert.match(readFileSync(join(ROOT, 'code/AGENTS.md'), 'utf8'), /^3\. If `AGENTS\.project\.md` exists/m);
  });
  it('refuses rules of more than 40 lines, in French, or that ask for the web', () => {
    const long = `${TEMPLATE}${'- One more rule.\n'.repeat(30)}`;
    const french = '# Règles\n\n- Toujours écrire les composants dans le dossier des fonctionnalités, avec leurs tests et leur style.\n';
    const web = '# Rules\n\n- Search the web for the latest Angular version.\n';

    assert.match(checkProjectRules(long, 'AGENTS.project.md')[0]?.message ?? '', /lines; keep 40 at most/);
    assert.match(checkProjectRules(french, 'AGENTS.project.md')[0]?.message ?? '', /French/);
    assert.ok(checkProjectRules(web, 'AGENTS.project.md').length > 0);
  });
  it('keeps AGENTS.project.md identical when the base is updated with --project --force', () => {
    const project = mkdtempSync(join(tmpdir(), 'project-'));
    const rules = '# AGENTS.project.md\n\n- Use Kubernetes 1.36.\n';
    const parts = buildExport(
      [
        {
          path: 'code/AGENTS.md',
          content: '# AGENTS.md, new version\n',
        },
        {
          path: 'code/AGENTS.project.md',
          content: '# Not a rule of this project\n',
        },
      ],
      500,
    );

    writeFileSync(join(project, 'AGENTS.md'), '# AGENTS.md, old version\n');
    writeFileSync(join(project, 'AGENTS.project.md'), rules);
    importBase(parts, project, {
      project: true,
      force: true,
    });
    assert.equal(readFileSync(join(project, 'AGENTS.project.md'), 'utf8'), rules);
    assert.equal(readFileSync(join(project, 'AGENTS.md'), 'utf8'), '# AGENTS.md, new version\n');
  });
});
