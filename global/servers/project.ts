// MCP server "project": what the AI must know of the project before it works: profile, versions,
// check commands, project skills, version of the global base. It never writes a file.
// Run by OpenCode in the project folder: node /opt/local-ai-base/servers/project.ts
import {
  existsSync,
  readdirSync,
  realpathSync,
} from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkBaseVersion } from '../tools/base-version.ts';
import { checkVersions } from '../tools/check-versions.ts';
import {
  baseRoot,
  projectRoot,
  readJson,
  readProfile,
} from './lib/base.ts';
import {
  serve,
  type Server,
} from './lib/mcp.ts';

const PACKAGES = [
  '@angular/core',
  '@ngrx/signals',
  'rxjs',
  'typescript',
  'vite',
  'vitest',
  '@playwright/test',
  'eslint',
  'stylelint',
];

function declaredVersions(project: string): string[] {
  const manifest = readJson<Record<string, Record<string, string> | undefined>>(join(project, 'package.json'), {});
  const all = {
    ...manifest['devDependencies'],
    ...manifest['peerDependencies'],
    ...manifest['dependencies'],
  };
  const node = manifest['engines']?.['node'];

  return [
    ...PACKAGES
      .filter((name) => all[name] !== undefined)
      .map((name) => `${name} ${all[name] ?? ''}`),
    ...node === undefined ? [] : [`node ${node}`],
  ];
}

export function projectInfo(): string {
  const project = projectRoot();
  const profile = readProfile(project);
  const skills = existsSync(join(project, '.agents', 'skills')) ? readdirSync(join(project, '.agents', 'skills'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name) : [];
  const checks = Object
    .entries(profile.checks ?? {})
    .map(([
      name,
      command,
    ]) => `- ${name}: \`${command}\``);
  const versions = declaredVersions(project);

  return [
    profile.profile === undefined ? 'Profile: none yet. Load the skill welcome first.' : `Profile: ${profile.profile}`,
    `Subject: ${profile.subject ?? 'not set'}`,
    checkBaseVersion(baseRoot(), project).message,
    '',
    'Versions in package.json:',
    ...versions.length === 0 ? ['- no package.json, or none of the known packages'] : versions.map((line) => `- ${line}`),
    '',
    'Check commands, in this order:',
    ...checks.length === 0 ? ['- none in .agents/profile.json'] : checks,
    '',
    `Project skills: ${skills.length === 0 ? 'none' : skills.join(', ')}`,
  ].join('\n');
}

export function versionsBehind(): string {
  const behind = checkVersions(baseRoot(), projectRoot());

  if (behind.length === 0) {
    return 'No document of the base is behind this project.';
  }
  return [
    ...behind.map((item) => `${item.document}: ${item.tool} ${item.documentVersion} in the base, ${item.projectVersion} in the project`),
    'For these tools, trust package.json and the types of the installed packages over the base.',
  ].join('\n');
}

export const server: Server = {
  name: 'project',
  version: '0.2.0',
  instructions: 'What this project is. Call project_info before your first task.',
  tools: [
    {
      name: 'project_info',
      description: 'The profile of the project, its subject, the versions in package.json, the check commands in order, the project skills and the state of the global base.',
      properties: {},
      required: [],
      run: projectInfo,
    },
    {
      name: 'versions_behind',
      description: 'The documents of the base that are older than the versions this project uses.',
      properties: {},
      required: [],
      run: versionsBehind,
    },
  ],
};

// Run the server only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  serve(server);
}
