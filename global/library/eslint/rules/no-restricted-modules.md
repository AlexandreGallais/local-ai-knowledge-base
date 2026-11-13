---
title: "no-restricted-modules"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-restricted-modules.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-restricted-modules

A module in Node.js is a simple or complex functionality organized in a JavaScript file which can be reused throughout the Node.js
application. The keyword `require` is used in Node.js/CommonJS to import modules into an application. This way you can have dynamic loading where the loaded module name isn't predefined /static, or where you conditionally load a module only if it's "truly required".

Why would you want to restrict a module?

Disallowing usage of specific Node.js modules can be useful if you want to limit the available methods a developer can use. For example, you can block usage of the `fs` module if you want to disallow file system access.

## Rule Details

This rule allows you to specify modules that you don’t want to use in your application.

## Options

The rule takes one or more strings as options: the names of restricted modules.

```json
"no-restricted-modules": ["error", "foo-module", "bar-module"]
```

It can also take an object with lists of `paths` and gitignore-style `patterns` strings.

```json
"no-restricted-modules": ["error", { "paths": ["foo-module", "bar-module"] }]
```

```json
"no-restricted-modules": ["error", {
    "paths": ["foo-module", "bar-module"],
    "patterns": ["foo-module/private/*", "bar-module/*","!baz-module/good"]
}]
```

You may also specify a custom message for any paths you want to restrict as follows:

```json
"no-restricted-modules": ["error", {
  "name": "foo-module",
  "message": "Please use bar-module instead."
  }
]
```

or like this:

```json
"no-restricted-modules": ["error",{
"paths":[{
  "name": "foo-module",
  "message": "Please use bar-module instead."
  }]
}]
```

The custom message will be appended to the default error message. Please note that you may not specify custom error messages for restricted patterns as a particular module may match more than one pattern.

To restrict the use of all Node.js core modules (via <https://github.com/nodejs/node/tree/main/lib>):

```json
{
    "no-restricted-modules": ["error",
        "assert","buffer","child_process","cluster","crypto","dgram","dns","domain","events","freelist","fs","http","https","module","net","os","path","punycode","querystring","readline","repl","smalloc","stream","string_decoder","sys","timers","tls","tracing","tty","url","util","vm","zlib"
    ]
}
```

Examples of **incorrect** code for this rule  with sample `"fs", "cluster", "lodash"` restricted modules:

**Incorrect:**

```js
/*eslint no-restricted-modules: ["error", "fs", "cluster"]*/

const fs = require('fs');
const cluster = require('cluster');
```

**Incorrect:**

```js
/*eslint no-restricted-modules: ["error", {"paths": ["cluster"] }]*/

const cluster = require('cluster');
```

**Incorrect:**

```js
/*eslint no-restricted-modules: ["error", { "patterns": ["lodash/*"] }]*/

const pick = require('lodash/pick');
```

Examples of **correct** code for this rule with sample `"fs", "cluster", "lodash"` restricted modules:

**Correct:**

```js
/*eslint no-restricted-modules: ["error", "fs", "cluster"]*/

const crypto = require('crypto');
```

**Correct:**

```js
/*eslint no-restricted-modules: ["error", {
    "paths": ["fs", "cluster"],
    "patterns": ["lodash/*", "!lodash/pick"]
}]*/

const crypto = require('crypto');
const pick = require('lodash/pick');
```
