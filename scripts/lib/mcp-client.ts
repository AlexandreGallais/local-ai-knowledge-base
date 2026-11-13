// A small MCP client for the tests: starts a server as a process, sends requests one per line,
// and reads the answers in order. No package.
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';

type Json = Record<string, unknown>;
type Send = (method: string, params?: Json) => Promise<Json>;

export interface ToolAnswer {
  text: string;
  isError: boolean;
}

export interface Client {
  request: Send;
  call: (tool: string, args: Json) => Promise<ToolAnswer>;
  close: () => void;
}

interface CallResult {
  content: { text: string }[];
  isError: boolean;
}

async function callWith(send: Send, tool: string, args: Json): Promise<ToolAnswer> {
  const answer = await send('tools/call', {
    name: tool,
    arguments: args,
  });
  const result = answer['result'] as CallResult;

  return {
    text: result.content[0]?.text ?? '',
    isError: result.isError,
  };
}

export function startServer(script: string, env: Record<string, string>): Client {
  const child = spawn(process.execPath, [script], {
    env: {
      ...process.env,
      ...env,
    },
  });
  const waiting: ((answer: Json) => void)[] = [];
  let next = 1;

  createInterface({ input: child.stdout }).on('line', (line) => {
    waiting.shift()?.(JSON.parse(line) as Json);
  });
  const request: Send = async (method, params = {}) => new Promise((done) => {
    waiting.push(done);
    child.stdin.write(`${JSON.stringify({
      jsonrpc: '2.0',
      id: next,
      method,
      params,
    })}\n`);
    next += 1;
  });

  return {
    request,
    call: async (tool, args) => callWith(request, tool, args),
    close: () => {
      child.kill();
    },
  };
}
