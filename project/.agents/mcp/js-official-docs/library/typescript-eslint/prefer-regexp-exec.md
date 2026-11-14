---
title: "prefer-regexp-exec"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/prefer-regexp-exec.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# prefer-regexp-exec

`String#match` is defined to work the same as `RegExp#exec` when the regular expression does not include the `g` flag.
Keeping to consistently using one of the two can help improve code readability.

This rule reports when a `String#match` call can be replaced with an equivalent `RegExp#exec`.

> `RegExp#exec` may also be slightly faster than `String#match`; this is the reason to choose it as the preferred usage.

## Examples

**❌ Incorrect**

```ts
'something'.match(/thing/);

'some things are just things'.match(/thing/);

const text = 'something';
const search = /thing/;
text.match(search);
```

**✅ Correct**

```ts
/thing/.exec('something');

'some things are just things'.match(/thing/g);

const text = 'something';
const search = /thing/;
search.exec(text);
```

## When Not To Use It

If you prefer consistent use of `String#match` for both with `g` flag and without it, you can turn this rule off.
