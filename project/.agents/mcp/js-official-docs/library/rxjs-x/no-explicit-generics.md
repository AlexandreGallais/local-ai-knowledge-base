---
title: "Disallow unnecessary explicit generic type arguments (rxjs-x/no-explicit-generics)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-explicit-generics.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow unnecessary explicit generic type arguments (`rxjs-x/no-explicit-generics`)

💭 This rule requires type information.

This rule prevents the use of explicit type arguments when the type arguments can be inferred.

## Rule details

Examples of **incorrect** code for this rule:

```ts
import { BehaviorSubject } from "rxjs";
const subject = new BehaviorSubject<number>(42); //Adding a type here is not useful
```

Examples of **correct** code for this rule:

```ts
import { BehaviorSubject } from "rxjs";
const subject = new BehaviorSubject(42);
```

```ts
import { BehaviorSubject } from "rxjs";
const subject = new BehaviorSubject<ISomeType | null>(null); //Allow union types to be defined, useful when things can be nullable
```

## Resources

- Rule source
- Test source
