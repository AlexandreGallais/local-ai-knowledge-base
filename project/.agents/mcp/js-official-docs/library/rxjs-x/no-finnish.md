---
title: "Disallow Finnish notation (rxjs-x/no-finnish)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-finnish.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow Finnish notation (`rxjs-x/no-finnish`)

💭 This rule requires type information.

This rule prevents the use of Finnish notation.

## Rule details

Examples of **incorrect** code for this rule:

```ts
const answer$ = of(42, 54);
```

Examples of **correct** code for this rule:

```ts
const answers = of(42, 54);
```

## When Not To Use It

If you use Finnish notation in your project, you should avoid this rule.
Or if you don't care if Finnish notation is used in your project, then you don't need this rule.
However, keep in mind that inconsistent style can harm readability in a project.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Further reading

- Observables and Finnish Notation

## Related To

- `finnish`

## Resources

- Rule source
- Test source
