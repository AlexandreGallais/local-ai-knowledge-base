---
title: "@angular-eslint/prefer-signals (part 3 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/prefer-signals.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/prefer-signals (part 3 of 3)

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error",
      {
        "preferQuerySignals": false
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  @ContentChildren('test')
  value: QueryList<Widget>;
}
```
