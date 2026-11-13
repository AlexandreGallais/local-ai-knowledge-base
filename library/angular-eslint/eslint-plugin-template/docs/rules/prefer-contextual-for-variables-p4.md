---
title: "@angular-eslint/template/prefer-contextual-for-variables (part 4 of 4)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/prefer-contextual-for-variables.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/template/prefer-contextual-for-variables (part 4 of 4)

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error",
      {
        "allowedAliases": {
          "$first": [
            "alpha",
            "beta",
            "gamma"
          ]
        }
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id; let beta = $first) {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error",
      {
        "allowedAliases": {
          "$last": [
            "alpha",
            "beta",
            "gamma"
          ]
        }
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id; let beta = $last) {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error",
      {
        "allowedAliases": {
          "$even": [
            "alpha",
            "beta",
            "gamma"
          ]
        }
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id; let beta = $even) {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error",
      {
        "allowedAliases": {
          "$odd": [
            "alpha",
            "beta",
            "gamma"
          ]
        }
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id; let beta = $odd) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id; let outerVar = $index) {
  @for (b of inner; track b.id) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id; let outerVar = $count) {
  @for (b of inner; track b.id) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id; let outerVar = $first) {
  @for (b of inner; track b.id) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id; let outerVar = $last) {
  @for (b of inner; track b.id) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id; let outerVar = $even) {
  @for (b of inner; track b.id) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id; let outerVar = $odd) {
  @for (b of inner; track b.id) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id) {
  @for (b of inner; track b.id; let innerVar = $index) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id) {
  @for (b of inner; track b.id; let innerVar = $count) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id) {
  @for (b of inner; track b.id; let innerVar = $first) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id) {
  @for (b of inner; track b.id; let innerVar = $last) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id) {
  @for (b of inner; track b.id; let innerVar = $even) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id) {
  @for (b of inner; track b.id; let innerVar = $odd) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id; let outerVar = $index) {
  @for (b of inner; track b.id; let innerVar = $index) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id; let outerVar = $count) {
  @for (b of inner; track b.id; let innerVar = $count) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id; let outerVar = $first) {
  @for (b of inner; track b.id; let innerVar = $first) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id; let outerVar = $last) {
  @for (b of inner; track b.id; let innerVar = $last) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id; let outerVar = $even) {
  @for (b of inner; track b.id; let innerVar = $even) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id; let outerVar = $odd) {
  @for (b of inner; track b.id; let innerVar = $odd) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {}
{{ items.length }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer; track a.id) {
  @for (b of inner; track b.id) {
    {{ outer.length }}
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (a of outer(); track a.id) {
  @for (b of inner(); track b.id) {
    {{ outer().length }}
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
  {{ this.$index === 0 }}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
  {{ $index === this.$count - 1 }}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {}
{{ $index % 2 === 0 }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {}
{{ $index % 2 !== 0 }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {}
{{ !$even }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {}
{{ !$odd }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
  @if (this.$index % 2 === 0) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
  @if (this.$index % 2 !== 0) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
  {{ !this.$even }}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
  {{ !this.$odd }}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
  {{ $index % 2 }}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
  {{ $index % 2 === foo }}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
  {{ $index % 2 !== foo }}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
  {{ $index % 2 >= foo }}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
  {{ $index % 2 > foo }}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
  {{ $index % 2 <= foo }}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
  {{ $index % 2 < foo }}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
  {{ $index % 2 + foo }}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
  {{ $index % 2 - foo }}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
  {{ $index % 2 * foo }}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
  {{ $index % 2 / foo }}
}
```
