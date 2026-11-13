---
title: "Recover when the endpoint moves"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes-api/cookbook/recover-when-the-endpoint-moves.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Recover when the endpoint moves

Refresh a sandbox handle after a restart or connection change. A saved address can become stale even though the sandbox still has the same resource name.

Start with the handle your application already holds. Keep its name and UID; do not replace them with another sandbox's identity.

## Compare the current endpoint {#1-compare-the-current-endpoint}

Refresh the handle, then compare the old and new connection information. The SDK checks the resource identity while constructing the refreshed handle.

The example reports whether the endpoint changed and returns a refreshed handle. Use that handle for later process and file calls.

**TypeScript**

```typescript
const current = await held.refresh();
const before = held.core.endpoint;
const after = current.core.endpoint;
return {
  moved:
    before?.uri !== after?.uri || before?.protocol !== after?.protocol,
  current,
};
```

**Complete TypeScript example: rebind/detect.ts**

```typescript
import type { Sandbox } from '@docker/sandboxes';

export async function endpointMoved(held: Sandbox) {
  const current = await held.refresh();
  const before = held.core.endpoint;
  const after = current.core.endpoint;
  return {
    moved:
      before?.uri !== after?.uri || before?.protocol !== after?.protocol,
    current,
  };
}
```

## Run through the refreshed handle {#2-run-through-the-refreshed-handle}

Refresh before opening a new process connection. The SDK obtains the appropriate sandbox credential for the current endpoint; your application does not need to pass its Docker account token there.

This example starts new work after refresh. It does not replay a command whose completion is unknown. If an earlier command may still be running, find and reconnect to it first.

**TypeScript**

```typescript
const current = await held.refresh();
return current.processes.run({ args }, { timeoutMs: 300_000 });
```

**Complete TypeScript example: rebind/rebuild.ts**

```typescript
import type { Sandbox } from '@docker/sandboxes';

export async function runAndRebind(held: Sandbox, args: string[]) {
  const current = await held.refresh();
  return current.processes.run({ args }, { timeoutMs: 300_000 });
}
```
