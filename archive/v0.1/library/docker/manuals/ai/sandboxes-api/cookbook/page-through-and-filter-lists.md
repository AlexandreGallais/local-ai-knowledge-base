---
title: "Page through and filter lists"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes-api/cookbook/page-through-and-filter-lists.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Page through and filter lists

List resources without losing results at page boundaries. SDK collection iterators request each page for you; collecting materializes the complete result in memory.

Use an authenticated client. For a large account, process iterator items as they arrive instead of collecting them all.

## Walk every sandbox {#1-walk-every-sandbox}

Set a page size and iterate the sandbox collection. The example collects the results for convenience. A page size controls each request, not the total number of returned resources.

When using one-page methods directly, pass the returned next-page token <example-value> and keep the filter, order, and page size stable. Stop when no next token is returned, not when a page contains fewer items than requested.

**TypeScript**

```typescript
return client.all({ pageSize }).collect();
```

**Complete TypeScript example: pagination/walk.ts**

```typescript
import type { Sandboxes } from '@docker/sandboxes';

export async function walkSandboxes(client: Sandboxes, pageSize: number) {
  return client.all({ pageSize }).collect();
}
```

## Filter and order the result {#2-filter-and-order-the-result}

Pass a filter and ordering supported by the collection. The example uses images; choose a filter such as `status=completed` to select ready images.

Filters are strings interpreted by the service. Use the field names and operators documented for that list method rather than a language object's property names. An invalid filter should be fixed, not silently removed and retried as an unfiltered list.

**TypeScript**

```typescript
return client.images.all({ filter, orderBy }).collect();
```

**Complete TypeScript example: pagination/filter.ts**

```typescript
import type { Sandboxes } from '@docker/sandboxes';

export async function filterImages(
  client: Sandboxes,
  filter: string,
  orderBy: string,
) {
  return client.images.all({ filter, orderBy }).collect();
}
```
