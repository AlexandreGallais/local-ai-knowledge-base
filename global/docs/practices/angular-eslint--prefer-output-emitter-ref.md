---
id: angular-eslint--prefer-output-emitter-ref
title: "output(), not @Output() and EventEmitter"
topic: practices
summary: "Declare an output with 'readonly changed = output<string>()'."
rule: "@angular-eslint/prefer-output-emitter-ref"
sample: angular-app
wrong-file: app/zz-wrong.ts
right-file: app/zz-right.ts
sources: "[S1] The official page of the rule, in the library of the base"
license: MIT, written for this base
---

# output(), not @Output() and EventEmitter

Rule: `@angular-eslint/prefer-output-emitter-ref`. Declare an output with "readonly changed = output<string>()".

## Why

output() is the current Angular API; the decorator form is the old one that models still write.

## Wrong

```ts
import {
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-zz-wrong',
  template: '',
})
export class ZzWrong {
  @Output() public readonly changed = new EventEmitter<string>();
}
```

## Right

```ts
import {
  Component,
  output,
} from '@angular/core';

@Component({
  selector: 'app-zz-right',
  template: '',
})
export class ZzRight {
  public readonly changed = output<string>();
}
```

## Sources

- [S1] The official page of the rule: call the rule tool of the practices server, or search it with the docs tools.
