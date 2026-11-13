---
title: "Get image pull URLs"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes-api/cookbook/get-image-pull-urls.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Get image pull URLs

Obtain the registry references needed to pull a managed image with an OCI-compatible tool. This is useful when another part of your workflow needs the image content outside a sandbox.

You need an authenticated client and the image name returned by image registration.

## Get the pull information {#1-get-the-pull-information}

Read the image's pull specification. The result identifies its manifest digest and image references.

Pass those references to your OCI client. This example only retrieves the pull information; it does not download layers or authenticate a separate registry client. Treat any returned access information as sensitive, and do not publish it in logs.

**TypeScript**

```typescript
const image = await client.images.get(name);
return image.getPullSpec();
```

**Complete TypeScript example: pullspec/spec.ts**

```typescript
import type { Sandboxes } from '@docker/sandboxes';

export async function getImagePullSpec(client: Sandboxes, name: string) {
  const image = await client.images.get(name);
  return image.getPullSpec();
}
```
