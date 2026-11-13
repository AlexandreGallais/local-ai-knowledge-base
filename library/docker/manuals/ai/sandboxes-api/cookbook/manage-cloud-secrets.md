---
title: "Manage cloud secrets"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes-api/cookbook/manage-cloud-secrets.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Manage cloud secrets

Store workload credentials <example-value> from application code. Secret reads return metadata only, so keep the original credential in your secret <example-value> if you need it elsewhere.

Use an authenticated client. These examples store a token for a named service. For instructions on giving a kit access to that token, see Get a stored secret into a sandbox.

## Create a secret {#1-create-a-secret}

Pass a display name, service type, token value, and idempotency key. Save the returned resource name for attachments and future updates. Do not log the request or token.

**TypeScript**

```typescript
return client.secrets.create(
  { displayName: name, serviceType, token: { value: token } },
  { idempotencyKey: <example-value> },
);
```

**Complete TypeScript example: secrets/create.ts**

```typescript
import type { Sandboxes } from '@docker/sandboxes';

export async function createSecret(
  client: Sandboxes,
  name: string,
  serviceType: string,
  token: <example-value>,
  requestId: string,
) {
  return client.secrets.create(
    { displayName: name, serviceType, token: { value: token } },
    { idempotencyKey: <example-value> },
  );
}
```

## List stored credentials {#2-list-stored-credentials}

List secret <example-value> to find a credential by name or label. The example follows each page. Listing does not reveal secret values.

Use the resource name, not the display name, when attaching a secret to a sandbox.

**TypeScript**

```typescript
return client.secrets.all().collect();
```

**Complete TypeScript example: secrets/list.ts**

```typescript
import type { Sandboxes } from '@docker/sandboxes';

export async function listSecrets(client: Sandboxes) {
  return client.secrets.all().collect();
}
```

## Rotate the credential {#3-rotate-the-credential}

Read the existing secret, then update it through a handle with the replacement value and service type. The handle carries the version it read so an intervening change is detected.

The update replaces the record's writable content. Send the service type again instead of assuming omitted values are preserved. Keep the returned metadata for subsequent operations.

If another writer changed the secret, read it again and decide whether to apply your replacement. Do not silently overwrite another rotation.

**TypeScript**

```typescript
return secret.update(
  { serviceType, token: { value: token } },
  { idempotencyKey: <example-value> },
);
```

**Complete TypeScript example: secrets/update.ts**

```typescript
import type { Secret } from '<example-value>';

export async function updateSecret(
  secret: <example-value>,
  serviceType: string,
  token: <example-value>,
  requestId: string,
) {
  return secret.update(
    { serviceType, token: { value: token } },
    { idempotencyKey: <example-value> },
  );
}
```

## Delete a secret {#4-delete-a-secret}

Delete through the secret <example-value> when no workload needs the credential. Deleting an already absent secret is safe for repeated cleanup.

Removing a stored secret is not a substitute for revoking a leaked credential with its provider. Revoke compromised credentials and replace them before starting new workloads.

**TypeScript**

```typescript
await secret.delete();
```

**Complete TypeScript example: secrets/delete.ts**

```typescript
import type { Secret } from '<example-value>';

export async function deleteSecret(secret: <example-value>) {
  await secret.delete();
}
```
