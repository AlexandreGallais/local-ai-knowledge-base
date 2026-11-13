---
title: "Stop and restart a sandbox"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes-api/cookbook/stop-and-restart-a-sandbox.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Stop and restart a sandbox

Stop a sandbox when you want to keep its disk but pause its execution. Start the same sandbox later to continue working with those files.

Use a sandbox handle obtained by creation or by reading its resource name. Stopping is different from deleting, which removes the sandbox.

## Stop the sandbox {#1-stop-the-sandbox}

Call stop and wait for the stopped state. The example returns a handle with the updated resource version.

Wait completion confirms the state change. A timeout means your client stopped waiting; read the sandbox to learn whether the operation completed.

**TypeScript**

```typescript
const changed = await sandbox.stop({ idempotencyKey: <example-value> });
return changed.waitUntilStopped();
```

**Complete TypeScript example: lifecycle/stop.ts**

```typescript
import type { Sandbox } from '@docker/sandboxes';

export async function stopSandbox(sandbox: Sandbox, requestId: string) {
  const changed = await sandbox.stop({ idempotencyKey: <example-value> });
  return changed.waitUntilStopped();
}
```

## Start it again {#2-start-it-again}

Do not reuse a handle whose version predates the stop.

Start the stopped sandbox and wait for it to run. As with stopping, the call returns a handle.

Do not assume that a process connection from before the stop remains usable. Find an existing process or start the work again as appropriate for the application.

A stopped sandbox still exists. Delete it when you no longer need its disk, and clean up separate snapshots or volumes only when their data is no longer needed.

**TypeScript**

```typescript
const changed = await sandbox.start({ idempotencyKey: <example-value> });
return changed.waitUntilRunning();
```

**Complete TypeScript example: lifecycle/start.ts**

```typescript
import type { Sandbox } from '@docker/sandboxes';

export async function startSandbox(sandbox: Sandbox, requestId: string) {
  const changed = await sandbox.start({ idempotencyKey: <example-value> });
  return changed.waitUntilRunning();
}
```
