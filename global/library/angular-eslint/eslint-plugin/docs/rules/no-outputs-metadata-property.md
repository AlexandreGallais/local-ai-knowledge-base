---
title: "@angular-eslint/no-outputs-metadata-property"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-outputs-metadata-property.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-outputs-metadata-property`

Disallows usage of the `outputs` metadata property

- Type: suggestion

## Rationale

Using the 'outputs' metadata property (@Component({ outputs: ['change'] })) is discouraged in favor of modern alternatives like the output() function (introduced in Angular v17.3) or the @Output() decorator. Modern approaches offer several benefits: (1) they make it immediately clear which properties are event emitters when reading the class, (2) configuration happens in one place right next to the property, (3) they work better with IDE features like Find References and Rename Refactoring, (4) output() uses OutputEmitterRef which provides better type safety and a more modern API than EventEmitter, and (5) @Output() decorator remains valid for EventEmitter-based outputs. The metadata property approach is a legacy pattern that obscures the component's interface and requires looking in two places (decorator metadata and class body) to understand the component's public API. For new code, prefer output() for its improved type safety or @Output() for traditional EventEmitter-based outputs.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-outputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  outputs: [
  ~~~~~~~~~~
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
    "@angular-eslint/no-outputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  outputs: [
  ~~~~~~~~~~
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
    "@angular-eslint/no-outputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  outputs,
  ~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-outputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  outputs: [],
  ~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-outputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const test = [];
@Component({
  'outputs': test,
  ~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-outputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  ['outputs']: undefined,
  ~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-outputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
function outputs() {
  return [];
}

@Component({
  [`outputs`]: outputs(),
  ~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-outputs-metadata-property": [
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
    "@angular-eslint/no-outputs-metadata-property": [
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
    "@angular-eslint/no-outputs-metadata-property": [
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
    "@angular-eslint/no-outputs-metadata-property": [
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
    "@angular-eslint/no-outputs-metadata-property": [
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
    "@angular-eslint/no-outputs-metadata-property": [
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
    "@angular-eslint/no-outputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const outputs = 'providers';
@Directive({
  [outputs]: [],
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-outputs-metadata-property": [
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
    "@angular-eslint/no-outputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'foo',
  hostDirectives: [{
    directive: CdkMenuItem,
    outputs: ['cdkMenuItemTriggered: triggered'],
  }]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-outputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'foo',
  'hostDirectives': [{
    directive: CdkMenuItem,
    outputs: ['cdkMenuItemTriggered: triggered'],
  }]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-outputs-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'foo',
  ['hostDirectives']: [{
    directive: CdkMenuItem,
    outputs: ['cdkMenuItemTriggered: triggered'],
  }]
})
class Test {}
```
