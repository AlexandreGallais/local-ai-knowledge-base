---
title: "Run something that produces real output"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes-api/cookbook/run-something-that-produces-real-output.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Run something that produces real output

Choose how your application receives command output. Captured output is convenient for a short command; streaming lets you display progress or process output without waiting for completion.

Start with a running sandbox handle from your first sandbox. Supply the command as an argument array.

## Collect the result {#1-collect-the-result}

Run the process and wait for its result. Inspect standard output, standard error, and the exit code. Use an application deadline so a command cannot hold your request open indefinitely.

This form accumulates output for you. Prefer streaming when output could be large or your user needs progress updates.

**TypeScript**

```typescript
return sandbox.processes.run({ args }, { timeoutMs: 300_000 });
```

**Complete TypeScript example: longrun/choose.ts**

```typescript
import type { Sandbox } from '@docker/sandboxes';

export async function collectOutput(sandbox: Sandbox, args: string[]) {
  return sandbox.processes.run({ args }, { timeoutMs: 300_000 });
}
```

## Stream output as it arrives {#2-stream-output-as-it-arrives}

Start the process, connect to it, and consume output events. The example forwards each output chunk to a callback and returns the exit code from the exit event.

The callback owns what happens to each chunk: display it, append it to a file, or send it to a client. Do not log sensitive output indiscriminately.

Always close the connection. A stream that ends before an exit event is an incomplete observation, not proof of success. Keep the process name to reconnect rather than immediately starting a duplicate command.

Connections opened through TypeScript process handles reconnect after temporary disconnects while you consume output. They resume after the last delivered chunk and stop if recovery exceeds 30 seconds, without replaying process input. These connections have no default lifetime limit once connected, but a timeout you supply still limits the whole session. Raw streams require explicit reconnection.

**TypeScript**

```typescript
const process = await sandbox.processes.start(
  { args },
  { idempotencyKey: requestId },
);
const connection = await process.connect();
try {
  for await (const event of connection) {
    if (event.type === 'chunk') write(event.data ?? new Uint8Array());
    if (event.type === 'exited') return event.exitCode ?? 0;
  }
  throw new Error(
    `Output of ${process.name} ended before the command exited`,
  );
} finally {
  await connection.close();
}
```

**Complete TypeScript example: longrun/stream.ts**

```typescript
import type { Sandbox } from '@docker/sandboxes';

export async function streamOutput(
  sandbox: Sandbox,
  args: string[],
  requestId: string,
  write: (bytes: Uint8Array) => void,
) {
  const process = await sandbox.processes.start(
    { args },
    { idempotencyKey: requestId },
  );
  const connection = await process.connect();
  try {
    for await (const event of connection) {
      if (event.type === 'chunk') write(event.data ?? new Uint8Array());
      if (event.type === 'exited') return event.exitCode ?? 0;
    }
    throw new Error(
      `Output of ${process.name} ended before the command exited`,
    );
  } finally {
    await connection.close();
  }
}
```
