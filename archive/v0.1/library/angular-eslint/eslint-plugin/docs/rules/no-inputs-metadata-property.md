---
title: "@angular-eslint/no-inputs-metadata-property"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-inputs-metadata-property.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-inputs-metadata-property`

Disallows usage of the `inputs` metadata property

- Type: suggestion

## Rationale

Using the 'inputs' metadata property (@Component({ inputs: ['name'] })) is discouraged in favor of modern alternatives like the signal-based input() function (introduced in Angular v17.1) or the @Input() decorator. Modern approaches offer several benefits: (1) they make it immediately clear which properties are part of the component's API when reading the class, (2) configuration happens in one place right next to the property, (3) they work better with IDE features like Find References and Rename Refactoring, (4) input() provides signal-based reactivity with built-in features like required inputs, transforms, and aliases, and (5) @Input() decorator offers similar features for non-signal inputs. The metadata property approach is a legacy pattern that obscures the component's interface and requires looking in two places (decorator metadata and class body) to understand the component's API. For new code, prefer input() for signal-based reactivity or @Input() for traditional inputs.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-inputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  inputs: [
  ~~~~~~~~~
    'id: foo'
  ],
  ~
  selector: 'app-test'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-inputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  inputs: [
  ~~~~~~~~~
    'id: foo'
  ],
  ~
  selector: 'app-test'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-inputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  inputs,
  ~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-inputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  inputs: [],
  ~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-inputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const test = [];
@Component({
  'inputs': test,
  ~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-inputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  ['inputs']: undefined,
  ~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-inputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
function inputs() {
  return [];
}

@Component({
  [`inputs`]: inputs(),
  ~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-inputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-inputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-inputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-inputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const options = {};
@Component(options)
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-inputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: 'app-test',
  template: 'Hello'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-inputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'app-test',
  queries: {},
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-inputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const inputs = 'providers';
@Directive({
  [inputs]: [],
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-inputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@NgModule({
  bootstrap: [Foo]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-inputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'qx-menuitem',
  hostDirectives: [{
    directive: CdkMenuItem,
    inputs: ['cdkMenuItemDisabled: disabled'],
  }]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-inputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'qx-menuitem',
  'hostDirectives': [{
    directive: CdkMenuItem,
    inputs: ['cdkMenuItemDisabled: disabled'],
  }]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-inputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'qx-menuitem',
  ['hostDirectives']: [{
    directive: CdkMenuItem,
    inputs: ['cdkMenuItemDisabled: disabled'],
  }]
})
class Test {}
```
