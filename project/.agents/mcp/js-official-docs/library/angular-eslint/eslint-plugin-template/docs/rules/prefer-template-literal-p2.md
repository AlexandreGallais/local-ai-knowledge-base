---
title: "@angular-eslint/template/prefer-template-literal (part 2 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/prefer-template-literal.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/template/prefer-template-literal (part 2 of 3)

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{
'a'
~~~
 +
~~~
'b'
~~~
}}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 'pre"fix-' + '-suf\'fix' }}
   ~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ "pre'fix-" + "-suf\"fix" }}
   ~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ `prefix-${value}-suffix` + `-prefix2-${value2}-suffix2` }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ `prefix-${a}-${b + '-special\'"\`-char'}-${d}-suffix` }}
                  ~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ `prefix-${a}-${b + `-inside-${c}`}-${d}-suffix` }}
                  ~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ `prefix-${a}-${'b' + 'c'}-${d}-suffix` }}
                  ~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 'pre"fix-' + "-suf'fix" }}
   ~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 'pre`fix-' + `'pre\`fix"-${value}-"suf\`fix'` }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ "pre'fix-" + '-suf"fix' }}
   ~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ "pre`fix-" + `'pre\`fix"-${value}-"suf\`fix'` }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
<my-component [class]="'prefix-' + myClass | pipe"></my-component>
                       ~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
@if (value() + "-suffix" | pipe) {}
     ~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
@defer (when value() + '-suffix' | pipe) {}
             ~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
@let letValue = value() + '-suffix';
                ~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 'prefix-' + 42 }}
   ~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 'prefix-' + null }}
   ~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 'prefix-' + undefined }}
   ~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 'prefix-' + true }}
   ~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 'prefix-' + value }}
   ~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 'prefix-' + value() }}
   ~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 'prefix-' + [42] }}
   ~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 'prefix-' + (condition ? 'true' : 'false') }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 'prefix-' + ('value' | pipe) }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ "prefix-" + 42 }}
   ~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ "prefix-" + null }}
   ~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ "prefix-" + undefined }}
   ~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ "prefix-" + true }}
   ~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ "prefix-" + value }}
   ~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ "prefix-" + value() }}
   ~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ "prefix-" + [42] }}
   ~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 'prefix-' + (condition ? 'true' : 'false') }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 'prefix-' + ('value' | pipe) }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ `prefix-${value}-suffix` + 42 }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ `prefix-${value}-suffix` + null }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ `prefix-${value}-suffix` + undefined }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ `prefix-${value}-suffix` + false }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ `prefix-${value}-suffix` + value2 }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ `prefix-${value}-suffix` + value2() }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ `prefix-${value}-suffix` + [42] }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ `prefix-${value}-suffix` + (condition ? 'true' : 'false') }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ `prefix-${value}-suffix` + ('value' | pipe) }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 42 + '-suffix' }}
   ~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ null + '-suffix' }}
   ~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ undefined + '-suffix' }}
   ~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ true + '-suffix' }}
   ~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ value + '-suffix' }}
   ~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ value() + '-suffix' }}
   ~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ [42] + '-suffix' }}
   ~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ `'pre\`fix"-${value}-"suf\`fix'` + '-suf`fix' }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ (condition ? 'true' : 'false') + '-suffix' }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config
