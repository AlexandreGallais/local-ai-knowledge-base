---
title: "@angular-eslint/no-queries-metadata-property"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-queries-metadata-property.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-queries-metadata-property`

Disallows usage of the `queries` metadata property.

- Type: suggestion

## Rationale

Using the 'queries' metadata property (@Component({ queries: { child: new ViewChild('ref') } })) is discouraged in favor of decorator syntax (@ViewChild('ref')) because: (1) decorators make it immediately clear which properties are view/content queries when reading the class, (2) decorators allow configuration right next to the property declaration, (3) decorator syntax works better with IDE features and TypeScript type checking, and (4) the decorator approach is the standard modern Angular pattern. The metadata property approach is a legacy pattern that makes code harder to read and maintain.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-queries-metadata-property": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  queries: {
  ~~~~~~~~~~
    contentChild: new ContentChild(ChildDirective),
    contentChildren: new ContentChildren(ChildDirective),
    viewChild: new ViewChild(ChildDirective),
    viewChildren: new ViewChildren(ChildDirective)
  },
  ~
  selector: 'app-test'
})
class TestComponent {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-queries-metadata-property": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  queries: {
  ~~~~~~~~~
    contentChild: new ContentChild(ChildDirective),
    contentChildren: new ContentChildren(ChildDirective),
    viewChild: new ViewChild(ChildDirective),
    viewChildren: new ViewChildren(ChildDirective)
  },
  ~
  selector: 'app-test'
})
class TestDirective {}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-queries-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'app-test',
  template: 'Hello'
})
class TestComponent {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-queries-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: 'app-test'
})
class TestDirective {}
```
