---
title: "regexp/no-potentially-useless-backreference"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-potentially-useless-backreference.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-potentially-useless-backreference

⚠️ This rule _warns_ in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

> disallow backreferences that reference a group that might not be matched

## :book: Rule Details

If the referenced group of a backreference is not matched because some other path leads to the backreference, the backreference will trivially accept (e.g. `/(?:(a)|b)\1/`). The same will happen if the captured text of the referenced group was reset before reaching the backreference.

This will not handle backreferences that always trivially accept. Use [regexp/no-useless-backreference] for that.

<eslint-code-block>

```js
/* eslint regexp/no-potentially-useless-backreference: "error" */

/* ✓ GOOD */
var foo = /(a+)b\1/;
var foo = /(a+)b|\1/;  // this will be done by regexp/no-useless-backreference

/* ✗ BAD */
var foo = /(?:(a)|b)\1/;
var foo = /(a)?b\1/;
var foo = /((a)|c)+b\2/;
```

</eslint-code-block>

### Possible fixes

_Note:_ Since this rule finds potential programming errors, there are no automatic fixes and suggestions. Fixing reports will always involve manually changing the regex. However, it is important to note that this rule reports _potential_ errors. If you are confident that a regex is correct, feel free to disable this rule for that regex.

One common pattern this rule reports is `/(a)?b\1/`. This typically happens when searching for optionally quoted text. While it is possible to move the `?` inside the capturing group, it is often better to explicitly factor out the `b` path: `/(a)b\1|b/`. Since quoted and unquoted text typically have slightly different syntax, this form encourages using the correct syntax for each case, resulting in more correct regexes.

Other patterns reported by this rule can typically also be fixed by factoring out the capturing group + backreference.

## :wrench: Options

Nothing.

## :couple: Related rules

- [regexp/no-useless-backreference]

## :heart: Compatibility

This rule was taken from [eslint-plugin-clean-regex].\
This rule is compatible with [clean-regex/no-potentially-empty-backreference] rule.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.9.0

## :mag: Implementation

- Rule source
- Test source
