---
title: "Interface: Docker"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/reference/api/extensions-sdk/Docker.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Interface: Docker

**`Since`**

0.2.0

## Properties

### cli

• `Readonly` **cli**: `DockerCommand`

You can also directly execute the Docker binary.

```typescript
const output = await ddClient.docker.cli.exec("volume", [
  "ls",
  "--filter",
  "dangling=true"
]);
```

Output:

```json
{
  "stderr": "...",
  "stdout": "..."
}
```

For convenience, the command result object also has methods to easily parse it depending on output format. See ExecResult instead.

---

Streams the output as a result of the execution of a Docker command.
It is useful when the output of the command is too long, or you need to get the output as a stream.

```typescript
await ddClient.docker.cli.exec("logs", ["-f", "..."], {
  stream: {
    onOutput(data): void {
        // As we can receive both `stdout` and `stderr`, we wrap them in a JSON object
        JSON.stringify(
          {
            stdout: data.stdout,
            stderr: data.stderr,
          },
          null,
          "  "
        );
    },
    onError(error: any): void {
      console.error(error);
    },
    onClose(exitCode: number): void {
      console.log("onClose with exit code " + exitCode);
    },
  },
});
```

## Methods

### listContainers

▸ **listContainers**(`options?`): `Promise`<`unknown`\>

Get the list of running containers (same as `docker ps`).

By default, this will not list stopped containers.
You can use the option `{"all": true}` to list all the running and stopped containers.

```typescript
const containers = await ddClient.docker.listContainers();
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `any` | (Optional). A JSON like `{ "all": true, "limit": 10, "size": true, "filters": JSON.stringify({ status: ["exited"] }), }` For more information about the different properties see the Docker API endpoint documentation. |

#### Returns

`Promise`<`unknown`\>

---

### listImages

▸ **listImages**(`options?`): `Promise`<`unknown`\>

Get the list of local container images

```typescript
const images = await ddClient.docker.listImages();
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `any` | (Optional). A JSON like `{ "all": true, "filters": JSON.stringify({ dangling: ["true"] }), "digests": true * }` For more information about the different properties see the Docker API endpoint documentation. |

#### Returns

`Promise`<`unknown`\>
