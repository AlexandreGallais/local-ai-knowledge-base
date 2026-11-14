---
title: "no-restricted-imports (part 2 of 3)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-restricted-imports.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-restricted-imports (part 2 of 3)

## Options

This rule has both string and object options to specify the imported modules to restrict.

Using string option, you can specify  the name of a module that you want to restrict from being imported as a value in the rule options array:

```json
"no-restricted-imports": ["error", "import1", "import2"]
```

Examples of **incorrect** code for string option:

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", "fs"]*/

import fs from 'fs';
```

String options also restrict the module from being exported, as in this example:

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", "fs"]*/

export { fs } from 'fs';
```

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", "fs"]*/

export * from 'fs';
```

Examples of **correct** code for string option:

**Correct:**

```js
/*eslint no-restricted-imports: ["error", "fs"]*/

import crypto from 'crypto';
export { foo } from "bar";
```

You may also specify a custom message for a particular module using the `name` and `message` properties inside an object, where the value of the `name` is the name of the module and `message` property contains the custom message. (The custom message is appended to the default error message from the rule.)

```json
"no-restricted-imports": ["error", {
    "name": "import-foo",
    "message": "Please use import-bar instead."
}, {
    "name": "import-baz",
    "message": "Please use import-quux instead."
}]
```

Examples of **incorrect** code for string option:

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", {
    "name": "disallowed-import",
    "message": "Please use 'allowed-import' instead"
}]*/

import foo from 'disallowed-import';
```

### paths

This is an object option whose value is an array containing the names of the modules you want to restrict.

```json
"no-restricted-imports": ["error", { "paths": ["import1", "import2"] }]
```

Examples of **incorrect** code for `paths`:

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", { "paths": ["cluster"] }]*/

import cluster from 'cluster';
```

Custom messages for a particular module can also be specified in `paths` array using objects with `name` and `message`.

```json
"no-restricted-imports": ["error", {
    "paths": [{
        "name": "import-foo",
        "message": "Please use import-bar instead."
    }, {
        "name": "import-baz",
        "message": "Please use import-quux instead."
    }]
}]
```

#### importNames

This option in `paths` is an array and can be used to specify the names of certain bindings exported from a module. Import names specified inside `paths` array affect the module specified in the `name` property of corresponding object, so it is required to specify the `name` property first when you are using `importNames` or `message` option.

Specifying `"default"` string inside the `importNames` array will restrict the default export from being imported.

```json
"no-restricted-imports": ["error", {
  "paths": [{
    "name": "import-foo",
    "importNames": ["Bar"],
    "message": "Please use Bar from /import-bar/baz/ instead."
  }]
}]
```

Examples of **incorrect** code when `importNames` in `paths` has `"default"`:

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "foo",
    importNames: ["default"],
    message: "Please use the default import from '/bar/baz/' instead."
}]}]*/

import DisallowedObject from "foo";
```

Examples of **incorrect** code for `importNames` in `paths`:

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "foo",
    importNames: ["DisallowedObject"],
    message: "Please import 'DisallowedObject' from '/bar/baz/' instead."
}]}]*/

import { DisallowedObject } from "foo";

import { DisallowedObject as AllowedObject } from "foo";

import { "DisallowedObject" as SomeObject } from "foo";
```

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "foo",
    importNames: ["DisallowedObject"],
    message: "Please import 'DisallowedObject' from '/bar/baz/' instead."
}]}]*/

import * as Foo from "foo";
```

Examples of **correct** code for `importNames` in `paths`:

If the local name assigned to a default export is the same as a string in `importNames`, this will not cause an error.

**Correct:**

```js
/*eslint no-restricted-imports: ["error", { paths: [{ name: "foo", importNames: ["DisallowedObject"] }] }]*/

import DisallowedObject from "foo"
```

**Correct:**

```js
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "foo",
    importNames: ["DisallowedObject"],
    message: "Please import 'DisallowedObject' from '/bar/baz/' instead."
}]}]*/

import { AllowedObject as DisallowedObject } from "foo";
```

#### allowImportNames

This option is an array. Inverse of `importNames`, `allowImportNames` allows the imports that are specified inside this array. So it restricts all imports from a module, except specified allowed ones.

Note: `allowImportNames` cannot be used in combination with `importNames`.

```json
"no-restricted-imports": ["error", {
  "paths": [{
    "name": "import-foo",
    "allowImportNames": ["Bar"],
    "message": "Please use only Bar from import-foo."
  }]
}]
```

Examples of **incorrect** code for `allowImportNames` in `paths`:

Disallowing all import names except 'AllowedObject'.

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "foo",
    allowImportNames: ["AllowedObject"],
    message: "Please use only 'AllowedObject' from 'foo'."
}]}]*/

import { DisallowedObject } from "foo";
```

Examples of **correct** code for `allowImportNames` in `paths`:

Disallowing all import names except 'AllowedObject'.

**Correct:**

```js
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "foo",
    allowImportNames: ["AllowedObject"],
    message: "Only use 'AllowedObject' from 'foo'."
}]}]*/

import { AllowedObject } from "foo";
```

#### allowTypeImports (TypeScript only)

Whether to allow Type-Only Imports for a path. This includes type-only `export` statements, as they are equivalent to re-exporting an `import`. Default: `false`.

Examples of **incorrect** code for `allowTypeImports` in `paths`:

**Incorrect:**

```ts
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "import-foo",
    allowTypeImports: true,
    message: "Please use only type-only imports from 'import-foo'."
}]}]*/

import foo from 'import-foo';
export { Foo } from 'import-foo';
```

Examples of **correct** code for `allowTypeImports` in `paths`:

**Correct:**

```ts
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "import-foo",
    allowTypeImports: true,
    message: "Please use only type-only imports from 'import-foo'."
}]}]*/

import type foo from 'import-foo';
export type { Foo } from 'import-foo';

import type foo = require("import-foo");
```

**Correct:**

```ts
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "import-foo",
	importNames: ["Baz"],
    allowTypeImports: true,
    message: "Please use 'Baz' from 'import-foo' as a type only."
}]}]*/

import { Bar, type Baz } from "import-foo";
```
