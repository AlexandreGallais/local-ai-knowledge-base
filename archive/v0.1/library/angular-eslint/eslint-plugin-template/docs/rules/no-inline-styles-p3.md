---
title: "@angular-eslint/template/no-inline-styles (part 3 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/no-inline-styles.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/template/no-inline-styles (part 3 of 3)

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style.color]="color$ | async"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style.color]="isActive ? 'green' : 'gray'"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style.width]="width + 'px'"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style.width]="`${width}px`"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style.opacity]="-offset"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style.top.px]="positions[index]"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style.color]="config?.color"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div style="color: {{ textColor }}"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div bind-style="styleObject"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style]="{ ...baseStyles }"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowNgStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [ngStyle]="{ color: textColor }"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowNgStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [ngStyle]="styleObject"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowNgStyle": "dynamic",
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [ngStyle]="{ 'font-size.px': fontSize }" [style.color]="textColor"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowNgStyle": "dynamic",
        "allowBindToStyle": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [ngStyle]="{ color: textColor }" [style.color]="'red'"></div>
```
