---
title: "Extension UI API"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/extensions/extensions-sdk/dev/api/overview.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Extension UI API

The extensions UI runs in a sandboxed environment and doesn't have access to any
electron or nodejs APIs.

The extension UI API provides a way for the frontend to perform different actions
and communicate with the Docker Desktop dashboard or the underlying system.

JavaScript API libraries, with Typescript support, are available in order to get all the API definitions in to your extension code.

- @docker/extension-api-client gives access to the extension API entrypoint `DockerDesktopClient`.
- @docker/extension-api-client-types can be added as a dev dependency in order to get types auto-completion in your IDE.

```typescript
import { createDockerDesktopClient } from '@docker/extension-api-client';

export function App() {
  // obtain Docker Desktop client
  const ddClient = createDockerDesktopClient();
  // use ddClient to perform extension actions
}
```

The `ddClient` object gives access to various APIs:

- Extension Backend
- Docker
- Dashboard
- Navigation

See also the Extensions API reference.
