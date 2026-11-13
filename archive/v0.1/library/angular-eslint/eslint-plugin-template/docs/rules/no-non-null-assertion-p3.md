---
title: "@angular-eslint/template/no-non-null-assertion (part 3 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/no-non-null-assertion.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/template/no-non-null-assertion (part 3 of 3)

```html
@switch (status) { @case ('active') { <div>Active</div> } }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@switch (user?.status) { @case ('active') { <div>Active</div> } }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@let userId = 42;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@let user = getUser();
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div *ngIf="condition">Content</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ a + b }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ value + 10 }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ a === b }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ value === 'test' }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ !value }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ a && b }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ condition ? value : other }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ condition ? 'yes' : 'no' }}
```
