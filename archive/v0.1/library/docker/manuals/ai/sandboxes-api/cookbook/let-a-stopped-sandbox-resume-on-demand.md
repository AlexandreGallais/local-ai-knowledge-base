---
title: "Let a stopped sandbox resume on demand"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes-api/cookbook/let-a-stopped-sandbox-resume-on-demand.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Let a stopped sandbox resume on demand

Let a request to a published application start a stopped sandbox. This can suit an application that should be available on demand without remaining active between uses.

Use an authenticated client and a managed image that starts the application. Publish its port before relying on requests to reach it.

## Configure resume on creation {#1-configure-resume-on-creation}

Set automatic resume in the sandbox's lifecycle options. Omit the value when you want the service default; explicitly set false to disable it.

The example waits for the initial startup. Automatic resume does not recover a deleted sandbox, and it does not replace application startup configuration.

**TypeScript**

```typescript
const sandbox = await client.create(
  { displayName: name, image, lifecycle: { autoResume } },
  { timeoutMs: 300_000, idempotencyKey: <example-value> },
);
return sandbox.waitUntilRunning();
```

**Complete TypeScript example: wake/configure.ts**

```typescript
import type { Sandboxes } from '@docker/sandboxes';

export async function createWithAutoResume(
  client: Sandboxes,
  name: string,
  image: string,
  autoResume: boolean | undefined,
  requestId: string,
) {
  const sandbox = await client.create(
    { displayName: name, image, lifecycle: { autoResume } },
    { timeoutMs: 300_000, idempotencyKey: <example-value> },
  );
  return sandbox.waitUntilRunning();
}
```

## Read the effective setting {#2-read-the-effective-setting}

Get the sandbox and inspect the effective lifecycle automatic-resume value together with its state. The example falls back to the timeout value for older responses and reports an error if neither value is present. An absent value is unknown, not disabled.

This checks what the service recorded; it does not send a request to the application or prove that the application can start. Authentication is still required.

To verify the whole flow, stop the sandbox, request its published application URL, and confirm that the application becomes ready. Allow for startup time and keep the application's own authentication enabled.

**TypeScript**

```typescript
const sandbox = await client.get(name);
const active =
  sandbox.effectiveFeatures?.lifecycle?.autoResume ??
  sandbox.effectiveFeatures?.timeouts?.autoResume;
if (active == null) {
  throw new Error(`sandbox ${name}: auto-resume setting is unknown`);
}
return {
  autoResume: active,
  status: sandbox.status,
};
```

**Complete TypeScript example: wake/verify.ts**

```typescript
import type { Sandboxes } from '@docker/sandboxes';

export async function autoResumeInForce(client: Sandboxes, name: string) {
  const sandbox = await client.get(name);
  const active =
    sandbox.effectiveFeatures?.lifecycle?.autoResume ??
    sandbox.effectiveFeatures?.timeouts?.autoResume;
  if (active == null) {
    throw new Error(`sandbox ${name}: auto-resume setting is unknown`);
  }
  return {
    autoResume: active,
    status: sandbox.status,
  };
}
```
