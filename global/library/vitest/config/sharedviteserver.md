---
title: "sharedViteServer | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/sharedviteserver.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# sharedViteServer <CRoot />

- **Type:** `boolean`
- **Default:** `true`
- **CLI:** `--sharedViteServer=false`

Inline projects that don't modify the Vite config reuse the Vite server of the config that declares them. Instead of resolving a new Vite config and creating a new server for every project, such projects share the declaring config's server and its transform cache, so shared source files are transformed once instead of once per project and tests run faster. The performance improvement varies depending on the number of inline projects and how many source files they have in common.

This option _only_ applies to inline projects. Projects referenced as config files or directories always resolve their own Vite config and create their own server.

A project still gets its own Vite server when it defines Vite-level options that change the server (`plugins`, `resolve`, and so on), when its `extends` doesn't point to the declaring config (`extends: true` and a path that resolves to the declaring config file are equivalent), or when it defines test options that affect the Vite config:

- `alias`
- `browser`
- `css`
- `deps.moduleDirectories`
- `deps.optimizer`
- `mode`
- `root`

Options like `env`, `setupFiles`, `server.deps`, or `environment` don't prevent sharing: every project keeps its own module resolution rules, module runner, and module instances on top of the shared server.

The same applies to Vite-level values that don't change the server: an empty `plugins` list (`plugins: isCI ? [ciPlugin()] : []`) and `define`.

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      // these projects share the root Vite server
      { test: { name: 'unit', include: ['**/*.unit.test.ts'] } },
      { test: { name: 'integration', include: ['**/*.integration.test.ts'] } },
      // `define` doesn't create a new server, so this project also shares it
      { define: { __DEV__: 'true' }, test: { name: 'dev' } },
      // this project resolves its own Vite config because of `alias`
      { test: { name: 'aliased', alias: { lib: './src/lib' } } },
    ],
  },
})
```

**Tip:**
If every project repeats the same `plugins` entry, move it to the declaring config. The projects inherit it from the shared server and keep sharing:

```ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // hoisted: instantiated once on the shared server
  plugins: [react()],
  test: {
    projects: [
      { test: { name: 'unit', include: ['**/*.unit.test.ts'] } },
      { test: { name: 'integration', include: ['**/*.integration.test.ts'] } },
    ],
  },
})
```

To see the decision for every project, including why a project resolves its own server, run Vitest with `DEBUG=vitest:projects`. API consumers can check whether a project reuses the declaring config's server via `project.sharedViteServer`.

The option applies to every level: inline projects of a nested projects container share the container's server the same way.

**Warning:**
When projects share a server, the declaring config file is executed once instead of once per project. Plugins are instantiated once, and their `config` hooks cannot observe per-project test options. If a plugin needs to behave differently per project, disable this option or don't share the server for that project (for example, set `extends: false` or define the project in its own config file).
