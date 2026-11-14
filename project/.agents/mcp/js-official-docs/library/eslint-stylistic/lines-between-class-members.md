---
title: "lines-between-class-members"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/lines-between-class-members/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# lines-between-class-members

This rule improves readability by enforcing lines between class members. It will not check empty lines before the first member and after the last member, since that is already taken care of by padded-blocks.

## Rule Details

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/* eslint @stylistic/lines-between-class-members: ["error", "always"] */
class MyClass {
  x;
  foo() {
    //...
  }
  bar() {
    //...
  }
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/* eslint @stylistic/lines-between-class-members: ["error", "always"] */
class MyClass {
  x;

  foo() {
    //...
  }

  bar() {
    //...
  }
}
```

Examples of additional **correct** code for this rule:

**Correct:**

```js
/* eslint @stylistic/lines-between-class-members: ["error", "always"] */
class MyClass {
  x = 1

  ;in = 2
}
```

## Options

This rule has two options, first option can be string or object, second option is object.

First option can be string `"always"` or `"never"` or an object with a property named `enforce`:

- `"always"`(default) require an empty line after class members
- `"never"` disallows an empty line after class members
- `Object`: An object with a property named `enforce`. The enforce property should be an array of objects, each specifying the configuration for enforcing empty lines between specific pairs of class members.
  - **enforce**: You can supply any number of configurations. If a member pair matches multiple configurations, the last matched configuration will be used. If a member pair does not match any configurations, it will be ignored. Each object should have the following properties:
    - **blankLine**: Can be set to either `"always"` or `"never"`, indicating whether a blank line should be required or disallowed between the specified members.
    - **prev**: Specifies the type of the preceding class member. It can be `"method"` for class methods, `"field"` for class fields, or `"*"` for any class member.
    - **next**: Specifies the type of the following class member. It follows the same options as `prev`.

Second option is an object with a property named `exceptAfterSingleLine`:

- `"exceptAfterSingleLine": false`(default) **do not** skip checking empty lines after single-line class members
- `"exceptAfterSingleLine": true` skip checking empty lines after single-line class members
- `"exceptAfterOverload": true` (default) - Skip checking empty lines after overload class members
- `"exceptAfterOverload": false` - **do not** skip checking empty lines after overload class members

### always

Examples of **incorrect** code for this rule with the `"always"` option:

**Incorrect:**

```js
/* eslint @stylistic/lines-between-class-members: ["error", "always"] */
class Foo{
  x;
  bar(){}
  baz(){}
}
```

Examples of **correct** code for this rule with the `"always"` option:

**Correct:**

```js
/* eslint @stylistic/lines-between-class-members: ["error", "always"] */
class Foo{
  x;

  bar(){}

  baz(){}
}
```

### never

Examples of **incorrect** code for this rule with the `"never"` option:

**Incorrect:**

```js
/* eslint @stylistic/lines-between-class-members: ["error", "never"] */
class Bar{
  x;

  bar(){}

  baz(){}
}
```

Examples of **correct** code for this rule with the `"never"` option:

**Correct:**

```js
/* eslint @stylistic/lines-between-class-members: ["error", "never"] */
class Bar{
  x;
  bar(){}
  baz(){}
}
```

### enforce

Examples of **incorrect** code for this rule with the array of configurations option:

**Incorrect:**

```js
// disallows blank lines between methods
/* eslint @stylistic/lines-between-class-members: [
    "error",
    {
      enforce: [
        { blankLine: "never", prev: "method", next: "method" }
      ]
    },
] */

class MyClass {
  constructor(height, width) {
      this.height = height;
      this.width = width;
  }

  fieldA = 'Field A';
  #fieldB = 'Field B';

  method1() {}

  get area() {
    return this.method1();
  }

  method2() {}
}
```

**Incorrect:**

```js
// requires blank lines around fields, disallows blank lines between methods
/* eslint @stylistic/lines-between-class-members: [
    "error",
    {
      enforce: [
        { blankLine: "always", prev: "*", next: "field" },
        { blankLine: "always", prev: "field", next: "*" },
        { blankLine: "never", prev: "method", next: "method" }
      ]
    },
] */

class MyClass {
  constructor(height, width) {
      this.height = height;
      this.width = width;
  }
  fieldA = 'Field A';
  #fieldB = 'Field B';
  method1() {}

  get area() {
    return this.method1();
  }

  method2() {}
}
```

Examples of **correct** code for this rule with the array of configurations option:

**Correct:**

```js
// disallows blank lines between methods
/* eslint @stylistic/lines-between-class-members: [
    "error",
    {
      enforce: [
        { blankLine: "never", prev: "method", next: "method" }
      ]
    },
] */

class MyClass {
  constructor(height, width) {
      this.height = height;
      this.width = width;
  }

  fieldA = 'Field A';

  #fieldB = 'Field B';

  method1() {}
  get area() {
    return this.method1();
  }
  method2() {}
}
```

**Correct:**

```js
// requires blank lines around fields, disallows blank lines between methods
/* eslint @stylistic/lines-between-class-members: [
    "error",
    {
      enforce: [
        { blankLine: "always", prev: "*", next: "field" },
        { blankLine: "always", prev: "field", next: "*" },
        { blankLine: "never", prev: "method", next: "method" }
      ]
    },
] */

class MyClass {
  constructor(height, width) {
      this.height = height;
      this.width = width;
  }

  fieldA = 'Field A';

  #fieldB = 'Field B';

  method1() {}
  get area() {
    return this.method1();
  }
  method2() {}
}
```

Examples of **correct** code for this rule with the object option:

**Correct:**

```js
/* eslint @stylistic/lines-between-class-members: ["error", "always", { "exceptAfterSingleLine": true }] */
class Foo{
  x; // single line class member
  bar(){} // single line class member
  baz(){
    // multi line class member
  }

  qux(){}
}
```

**Correct:**

```js
/* eslint @stylistic/lines-between-class-members: [
    "error",
    {
      enforce: [
        { blankLine: "always", prev: "*", next: "method" },
        { blankLine: "always", prev: "method", next: "*" },
        { blankLine: "always", prev: "field", next: "field" }
      ]
    },
    { exceptAfterSingleLine: true }
] */

class MyClass {
  constructor(height, width) {
      this.height = height;
      this.width = width;
  }

  fieldA = 'Field A';
  #fieldB = 'Field B';
  method1() {}
  get area() {
    return this.method1();
  }

  method2() {}
}
```

Examples of **correct** code for the `{ "exceptAfterOverload": true }` option:

**Correct:**

```ts
/* eslint @stylistic/lines-between-class-members: ["error", "always", { "exceptAfterOverload": true }] */

class foo {
  bar(a: string): void;
  bar(a: string, b: string): void;
  bar(a: string, b: string) {}

  baz() {}

  qux() {}
}
```

### exceptAfterOverload

Examples of **correct** code for the `{ "exceptAfterOverload": false }` option:

**Correct:**

```ts
/* eslint @stylistic/lines-between-class-members: ["error", "always", { "exceptAfterOverload": false }] */

class foo {
  bar(a: string): void;

  bar(a: string, b: string): void;

  bar(a: string, b: string) {}

  baz() {}

  qux() {}
}
```

## When Not To Use It

If you don't want to enforce empty lines between class members, you can disable this rule.

## Compatibility

- requirePaddingNewLinesAfterBlocks
- disallowPaddingNewLinesAfterBlocks
