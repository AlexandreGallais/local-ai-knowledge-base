---
title: "no-unnecessary-default-arguments"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unnecessary-default-arguments.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unnecessary-default-arguments

📝 Disallow arguments that match their parameter defaults.

🚫 Disabled by default.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Remove trailing arguments and object-literal properties that match their parameter defaults. Function declarations remain unchanged.

This rule is opt-in because explicit arguments can preserve behavior when an API's defaults change.

## Examples

```js
// ❌
function run(always = true) {}
run(true);

// ✅
run();
```

```js
// ❌
const format = (value, {unit = 'px', digits = 0} = {}) => {};
format(width, {unit: 'px', digits: 2});

// ✅
format(width, {digits: 2});
```

Middle arguments are retained to avoid shifting later arguments. Object arguments stay present as `{}` when their final property is removed, preserving outer defaults:

```js
// ❌
function run({enabled = true} = {enabled: false}) {}
run({enabled: true});

// ✅
run({});
```

## Type information

Local functions need no type information. Imported functions require TypeScript, typed linting (for example, `parserOptions.projectService: true`), and source implementations. Include JavaScript files through `allowJs` or `checkJs`. Declaration files alone are insufficient.

TypeScript, files using the TypeScript parser, and JavaScript with JSDoc types or `@ts-check` receive suggestions instead of autofixes. Review types before applying: defaults do not make explicitly typed properties optional, and removing arguments can affect inference.

## Supported patterns and limitations

The rule checks stable function declarations, `const` function/arrow initializers, and imported `export default` function/arrow expressions. Global script function declarations are skipped because writes through the global object cannot be tracked. Values must be primitive literals, including expression-free templates and signed numbers/bigints. `0` differs from `-0`; `undefined` belongs to `no-useless-undefined`.

Calls containing spreads retain positional arguments; object arguments before the first spread can still lose matching properties. Object spreads, computed/duplicate keys, accessors, methods, `__proto__`, and `Object.prototype` keys are skipped. Functions using `arguments`, generic/overloaded functions, and dynamic scope are skipped. Member calls, constructors, aliases, `wrap(fn)` initializers, JSX props, and legacy `Function#arguments`/`caller` reflection are unsupported. Imported function declarations are assumed not to be reassigned. Comments that would be discarded prevent edits, but still allow reports.
