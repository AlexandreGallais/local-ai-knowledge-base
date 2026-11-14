---
title: "@angular-eslint/use-component-selector"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/use-component-selector.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/use-component-selector`

Component selector must be declared

- Type: suggestion

## Rationale

Every component should have a selector that defines how it's used in templates. Omitting the selector makes the component unusable in templates and can only be used with dynamic component loading or routing, which is rarely the intent. When debugging, components without selectors are harder to identify in the component tree and browser DevTools. If a component is truly only meant for dynamic loading (like a modal or route component), you can disable this rule for that component, but in most cases, every component should have a meaningful selector.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-selector": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
~~~~~~~~~~~~
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-selector": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
~~~~~~~~~~~~
  selector: ''
})
~~
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-selector": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
~~~~~~~~~~~~
  selector: 0
})
~~
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-selector": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
~~~~~~~~~~~~
  selector: null
})
~~
class Test {}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-selector": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'sg-bar-foo'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-selector": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: "sg-bar-foo"
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-selector": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: `sg-bar-foo`
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-selector": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const selector = 'sg-bar-foo';
@Component({
  selector,
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-selector": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const selectorVar = 'sg-bar-foo';
@Component({
  selector: selectorVar,
})
class Test {}
```
