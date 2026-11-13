---
title: "TypeScript 1.1"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 1.1.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 1.1

## Performance Improvements

The 1.1 compiler is typically around 4x faster than any previous release. See this blog post for some impressive charts.

## Better Module Visibility Rules

TypeScript now only strictly enforces the visibility of types in modules if the `declaration` flag is provided. This is very useful for Angular scenarios, for example:

```ts
module MyControllers {
  interface ZooScope extends ng.IScope {
    animals: Animal[];
  }
  export class ZooController {
    // Used to be an error (cannot expose ZooScope), but now is only
    // an error when trying to generate .d.ts files
    constructor(public $scope: ZooScope) {}
    /* more code */
  }
}
```
