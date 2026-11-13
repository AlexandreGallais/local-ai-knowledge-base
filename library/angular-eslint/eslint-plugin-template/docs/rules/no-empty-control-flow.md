---
title: "@angular-eslint/template/no-empty-control-flow"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/no-empty-control-flow.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/no-empty-control-flow`

Ensures that control flow blocks are not empty. Empty control flow blocks usually occur due to refactoring that wasn't completed. They can cause confusion when reading code.

- Type: suggestion

## Rationale

Empty control flow blocks (@if, @else, @for, @switch, @case, @empty) usually indicate incomplete refactoring or code that was commented out or deleted but left the block structure behind. These empty blocks add no functionality but create visual noise and confusion when reading templates. Developers may wonder whether the empty block is intentional or a bug. Removing empty blocks keeps templates clean and makes it clear that there is no conditional logic or looping in that location. This rule helps maintain template quality and catches likely mistakes during development.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a) {} @else if (b) {
~~~~
  2
} @else {
  3
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a) {
~~~~
} @else if (b) {
  2
} @else {
  3
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a) {
  1
} @else if (b) {} @else {
  ~~~~~~~~~
  3
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a) {
  1
} @else if (b) {
  ~~~~~~~~~
} @else {
  3
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a) {
  1
} @else if (b) {
  2
} @else {}
  ~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a) {
  1
} @else if (b) {
  2
} @else {
  ~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {} @empty {
~~~~~
  2
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
~~~~~
} @empty {
  2
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  1
} @empty {}
  ~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track item.id) {
  1
} @empty {
  ~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@switch (condition) {}
~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@switch (condition) {
~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@switch (condition) {
  @case (a) {}
  ~~~~~~
  @default {
    2
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@switch (condition) {
  @case (a) {
  ~~~~~~
  }
  @default {
    2
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@switch (condition) {
  @case (a) {
    1
  }
  @default {}
  ~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@switch (condition) {
  @case (a) {
    1
  }
  @default {
  ~~~~~~~~~
  }
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a) {
    1
  } @else if (b) {
    2
  } @else {
    3
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a) {
    <!-- a -->
  } @else if (b) {
    <!-- b -->
  } @else {
    <!-- c -->
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a) {
     &nbsp;
  } @else if (b) {
     &nbsp;
  } @else {
     &nbsp;
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
    1
  } @empty {
    2
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
    <!-- a -->
  } @empty {
    <!-- b -->
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
    &nbsp;
  } @empty {
    &nbsp;
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@switch (condition) {
    @case (a) {
      1
    }
    @default {
      2
    }
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@switch (condition) {
    @case (a) {
      <!-- a -->
    }
    @default {
      <!-- b -->
    }
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-empty-control-flow": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@switch (condition) {
    @case (a) {
      &nbsp;
    }
    @default {
      &nbsp;
    }
  }
```
