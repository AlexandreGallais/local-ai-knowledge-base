// A fake Open WebUI server for the tests of adapters/open-webui/push.ts. It answers the endpoints that
// the script calls, as read in the code of Open WebUI 0.13.3, and keeps what it receives in memory.
import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from 'node:http';
import type { AddressInfo } from 'node:net';

export const FAKE_TOKEN = 'test-token';
export const FAKE_BASE_MODEL = 'base-model';

export const FAKE_GROUP = {
  id: 'group-1',
  name: 'team',
};

interface StoredFile {
  filename: string;
  path: string;
  checksum: string;
}

interface Knowledge {
  name: string;
  grants: unknown;
  files: Map<string, StoredFile>;
  dirs: Map<string, string>;
}

export interface FakeState {
  calls: string[];
  skills: Map<
    string,
    {
      version: number;
      grants: unknown;
      fileCount: number;
    }
  >;
  knowledge: Map<string, Knowledge>;
  models: Map<string, Record<string, unknown>>;
  modelGrants: Map<string, unknown>;
  counter: number;
}

interface Reply {
  status: number;
  body: unknown;
}

type Handler = (state: FakeState, match: RegExpExecArray, body: Record<string, unknown>, raw: string) => Reply;

function ok(body: unknown): Reply {
  return {
    status: 200,
    body,
  };
}

function nextId(state: FakeState, prefix: string): string {
  state.counter += 1;
  return `${prefix}-${String(state.counter)}`;
}

function list(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.map((item) => Object.fromEntries(Object.entries(Object(item)))) : [];
}

function knowledgeOf(state: FakeState, id: string): Knowledge {
  const found = state.knowledge.get(id);

  if (found === undefined) {
    throw new Error(`no knowledge ${id}`);
  }
  return found;
}

function key(path: unknown, filename: unknown): string {
  return `${String(path)}/${String(filename)}`;
}

function parentPaths(path: string): string[] {
  const parts = path.split('/');

  return parts.map((_, index) => parts.slice(0, index + 1).join('/'));
}

function syncDiff(knowledge: Knowledge, manifest: Record<string, unknown>[]): Record<string, unknown> {
  const wanted = new Map(manifest.map((item) => [
    key(item['path'], item['filename']),
    item,
  ]));
  const stored = [...knowledge.files.entries()];
  const paths = [
    ...new Set(manifest
      .map((item) => String(item['path']))
      .filter(Boolean)
      .flatMap(parentPaths)),
  ];

  return {
    added: manifest.filter((item) => !stored.some(([, file]) => key(file.path, file.filename) === key(item['path'], item['filename']))),
    modified: stored
      .filter(([, file]) => wanted.has(key(file.path, file.filename)) && wanted.get(key(file.path, file.filename))?.['checksum'] !== file.checksum)
      .map(([
        id,
        file,
      ]) => {
        return {
          filename: file.filename,
          path: file.path,
          stale_file_id: id,
        };
      }),
    deleted: stored
      .filter(([, file]) => !wanted.has(key(file.path, file.filename)))
      .map(([id]) => {
        return { file_id: id };
      }),
    mkdir: paths
      .filter((path) => !knowledge.dirs.has(path))
      .toSorted((a, b) => a.split('/').length - b.split('/').length),
    rmdir: [...knowledge.dirs.entries()]
      .filter(([path]) => !paths.includes(path))
      .map(([, id]) => id),
    directory_map: Object.fromEntries(knowledge.dirs),
  };
}

function uploadFile(state: FakeState, raw: string): Reply {
  const metadata = JSON.parse(/name="metadata"\r\n\r\n([^\r]*)\r\n/.exec(raw)?.[1] ?? '{}') as Record<string, string>;
  const knowledge = knowledgeOf(state, metadata['knowledge_id'] ?? '');
  const directoryId = metadata['directory_id'] ?? '';
  const path = [...knowledge.dirs.entries()].find(([, id]) => id === directoryId)?.[0] ?? '';
  const id = nextId(state, 'file');

  knowledge.files.set(id, {
    filename: /filename="([^"]+)"/.exec(raw)?.[1] ?? '',
    path,
    checksum: metadata['file_hash'] ?? '',
  });
  return ok({ id });
}

function cleanup(state: FakeState, match: RegExpExecArray, body: Record<string, unknown>): Reply {
  const knowledge = knowledgeOf(state, match[1] ?? '');
  const fileIds = Array.isArray(body['file_ids']) ? body['file_ids'].map(String) : [];
  const dirIds = Array.isArray(body['dir_ids']) ? body['dir_ids'].map(String) : [];

  for (const id of fileIds) {
    knowledge.files.delete(id);
  }
  for (const [
    path,
    id,
  ] of [...knowledge.dirs.entries()]) {
    if (dirIds.includes(id)) {
      knowledge.dirs.delete(path);
    }
  }
  return ok({});
}

function makeDirectory(state: FakeState, match: RegExpExecArray, body: Record<string, unknown>): Reply {
  const knowledge = knowledgeOf(state, match[1] ?? '');
  const parentId = String(body['parent_id'] ?? '');
  const parent = [...knowledge.dirs.entries()].find(([, id]) => id === parentId)?.[0];
  const path = parent === undefined ? String(body['name']) : `${parent}/${String(body['name'])}`;
  const id = nextId(state, 'dir');

  knowledge.dirs.set(path, id);
  return ok({ id });
}

function createSkill(state: FakeState, _match: RegExpExecArray, body: Record<string, unknown>): Reply {
  state.skills.set(String(body['id']), {
    version: 1,
    grants: body['access_grants'],
    fileCount: list(body['files']).length,
  });
  return ok({ id: body['id'] });
}

function updateSkill(state: FakeState, match: RegExpExecArray, body: Record<string, unknown>): Reply {
  const skill = state.skills.get(match[1] ?? '');

  if (skill?.version !== Number(String(body['expected_version_id']).replace('v', ''))) {
    return {
      status: 409,
      body: { detail: 'version mismatch' },
    };
  }
  skill.version += 1;
  skill.fileCount = list(body['files']).length;
  return ok({});
}

function readSkill(state: FakeState, match: RegExpExecArray): Reply {
  const skill = state.skills.get(match[1] ?? '');

  return skill === undefined ? {
    status: 404,
    body: { detail: 'not found' },
  } : ok({ version_id: `v${String(skill.version)}` });
}

function createKnowledge(state: FakeState, _match: RegExpExecArray, body: Record<string, unknown>): Reply {
  const id = nextId(state, 'knowledge');

  state.knowledge.set(id, {
    name: String(body['name']),
    grants: body['access_grants'],
    files: new Map(),
    dirs: new Map(),
  });
  return ok({ id });
}

function importModels(state: FakeState, _match: RegExpExecArray, body: Record<string, unknown>): Reply {
  for (const model of list(body['models'])) {
    state.models.set(String(model['id']), model);
  }
  return ok({});
}

const ROUTES: [string, RegExp, Handler][] = [
  ['GET', /^\/api\/version$/, () => ok({ version: '0.13.3' })],
  ['GET', /^\/api\/models$/, () => ok({ data: [{ id: FAKE_BASE_MODEL }] })],
  ['GET', /^\/api\/v1\/groups\/$/, () => ok([FAKE_GROUP])],
  ['GET', /^\/api\/v1\/skills\/id\/([\w-]+)$/, readSkill],
  ['POST', /^\/api\/v1\/skills\/create$/, createSkill],
  ['POST', /^\/api\/v1\/skills\/id\/([\w-]+)\/update$/, updateSkill],
  [
    'POST',
    /^\/api\/v1\/skills\/id\/([\w-]+)\/access\/update$/,
    (state, match, body) => {
      const skill = state.skills.get(match[1] ?? '');

      if (skill !== undefined) {
        skill.grants = body['access_grants'];
      }
      return ok({});
    },
  ],
  ['POST', /^\/api\/v1\/knowledge\/create$/, createKnowledge],
  [
    'GET',
    /^\/api\/v1\/knowledge\/([\w-]+)$/,
    (state, match) => state.knowledge.has(match[1] ?? '') ? ok({}) : {
      status: 404,
      body: {},
    },
  ],
  ['POST', /^\/api\/v1\/knowledge\/([\w-]+)\/sync\/diff$/, (state, match, body) => ok(syncDiff(knowledgeOf(state, match[1] ?? ''), list(body['manifest'])))],
  ['POST', /^\/api\/v1\/knowledge\/([\w-]+)\/dirs\/create$/, makeDirectory],
  ['POST', /^\/api\/v1\/knowledge\/([\w-]+)\/sync\/cleanup$/, cleanup],
  [
    'POST',
    /^\/api\/v1\/knowledge\/([\w-]+)\/access\/update$/,
    (state, match, body) => {
      knowledgeOf(state, match[1] ?? '').grants = body['access_grants'];
      return ok({});
    },
  ],
  ['POST', /^\/api\/v1\/files\/\?.*$/, (state, _match, _body, raw) => uploadFile(state, raw)],
  ['GET', /^\/api\/v1\/files\/[\w-]+\/process\/status$/, () => ok({ status: 'completed' })],
  ['POST', /^\/api\/v1\/models\/import$/, importModels],
  [
    'POST',
    /^\/api\/v1\/models\/model\/access\/update$/,
    (state, _match, body) => {
      state.modelGrants.set(String(body['id']), body['access_grants']);
      return ok({});
    },
  ],
];

function route(state: FakeState, method: string, url: string, raw: string): Reply {
  const body = raw.startsWith('{') ? JSON.parse(raw) as Record<string, unknown> : {};

  for (const [
    routeMethod,
    pattern,
    handler,
  ] of ROUTES) {
    const match = pattern.exec(url);

    if (routeMethod === method && match !== null) {
      return handler(state, match, body, raw);
    }
  }
  return {
    status: 404,
    body: { detail: `no route ${method} ${url}` },
  };
}

function answer(state: FakeState, request: IncomingMessage, response: ServerResponse, raw: string): void {
  const method = request.method ?? 'GET';
  const url = request.url ?? '/';

  state.calls.push(`${method} ${url}`);
  const reply = request.headers.authorization === `Bearer ${FAKE_TOKEN}` ? route(state, method, url, raw) : {
    status: 401,
    body: { detail: 'Not authenticated' },
  };

  response.writeHead(reply.status, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(reply.body));
}

function emptyState(): FakeState {
  return {
    calls: [],
    skills: new Map(),
    knowledge: new Map(),
    models: new Map(),
    modelGrants: new Map(),
    counter: 0,
  };
}

export async function startFakeOpenWebUi(): Promise<{
  url: string;
  state: FakeState;
  close: () => Promise<void>;
}> {
  const state = emptyState();
  const server = createServer((request, response) => {
    const chunks: Buffer[] = [];

    request.on('data', (chunk: Buffer) => chunks.push(chunk));
    request.on('end', () => {
      answer(
        state,
        request,
        response,
        Buffer
          .concat(chunks)
          .toString('latin1'),
      );
    });
  });

  await new Promise<void>((resolve) => {
    server.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address() as AddressInfo;

  return {
    url: `http://127.0.0.1:${String(address.port)}`,
    state,
    close: async () => {
      await new Promise<void>((resolve) => {
        server.close(() => {
          resolve();
        });
      });
    },
  };
}
