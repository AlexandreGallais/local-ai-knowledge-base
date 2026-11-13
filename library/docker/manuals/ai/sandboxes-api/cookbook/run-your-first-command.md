---
title: "Run your first command"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes-api/cookbook/run-your-first-command.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Run your first command

Run a command in an existing sandbox and collect its output. Start with an authenticated client and the sandbox name returned by your first launch.

For most commands, use the process collection's run helper. It starts the process and waits for its result.

## Open the sandbox {#1-open-the-sandbox}

Get the sandbox by its resource name. The returned handle exposes processes and files and manages their authenticated connections. You do not need to copy the sandbox address or Docker token into a second client.

**TypeScript**

```typescript
return client.get(name);
```

**Complete TypeScript example: exec/endpoint.ts**

```typescript
import type { Sandboxes } from '@docker/sandboxes';

export async function processesAt(client: Sandboxes, name: string) {
  return client.get(name);
}
```

## Use the process run helper {#2-use-the-process-run-helper}

Pass an argument array: the program followed by its arguments, such as `['echo', 'Hello from Docker Sandboxes']`. Arguments are not shell syntax. For pipes, redirection, or variable expansion, run `sh -c` with your script as the next argument.

The run helper returns the process result after collecting output. A successful SDK call does not mean the command succeeded: inspect its exit code. Standard error is diagnostic output and can be nonempty even when the exit code is zero.

An SDK error means the request, wait, or connection failed. Keep the process handle carried by an error when available so you can inspect it instead of starting duplicate work. Error handling explains the distinction.

**TypeScript**

```typescript
return sandbox.processes.run({ args }, { timeoutMs: 300_000 });
```

**Complete TypeScript example: exec/outcome.ts**

```typescript
import type { Sandbox } from '@docker/sandboxes';

export async function classifyOutcome(sandbox: Sandbox, args: string[]) {
  return sandbox.processes.run({ args }, { timeoutMs: 300_000 });
}
```

## Optional: execute a command directly {#3-optional-execute-a-command-directly}

For a short command whose output you only need after it exits, direct execution is simpler: one request waits for the command and returns its captured output and exit code, without a separate process-creation and output-reading sequence.

Check the incomplete flag before treating captured output as complete. Choose streaming output when you need output while the command runs.

**TypeScript**

```typescript
const result = await endpoint.api.exec({ body: { cmd: args } });
```

**Complete TypeScript example: exec/exec.ts**

```typescript
import type { Sandbox } from '@docker/sandboxes';

export async function runCommand(sandbox: Sandbox, args: string[]) {
  const endpoint = await sandbox.endpointClient(['sandboxesExec'], 'exec');
  try {
    const result = await endpoint.api.exec({ body: { cmd: args } });
    return {
      exitCode: result.exitCode ?? 0,
      stdout: new TextDecoder().decode(result.stdout),
      stderr: new TextDecoder().decode(result.stderr),
      incomplete: result.incomplete ?? false,
    };
  } finally {
    await endpoint.close();
  }
}
```
