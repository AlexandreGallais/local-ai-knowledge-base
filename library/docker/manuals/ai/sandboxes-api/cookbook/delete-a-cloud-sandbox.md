---
title: "Delete a cloud sandbox"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes-api/cookbook/delete-a-cloud-sandbox.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Delete a cloud sandbox

Delete a sandbox when its work is finished. Deletion removes its processes and sandbox-local files, so download results or save a snapshot first.

Use a current sandbox handle from creation or from reading its resource name. Closing the SDK client does not delete the sandbox.

## Delete and wait {#1-delete-and-wait}

Delete through the sandbox handle, then wait until the sandbox is absent. Deletion can terminate running work. If you choose to stop the sandbox first, wait for that transition to finish before deleting it: deletion during a stop or resume can be refused.

The example takes an idempotency key and a wait deadline. Its optional force setting requests deletion when the service would otherwise refuse the sandbox's state. It does not guarantee that every state can be deleted immediately; handle a refusal rather than assuming cleanup succeeded.

The handle supplies the resource version it read. When an operation returns an updated handle, keep that handle for your next operation; older handles do not update themselves.

If deletion fails because the resource version changed, call `refresh()`. Inspect the returned handle and decide whether deletion is still appropriate. Refreshing does not change the original handle, so call delete on the returned one. If you supply idempotency keys, use a new key: <example-value> the refreshed version is a new logical operation, not a retry of the refused request.

If the wait times out, read the sandbox again to check its state. Keep its name so you can retry cleanup if needed. Repeating a completed deletion is safe.

Separate resources such as volumes, snapshots, and stored secrets have their own lifetimes. Delete those only when nothing still needs them.

**TypeScript**

```typescript
const deleting = await sandbox.delete(
  { force },
  { idempotencyKey: <example-value> },
);
if (deleting) await deleting.waitUntilDeleted({ timeoutMs });
```

**Complete TypeScript example: removal/delete.ts**

```typescript
import type { Sandbox } from '@docker/sandboxes';

export async function deleteSandbox(
  sandbox: Sandbox,
  requestId: string,
  force = false,
  timeoutMs = 300_000,
) {
  const deleting = await sandbox.delete(
    { force },
    { idempotencyKey: <example-value> },
  );
  if (deleting) await deleting.waitUntilDeleted({ timeoutMs });
}
```
