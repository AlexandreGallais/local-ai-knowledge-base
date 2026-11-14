---
title: "@angular-eslint/relative-url-prefix"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/relative-url-prefix.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/relative-url-prefix`

The ./ and ../ prefix is standard syntax for relative URLs; don't depend on Angular's current ability to do without that prefix.

- Type: suggestion

## Rationale

Using relative URLs (like './user-profile.component.html') instead of absolute URLs (like 'app/users/user-profile.component.html') for templateUrl and styleUrls makes components more portable and easier to refactor. When you move a component to a different directory, relative URLs don't need to be updated as long as the template and styles move with the component. This follows the principle of co-locating related files and makes refactoring safer. Relative URLs should typically start with './' for files in the same directory or '../' for files in parent directories.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/relative-url-prefix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styleUrls: ['./foo.css', 'bar.css', '../baz.scss', '../../test.css']
                           ~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/relative-url-prefix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  templateUrl: 'foobar.html'
               ~~~~~~~~~~~~~
})
class Test {}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/relative-url-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styleUrls: [
    './foo.css',
    '../bar.css',
    '../../baz.scss',
    '../../../baz.sass',
    './../test.css',
    '.././angular.sass'
  ]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/relative-url-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  templateUrl: './foobar.html'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/relative-url-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  templateUrl: '../foobar.html'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/relative-url-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  templateUrl: '../../foobar.html'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/relative-url-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  templateUrl: '../../../foobar.html'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/relative-url-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  templateUrl: './../foobar.html'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/relative-url-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  templateUrl: '.././foobar.html'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/relative-url-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  templateUrl: `../foobar.html`,
  styleUrls: [
    `.././foobar.css`,
  ]
})
class Test {}
```
