---
title: "Clean up unused imports"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/reference/migrations/cleanup-unused-imports.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Clean up unused imports

As of version 19, Angular reports when a component's `imports` array contains symbols that aren't used in its template.

Running this schematic will clean up all unused imports within the project.

Run the schematic using the following command:

```shell
ng generate @angular/core:cleanup-unused-imports
```

#### Before

```angular-ts
import {Component} from '@angular/core';
import {UnusedDirective} from './unused';

@Component({
  template: 'Hello',
  imports: [UnusedDirective],
})
export class MyComp {}
```

#### After

```angular-ts
import {Component} from '@angular/core';

@Component({
  template: 'Hello',
  imports: [],
})
export class MyComp {}
```
