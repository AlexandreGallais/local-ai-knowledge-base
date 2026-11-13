---
title: "indent (part 3 of 3)"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/indent/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# indent (part 3 of 3)

### FunctionExpression

Examples of **incorrect** code for this rule with the `2, { "FunctionExpression": {"body": 1, "parameters": 2, "returnType": 1} }` option:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, { "FunctionExpression": {"body": 1, "parameters": 2, "returnType": 1} }] */

var foo = function(bar,
  baz,
  qux) {
    qux();
}

const foo = function(a: string)
: a is 'a' {
  return bar()
}
```

Examples of **correct** code for this rule with the `2, { "FunctionExpression": {"body": 1, "parameters": 2, "returnType": 1} }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "FunctionExpression": {"body": 1, "parameters": 2, "returnType": 1} }] */

var foo = function(bar,
    baz,
    qux) {
  qux();
}

const foo = function(a: string)
  : a is 'a' {
  return bar()
}
```

Examples of **incorrect** code for this rule with the `2, { "FunctionExpression": {"parameters": "first"} }` option:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, {"FunctionExpression": {"parameters": "first"}}] */

var foo = function(bar, baz,
  qux, boop) {
  qux();
}
```

Examples of **correct** code for this rule with the `2, { "FunctionExpression": {"parameters": "first"} }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, {"FunctionExpression": {"parameters": "first"}}] */

var foo = function(bar, baz,
                   qux, boop) {
  qux();
}
```

### StaticBlock

Examples of **incorrect** code for this rule with the `2, { "StaticBlock": {"body": 1} }` option:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, { "StaticBlock": {"body": 1} }] */

class C {
  static {
      foo();
  }
}
```

Examples of **correct** code for this rule with the `2, { "StaticBlock": {"body": 1} }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "StaticBlock": {"body": 1} }] */

class C {
  static {
    foo();
  }
}
```

Examples of **incorrect** code for this rule with the `2, { "StaticBlock": {"body": 2} }` option:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, { "StaticBlock": {"body": 2} }] */

class C {
  static {
    foo();
  }
}
```

Examples of **correct** code for this rule with the `2, { "StaticBlock": {"body": 2} }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "StaticBlock": {"body": 2} }] */

class C {
  static {
      foo();
  }
}
```

### CallExpression

Examples of **incorrect** code for this rule with the `2, { "CallExpression": {"arguments": 1} }` option:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, { "CallExpression": {"arguments": 1} }] */

foo(bar,
    baz,
      qux
);
```

Examples of **correct** code for this rule with the `2, { "CallExpression": {"arguments": 1} }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "CallExpression": {"arguments": 1} }] */

foo(bar,
  baz,
  qux
);
```

Examples of **incorrect** code for this rule with the `2, { "CallExpression": {"arguments": "first"} }` option:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, {"CallExpression": {"arguments": "first"}}] */

foo(bar, baz,
  baz, boop, beep);
```

Examples of **correct** code for this rule with the `2, { "CallExpression": {"arguments": "first"} }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, {"CallExpression": {"arguments": "first"}}] */

foo(bar, baz,
    baz, boop, beep);
```

### ArrayExpression

Examples of **incorrect** code for this rule with the `2, { "ArrayExpression": 1 }` option:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, { "ArrayExpression": 1 }] */

var foo = [
    bar,
baz,
      qux
];
```

Examples of **correct** code for this rule with the `2, { "ArrayExpression": 1 }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "ArrayExpression": 1 }] */

var foo = [
  bar,
  baz,
  qux
];
```

Examples of **incorrect** code for this rule with the `2, { "ArrayExpression": "first" }` option:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, {"ArrayExpression": "first"}] */

var foo = [bar,
  baz,
  qux
];
```

Examples of **correct** code for this rule with the `2, { "ArrayExpression": "first" }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, {"ArrayExpression": "first"}] */

var foo = [bar,
           baz,
           qux
];
```

### ObjectExpression

Examples of **incorrect** code for this rule with the `2, { "ObjectExpression": 1 }` option:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, { "ObjectExpression": 1 }] */

var foo = {
    bar: 1,
baz: 2,
      qux: 3
};
```

Examples of **correct** code for this rule with the `2, { "ObjectExpression": 1 }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "ObjectExpression": 1 }] */

var foo = {
  bar: 1,
  baz: 2,
  qux: 3
};
```

Examples of **incorrect** code for this rule with the `2, { "ObjectExpression": "first" }` option:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, {"ObjectExpression": "first"}] */

var foo = { bar: 1,
  baz: 2 };
```

Examples of **correct** code for this rule with the `2, { "ObjectExpression": "first" }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, {"ObjectExpression": "first"}] */

var foo = { bar: 1,
            baz: 2 };
```

### ImportDeclaration

Examples of **correct** code for this rule with the `4, { "ImportDeclaration": 1 }` option (the default):

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 4, { "ImportDeclaration": 1 }] */

import { foo,
    bar,
    baz,
} from 'qux';
```

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 4, { "ImportDeclaration": 1 }] */

import {
    foo,
    bar,
    baz,
} from 'qux';
```

Examples of **incorrect** code for this rule with the `4, { "ImportDeclaration": "first" }` option:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 4, { "ImportDeclaration": "first" }] */

import { foo,
    bar,
    baz,
} from 'qux';
```

Examples of **correct** code for this rule with the `4, { "ImportDeclaration": "first" }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 4, { "ImportDeclaration": "first" }] */

import { foo,
         bar,
         baz,
} from 'qux';
```

### flatTernaryExpressions

Examples of **incorrect** code for this rule with the default `4, { "flatTernaryExpressions": false }` option:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 4, { "flatTernaryExpressions": false }] */

var a =
    foo ? bar :
    baz ? qux :
    boop;
```

Examples of **correct** code for this rule with the default `4, { "flatTernaryExpressions": false }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 4, { "flatTernaryExpressions": false }] */

var a =
    foo ? bar :
        baz ? qux :
            boop;
```

Examples of **incorrect** code for this rule with the `4, { "flatTernaryExpressions": true }` option:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 4, { "flatTernaryExpressions": true }] */

var a =
    foo ? bar :
        baz ? qux :
            boop;
```

Examples of **correct** code for this rule with the `4, { "flatTernaryExpressions": true }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 4, { "flatTernaryExpressions": true }] */

var a =
    foo ? bar :
    baz ? qux :
    boop;
```

### offsetTernaryExpressions

Examples of **incorrect** code for this rule with the default `2, { "offsetTernaryExpressions": false }` option:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, { "offsetTernaryExpressions": false }] */

condition
  ? () => {
      return true
    }
  : () => {
      false
    }
```

Examples of **correct** code for this rule with the default `2, { "offsetTernaryExpressions": false }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "offsetTernaryExpressions": false }] */

condition
  ? () => {
    return true
  }
  : condition2
    ? () => {
      return true
    }
    : () => {
      return false
    }
```

Examples of **incorrect** code for this rule with the `2, { "offsetTernaryExpressions": true }` option:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, { "offsetTernaryExpressions": true }] */

condition
  ? () => {
    return true
  }
  : condition2
    ? () => {
      return true
    }
    : () => {
      return false
    }
```

Examples of **correct** code for this rule with the `2, { "offsetTernaryExpressions": true }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "offsetTernaryExpressions": true }] */

condition
  ? () => {
      return true
    }
  : condition2
    ? () => {
        return true
      }
    : () => {
        return false
      }
```

Since v2.12.0, we introduced a fix to call expressions handling inside ternary. With the new version, the rule now expect the following code to be correct:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "offsetTernaryExpressions": true }] */

condition
  ? gerUser({
      name: 'foo',
      age: 20,
    })
  : condition2
    ? gerUser({
        id: 'bar',
      })
    : undefined
```

Due to the new fix introduced changes to some existing codebase, we introduced `offsetTernaryExpressions.CallExpression` option to toggle the behaviors. It's set to `true` by default, where you can set it to `false` to use the previous behavior.

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "offsetTernaryExpressions": { "CallExpression": false }}] */

condition
  ? gerUser({
    name: 'foo',
    age: 20,
  })
  : condition2
    ? gerUser({
      id: 'bar',
    })
    : undefined
```

### assignmentOperator

Examples of **incorrect** code for this rule with the `{ "assignmentOperator": 1 }` option:

**Incorrect:**

```ts
/* eslint @stylistic/indent: ["error", 2, { "assignmentOperator": 1 }] */

let foo
= 'bar';

foo
= 'baz';

type Foo<
  T =
  string
>
= T;

enum Bar {
  A
  = 1,
}
```

Examples of **correct** code for this rule with the `{ "assignmentOperator": 1 }` option:

**Correct:**

```ts
/* eslint @stylistic/indent: ["error", 2, { "assignmentOperator": 1 }] */

let foo =
  'bar';

foo
  = 'baz';

type Foo<
  T =
    string
>
  = T;

enum Bar {
  A
    = 1,
}
```

### ignoreComments

Examples of additional **correct** code for this rule with the `4, { "ignoreComments": true }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 4, { "ignoreComments": true }] */

if (foo) {
    doSomething();

// comment intentionally de-indented
    doSomethingElse();
}
```

## Compatibility

- **JSHint**: `indent`
- **JSCS**: validateIndentation
