---
title: "Get an SSH certificate"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes-api/cookbook/get-an-ssh-certificate.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Get an SSH certificate

Request a short-lived SSH certificate for access to a sandbox. Keep the private key on your machine; send only the public key to Docker.

You need an authenticated client, a sandbox name, and an SSH public key. Generate a key pair with your SSH tooling if you do not have one.

## Request the certificate {#1-request-the-certificate}

Pass the sandbox name and public key. Save the returned certificate using your SSH client's expected certificate-file format, alongside the matching private key.

The response supplies the connection details for the sandbox. Use them rather than guessing a hostname or port. The example returns those details; it does not start an SSH process.

A certificate expires. Request a new one when needed, and keep the private key and certificate out of your repository. For programmatic command execution without an SSH client, use processes.

**TypeScript**

```typescript
return sandbox.ssh.issueCertificate({
  publicKey,
  ttlMs: lifeSeconds * 1_000,
});
```

**Complete TypeScript example: ssh/certificate.ts**

```typescript
import type { Sandboxes } from '@docker/sandboxes';

export async function issueSSHCert(
  client: Sandboxes,
  sandboxName: string,
  publicKey: string,
  lifeSeconds: number,
) {
  const sandbox = await client.get(sandboxName);
  return sandbox.ssh.issueCertificate({
    publicKey,
    ttlMs: lifeSeconds * 1_000,
  });
}
```
