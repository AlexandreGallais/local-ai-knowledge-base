---
title: "@angular-eslint/template/attributes-order (part 3 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/attributes-order.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/template/attributes-order (part 3 of 3)

```html
<svg><ng-template #Template let-value><line x1="1" x2="2" y1="3" y2="4"></line></ng-template></svg>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true,
        "order": [
          "STRUCTURAL_DIRECTIVE",
          "TEMPLATE_REFERENCE",
          "ATTRIBUTE_BINDING",
          "INPUT_BINDING",
          "TWO_WAY_BINDING",
          "OUTPUT_BINDING"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div alpha="a" beta="b" gamma="g"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true,
        "order": [
          "STRUCTURAL_DIRECTIVE",
          "TEMPLATE_REFERENCE",
          "ATTRIBUTE_BINDING",
          "INPUT_BINDING",
          "TWO_WAY_BINDING",
          "OUTPUT_BINDING"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div alpha="a" i18n-alpha="a18n" beta="b" i18n-beta="b18n" gamma="g" i18n-gamma="g18n"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true,
        "order": [
          "ATTRIBUTE_BINDING",
          "OUTPUT_BINDING",
          "INPUT_BINDING",
          "STRUCTURAL_DIRECTIVE",
          "TEMPLATE_REFERENCE",
          "TWO_WAY_BINDING"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div alpha="a" beta="{{ b }}" (gamma)="g()" [delta]="d"></div>
```
