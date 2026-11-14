import assert from 'node:assert/strict';
import {
  existsSync,
  readdirSync,
  readFileSync,
} from 'node:fs';
import {
  dirname,
  join,
} from 'node:path';
import {
  describe,
  it,
} from 'node:test';
import { fileURLToPath } from 'node:url';
import { parseJsonc } from './lib/jsonc.ts';
import {
  evaluate,
  type RuleConfig,
} from './lib/opencode-rules.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

interface Config extends RuleConfig {
  instructions?: string[];
  formatter?: Record<string, { command?: string[] }>;
  agents?: Record<string, { disabled?: boolean }>;
  mcp?: {
    servers?: Record<
      string,
      {
        type: string;
        command: string[];
        codemode?: boolean;
      }
    >;
  };
}

const config = parseJsonc(readFileSync(join(ROOT, 'global', 'opencode', 'opencode.jsonc'), 'utf8')) as Config;

function shell(command: string): string {
  return evaluate(config, 'shell', command);
}

describe('the OpenCode configuration of the global base', () => {
  it('loads the common rules from the global base', () => {
    assert.deepEqual(config.instructions, ['/opt/local-ai-base/rules.md']);
    assert.ok(existsSync(join(ROOT, 'global', 'rules.md')));
  });
  it('runs the formatter of the base after a write, and switches off the built-in sub-agents', () => {
    assert.deepEqual(config.formatter?.['base-format']?.command, [
      'node',
      '/opt/local-ai-base/tools/format-file.ts',
      '$FILE',
    ]);
    assert.equal(config.agents?.general?.disabled, true);
    assert.equal(config.agents?.explore?.disabled, true);
  });
  it('runs every MCP server of the base with stdio, tools exposed directly', () => {
    const servers = Object.entries(config.mcp?.servers ?? {});

    assert.deepEqual(servers.map(([name]) => name), [
      'docs',
      'project',
      'code',
      'parse',
    ]);
    for (const [
      name,
      server,
    ] of servers) {
      const script = (server.command[1] ?? '').replace('/opt/local-ai-base/', '');

      assert.equal(server.type, 'local', name);
      assert.equal(server.codemode, false, name);
      assert.ok(existsSync(join(ROOT, 'global', script)), `${name}: ${script} is missing`);
    }
  });
  it('opens the tools of the servers', () => {
    assert.equal(evaluate(config, 'docs_search_docs', '*'), 'allow');
    assert.equal(evaluate(config, 'code_outline', '*'), 'allow');
    assert.equal(evaluate(config, 'parse_outline', '*'), 'allow');
  });
});
describe('one flat agent', () => {
  it('has no default agent of the base, no work server, no agent of its own and no built-in sub-agent', () => {
    const raw = config as Config & { default_agent?: string };

    assert.equal(raw.default_agent, undefined);
    assert.equal(config.mcp?.servers?.['work'], undefined);
    assert.equal(existsSync(join(ROOT, 'global', 'opencode', 'agents')), false);
    assert.equal(config.agents?.general?.disabled, true);
    assert.equal(config.agents?.explore?.disabled, true);
  });
  it('lets the AI run an install itself, after the user approves it', () => {
    assert.equal(shell('npm install --save-dev --save-exact vitest@5.1.0'), 'ask');
    const rules = readFileSync(join(ROOT, 'global', 'rules.md'), 'utf8');

    assert.match(rules, /Run every command yourself, installs included/);
    assert.match(rules, /Never ask the user to run a command/);
  });
  it('sends no rule, skill nor AGENTS.md to a welcome, a profile to choose, a sub-agent or an install by the user', () => {
    const texts = [
      join(ROOT, 'global', 'rules.md'),
      join(ROOT, 'project', 'AGENTS.md'),
      ...[join(ROOT, 'project', '.agents', 'skills')].flatMap((folder) => readdirSync(folder, { recursive: true }).map(String).filter((name) => name.endsWith('SKILL.md')).map((name) => join(folder, name))),
    ];

    for (const path of texts) {
      assert.doesNotMatch(readFileSync(path, 'utf8'), /skill `welcome`|load the skill welcome|sub-agent|tasks\.md|The user runs every command|Ask the user to install|profile\.json gives/i, path);
    }
  });
});
describe('the skills', () => {
  it('live in the project only: no skill list in the common config, no skill folder in the global base', () => {
    assert.equal((config as Config & { skills?: unknown }).skills, undefined);
    assert.equal(existsSync(join(ROOT, 'global', 'skills')), false);
  });
});
describe('the project kit', () => {
  it('holds only AGENTS.md and .agents/', () => {
    assert.deepEqual(readdirSync(join(ROOT, 'project')).sort(), [
      '.agents',
      'AGENTS.md',
    ]);
  });
  it('keeps work files and caches out of Git', () => {
    const ignored = readFileSync(join(ROOT, 'project', '.agents', '.gitignore'), 'utf8');

    assert.match(ignored, /^work\/$/m);
    assert.match(ignored, /^cache\/$/m);
  });
});
describe('the rights of the AI', () => {
  it('allows any command, chained or not, and asks before a package changes', () => {
    assert.equal(shell('npm run lint'), 'allow');
    assert.equal(shell('cd src && npx --no -- tsc'), 'allow');
    assert.equal(shell('node -e "1"'), 'allow');
    assert.equal(shell('npm install lodash'), 'ask');
    assert.equal(shell('npm install'), 'ask');
    assert.equal(shell('npx cowsay hello'), 'ask');
  });
  it('asks before what cannot be undone: a push, a branch, a worktree, a deletion', () => {
    assert.equal(shell('git push origin main'), 'ask');
    assert.equal(shell('git checkout -b feature/x'), 'ask');
    assert.equal(shell('git worktree add ../x'), 'ask');
    assert.equal(shell('rm -rf src'), 'ask');
    assert.equal(shell('git reset --hard HEAD'), 'ask');
  });
  it('refuses only the web', () => {
    assert.equal(shell('curl https://example.org'), 'deny');
    assert.equal(shell('wget https://example.org'), 'deny');
    assert.equal(shell('git clone https://example.org/a.git'), 'deny');
    assert.equal(evaluate(config, 'webfetch', 'https://example.org'), 'deny');
    assert.equal(evaluate(config, 'websearch', 'angular signals'), 'deny');
    assert.equal(evaluate(config, 'read', '/opt/local-ai-base/rules.md'), 'allow');
    assert.equal(evaluate(config, 'read', 'design/screens.xd'), 'allow');
  });
});
