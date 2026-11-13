---
title: "@angular-eslint/computed-must-return"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/computed-must-return.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/computed-must-return`

Ensures that computed() returns a value. Omitting the value is likely a mistake.

- Type: problem

## Rationale

`computed()` is used to transform signal values. If no value is returned from `computed()`, it's likely a mistake.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
computed(() => {});
~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
computed(() => {
~~~~~~~~~~~~~~~~
  y();
  ~~~~
});
~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
computed(function() {
~~~~~~~~~~~~~~~~~~~~~
  y();
  ~~~
});
~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
computed(() => {
~~~~~~~~~~~~~~~~
  return;
  ~~~~~~~
});
~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
computed(function() {
~~~~~~~~~~~~~~~~~~~~~
  return;
  ~~~~~~~
});
~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  x = computed(() => {
      ~~~~~~~~~~~~~~~~
    y();
    ~~~
  });
  ~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
computed(() => {}, { equal: (a, b) => {} });
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
computed(() => {
~~~~~~~~~~~~~~~~
  const nested = () => {
  ~~~~~~~~~~~~~~~~~~~~~~
    return 2;
    ~~~~~~~~~
  }
  ~
});
~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const computed = 2;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class computed {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const x = computed;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
computed()
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
    computed = 2;
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
    computed() {};
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
    x = computed(() => y());
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
function computedFactory() {
    return computed(() => {
      return 2;
    });
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
computed(() => {
    return 2;
  });
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
computed(function() {
    return 2;
  });
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
computed(() => {
    return () => {};
  });
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
computed(() => {
    return undefined;
  });
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
Test.computed(() => {});
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
instance.computed(() => {});
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
computed(() => {
      if (condition()) {
        return;
      }

      return 2;
    })
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/computed-must-return": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
computed(() => {
      if (condition()) {
        return;
      }

      return 2;
    })
```
