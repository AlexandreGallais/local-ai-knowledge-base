// The common core of the MCP servers of the base: JSON-RPC over stdio, one message per line, no
// package (decision 0012). It speaks the "initialize" handshake that OpenCode 2.2.7 uses by default,
// and the 2026-07-28 revision. Every answer is capped, every error is one line, and every call is
// written to the journal of the project: .agents/work/mcp-calls.log.
import {
  appendFileSync,
  existsSync,
  mkdirSync,
} from 'node:fs';
import { join } from 'node:path';
import { createInterface } from 'node:readline';

export type Arguments = Record<string, unknown>;

export interface Property {
  type: 'boolean' | 'number' | 'string';
  description: string;
  enum?: string[];
}

export interface Tool {
  name: string;
  description: string;
  properties: Record<string, Property>;
  required: string[];
  run: (args: Arguments) => Promise<string> | string;
}

export interface Server {
  name: string;
  version: string;
  instructions: string;
  tools: Tool[];
  // Characters at most in one answer; 16,000 is about 4,000 tokens.
  maxChars?: number;
  // Where the journal goes; the working folder by default.
  projectRoot?: string;
}

export interface ToolResult {
  text: string;
  isError: boolean;
}

type Json = Record<string, unknown>;

interface Request {
  id?: number | string | null;
  method?: string;
  params?: Json;
}

export const MODERN_VERSION = '2026-07-28';

export const LEGACY_VERSIONS = [
  '2025-11-25',
  '2025-06-18',
  '2025-03-26',
  '2024-11-05',
];

export const DEFAULT_MAX_CHARS = 16_000;
const VERSION_KEY = 'io.modelcontextprotocol/protocolVersion';

// An error the model can act on: shown as one line, never as a stack.
export class ToolError extends Error {}

export function text(args: Arguments, name: string): string {
  const value = args[name];

  return typeof value === 'string' ? value.trim() : '';
}

export function requiredText(args: Arguments, name: string): string {
  const value = text(args, name);

  if (value === '') {
    throw new ToolError(`Give "${name}".`);
  }
  return value;
}

export function cap(answer: string, maxChars: number): string {
  if (answer.length <= maxChars) {
    return answer;
  }
  const cut = answer.lastIndexOf('\n', maxChars);

  return `${answer.slice(0, cut > maxChars / 2 ? cut : maxChars)}\n[truncated: the answer is longer than ${maxChars} characters; ask for a smaller part]`;
}

function journal(server: Server, tool: string, answer: string): void {
  const root = server.projectRoot ?? process.env['PROJECT_ROOT'] ?? process.cwd();

  if (!existsSync(join(root, '.agents'))) {
    return;
  }
  try {
    const folder = join(root, '.agents', 'work');

    mkdirSync(folder, { recursive: true });
    appendFileSync(join(folder, 'mcp-calls.log'), `${new Date().toISOString()}\t${server.name}\t${tool}\t${answer.length} chars\t~${Math.ceil(answer.length / 4)} tokens\n`);
  } catch {
    // The journal must never break an answer.
  }
}

export async function callTool(server: Server, name: string, args: Arguments): Promise<ToolResult> {
  const tool = server.tools.find((item) => item.name === name);

  if (tool === undefined) {
    return {
      text: `Unknown tool "${name}". Tools: ${server.tools.map((item) => item.name).join(', ')}.`,
      isError: true,
    };
  }
  let result: ToolResult;

  try {
    result = {
      text: cap(await tool.run(args), server.maxChars ?? DEFAULT_MAX_CHARS),
      isError: false,
    };
  } catch (error) {
    const message = error instanceof ToolError ? error.message : `Internal error: ${(error as Error).message.split('\n')[0] ?? ''}`;

    result = {
      text: message,
      isError: true,
    };
  }
  journal(server, name, result.text);
  return result;
}

export function toolList(server: Server): Json[] {
  return server.tools.map((tool) => ({
    name: tool.name,
    description: tool.description,
    inputSchema: {
      type: 'object',
      properties: tool.properties,
      required: tool.required,
      additionalProperties: false,
    },
  }));
}

function reply(id: Request['id'], result: Json): Json {
  return {
    jsonrpc: '2.0',
    id,
    result,
  };
}

function failure(id: Request['id'], code: number, message: string): Json {
  return {
    jsonrpc: '2.0',
    id,
    error: {
      code,
      message,
    },
  };
}

function requestVersion(params: Json | undefined): string | undefined {
  const meta = params?.['_meta'];

  if (typeof meta !== 'object' || meta === null) {
    return undefined;
  }
  const version = (meta as Json)[VERSION_KEY];

  return typeof version === 'string' ? version : undefined;
}

function initialize(server: Server, request: Request): Json {
  const asked = request.params?.['protocolVersion'];

  return reply(request.id, {
    protocolVersion: typeof asked === 'string' && LEGACY_VERSIONS.includes(asked) ? asked : LEGACY_VERSIONS[0],
    capabilities: { tools: {} },
    serverInfo: {
      name: server.name,
      version: server.version,
    },
    instructions: server.instructions,
  });
}

async function operation(server: Server, request: Request, modern: boolean): Promise<Json> {
  const complete = modern ? { resultType: 'complete' } : {};

  if (request.method === 'ping') {
    return reply(request.id, {});
  }
  if (request.method === 'server/discover') {
    return reply(request.id, {
      ...complete,
      supportedVersions: [
        MODERN_VERSION,
        ...LEGACY_VERSIONS,
      ],
      capabilities: { tools: {} },
      instructions: server.instructions,
    });
  }
  if (request.method === 'tools/list') {
    return reply(request.id, {
      ...complete,
      tools: toolList(server),
    });
  }
  if (request.method === 'tools/call') {
    const params = request.params ?? {};
    const args = typeof params['arguments'] === 'object' && params['arguments'] !== null ? params['arguments'] as Arguments : {};
    const result = await callTool(server, String(params['name']), args);

    return reply(request.id, {
      ...complete,
      content: [
        {
          type: 'text',
          text: result.text,
        },
      ],
      isError: result.isError,
    });
  }
  return failure(request.id, -32601, `Method not found: ${String(request.method)}`);
}

// Answers one request, or returns undefined for a notification.
export async function handle(server: Server, request: Request): Promise<Json | undefined> {
  if (request.id === undefined || request.id === null) {
    return undefined;
  }
  if (request.method === 'initialize') {
    return initialize(server, request);
  }
  const version = requestVersion(request.params);

  if (version !== undefined && version !== MODERN_VERSION) {
    return failure(request.id, -32022, `Unsupported protocol version ${version}`);
  }
  return await operation(server, request, version !== undefined);
}

export async function handleLine(server: Server, line: string): Promise<Json | undefined> {
  if (line.trim() === '') {
    return undefined;
  }
  let request: unknown;

  try {
    request = JSON.parse(line);
  } catch {
    return failure(null, -32700, 'Parse error');
  }
  if (typeof request !== 'object' || request === null || Array.isArray(request)) {
    return failure(null, -32600, 'Invalid request');
  }
  return await handle(server, request as Request);
}

// Reads requests on stdin, one per line, and writes each answer on stdout, in order.
export function serve(server: Server): void {
  const lines = createInterface({ input: process.stdin });
  let queue = Promise.resolve();

  lines.on('line', (line) => {
    queue = queue.then(async () => {
      const answer = await handleLine(server, line);

      if (answer !== undefined) {
        process.stdout.write(`${JSON.stringify(answer)}\n`);
      }
    });
  });
}
