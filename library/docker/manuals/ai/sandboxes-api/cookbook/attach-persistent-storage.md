---
title: "Attach persistent storage"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes-api/cookbook/attach-persistent-storage.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Attach persistent storage

Keep project data after a sandbox is deleted by mounting a persistent volume. A volume is an independent resource: deleting a sandbox does not delete the volume.

Start with an authenticated client, a managed image from Register and manage an image, and an absolute mount path such as `/workspace/data`.

## Create a volume {#1-create-a-volume}

Choose a display name and an idempotency key for the create request. Save the returned volume name, such as `volumes/…`. That name identifies the volume in later requests; its display name is only a label.

**TypeScript**

```typescript
return client.volumes.create(
  { displayName: name },
  { idempotencyKey: requestId },
);
```

**Complete TypeScript example: volumes/create.ts**

```typescript
import type { Sandboxes } from '@docker/sandboxes';

export async function createVolume(
  client: Sandboxes,
  name: string,
  requestId: string,
) {
  return client.volumes.create(
    { displayName: name },
    { idempotencyKey: requestId },
  );
}
```

## Mount it in a new sandbox {#2-mount-it-in-a-new-sandbox}

Supply the volume name and destination path when creating the sandbox. The example accepts a map of volume names to mount paths and waits for the sandbox to run. For Cloud Sandboxes, supply one entry and use exclusive attachment. Volume access must be enabled for your account; memory-snapshot images do not support volume attachment.

Attachments belong to the sandbox's creation settings. To mount the volume elsewhere, create another sandbox with the attachment. With exclusive attachment, release the first sandbox before attaching the volume to another one. Avoid overlapping mount paths.

Write a file under the mount path, delete the sandbox, then attach the volume to a new sandbox to read it again. Files outside the mount remain on the sandbox's own disk.

**TypeScript**

```typescript
const sandbox = await client.create(
  {
    displayName: name,
    image,
    storage: {
      volumes: [...mountPaths].map(([volume, target]) => ({
        volume,
        target,
      })),
    },
  },
  { timeoutMs: 300_000, idempotencyKey: requestId },
);
return sandbox.waitUntilRunning();
```

**Complete TypeScript example: volumes/attach.ts**

```typescript
import type { Sandboxes } from '@docker/sandboxes';

export async function createWithVolumes(
  client: Sandboxes,
  name: string,
  image: string,
  mountPaths: Map<string, string>,
  requestId: string,
) {
  const sandbox = await client.create(
    {
      displayName: name,
      image,
      storage: {
        volumes: [...mountPaths].map(([volume, target]) => ({
          volume,
          target,
        })),
      },
    },
    { timeoutMs: 300_000, idempotencyKey: requestId },
  );
  return sandbox.waitUntilRunning();
}
```

## Delete the volume {#3-delete-the-volume}

Delete the sandbox using the volume first, then delete the volume through its handle. If the service reports that it is still in use, wait for sandbox deletion to finish before retrying.

Deleting the volume permanently removes its contents. Copy out anything you need to keep.

**TypeScript**

```typescript
await volume.delete();
```

**Complete TypeScript example: volumes/delete.ts**

```typescript
import type { Volume } from '@docker/sandboxes';

export async function deleteVolume(volume: Volume) {
  await volume.delete();
}
```
