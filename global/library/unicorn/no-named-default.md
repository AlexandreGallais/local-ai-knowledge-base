---
title: "no-named-default"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-named-default.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-named-default

📝 Disallow named usage of default import and export.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Enforces the use of the `default import` and `default export` syntax instead of named syntax.

The named form is easy to mistake for a named specifier during refactors; dedicated default syntax makes the binding's intent explicit.

## Examples

```js
// ❌
import {default as foo} from 'foo';

// ✅
import foo from 'foo';
```

```js
// ❌
import {default as foo, bar} from 'foo';

// ✅
import foo, {bar} from 'foo';
```

```js
// ❌
export {foo as default};

// ✅
export default foo;
```

```js
// ❌
export {foo as default, bar};

// ✅
export default foo;
export {bar};
```

```js
// ❌
import foo, {default as anotherFoo} from 'foo';

function bar(foo) {
	doSomeThing(anotherFoo, foo);
}

// ✅
import foo from 'foo';
import anotherFoo from 'foo';

function bar(foo) {
	doSomeThing(anotherFoo, foo);
}

// ✅
import foo from 'foo';

const anotherFoo = foo;

function bar(foo) {
	doSomeThing(anotherFoo, foo);
}
```
