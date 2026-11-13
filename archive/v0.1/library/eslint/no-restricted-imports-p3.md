---
title: "no-restricted-imports (part 3 of 3)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-restricted-imports.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-restricted-imports (part 3 of 3)

### patterns

This is also an object option whose value is an array. This option allows you to specify multiple modules to restrict using `gitignore`-style patterns or regular expressions.

Where `paths` option takes exact import paths, `patterns` option can be used to specify the import paths with more flexibility, allowing for the restriction of multiple modules within the same directory. For example:

```json
"no-restricted-imports": ["error", {
  "paths": [{
    "name": "import-foo",
  }]
}]
```

This configuration restricts import of the `import-foo` module but wouldn't restrict the import of `import-foo/bar` or `import-foo/baz`. You can use `patterns` to restrict both:

```json
"no-restricted-imports": ["error", {
    "paths": [{
      "name": "import-foo",
    }],
    "patterns": [{
      "group": ["import-foo/ba*"],
    }]
}]
```

This configuration restricts imports not just from `import-foo` using `path`, but also `import-foo/bar` and `import-foo/baz` using `patterns`.

To re-include a module when using `gitignore-`style patterns, add a negation (`!`) mark before the pattern. (Make sure these negated patterns are placed last in the array, as order matters)

```json
"no-restricted-imports": ["error", {
    "patterns": ["import1/private/*", "import2/*", "!import2/good"]
}]
```

You can also use regular expressions to restrict modules (see the `regex` option).

Examples of **incorrect** code for `patterns` option:

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", { "patterns": ["lodash/*"] }]*/

import pick from 'lodash/pick';
```

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", { "patterns": ["lodash/*", "!lodash/pick"] }]*/

import pick from 'lodash/map';
```

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", { "patterns": ["import1/*", "!import1/private/*"] }]*/

import pick from 'import1/private/someModule';
```

In this example, `"!import1/private/*"` is not reincluding the modules inside `private` because the negation mark (`!`) does not reinclude the files if it's parent directory is excluded by a pattern. In this case, `import1/private` directory is already excluded by the `import1/*` pattern. (The excluded directory can be reincluded using `"!import1/private"`.)

Examples of **correct** code for `patterns` option:

**Correct:**

```js
/*eslint no-restricted-imports: ["error", { "patterns": ["crypto/*"] }]*/

import crypto from 'crypto';
```

**Correct:**

```js
/*eslint no-restricted-imports: ["error", { "patterns": ["lodash/*", "!lodash/pick"] }]*/

import pick from 'lodash/pick';
```

**Correct:**

```js
/*eslint no-restricted-imports: ["error", { "patterns": ["import1/*", "!import1/private"] }]*/

import pick from 'import1/private/someModule';
```

#### group

The `patterns` array can also include objects. The `group` property is used to specify the `gitignore`-style patterns for restricting modules and the `message` property is used to specify a custom message.

Either of the `group` or `regex` properties is required when using the `patterns` option.

```json
"no-restricted-imports": ["error", {
    "patterns": [{
      "group": ["import1/private/*"],
      "message": "usage of import1 private modules not allowed."
    }, {
      "group": ["import2/*", "!import2/good"],
      "message": "import2 is deprecated, except the modules in import2/good."
    }]
}]
```

Examples of **incorrect** code for `group` option:

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["lodash/*"],
    message: "Please use the default import from 'lodash' instead."
}]}]*/

import pick from 'lodash/pick';
```

Examples of **correct** code for this `group` option:

**Correct:**

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["lodash/*"],
    message: "Please use the default import from 'lodash' instead."
}]}]*/

import lodash from 'lodash';
```

#### regex

The `regex` property is used to specify the regex patterns for restricting modules.

Note: `regex` cannot be used in combination with `group`.

```json
"no-restricted-imports": ["error", {
    "patterns": [{
      "regex": "import1/private/",
      "message": "usage of import1 private modules not allowed."
    }, {
      "regex": "import2/(?!good)",
      "message": "import2 is deprecated, except the modules in import2/good."
    }]
}]
```

Examples of **incorrect** code for `regex` option:

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    regex: "@app/(?!(api/enums$)).*",
}]}]*/

import Foo from '@app/api';
import Bar from '@app/api/bar';
import Baz from '@app/api/baz';
import Bux from '@app/api/enums/foo';
```

Examples of **correct** code for `regex` option:

**Correct:**

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    regex: "@app/(?!(api/enums$)).*",
}]}]*/

import Foo from '@app/api/enums';
```

#### caseSensitive

This is a boolean option and sets the patterns specified in the `group` or `regex` properties to be case-sensitive when `true`. Default is `false`.

```json
"no-restricted-imports": ["error", {
    "patterns": [{
      "group": ["import1/private/prefix[A-Z]*"],
      "caseSensitive": true
    }]
}]
```

Examples of **incorrect** code for `caseSensitive: true` option:

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["foo[A-Z]*"],
    caseSensitive: true
}]}]*/

import pick from 'fooBar';
```

Examples of **correct** code for `caseSensitive: true` option:

**Correct:**

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["foo[A-Z]*"],
    caseSensitive: true
}]}]*/

import pick from 'food';
```

#### importNames

You can also specify `importNames` within objects inside the `patterns` array. In this case, the specified names apply only to the associated `group` or `regex` property.

```json
"no-restricted-imports": ["error", {
    "patterns": [{
      "group": ["utils/*"],
      "importNames": ["isEmpty"],
      "message": "Use 'isEmpty' from lodash instead."
    }]
}]
```

Examples of **incorrect** code for `importNames` in `patterns`:

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    importNames: ['isEmpty'],
    message: "Use 'isEmpty' from lodash instead."
}]}]*/

import { isEmpty } from 'utils/collection-utils';
```

Examples of **correct** code for `importNames` in `patterns`:

**Correct:**

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    importNames: ['isEmpty'],
    message: "Use 'isEmpty' from lodash instead."
}]}]*/

import { hasValues } from 'utils/collection-utils';
```

#### allowImportNames

You can also specify `allowImportNames` within objects inside the `patterns` array. In this case, the specified names apply only to the associated `group` or `regex` property.

Note: `allowImportNames` cannot be used in combination with `importNames`, `importNamePattern` or `allowImportNamePattern`.

```json
"no-restricted-imports": ["error", {
    "patterns": [{
      "group": ["utils/*"],
      "allowImportNames": ["isEmpty"],
      "message": "Please use only 'isEmpty' from utils."
    }]
}]
```

Examples of **incorrect** code for `allowImportNames` in `patterns`:

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    allowImportNames: ['isEmpty'],
    message: "Please use only 'isEmpty' from utils."
}]}]*/

import { hasValues } from 'utils/collection-utils';
```

Examples of **correct** code for `allowImportNames` in `patterns`:

**Correct:**

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    allowImportNames: ['isEmpty'],
    message: "Please use only 'isEmpty' from utils."
}]}]*/

import { isEmpty } from 'utils/collection-utils';
```

#### importNamePattern

This option allows you to use regex patterns to restrict import names:

```json
"no-restricted-imports": ["error", {
    "patterns": [{
      "group": ["import-foo/*"],
      "importNamePattern": "^foo",
    }]
}]
```

Examples of **incorrect** code for `importNamePattern` option:

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    importNamePattern: '^is',
    message: "Use 'is*' functions from lodash instead."
}]}]*/

import { isEmpty } from 'utils/collection-utils';
```

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["foo/*"],
    importNamePattern: '^(is|has)',
    message: "Use 'is*' and 'has*' functions from baz/bar instead"
}]}]*/

import { isSomething, hasSomething } from 'foo/bar';
```

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["foo/*"],
    importNames: ["bar"],
    importNamePattern: '^baz',
}]}]*/

import { bar, bazQux } from 'foo/quux';
```

Examples of **correct** code for `importNamePattern` option:

**Correct:**

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    importNamePattern: '^is',
    message: "Use 'is*' functions from lodash instead."
}]}]*/

import isEmpty, { hasValue } from 'utils/collection-utils';
```

You can also use this option to allow only side-effect imports by setting it to a pattern that matches any name, such as `^`.

Examples of **incorrect** code for `importNamePattern` option:

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    importNamePattern: "^"
}]}]*/

import isEmpty, { hasValue } from 'utils/collection-utils';

import * as file from 'utils/file-utils';
```

Examples of **correct** code for `importNamePattern` option:

**Correct:**

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    importNamePattern: "^"
}]}]*/

import 'utils/init-utils';
```

#### allowImportNamePattern

This is a string option. Inverse of `importNamePattern`, this option allows imports that matches the specified regex pattern. So it restricts all imports from a module, except specified allowed patterns.

Note: `allowImportNamePattern` cannot be used in combination with `importNames`, `importNamePattern` or `allowImportNames`.

```json
"no-restricted-imports": ["error", {
    "patterns": [{
      "group": ["import-foo/*"],
      "allowImportNamePattern": "^foo",
    }]
}]
```

Examples of **incorrect** code for `allowImportNamePattern` option:

**Incorrect:**

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    allowImportNamePattern: '^has'
}]}]*/

import { isEmpty } from 'utils/collection-utils';
```

Examples of **correct** code for `allowImportNamePattern` option:

**Correct:**

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    allowImportNamePattern: '^is'
}]}]*/

import { isEmpty } from 'utils/collection-utils';
```

#### allowTypeImports (TypeScript only)

Whether to allow Type-Only Imports for a path. This includes type-only `export` statements, as they are equivalent to re-exporting an `import`. Default: `false`.

```json
"no-restricted-imports": ["error", {
  "patterns": [{
    "group": ["import/private/*"],
    "allowTypeImports": true,
  }]
}]
```

Examples of **incorrect** code for `allowTypeImports` in `patterns`:

**Incorrect:**

```ts
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["import/private/*"],
    allowTypeImports: true,
    message: "Please use only type-only imports from 'import/private/*'."
}]}]*/

import { foo } from 'import/private/bar';
export { foo } from 'import/private/bar';
```

Examples of **correct** code for `allowTypeImports` in `patterns`:

**Correct:**

```ts
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["import/private/*"],
    allowTypeImports: true,
    message: "Please use only type-only imports from 'import/private/*'."
}]}]*/

import type { foo } from 'import/private/bar';
export type { foo } from 'import/private/bar';

import type foo = require("import/private/bar");
```

**Correct:**

```ts
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["import/private/*"],
    importNames: ["Baz"],
    allowTypeImports: true,
    message: "Please use 'Baz' from 'import/private/*' as a type only."
}]}]*/

import { Bar, type Baz } from "import/private/bar";
```

## Known Limitations

TypeScript `import = require()` syntax is valid and the rule can recognize and lint such instances, but with certain limitations.

You can only fully restrict these imports, you cannot restrict them based on specific import names like `importNames`, `allowImportNames`, `importNamePattern`, or `allowImportNamePattern` options.

Examples of **incorrect** code for TypeScript import equals declarations:

**Incorrect:**

```ts
/*eslint no-restricted-imports: ["error", "disallowed-import"]*/

import foo = require("disallowed-import");
```

**Incorrect:**

```ts
/*eslint no-restricted-imports: ["error", { 
  "paths": [{ "name": "disallowed-import" }] 
}]*/

import foo = require("disallowed-import");
```

**Note:** Import name restrictions do not apply to TypeScript import equals declarations. The following configuration will not restrict the import equals declaration:

**Correct:**

```ts
/*eslint no-restricted-imports: ["error", { 
  "paths": [{ 
    "name": "foo",
    "importNames": ["foo"]
  }] 
}]*/

// This import equals declaration will NOT be restricted
// even though it imports the entire module
import foo = require("foo");
```

## When Not To Use It

Don't use this rule or don't include a module in the list for this rule if you want to be able to import a module in your project without an ESLint error or warning.
