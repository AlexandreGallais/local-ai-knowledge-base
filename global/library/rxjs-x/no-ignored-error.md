---
title: "Disallow calling subscribe without specifying an error handler (rxjs-x/no-ignored-error)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-ignored-error.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow calling `subscribe` without specifying an error handler (`rxjs-x/no-ignored-error`)

💼 This rule is enabled in the 🔒 `strict` config.

💭 This rule requires type information.

This rule enforces the passing of an error handler to `subscribe` calls.

## Rule details

Examples of **incorrect** code for this rule:

```ts
source.subscribe((value) => console.log(value));
```

```ts
source.subscribe({
  next: (value) => console.log(value)
});
```

Examples of **correct** code for this rule:

```ts
source.subscribe(
  (value) => console.log(value),
  (error) => console.error(error)
);
```

```ts
source.subscribe({
  next: (value) => console.log(value),
  error: (error) => console.error(error)
});
```

## When Not To Use It

If you're not worried about ignored errors, then in some cases it may be safe to not use this rule.
Or if you use operators like `catchError` to handle all errors, then in some cases it may be safe to not use this rule.
You might consider using ESLint disable comments for those specific situations
instead of completely disabling this rule.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Resources

- Rule source
- Test source
