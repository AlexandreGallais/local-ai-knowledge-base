---
title: "Get a stored secret into a sandbox"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes-api/cookbook/get-a-stored-secret-into-a-sandbox.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Get a stored secret into a sandbox

Give an agent access to its provider without placing the real credential in its command arguments or source files. Store the credential once, then attach its secret name when creating each sandbox.

Start with an authenticated client. Obtain the provider credential from that provider and read it from your application's secret manager. For Claude Code, use an Anthropic API key and service type `anthropic`; the Docker login token is not an Anthropic key.

## Store the provider credential {#1-store-the-provider-credential}

Supply a display name, service type, token value, and an idempotency key. Save the returned secret name. The response contains metadata, never the stored token.

Choose the service type that matches the workload's provider. A token for one provider does not authenticate another agent.

**TypeScript**

```typescript
return client.secrets.create(
  { displayName: name, serviceType, token: { value: token } },
  { idempotencyKey: requestId },
);
```

**Complete TypeScript example: credinject/store.ts**

```typescript
import type { Sandboxes } from '@docker/sandboxes';

export async function storeSecret(
  client: Sandboxes,
  name: string,
  serviceType: string,
  token: string,
  requestId: string,
) {
  return client.secrets.create(
    { displayName: name, serviceType, token: { value: token } },
    { idempotencyKey: requestId },
  );
}
```

## Attach the secret at creation {#2-attach-the-secret-at-creation}

Put the secret name in the sandbox's storage options. This example uses a managed image; the same storage options can be passed when launching a named kit.

Attach the secret when creating the sandbox, before starting the agent. Passing a secret's display name instead of its resource name will not select it. Keep the real token on the client side of the storage step rather than duplicating it in environment variables.

The SDK returns a handle after the example waits for the sandbox to run. Use that handle to run the agent. To replace or delete the credential later, follow Manage cloud secrets.

**TypeScript**

```typescript
const sandbox = await client.create(
  { displayName: name, image, storage: { secrets: secretNames } },
  { timeoutMs: 300_000, idempotencyKey: requestId },
);
return sandbox.waitUntilRunning();
```

**Complete TypeScript example: credinject/attach.ts**

```typescript
import type { Sandboxes } from '@docker/sandboxes';

export async function createWithSecrets(
  client: Sandboxes,
  name: string,
  image: string,
  secretNames: string[],
  requestId: string,
) {
  const sandbox = await client.create(
    { displayName: name, image, storage: { secrets: secretNames } },
    { timeoutMs: 300_000, idempotencyKey: requestId },
  );
  return sandbox.waitUntilRunning();
}
```
