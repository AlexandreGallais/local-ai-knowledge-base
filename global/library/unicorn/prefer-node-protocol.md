---
title: "prefer-node-protocol"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-node-protocol.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-node-protocol

📝 Prefer using the `node:` protocol when importing Node.js builtin modules.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

When getting builtin modules, it's better to use the `node:` protocol as it makes it perfectly clear that the package is a Node.js builtin module.

## Examples

```js
// ❌
import dgram from 'dgram';

// ✅
import dgram from 'node:dgram';
```

```js
// ❌
export {strict as default} from 'assert';

// ✅
export {strict as default} from 'node:assert';
```

```js
// ❌
import fs from 'fs/promises';

// ✅
import fs from 'node:fs/promises';
```

```js
// ❌
const fs = require('fs/promises');

// ✅
const fs = require('node:fs/promises');
```

```js
// ❌
const fs = process.getBuiltinModule('fs/promises');

// ✅
const fs = process.getBuiltinModule('node:fs/promises');
```

```ts
// ❌
type Fs = import('fs');

// ✅
type Fs = import('node:fs');
```
