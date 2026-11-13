---
title: "projects-workspace"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/examples/projects-workspace.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# projects-workspace

```ts
import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    // "test.workspace" is now "test.projects"
    workspace: [ // [!code --]
    projects: [ // [!code ++]
      { test: { name: "Unit" } },
      { test: { name: "Integration" } },
    ],
  },
});
```
