---
title: "Disallow accessing the value property of a BehaviorSubject instance (rxjs-x/no-subject-value)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-subject-value.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow accessing the `value` property of a `BehaviorSubject` instance (`rxjs-x/no-subject-value`)

💭 This rule requires type information.

This rule effects an error if the `value` property - or `getValue` method - of a `BehaviorSubject` is used.

## When Not To Use It

If your code uses the `value` property or the `getValue` method of `BehaviorSubject`,
then don't enable this rule.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Resources

- Rule source
- Test source
