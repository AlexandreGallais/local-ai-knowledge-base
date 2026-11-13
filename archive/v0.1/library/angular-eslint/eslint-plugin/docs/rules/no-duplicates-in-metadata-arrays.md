---
title: "@angular-eslint/no-duplicates-in-metadata-arrays"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-duplicates-in-metadata-arrays.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-duplicates-in-metadata-arrays`

Ensures that metadata arrays do not contain duplicate entries.

- Type: suggestion

## Rationale

Duplicate entries in Angular metadata arrays like providers, imports, declarations, or exports serve no purpose and indicate a mistake. When the same provider is listed twice in a providers array, Angular will create it twice, potentially leading to unexpected behavior with singleton services. Duplicate imports or declarations simply waste bundle size and make the metadata harder to read. These duplicates typically occur from copy-paste errors, merge conflicts, or refactoring mistakes. Catching these duplicates early prevents subtle bugs and keeps module metadata clean and understandable.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-duplicates-in-metadata-arrays": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule({
  providers: [ProviderA, ProviderB, ProviderA, ProviderB]
                                    ~~~~~~~~~  ~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-duplicates-in-metadata-arrays": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule({
  declarations: [DeclarationA, DeclarationB, DeclarationA, DeclarationB],
                                             ~~~~~~~~~~~~  ~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-duplicates-in-metadata-arrays": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule({
  imports: [ImportA, ImportB, ImportA, ImportB]
                              ~~~~~~~  ~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-duplicates-in-metadata-arrays": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule({
  exports: [ExportA, ExportB, ExportA, ExportB]
                              ~~~~~~~  ~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-duplicates-in-metadata-arrays": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  imports: [ImportA, ImportB, ImportA, ImportB]
                              ~~~~~~~  ~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-duplicates-in-metadata-arrays": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  providers: [ProviderA, ProviderB, ProviderA, ProviderB]
                                    ~~~~~~~~~  ~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-duplicates-in-metadata-arrays": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  viewProviders: [ViewProviderA, ViewProviderB, ViewProviderA, ViewProviderB]
                                                ~~~~~~~~~~~~~  ~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-duplicates-in-metadata-arrays": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styleUrls: ['a.css', 'b.css', 'a.css', 'b.css']
                                ~~~~~~~  ~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-duplicates-in-metadata-arrays": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  providers: [ProviderA, ProviderB, ProviderA, ProviderB]
                                    ~~~~~~~~~  ~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-duplicates-in-metadata-arrays": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule({
  imports: [
    ImportA,
    ImportB,
    ImportA,
    ~~~~~~~
    ImportB,
    ~~~~~~~
    ImportA
    ~~~~~~~
  ]
})
class Test {}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-duplicates-in-metadata-arrays": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@NgModule({
  providers: [ProviderA, ProviderB, ProviderC],
  declarations: [DeclarationA, DeclarationB, DeclarationC],
  imports: [ImportA, ImportB, ImportC],
  exports: [ExportA, ExportB, ExportC]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-duplicates-in-metadata-arrays": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  imports: [ImportA, ImportB, ImportC],
  providers: [ProviderA, ProviderB, ProviderC],
  viewProviders: [ViewProviderA, ViewProviderB, ViewProviderC],
  styleUrls: ['a.css', 'b.css', 'c.css']
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-duplicates-in-metadata-arrays": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  providers: [ProviderA, ProviderB, ProviderC],
})
class Test {}
```
