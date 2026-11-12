---
id: typescript-nodejs
title: Node.js versions and built-in APIs
topic: typescript
summary: Node.js LTS lines, running TypeScript files directly, and built-in APIs that replace packages. Node.js 22 to 26.
tool: node
version: "26"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5]
license: MIT, written for this base; facts summarized from the Node.js documentation (MIT)
variant: files
---

# Node.js versions and built-in APIs

Contents: 1. Versions · 2. Running a TypeScript file · 3. Built-in APIs · Sources

## 1. Versions (Node.js LTS)

| Node.js | Released | State on 2026-11-12 | Angular that accepts it |
| --- | --- | --- | --- |
| 26 | 2026-05-05 | LTS | 22 |
| 24 | 2025-05-06 | LTS | 20, 21; 22 from 24.15 |
| 22 | 2024-04-24 | LTS | 18 to 21; 22 from 22.22.3 |
| 20 | 2023-04-17 | End of life | 17 to 21 |

Use only LTS versions in production. From version 27, one major version a year, and every version becomes LTS. [S1] [S2]

## 2. Running a TypeScript file directly (Node.js type stripping)

From Node.js 22.18, `node file.ts` runs a TypeScript file with no option. Node.js replaces the types by spaces: it checks no type and ignores `tsconfig.json`. [S3]

- Refused: `enum`, a `namespace` with code, parameter properties in a constructor, decorators, `.tsx` files.
- Write the extension in each import: `import { x } from './file.ts'`. Write `import type` for a type.
- A `.ts` file under `node_modules` is refused.

Wrong:

```ts
enum Mode { Fix, Check }
import { checkBase } from './check-base';
```

Right:

```ts
const MODES = ['fix', 'check'] as const;
import { checkBase } from './check-base.ts';
```

## 3. Built-in APIs that replace packages (Node.js 22 to 26)

| API | Since | Replaces |
| --- | --- | --- |
| `node --watch` | 22, stable | A tool that restarts on change |
| `glob`, `globSync` in `node:fs` | 22 | A file pattern package |
| `WebSocket` (client) | 22 | A WebSocket client package |
| `fetch`, `util.parseArgs`, `node:test` and `node --test` | 22 at most: the scripts and tests of this base use them with 22.18 | An HTTP client, an argument parser, a test runner |
| `require()` of an ES module | 22.12 | CommonJS and ES module workarounds |
| `Temporal` | 26 | A date library |

[S4] [S2] [S5]

## Sources

- [S1] Node.js, "Releases", <https://nodejs.org/en/about/previous-releases>, read 2026-11-12, MIT, summarized.
- [S2] Angular Team, "Version compatibility", v22, <https://angular.dev/reference/versions>, read 2026-11-12, CC BY 4.0, summarized.
- [S3] Node.js, "Modules: TypeScript", v26, <https://nodejs.org/api/typescript.html>, read 2026-11-12, MIT, summarized.
- [S4] Node.js, "Node.js 22 is now available!", <https://nodejs.org/en/blog/announcements/v22-release-announce>, and "Node.js 26.0.0", <https://nodejs.org/en/blog/release/v26.0.0>, read 2026-11-12, summarized.
- [S5] Scripts and tests of this base, run with Node.js 22.18.0 and 24.18.0 on 2026-11-13.
