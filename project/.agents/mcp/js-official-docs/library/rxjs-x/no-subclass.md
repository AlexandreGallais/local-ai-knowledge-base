---
title: "Disallow subclassing RxJS classes (rxjs-x/no-subclass)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-subclass.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow subclassing RxJS classes (`rxjs-x/no-subclass`)

💼 This rule is enabled in the 🔒 `strict` config.

💭 This rule requires type information.

This rule effects failures if an RxJS class is subclassed. Developers are encouraged to avoid subclassing RxJS classes, as some public and protected implementation details might change in the future.

## When Not To Use It

If you need to subclass RxJS classes in your project, then don't use this rule.
However, keep in mind that implementation details may change in the future;
You might consider using ESLint disable comments for specific situations
instead of completely disabling this rule.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Resources

- Rule source
- Test source
