---
title: "@angular-eslint/template/prefer-contextual-for-variables (part 2 of 4)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/prefer-contextual-for-variables.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/template/prefer-contextual-for-variables (part 2 of 4)

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

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
@for (item of items; track item.id; let index = $index) {}
                                        ~~~~~~~~~~~~~~
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
@for (item of items; track item.id; let foo = $index) {}
                                        ~~~~~~~~~~~~
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
@for (item of items; track item.id; let count = $count) {}
                                        ~~~~~~~~~~~~~~
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
@for (item of items; track item.id; let foo = $count) {}
                                        ~~~~~~~~~~~~
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
@for (item of items; track item.id; let first = $first) {}
                                        ~~~~~~~~~~~~~~
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
@for (item of items; track item.id; let foo = $first) {}
                                        ~~~~~~~~~~~~
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
@for (item of items; track item.id; let last = $last) {}
                                        ~~~~~~~~~~~~
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
@for (item of items; track item.id; let foo = $last) {}
                                        ~~~~~~~~~~~
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
@for (item of items; track item.id; let even = $even) {}
                                        ~~~~~~~~~~~~
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
@for (item of items; track item.id; let foo = $even) {}
                                        ~~~~~~~~~~~
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
@for (item of items; track item.id; let odd = $odd) {}
                                        ~~~~~~~~~~
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
@for (item of items; track item.id; let foo = $odd) {}
                                        ~~~~~~~~~~
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
            "foo"
          ]
        }
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track item.id; let bar = $index) {}
                                        ~~~~~~~~~~~~
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
            "foo"
          ]
        }
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track item.id; let bar = $count) {}
                                        ~~~~~~~~~~~~
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
          "$first": [
            "foo"
          ]
        }
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track item.id; let bar = $first) {}
                                        ~~~~~~~~~~~~
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
            "foo"
          ]
        }
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track item.id; let bar = $last) {}
                                        ~~~~~~~~~~~
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
            "foo"
          ]
        }
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track item.id; let bar = $even) {}
                                        ~~~~~~~~~~~
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
            "foo"
          ]
        }
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track item.id; let bar = $odd) {}
                                        ~~~~~~~~~~
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
            "a"
          ],
          "$count": [
            "b"
          ]
        }
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track item.id; let x = $even, a = $index, b = $count) {,}
                                        ~~~~~~~~~
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
            "a"
          ],
          "$count": [
            "b"
          ]
        }
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track item.id; let a = $index, x = $even, b = $count) {,}
                                                    ~~~~~~~~~
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
            "a"
          ],
          "$count": [
            "b"
          ]
        }
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track item.id; let a = $index, b = $count, x = $even) {,}
                                                                ~~~~~~~~~
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
            "b"
          ]
        }
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track item.id; let a = $index, b = $count, x = $even) {,}
                                        ~~~~~~~~~~              ~~~~~~~~~
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
            "b"
          ]
        }
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track item.id; let a = $index, x = $even, b = $count) {,}
                                        ~~~~~~~~~~  ~~~~~~~~~
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
@for (item of items; track item.id; let a = $index, b = $even, c = $count) {,}
                                        ~~~~~~~~~~  ~~~~~~~~~  ~~~~~~~~~~
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
@for (item of items; track item.id; let foo = $index) {
                                        ~~~~~~~~~~~~
  {{ foo }}
  {{ foo + 1 }}
  <my-component [value]="foo"/>
  <div [attr.title]="foo"></div>
  @if (foo) {}
  @switch (foo) {}
  @let bar = foo + 1;
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
@for (item of items; track item.id; let foo = $count) {
                                        ~~~~~~~~~~~~
  {{ foo }}
  {{ foo + 1 }}
  <my-component [value]="foo"/>
  <div [attr.title]="foo"></div>
  @if (foo) {}
  @switch (foo) {}
  @let bar = foo + 1;
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
@for (item of items; track item.id; let foo = $first) {
                                        ~~~~~~~~~~~~
  {{ foo }}
  {{ foo + 1 }}
  <my-component [value]="foo"/>
  <div [attr.title]="foo"></div>
  @if (foo) {}
  @switch (foo) {}
  @let bar = foo + 1;
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
@for (item of items; track item.id; let foo = $last) {
                                        ~~~~~~~~~~~
  {{ foo }}
  {{ foo + 1 }}
  <my-component [value]="foo"/>
  <div [attr.title]="foo"></div>
  @if (foo) {}
  @switch (foo) {}
  @let bar = foo + 1;
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
@for (item of items; track item.id; let foo = $even) {
                                        ~~~~~~~~~~~
  {{ foo }}
  {{ foo + 1 }}
  <my-component [value]="foo"/>
  <div [attr.title]="foo"></div>
  @if (foo) {}
  @switch (foo) {}
  @let bar = foo + 1;
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
@for (item of items; track item.id; let foo = $odd) {
                                        ~~~~~~~~~~
  {{ foo }}
  {{ foo + 1 }}
  <my-component [value]="foo"/>
  <div [attr.title]="foo"></div>
  @if (foo) {}
  @switch (foo) {}
  @let bar = foo + 1;
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
  {{ $index + 1 }} of {{ items.length }}
                         ~~~~~~~~~~~~
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
@for (item of items(); track item.id) {
  {{ $index + 1 }} of {{ items().length }}
                         ~~~~~~~~~~~~~~
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
  @if ($index === 0) {
       ~~~~~~~~~~~~
    first item
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
  @if ($index == 0) {
       ~~~~~~~~~~~
    first item
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
  @if (0 === $index) {
       ~~~~~~~~~~~~
    first item
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
  @if (0 == $index) {
       ~~~~~~~~~~~
    first item
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
  @if ($index > 0) {
       ~~~~~~~~~~
    not first item
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
  @if ($index !== 0) {
       ~~~~~~~~~~~~
    not first item
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
  @if ($index != 0) {
       ~~~~~~~~~~~
    not first item
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
  @if (0 < $index) {
       ~~~~~~~~~~
    not first item
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
  @if (0 !== $index) {
       ~~~~~~~~~~~~
    not first item
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
  @if (0 != $index) {
       ~~~~~~~~~~~
    not first item
  }
}
```

---

#### Default Config
