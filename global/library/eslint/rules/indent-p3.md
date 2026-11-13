---
title: "indent (part 3 of 3)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/indent.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# indent (part 3 of 3)

### CallExpression

Examples of **incorrect** code for this rule with the `2, { "CallExpression": {"arguments": 1} }` option:

**Incorrect:**

```js
/*eslint indent: ["error", 2, { "CallExpression": {"arguments": 1} }]*/

foo(bar,
    baz,
      qux
);
```

Examples of **correct** code for this rule with the `2, { "CallExpression": {"arguments": 1} }` option:

**Correct:**

```js
/*eslint indent: ["error", 2, { "CallExpression": {"arguments": 1} }]*/

foo(bar,
  baz,
  qux
);
```

Examples of **incorrect** code for this rule with the `2, { "CallExpression": {"arguments": "first"} }` option:

**Incorrect:**

```js
/*eslint indent: ["error", 2, {"CallExpression": {"arguments": "first"}}]*/

foo(bar, baz,
  baz, boop, beep);
```

Examples of **correct** code for this rule with the `2, { "CallExpression": {"arguments": "first"} }` option:

**Correct:**

```js
/*eslint indent: ["error", 2, {"CallExpression": {"arguments": "first"}}]*/

foo(bar, baz,
    baz, boop, beep);
```

### ArrayExpression

Examples of **incorrect** code for this rule with the `2, { "ArrayExpression": 1 }` option:

**Incorrect:**

```js
/*eslint indent: ["error", 2, { "ArrayExpression": 1 }]*/

var foo = [
    bar,
baz,
      qux
];
```

Examples of **correct** code for this rule with the `2, { "ArrayExpression": 1 }` option:

**Correct:**

```js
/*eslint indent: ["error", 2, { "ArrayExpression": 1 }]*/

var foo = [
  bar,
  baz,
  qux
];
```

Examples of **incorrect** code for this rule with the `2, { "ArrayExpression": "first" }` option:

**Incorrect:**

```js
/*eslint indent: ["error", 2, {"ArrayExpression": "first"}]*/

var foo = [bar,
  baz,
  qux
];
```

Examples of **correct** code for this rule with the `2, { "ArrayExpression": "first" }` option:

**Correct:**

```js
/*eslint indent: ["error", 2, {"ArrayExpression": "first"}]*/

var foo = [bar,
           baz,
           qux
];
```

### ObjectExpression

Examples of **incorrect** code for this rule with the `2, { "ObjectExpression": 1 }` option:

**Incorrect:**

```js
/*eslint indent: ["error", 2, { "ObjectExpression": 1 }]*/

var foo = {
    bar: 1,
baz: 2,
      qux: 3
};
```

Examples of **correct** code for this rule with the `2, { "ObjectExpression": 1 }` option:

**Correct:**

```js
/*eslint indent: ["error", 2, { "ObjectExpression": 1 }]*/

var foo = {
  bar: 1,
  baz: 2,
  qux: 3
};
```

Examples of **incorrect** code for this rule with the `2, { "ObjectExpression": "first" }` option:

**Incorrect:**

```js
/*eslint indent: ["error", 2, {"ObjectExpression": "first"}]*/

var foo = { bar: 1,
  baz: 2 };
```

Examples of **correct** code for this rule with the `2, { "ObjectExpression": "first" }` option:

**Correct:**

```js
/*eslint indent: ["error", 2, {"ObjectExpression": "first"}]*/

var foo = { bar: 1,
            baz: 2 };
```

### ImportDeclaration

Examples of **correct** code for this rule with the `4, { "ImportDeclaration": 1 }` option (the default):

**Correct:**

```js
/*eslint indent: ["error", 4, { "ImportDeclaration": 1 }]*/

import { foo,
    bar,
    baz,
} from 'qux';
```

**Correct:**

```js
/*eslint indent: ["error", 4, { "ImportDeclaration": 1 }]*/

import {
    foo,
    bar,
    baz,
} from 'qux';
```

Examples of **incorrect** code for this rule with the `4, { "ImportDeclaration": "first" }` option:

**Incorrect:**

```js
/*eslint indent: ["error", 4, { "ImportDeclaration": "first" }]*/

import { foo,
    bar,
    baz,
} from 'qux';
```

Examples of **correct** code for this rule with the `4, { "ImportDeclaration": "first" }` option:

**Correct:**

```js
/*eslint indent: ["error", 4, { "ImportDeclaration": "first" }]*/

import { foo,
         bar,
         baz,
} from 'qux';
```

### flatTernaryExpressions

Examples of **incorrect** code for this rule with the default `4, { "flatTernaryExpressions": false }` option:

**Incorrect:**

```js
/*eslint indent: ["error", 4, { "flatTernaryExpressions": false }]*/

var a =
    foo ? bar :
    baz ? qux :
    boop;
```

Examples of **correct** code for this rule with the default `4, { "flatTernaryExpressions": false }` option:

**Correct:**

```js
/*eslint indent: ["error", 4, { "flatTernaryExpressions": false }]*/

var a =
    foo ? bar :
        baz ? qux :
            boop;
```

Examples of **incorrect** code for this rule with the `4, { "flatTernaryExpressions": true }` option:

**Incorrect:**

```js
/*eslint indent: ["error", 4, { "flatTernaryExpressions": true }]*/

var a =
    foo ? bar :
        baz ? qux :
            boop;
```

Examples of **correct** code for this rule with the `4, { "flatTernaryExpressions": true }` option:

**Correct:**

```js
/*eslint indent: ["error", 4, { "flatTernaryExpressions": true }]*/

var a =
    foo ? bar :
    baz ? qux :
    boop;
```

### offsetTernaryExpressions

Examples of **incorrect** code for this rule with the default `2, { "offsetTernaryExpressions": false }` option:

**Incorrect:**

```js
/*eslint indent: ["error", 2, { "offsetTernaryExpressions": false }]*/

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
/*eslint indent: ["error", 2, { "offsetTernaryExpressions": false }]*/

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
/*eslint indent: ["error", 2, { "offsetTernaryExpressions": true }]*/

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
/*eslint indent: ["error", 2, { "offsetTernaryExpressions": true }]*/

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

### ignoreComments

Examples of additional **correct** code for this rule with the `4, { "ignoreComments": true }` option:

**Correct:**

```js
/*eslint indent: ["error", 4, { "ignoreComments": true }] */

if (foo) {
    doSomething();

// comment intentionally de-indented
    doSomethingElse();
}
```

## Compatibility

* **JSHint**: `indent`
* **JSCS**: validateIndentation
