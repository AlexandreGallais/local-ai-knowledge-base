---
id: no-restricted-imports
title: "No Angular Material, no CDK"
topic: practices
summary: "The team writes its own components: never import @angular/material nor @angular/cdk."
rule: "no-restricted-imports"
sample: angular-app
wrong-file: app/zz-wrong.ts
right-file: app/zz-right.ts
sources: "[S1] The official page of the rule, in the library of the base"
license: MIT, written for this base
---

# No Angular Material, no CDK

Rule: `no-restricted-imports`. The team writes its own components: never import @angular/material nor @angular/cdk.

## Why

The project does not use these libraries; the component is written in the project with the browser's own elements.

## Wrong

```ts
import { A11yModule } from '@angular/cdk/a11y';

export const zzWrong = [A11yModule];
```

## Right

```ts
import { signal } from '@angular/core';

export const zzRight = signal(0);
```

## Sources

- [S1] The official page of the rule: call the rule tool of the practices server, or search it with the docs tools.
