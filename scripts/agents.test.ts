// The agents of the base (global/opencode/agents): who may write, run, delegate and load which skill,
// with the rules of the common config before the rules of each agent (decision 0018).
import assert from 'node:assert/strict';
import {
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
import {
  evaluate,
  evaluateShell,
  readAgentRules,
  readCommonConfig,
  type Rule,
} from './lib/permissions.ts';

const GLOBAL = join(dirname(fileURLToPath(import.meta.url)), '..', 'global');
const OPENCODE = join(GLOBAL, 'opencode');
const CONFIG = readCommonConfig(OPENCODE);
const AGENTS = new Map(readdirSync(join(OPENCODE, 'agents'))
  .filter((name) => name.endsWith('.md'))
  .map((name) => [
    name.slice(0, -3),
    readAgentRules(readFileSync(join(OPENCODE, 'agents', name), 'utf8')),
  ]));
const SPECIALISTS = Object.keys(JSON.parse(readFileSync(join(GLOBAL, 'agents', 'profiles.json'), 'utf8')) as Record<string, string[]>);
const SKILLS = [
  'write-brief',
  'plan-tasks',
  'report-task',
  'final-check',
  'write-project-skill',
  'welcome',
  'write-component',
  'write-store',
  'write-service',
  'write-library-function',
  'document-function',
  'write-tests',
  'start-angular-project',
  'start-typescript-library',
];
const EXPECTED_SKILLS: Record<string, string[]> = {
  'orchestrator': [
    'write-project-skill',
    'welcome',
  ],
  'brief': ['write-brief'],
  'planner': [
    'plan-tasks',
    'start-angular-project',
    'start-typescript-library',
  ],
  'checker': [
    'report-task',
    'final-check',
  ],
  'component': [
    'report-task',
    'write-component',
    'write-tests',
    'start-angular-project',
  ],
  'store': [
    'report-task',
    'write-store',
    'write-tests',
  ],
  'service': [
    'report-task',
    'write-service',
    'write-tests',
  ],
  'html-css': [
    'report-task',
    'write-component',
  ],
  'library-function': [
    'report-task',
    'write-library-function',
    'document-function',
    'write-tests',
    'start-typescript-library',
  ],
  'tests': [
    'report-task',
    'write-tests',
  ],
  'svg-geometry': [
    'report-task',
    'write-library-function',
    'write-tests',
  ],
  'docs-writer': [
    'report-task',
    'document-function',
  ],
  'reviewer': ['report-task'],
};

function rulesOf(agent: string): Rule[] {
  const rules = AGENTS.get(agent);

  assert.ok(rules !== undefined, `no agent ${agent}`);
  return rules;
}

function can(agent: string, action: string, resource: string): string {
  return evaluate(CONFIG, rulesOf(agent), action, resource);
}

describe('the agents of the base', () => {
  it('are the orchestrator, brief, planner, checker and the specialised agents of the profiles', () => {
    assert.deepEqual(
      [...AGENTS.keys()].sort(),
      Object
        .keys(EXPECTED_SKILLS)
        .sort(),
    );
    assert.deepEqual(
      SPECIALISTS.toSorted(),
      Object
        .keys(EXPECTED_SKILLS)
        .filter((name) => ![
          'orchestrator',
          'brief',
          'planner',
          'checker',
        ].includes(name))
        .sort(),
    );
  });
  it('let the orchestrator write its work files only, never code', () => {
    assert.equal(can('orchestrator', 'edit', 'src/app/user-list.component.ts'), 'deny');
    assert.equal(can('orchestrator', 'edit', 'src/app/user-list.store.ts'), 'deny');
    assert.equal(can('orchestrator', 'edit', '.agents/work/user-list/tasks.md'), 'allow');
    assert.equal(can('orchestrator', 'work_next_task', '*'), 'allow');
  });
  it('let the orchestrator delegate to each agent, and no sub-agent delegate', () => {
    for (const agent of AGENTS.keys()) {
      const expected = agent === 'orchestrator' ? 'deny' : 'allow';

      assert.equal(can('orchestrator', 'subagent', agent), expected, agent);
    }
    for (const agent of [...AGENTS.keys()].filter((name) => name !== 'orchestrator')) {
      assert.equal(can(agent, 'subagent', 'component'), 'deny', agent);
    }
  });
  it('give each agent its own skills and no other', () => {
    for (const [
      agent,
      expected,
    ] of Object.entries(EXPECTED_SKILLS)) {
      const allowed = SKILLS.filter((skill) => can(agent, 'skill', skill) === 'allow');

      assert.deepEqual(allowed.toSorted(), expected.toSorted(), agent);
    }
  });
  it('let the specialists write the project, never the work files nor the base', () => {
    for (const agent of SPECIALISTS.filter((name) => name !== 'reviewer')) {
      assert.equal(can(agent, 'edit', 'src/app/user-list.component.ts'), 'allow', agent);
      assert.equal(can(agent, 'edit', '.agents/work/user-list/tasks.md'), 'deny', agent);
      assert.equal(can(agent, 'edit', '/opt/local-ai-base/rules/common.md'), 'deny', agent);
      assert.equal(can(agent, 'shell', 'npm run lint'), 'allow', agent);
    }
    assert.equal(can('reviewer', 'edit', 'src/app/user-list.component.ts'), 'deny');
    assert.equal(can('checker', 'edit', 'src/app/user-list.component.ts'), 'deny');
  });
  it('give the geometry tools only to the agents that place or compute', () => {
    for (const agent of AGENTS.keys()) {
      const expected = [
        'svg-geometry',
        'library-function',
      ].includes(agent) ? 'allow' : 'deny';

      assert.equal(can(agent, 'geometry_call_function', '*'), expected, agent);
    }
  });
  it('let every agent run any command, chained or not', () => {
    const lines = [
      'npx --no -- tsc -p tsconfig.json',
      'npm test',
      'node -e "console.log(1)"',
      'cd src && ls',
      'npm run lint | tail -20',
      'mkdir -p src/lib/symbols',
      'cat package.json',
    ];

    for (const [
      agent,
      line,
    ] of [...AGENTS.keys()].flatMap((name) => lines.map((item) => [
      name,
      item,
    ] as const))) {
      assert.equal(evaluateShell(CONFIG, rulesOf(agent), line), 'allow', `${agent}: ${line}`);
    }
  });
  it('ask the user before what cannot be undone: an install, a push, a branch, a deletion', () => {
    const lines = [
      'npm install --save-dev storybook',
      'npx storybook init',
      'git push origin main',
      'git checkout -b feature/list',
      'git worktree add ../list',
      'rm -rf src',
      'ls && git reset --hard HEAD',
    ];

    for (const [
      agent,
      line,
    ] of [...AGENTS.keys()].flatMap((name) => lines.map((item) => [
      name,
      item,
    ] as const))) {
      assert.equal(evaluateShell(CONFIG, rulesOf(agent), line), 'ask', `${agent}: ${line}`);
    }
  });
  it('refuse to every agent only the web: search, fetch and download', () => {
    for (const agent of AGENTS.keys()) {
      assert.equal(can(agent, 'webfetch', 'https://example.test'), 'deny', agent);
      assert.equal(can(agent, 'websearch', 'angular signals'), 'deny', agent);
      assert.equal(evaluateShell(CONFIG, rulesOf(agent), 'curl http://example.test'), 'deny', agent);
      assert.equal(evaluateShell(CONFIG, rulesOf(agent), 'cat a.txt | wget -i -'), 'deny', agent);
      assert.equal(evaluateShell(CONFIG, rulesOf(agent), 'git clone https://example.test/a.git'), 'deny', agent);
      assert.equal(can(agent, 'read', 'design/screens.xd'), 'allow', agent);
    }
  });
});
