// Pushes the chat profile to Open WebUI through its REST API: knowledge bases, skills and models,
// each shared for reading as OPEN_WEBUI_SHARE says. Written for Open WebUI 0.13.3.
// Run from the base root, after the export wrote chat/ and adapters/open-webui/manifest.json:
//   node adapters/open-webui/push.ts [--dry-run]
// Node 22.18 or later. No build step. No npm package.
//
// Environment:
//   OPEN_WEBUI_URL         Base address of the instance.
//   OPEN_WEBUI_TOKEN       API key or session token. Never written to a file.
//   OPEN_WEBUI_BASE_MODEL  Id of the base model every custom model wraps.
//   OPEN_WEBUI_SHARE       "private", "public" or "group:<group name>". Default: private.
//   OPEN_WEBUI_MODE        "native" or "legacy". Default: the mode of the manifest.
import { createHash } from 'node:crypto';
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import {
  basename,
  dirname,
  join,
  relative,
} from 'node:path';
import { pathToFileURL } from 'node:url';

type Mode = 'native' | 'legacy';

interface Grant {
  principal_type: 'user' | 'group';
  principal_id: string;
  permission: 'read' | 'write';
}

interface KnowledgeEntry {
  key: string;
  name: string;
  description: string;
  dir: string;
}

interface SkillEntry {
  id: string;
  name: string;
  description: string;
  dir: string;
}

interface ModelEntry {
  id: string;
  name: string;
  description: string;
  prompt: string;
  knowledge: string[];
  skills: string[];
}

interface Manifest {
  mode: Mode;
  toolsBlock: string;
  knowledge: KnowledgeEntry[];
  skills: SkillEntry[];
  models: ModelEntry[];
}

interface State {
  knowledge: Record<string, string>;
}

interface LocalFile {
  data: Buffer;
  filename: string;
  path: string;
  checksum: string;
  size: number;
}

interface SyncDiff {
  added: {
    filename: string;
    path: string;
  }[];
  modified: {
    filename: string;
    path: string;
    stale_file_id: string;
  }[];
  deleted: { file_id: string }[];
  mkdir: string[];
  rmdir: string[];
  directory_map: Record<string, string>;
}

export interface PushConfig {
  url: string;
  token: string;
  baseModel: string;
  share: string;
  mode?: Mode;
  root: string;
  dryRun: boolean;
  log: (line: string) => void;
  pollMs?: number;
}

type Call = (method: string, path: string, body?: unknown, form?: FormData) => Promise<unknown>;

class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const OFF_TOOLS = [
  'time',
  'user_input',
  'memory',
  'chats',
  'notes',
  'files',
  'channels',
  'notifications',
  'web_search',
  'image_generation',
  'code_interpreter',
  'tasks',
  'automations',
  'calendar',
  'subagents',
  'skills',
  'tools',
];

function record(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null ? Object.fromEntries(Object.entries(value)) : {};
}

function text(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function createCall(config: PushConfig): Call {
  const base = config.url.replace(/\/+$/, '');

  return async (method, path, body, form) => {
    if (config.dryRun && method !== 'GET') {
      config.log(`dry-run ${method} ${path}`);
      return {};
    }
    const headers: Record<string, string> = { Authorization: `Bearer ${config.token}` };

    if (form === undefined && body !== undefined) {
      headers['Content-Type'] = 'application/json';
    }
    const response = await fetch(base + path, {
      method,
      headers,
      body: form ?? (body === undefined ? undefined : JSON.stringify(body)),
    });
    const answer = await response.text();

    if (!response.ok) {
      throw new ApiError(`${method} ${path} -> ${String(response.status)} ${answer.slice(0, 300)}`, response.status);
    }
    return answer === '' ? null : JSON.parse(answer) as unknown;
  };
}

function walk(folder: string): string[] {
  return readdirSync(folder)
    .toSorted()
    .filter((entry) => !entry.startsWith('.'))
    .flatMap((entry) => {
      const full = join(folder, entry);

      return statSync(full).isDirectory() ? walk(full) : [full];
    });
}

function posixRelative(from: string, to: string): string {
  return relative(from, to)
    .split('\\')
    .join('/');
}

async function resolveGrants(call: Call, share: string): Promise<Grant[]> {
  if (share === 'private') {
    return [];
  }
  if (share === 'public') {
    return [
      {
        principal_type: 'user',
        principal_id: '*',
        permission: 'read',
      },
    ];
  }
  if (!share.startsWith('group:')) {
    throw new Error(`OPEN_WEBUI_SHARE must be private, public or group:<name>, got ${share}`);
  }
  const wanted = share.slice('group:'.length);
  const groups = await call('GET', '/api/v1/groups/');
  const group = (Array.isArray(groups) ? groups : [])
    .map(record)
    .find((item) => item['name'] === wanted);

  if (group === undefined) {
    throw new Error(`Group not found: ${wanted}`);
  }
  return [
    {
      principal_type: 'group',
      principal_id: text(group['id']),
      permission: 'read',
    },
  ];
}

async function existingSkillVersion(call: Call, id: string): Promise<string> {
  try {
    return text(record(await call('GET', `/api/v1/skills/id/${id}`))['version_id']);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return '';
    }
    throw error;
  }
}

async function pushSkill(call: Call, config: PushConfig, skill: SkillEntry, grants: Grant[]): Promise<void> {
  const folder = join(config.root, skill.dir);
  const files = walk(folder).map((file) => {
    return {
      path: posixRelative(folder, file),
      content: readFileSync(file, 'utf8'),
    };
  });
  const form = {
    id: skill.id,
    name: skill.name,
    description: skill.description,
    files,
    meta: { tags: [] },
    is_active: true,
  };
  const version = await existingSkillVersion(call, skill.id);

  if (version === '') {
    await call('POST', '/api/v1/skills/create', {
      ...form,
      access_grants: grants,
    });
  } else {
    await call('POST', `/api/v1/skills/id/${skill.id}/update`, {
      ...form,
      expected_version_id: version,
    });
  }
  await call('POST', `/api/v1/skills/id/${skill.id}/access/update`, { access_grants: grants });
  config.log(`skill ${skill.id}: ${String(files.length)} file(s)`);
}

function localFiles(folder: string): LocalFile[] {
  return walk(folder).map((file) => {
    const data = readFileSync(file);
    const path = dirname(posixRelative(folder, file));

    return {
      data,
      filename: basename(file),
      path: path === '.' ? '' : path,
      checksum: createHash('sha256')
        .update(data)
        .digest('hex'),
      size: data.length,
    };
  });
}

async function knowledgeId(call: Call, config: PushConfig, entry: KnowledgeEntry, grants: Grant[], state: State): Promise<string> {
  const known = state.knowledge[entry.key] ?? '';

  if (known !== '') {
    try {
      await call('GET', `/api/v1/knowledge/${known}`);
      return known;
    } catch (error) {
      if (!(error instanceof ApiError) || error.status !== 404) {
        throw error;
      }
    }
  }
  const created = record(await call('POST', '/api/v1/knowledge/create', {
    name: entry.name,
    description: entry.description,
    access_grants: grants,
  }));
  const id = text(created['id']) || `dry-run:${entry.key}`;

  state.knowledge[entry.key] = id;
  return id;
}

async function syncDiff(call: Call, config: PushConfig, id: string, local: LocalFile[]): Promise<SyncDiff> {
  if (config.dryRun) {
    return {
      added: local,
      modified: [],
      deleted: [],
      mkdir: [],
      rmdir: [],
      directory_map: {},
    };
  }
  const manifest = local.map((file) => {
    return {
      filename: file.filename,
      path: file.path,
      checksum: file.checksum,
      size: file.size,
    };
  });

  return await call('POST', `/api/v1/knowledge/${id}/sync/diff`, { manifest }) as SyncDiff;
}

async function waitForFile(call: Call, config: PushConfig, fileId: string): Promise<void> {
  for (let attempt = 0; attempt < 300; attempt += 1) {
    const status = text(record(await call('GET', `/api/v1/files/${fileId}/process/status`))['status']);

    if (status === 'completed') {
      return;
    }
    if (status === 'failed') {
      throw new Error(`File processing failed: ${fileId}`);
    }
    await new Promise((resolve) => {
      setTimeout(resolve, config.pollMs ?? 1000);
    });
  }
  throw new Error(`File processing timed out: ${fileId}`);
}

async function makeDirectories(call: Call, id: string, paths: string[], directories: Record<string, string>): Promise<void> {
  for (const path of paths) {
    const parent = dirname(path) === '.' ? null : directories[dirname(path)] ?? null;
    const created = record(await call('POST', `/api/v1/knowledge/${id}/dirs/create`, {
      name: basename(path),
      parent_id: parent,
    }));

    directories[path] = text(created['id']) || `dry-run:${path}`;
  }
}

async function upload(call: Call, config: PushConfig, id: string, file: LocalFile, directories: Record<string, string>): Promise<void> {
  const metadata: Record<string, string> = {
    knowledge_id: id,
    file_hash: file.checksum,
  };

  if (file.path !== '') {
    metadata['directory_id'] = directories[file.path] ?? '';
  }
  const form = new FormData();

  form.append('file', new Blob([file.data], { type: 'text/markdown' }), file.filename);
  form.append('metadata', JSON.stringify(metadata));
  const uploaded = record(await call('POST', '/api/v1/files/?process=true&process_in_background=false', undefined, form));

  if (!config.dryRun) {
    await waitForFile(call, config, text(uploaded['id']));
  }
}

async function pushKnowledge(call: Call, config: PushConfig, entry: KnowledgeEntry, grants: Grant[], state: State): Promise<string> {
  const id = await knowledgeId(call, config, entry, grants, state);
  const local = localFiles(join(config.root, entry.dir));
  const diff = await syncDiff(call, config, id, local);
  const directories = { ...diff.directory_map };
  const changed = [
    ...diff.added,
    ...diff.modified,
  ];
  const stale = [
    ...diff.deleted.map((item) => item.file_id),
    ...diff.modified.map((item) => item.stale_file_id),
  ];

  await makeDirectories(call, id, diff.mkdir, directories);
  for (const item of changed) {
    const file = local.find((candidate) => candidate.filename === item.filename && candidate.path === item.path);

    if (file !== undefined) {
      await upload(call, config, id, file, directories);
    }
  }
  if (stale.length > 0 || diff.rmdir.length > 0) {
    await call('POST', `/api/v1/knowledge/${id}/sync/cleanup`, {
      file_ids: stale,
      dir_ids: diff.rmdir,
    });
  }
  await call('POST', `/api/v1/knowledge/${id}/access/update`, { access_grants: grants });
  config.log(`knowledge ${entry.key}: ${String(changed.length)} uploaded, ${String(stale.length)} removed, ${String(local.length)} local`);
  return id;
}

function systemPrompt(config: PushConfig, entry: ModelEntry, manifest: Manifest, mode: Mode): string {
  const prompt = readFileSync(join(config.root, entry.prompt), 'utf8')
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .trim();

  if (mode === 'native' && entry.knowledge.length > 0) {
    // The block is a document of its own, with a title; in the prompt it becomes one more section.
    const tools = readFileSync(join(config.root, manifest.toolsBlock), 'utf8')
      .trim()
      .replace(/^# /, '## ');

    return `${prompt}\n\n${tools}`;
  }
  return prompt;
}

interface ModelContext {
  config: PushConfig;
  manifest: Manifest;
  mode: Mode;
  ids: Record<string, string>;
  grants: Grant[];
}

function modelKnowledge(context: ModelContext, entry: ModelEntry): Record<string, string>[] {
  return entry.knowledge.map((key) => {
    const source = context.manifest.knowledge.find((item) => item.key === key);
    const id = context.ids[key];

    if (source === undefined || id === undefined) {
      throw new Error(`Unknown knowledge ${key} in model ${entry.id}`);
    }
    return {
      id,
      name: source.name,
      description: source.description,
      type: 'collection',
    };
  });
}

// Every built-in tool is off, except the knowledge tools in native mode for a model with knowledge.
function capabilities(usesKnowledgeTools: boolean): Record<string, unknown> {
  return {
    capabilities: {
      vision: false,
      file_upload: true,
      file_context: true,
      web_search: false,
      image_generation: false,
      code_interpreter: false,
      terminal: false,
      citations: true,
      status_updates: true,
      memory: false,
      builtin_tools: usesKnowledgeTools,
    },
    builtinTools: Object.fromEntries([
      ['knowledge', usesKnowledgeTools],
      ...OFF_TOOLS.map((key) => [
        key,
        false,
      ]),
    ]),
  };
}

export function buildModel(context: ModelContext, entry: ModelEntry): Record<string, unknown> {
  return {
    id: entry.id,
    name: entry.name,
    base_model_id: context.config.baseModel,
    is_active: true,
    params: {
      system: systemPrompt(context.config, entry, context.manifest, context.mode),
      function_calling: context.mode,
    },
    meta: {
      description: entry.description,
      ...capabilities(context.mode === 'native' && entry.knowledge.length > 0),
      knowledge: modelKnowledge(context, entry),
      skillIds: entry.skills,
      toolIds: [],
      defaultFeatureIds: [],
    },
    access_grants: context.grants,
  };
}

async function checkInstance(call: Call, config: PushConfig, mode: Mode): Promise<void> {
  const version = text(record(await call('GET', '/api/version'))['version']);

  config.log(`Open WebUI ${version}, mode ${mode}, share ${config.share}${config.dryRun ? ', dry run' : ''}`);
  const listed = record(await call('GET', '/api/models'))['data'];
  const ids = (Array.isArray(listed) ? listed : []).map((model) => text(record(model)['id']));

  if (!ids.includes(config.baseModel)) {
    throw new Error('Base model not found. Check OPEN_WEBUI_BASE_MODEL.');
  }
}

export async function push(config: PushConfig): Promise<void> {
  const adapter = join(config.root, 'adapters', 'open-webui');
  const stateFile = join(adapter, 'state.local.json');
  const manifest = JSON.parse(readFileSync(join(adapter, 'manifest.json'), 'utf8')) as Manifest;
  const mode = config.mode ?? manifest.mode;
  const call = createCall(config);
  const state = existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, 'utf8')) as State : { knowledge: {} };

  await checkInstance(call, config, mode);
  const grants = await resolveGrants(call, config.share);

  for (const skill of manifest.skills) {
    await pushSkill(call, config, skill, grants);
  }
  const ids: Record<string, string> = {};

  for (const entry of manifest.knowledge) {
    ids[entry.key] = await pushKnowledge(call, config, entry, grants, state);
  }
  if (!config.dryRun) {
    writeFileSync(stateFile, `${JSON.stringify(state, null, 2)}\n`);
  }
  const context = {
    config,
    manifest,
    mode,
    ids,
    grants,
  };
  const models = manifest.models.map((entry) => buildModel(context, entry));

  await call('POST', '/api/v1/models/import', { models });
  for (const model of models) {
    await call('POST', '/api/v1/models/model/access/update', {
      id: model['id'],
      access_grants: grants,
    });
    config.log(`model ${text(model['id'])}`);
  }
  config.log('Done.');
}

function environment(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback ?? '';

  if (value === '') {
    throw new Error(`Missing environment variable ${name}`);
  }
  return value;
}

function modeFromEnvironment(): Mode | undefined {
  const value = process.env['OPEN_WEBUI_MODE'] ?? '';

  if (value === '') {
    return undefined;
  }
  if (value !== 'native' && value !== 'legacy') {
    throw new Error('OPEN_WEBUI_MODE must be native or legacy');
  }
  return value;
}

async function main(): Promise<void> {
  await push({
    url: environment('OPEN_WEBUI_URL'),
    token: environment('OPEN_WEBUI_TOKEN'),
    baseModel: environment('OPEN_WEBUI_BASE_MODEL'),
    share: environment('OPEN_WEBUI_SHARE', 'private'),
    mode: modeFromEnvironment(),
    root: process.cwd(),
    dryRun: process.argv.includes('--dry-run'),
    log: (line) => {
      process.stdout.write(`${line}\n`);
    },
  });
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error: unknown) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}
