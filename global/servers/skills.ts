// MCP server "skills": the skills of the base and of the project, listed then loaded one at a time.
// Run by OpenCode in the project folder: node /opt/local-ai-base/servers/skills.ts
// OpenCode already lists the skills it finds; this server serves the same skills to an agent that
// cannot see them, filtered by the project's profile. It never writes a file.
import {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
} from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  baseRoot,
  projectRoot,
  readJson,
  readProfile,
} from './lib/base.ts';
import {
  type Arguments,
  requiredText,
  serve,
  type Server,
  text,
  ToolError,
} from './lib/mcp.ts';

interface Skill {
  name: string;
  description: string;
  path: string;
  from: string;
}

function header(content: string, field: string): string {
  const block = /^---\n([\s\S]*?)\n---/.exec(content)?.[1] ?? '';

  return new RegExp(`^${field}:\\s*(.+)$`, 'm')
    .exec(block)?.[1]
    ?.trim()
    .replace(/^(["'])(.*)\1$/, '$2') ?? '';
}

function skillsIn(folder: string, from: string): Skill[] {
  if (!existsSync(folder)) {
    return [];
  }
  return readdirSync(folder, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(folder, entry.name, 'SKILL.md')))
    .map((entry) => {
      const path = join(folder, entry.name, 'SKILL.md');
      const content = readFileSync(path, 'utf8');

      return {
        name: entry.name,
        description: header(content, 'description'),
        path,
        from,
      };
    });
}

// The groups of skills a profile receives, from global/skills/groups.json; all groups when the
// project has no profile yet.
export function skillGroups(base: string, profile: string | undefined): string[] {
  const groups = readJson<Record<string, string[]>>(join(base, 'skills', 'groups.json'), {});

  return Object
    .entries(groups)
    .filter(([, profiles]) => profile === undefined || profiles.includes(profile))
    .map(([group]) => group);
}

// The project's skills come last: one of the same name replaces the common one.
export function allSkills(): Skill[] {
  const base = baseRoot();
  const project = projectRoot();
  const profile = readProfile(project).profile;
  const byName = new Map<string, Skill>();

  for (const skill of [
    ...skillsIn(join(base, 'opencode', 'skills'), 'base'),
    ...skillGroups(base, profile).flatMap((group) => skillsIn(join(base, 'skills', group), `group ${group}`)),
    ...skillsIn(join(project, '.agents', 'skills'), 'project'),
  ]) {
    byName.set(skill.name, skill);
  }
  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

export function listSkills(args: Arguments): string {
  const words = text(args, 'query')
    .toLowerCase()
    .split(/\W+/)
    .filter((word) => word.length > 2);
  const found = allSkills().filter((skill) => words.length === 0 || words.some((word) => `${skill.name} ${skill.description}`.toLowerCase().includes(word)));

  if (found.length === 0) {
    return 'No skill matches. Ask the user how to do this task, then save the answer with the skill write-project-skill.';
  }
  return found
    .map((skill) => `${skill.name} (${skill.from}): ${skill.description}`)
    .join('\n');
}

export function loadSkill(args: Arguments): string {
  const name = requiredText(args, 'name');
  const skill = allSkills().find((item) => item.name === name);

  if (skill === undefined) {
    throw new ToolError(`No skill "${name}". Call list_skills to see the names.`);
  }
  return readFileSync(skill.path, 'utf8')
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .trim();
}

export const server: Server = {
  name: 'skills',
  version: '0.2.0',
  instructions: 'The skills of the base and of the project. Find one with list_skills, then follow the text load_skill gives.',
  tools: [
    {
      name: 'list_skills',
      description: 'List the skills this project may use, one line each: name, origin, when to use it.',
      properties: {
        query: {
          type: 'string',
          description: 'Optional English words to filter, as "store" or "component".',
        },
      },
      required: [],
      run: listSkills,
    },
    {
      name: 'load_skill',
      description: 'The steps of one skill, to follow as they are written.',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the skill, as list_skills gives it.',
        },
      },
      required: ['name'],
      run: loadSkill,
    },
  ],
};

// Run the server only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  serve(server);
}
