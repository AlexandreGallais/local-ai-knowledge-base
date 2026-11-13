---
title: "What your workload starts with"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes-api/cookbook/what-your-workload-starts-with.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# What your workload starts with

Inspect the environment a process receives and override a value for one command. This helps diagnose a missing workspace path or configuration setting.

Use a running sandbox handle. The environment can contain credentials, so do not dump the full result into logs or send it to an untrusted client.

## Read the process environment {#1-read-the-process-environment}

Run `env` and parse its output. Read `WORKSPACE_DIR` to locate the workspace rather than assuming a fixed path.

This reports the environment seen by that process. It is a diagnostic example, not a way to retrieve stored secret values.

**TypeScript**

```typescript
export async function readFloor(sandbox: Sandbox) {
  const result = requireSuccess(
    await sandbox.processes.run({ args: ['env'] }, { timeoutMs: 300_000 }),
  );
  return Object.fromEntries(
    result.stdout
      .split('\n')
      .filter((line) => line.includes('='))
      .map((line) => {
        const delimiter = line.indexOf('=');
        return [line.slice(0, delimiter), line.slice(delimiter + 1)];
      }),
  );
}
```

**Complete TypeScript example: runtime/read.ts**

```typescript
import { requireSuccess, type Sandbox } from '@docker/sandboxes';

export async function readFloor(sandbox: Sandbox) {
  const result = requireSuccess(
    await sandbox.processes.run({ args: ['env'] }, { timeoutMs: 300_000 }),
  );
  return Object.fromEntries(
    result.stdout
      .split('\n')
      .filter((line) => line.includes('='))
      .map((line) => {
        const delimiter = line.indexOf('=');
        return [line.slice(0, delimiter), line.slice(delimiter + 1)];
      }),
  );
}
```

## Override a variable for one command {#2-override-a-variable-for-one-command}

Supply a value in the process request's environment map. The first command reads that override. A second command without the override reads the sandbox's original value.

The override belongs to the process request and does not change the sandbox's environment for later commands. Use it for task-specific configuration. For provider credentials, prefer stored secrets.

**TypeScript**

```typescript
const fromRequest = requireSuccess(
  await sandbox.processes.run(
    {
      args: ['printenv', name],
      env: { [name]: value },
    },
    { timeoutMs: 300_000 },
  ),
);
const fromSandbox = await sandbox.processes.run(
  {
    args: ['printenv', name],
  },
  { timeoutMs: 300_000 },
);
return {
  fromRequest: fromRequest.stdout.trimEnd(),
  fromSandbox: fromSandbox.stdout.trimEnd(),
};
```

**Complete TypeScript example: runtime/precedence.ts**

```typescript
import { requireSuccess, type Sandbox } from '@docker/sandboxes';

export async function overrideVariable(
  sandbox: Sandbox,
  name: string,
  value: string,
) {
  const fromRequest = requireSuccess(
    await sandbox.processes.run(
      {
        args: ['printenv', name],
        env: { [name]: value },
      },
      { timeoutMs: 300_000 },
    ),
  );
  const fromSandbox = await sandbox.processes.run(
    {
      args: ['printenv', name],
    },
    { timeoutMs: 300_000 },
  );
  return {
    fromRequest: fromRequest.stdout.trimEnd(),
    fromSandbox: fromSandbox.stdout.trimEnd(),
  };
}
```
