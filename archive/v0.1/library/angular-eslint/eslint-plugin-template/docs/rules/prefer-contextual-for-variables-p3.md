---
title: "@angular-eslint/template/prefer-contextual-for-variables (part 3 of 4)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/prefer-contextual-for-variables.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/template/prefer-contextual-for-variables (part 3 of 4)

```json
{
  "rules": {
    "@angular-eslint/template/prefer-contextual-for-variables": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index + 1 === $count) {
       ~~~~~~~~~~~~~~~~~~~~~
    last item
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index + 1 == $count) {
       ~~~~~~~~~~~~~~~~~~~~
    last item
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index === $count - 1) {
       ~~~~~~~~~~~~~~~~~~~~~
    last item
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index == $count - 1) {
       ~~~~~~~~~~~~~~~~~~~~
    last item
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($count === $index + 1) {
       ~~~~~~~~~~~~~~~~~~~~~
    last item
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($count == $index + 1) {
       ~~~~~~~~~~~~~~~~~~~~
    last item
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($count - 1 === $index) {
       ~~~~~~~~~~~~~~~~~~~~~
    last item
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($count - 1 == $index) {
       ~~~~~~~~~~~~~~~~~~~~
    last item
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index + 1 < $count) {
       ~~~~~~~~~~~~~~~~~~~
    not last item
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index + 1 !== $count) {
       ~~~~~~~~~~~~~~~~~~~~~
    not last item
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index < $count - 1) {
       ~~~~~~~~~~~~~~~~~~~
    not last item
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index !== $count - 1) {
       ~~~~~~~~~~~~~~~~~~~~~
    not last item
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($count > $index + 1) {
       ~~~~~~~~~~~~~~~~~~~
    not last item
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($count !== $index + 1) {
       ~~~~~~~~~~~~~~~~~~~~~
    not last item
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($count - 1 > $index) {
       ~~~~~~~~~~~~~~~~~~~
    not last item
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($count - 1 !== $index) {
       ~~~~~~~~~~~~~~~~~~~~~
    not last item
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if (!($index % 2)) {
       ~~~~~~~~~~~~~
    is even
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index % 2 === 0) {
       ~~~~~~~~~~~~~~~~
    is even
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index % 2 == 0) {
       ~~~~~~~~~~~~~~~
    is even
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index % 2 !== 1) {
       ~~~~~~~~~~~~~~~~
    is even
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index % 2 != 1) {
       ~~~~~~~~~~~~~~~
    is even
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index % 2 < 1) {
       ~~~~~~~~~~~~~~
    is even
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if (0 === $index % 2) {
       ~~~~~~~~~~~~~~~~
    is even
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if (0 == $index % 2) {
       ~~~~~~~~~~~~~~~
    is even
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if (1 !== $index % 2) {
       ~~~~~~~~~~~~~~~~
    is even
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if (1 !== $index % 2) {
       ~~~~~~~~~~~~~~~~
    is even
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if (1 > $index % 2) {
       ~~~~~~~~~~~~~~
    is even
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if (!$odd) {
       ~~~~~
    is even
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index % 2 === 1) {
       ~~~~~~~~~~~~~~~~
    is odd
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index % 2 == 1) {
       ~~~~~~~~~~~~~~~
    is odd
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index % 2 !== 0) {
       ~~~~~~~~~~~~~~~~
    is odd
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index % 2 != 0) {
       ~~~~~~~~~~~~~~~
    is odd
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index % 2 > 0) {
       ~~~~~~~~~~~~~~
    is odd
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if (1 === $index % 2) {
       ~~~~~~~~~~~~~~~~
    is odd
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if (1 == $index % 2) {
       ~~~~~~~~~~~~~~~
    is odd
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if (0 !== $index % 2) {
       ~~~~~~~~~~~~~~~~
    is odd
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if (0 != $index % 2) {
       ~~~~~~~~~~~~~~~
    is odd
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if (0 < $index % 2) {
       ~~~~~~~~~~~~~~
    is odd
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if (!$even) {
       ~~~~~~
    is odd
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if (!!($index % 2)) {
        ~~~~~~~~~~~~~
    is odd
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  {{ foo && $index % 2 }}
            ~~~~~~~~~~
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  {{ $index % 2 && foo }}
     ~~~~~~~~~~
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  {{ $index % 2 ? 1 : 2 }}
     ~~~~~~~~~~
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

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  @if ($index % 2) {}
       ~~~~~~~~~~
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

#### ❌ Invalid Code

```html
@for (example of examples; track example; let index = $index; let last = $last) {
                                              ~~~~~~~~~~~~~~      ~~~~~~~~~~~~
  {{ index }}
  {{ last }}
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

#### ❌ Invalid Code

```html
@for (a of outer; track a.id) {
  @if ($index === 0) {
       ~~~~~~~~~~~~
    first outer
  }
  @for (b of inner; track b.id) {
    @if ($index === 0) {
         ~~~~~~~~~~~~
      first inner
    }
  }
}
```

---

**✅ - Toggle examples of correct code for this rule**

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
@for (item of items; track $index) {}
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
          "$index": [
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
@for (item of items; track item.id; let beta = $index) {}
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
          "$count": [
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
@for (item of items; track item.id; let beta = $count) {}
```

---

#### Custom Config
