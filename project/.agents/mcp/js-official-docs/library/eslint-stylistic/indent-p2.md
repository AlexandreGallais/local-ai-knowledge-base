---
title: "indent (part 2 of 3)"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/indent/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# indent (part 2 of 3)

## Options

This rule has a mixed option:

For example, for 2-space indentation:

```json
{
    "indent": ["error", 2]
}
```

Or for tabbed indentation:

```json
{
    "indent": ["error", "tab"]
}
```

Examples of **incorrect** code for this rule with the default options:

**Incorrect:**

```js
/* eslint @stylistic/indent: "error" */

if (a) {
  b=c;
  function foo(d) {
    e=f;
  }
}
```

Examples of **correct** code for this rule with the default options:

**Correct:**

```js
/* eslint @stylistic/indent: "error" */

if (a) {
    b=c;
    function foo(d) {
        e=f;
    }
}
```

This rule has an object option:

- `"<example-value>"` can be used to disable indentation checking for any AST node. This accepts an array of selectors. If an AST node is matched by any of the selectors, the indentation of tokens which are direct children of that node will be ignored. This can be used as an escape hatch to relax the rule if you disagree with the indentation that it enforces for a particular syntactic pattern.
- `"SwitchCase"` (default: 0) enforces indentation level for `case` clauses in `switch` statements
- `"VariableDeclarator"` (default: 1) enforces indentation level for `var` declarators; can also take an object to define separate rules for `var`, `let` and `const` declarations. It can also be `"first"`, indicating all the declarators should be aligned with the first declarator.
- `"outerIIFEBody"` (default: 1) enforces indentation level for file-level IIFEs. This can also be set to `"off"` to disable checking for file-level IIFEs.
- `"MemberExpression"` (default: 1) enforces indentation level for multi-line property chains. This can also be set to `"off"` to disable checking for MemberExpression indentation.
- `"FunctionDeclaration"` takes an object to define rules for function declarations.
  - `parameters` (default: 1) enforces indentation level for parameters in a function declaration. This can either be a number indicating indentation level, or the string `"first"` indicating that all parameters of the declaration must be aligned with the first parameter. This can also be set to `"off"` to disable checking for FunctionDeclaration parameters.
  - `body` (default: 1) enforces indentation level for the body of a function declaration.
  - `returnType` (default: 1) enforces indentation level for the return type of a function declaration.
- `"FunctionExpression"` takes an object to define rules for function expressions.
  - `parameters` (default: 1) enforces indentation level for parameters in a function expression. This can either be a number indicating indentation level, or the string `"first"` indicating that all parameters of the expression must be aligned with the first parameter. This can also be set to `"off"` to disable checking for FunctionExpression parameters.
  - `body` (default: 1) enforces indentation level for the body of a function expression.
  - `returnType` (default: 1) enforces indentation level for the return type of a function expression.
- `"StaticBlock"` takes an object to define rules for class static blocks.
  - `body` (default: 1) enforces indentation level for the body of a class static block.
- `"CallExpression"` takes an object to define rules for function call expressions.
  - `arguments` (default: 1) enforces indentation level for arguments in a call expression. This can either be a number indicating indentation level, or the string `"first"` indicating that all arguments of the expression must be aligned with the first argument. This can also be set to `"off"` to disable checking for CallExpression arguments.
- `"ArrayExpression"` (default: 1) enforces indentation level for elements in arrays. It can also be set to the string `"first"`, indicating that all the elements in the array should be aligned with the first element. This can also be set to `"off"` to disable checking for array elements.
- `"ObjectExpression"` (default: 1) enforces indentation level for properties in objects. It can be set to the string `"first"`, indicating that all properties in the object should be aligned with the first property. This can also be set to `"off"` to disable checking for object properties.
- `"ImportDeclaration"` (default: 1) enforces indentation level for import statements. It can be set to the string `"first"`, indicating that all imported members from a module should be aligned with the first member in the list. This can also be set to `"off"` to disable checking for imported module members.
- `"flatTernaryExpressions": true` (`false` by default) requires no indentation for ternary expressions which are nested in other ternary expressions.
- `"offsetTernaryExpressions": true` (`false` by default) requires indentation for values of ternary expressions. An optional configuration object can be provided to handle specific edge cases:
  - `CallExpression`: Aligns with `offsetTernaryExpressions` by default.
  - `AwaitExpression`: Aligns with `offsetTernaryExpressions` by default.
  - `NewExpression`: Aligns with `offsetTernaryExpressions` by default.
- ~~`"offsetTernaryExpressionsOffsetCallExpressions": true`~~ (`true` by default) handles an edge case for call expressions nested in ternary. It's only effective when `offsetTernaryExpressions` is set to `true`.
  > **Warning:**
  > This option is **deprecated**, please use `offsetTernaryExpressions.CallExpression` instead.
- `"assignmentOperator"` (default: 1) enforces indentation level for the assignment operator and value in variable/type declarations and assignment expressions when they are on different lines than the left side of the assignment (e.g. variable name). This can also be set to `"off"` to disable the checking.
- `"ignoreComments"` (default: false) can be used when comments do not need to be aligned with nodes on the previous or next line.
- `"tabLength"` (default: 4) when using tabbed indentation, the indentation used to calculate the insertion value of the template string

Level of indentation denotes the multiple of the indent specified. Example:

- Indent of 4 spaces with `VariableDeclarator` set to `2` will indent the multi-line variable declarations with 8 spaces.
- Indent of 2 spaces with `VariableDeclarator` set to `2` will indent the multi-line variable declarations with 4 spaces.
- Indent of 2 spaces with `VariableDeclarator` set to `{"var": 2, "let": 2, "const": 3, "using": 3}` will indent the multi-line variable declarations with 4 spaces for `var` and `let`, 6 spaces for `const`, `using` and `await using` statements.
- Indent of tab with `VariableDeclarator` set to `2` will indent the multi-line variable declarations with 2 tabs.
- Indent of 2 spaces with `SwitchCase` set to `0` will not indent `case` clauses with respect to `switch` statements.
- Indent of 2 spaces with `SwitchCase` set to `1` will indent `case` clauses with 2 spaces with respect to `switch` statements.
- Indent of 2 spaces with `SwitchCase` set to `2` will indent `case` clauses with 4 spaces with respect to `switch` statements.
- Indent of tab with `SwitchCase` set to `2` will indent `case` clauses with 2 tabs with respect to `switch` statements.
- Indent of 2 spaces with `MemberExpression` set to `0` will indent the multi-line property chains with 0 spaces.
- Indent of 2 spaces with `MemberExpression` set to `1` will indent the multi-line property chains with 2 spaces.
- Indent of 2 spaces with `MemberExpression` set to `2` will indent the multi-line property chains with 4 spaces.
- Indent of 4 spaces with `MemberExpression` set to `0` will indent the multi-line property chains with 0 spaces.
- Indent of 4 spaces with `MemberExpression` set to `1` will indent the multi-line property chains with 4 spaces.
- Indent of 4 spaces with `MemberExpression` set to `2` will indent the multi-line property chains with 8 spaces.

### tab

Examples of **incorrect** code for this rule with the `"tab"` option:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", "tab"] */

if (a) {
     b=c;
function foo(d) {
           e=f;
 }
}
```

Examples of **correct** code for this rule with the `"tab"` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", "tab"] */

if (a) {
	b=c;
	function foo(d) {
		e=f;
	}
}
```

### ignoredNodes

The following configuration ignores the indentation of `ConditionalExpression` ("ternary expression") nodes:

Examples of **correct** code for this rule with the `4, { "ignoredNodes": ["ConditionalExpression"] }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 4, { "ignoredNodes": ["ConditionalExpression"] }] */

var a = foo
      ? bar
      : baz;

var a = foo
                ? bar
: baz;
```

The following configuration ignores indentation in the body of IIFEs.

Examples of **correct** code for this rule with the `4, { "ignoredNodes": ["CallExpression > FunctionExpression.callee > BlockStatement.body"] }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 4, { "ignoredNodes": ["CallExpression > FunctionExpression.callee > BlockStatement.body"] }] */

(function() {

foo();
bar();

})();
```

All AST node types can be found at ESTree specification. You can use AST Explorer with the espree parser to examine AST tree of a code snippet.

### SwitchCase

Examples of **incorrect** code for this rule with the `2, { "SwitchCase": 1 }` options:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, { "SwitchCase": 1 }] */

switch(a){
case "a":
    break;
case "b":
    break;
}
```

Examples of **correct** code for this rule with the `2, { "SwitchCase": 1 }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "SwitchCase": 1 }] */

switch(a){
  case "a":
    break;
  case "b":
    break;
}
```

### VariableDeclarator

Examples of **incorrect** code for this rule with the `2, { "VariableDeclarator": 1 }` options:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, { "VariableDeclarator": 1 }] */

var a,
    b,
    c;
let d,
    e,
    f;
const g = 1,
    h = 2,
    i = 3;
using j = foo(),
    k = bar(),
    l = baz();
await using j = foo(),
    k = bar(),
    l = baz();
```

Examples of **correct** code for this rule with the `2, { "VariableDeclarator": 1 }` options:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "VariableDeclarator": 1 }] */

var a,
  b,
  c;
let d,
  e,
  f;
const g = 1,
  h = 2,
  i = 3;
using j = foo(),
  k = bar(),
  l = baz();
await using j = foo(),
  k = bar(),
  l = baz();
```

Examples of **correct** code for this rule with the `2, { "VariableDeclarator": 2 }` options:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "VariableDeclarator": 2 }] */

var a,
    b,
    c;
let d,
    e,
    f;
const g = 1,
    h = 2,
    i = 3;
using j = foo(),
    k = bar(),
    l = baz();
await using j = foo(),
    k = bar(),
    l = baz();
```

Examples of **incorrect** code for this rule with the `2, { "VariableDeclarator": "first" }` options:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, { "VariableDeclarator": "first" }] */

var a,
  b,
  c;
let d,
  e,
  f;
const g = 1,
  h = 2,
  i = 3;
using j = foo(),
  k = bar(),
  l = baz();
await using j = foo(),
  k = bar(),
  l = baz();
```

Examples of **correct** code for this rule with the `2, { "VariableDeclarator": "first" }` options:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "VariableDeclarator": "first" }] */

var a,
    b,
    c;
let d,
    e,
    f;
const g = 1,
      h = 2,
      i = 3;
using j = foo(),
      k = bar(),
      l = baz();
await using j = foo(),
            k = bar(),
            l = baz();
```

Examples of **correct** code for this rule with the `2, { "VariableDeclarator": { "var": 2, "let": 2, "const": 3, "using": "first" } }` options:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "VariableDeclarator": { "var": 2, "let": 2, "const": 3, "using": "first" } }] */

var a,
    b,
    c;
let d,
    e,
    f;
const g = 1,
      h = 2,
      i = 3;
using j = foo(),
      k = bar(),
      l = baz();
await using j = foo(),
            k = bar(),
            l = baz();
```

### outerIIFEBody

Examples of **incorrect** code for this rule with the options `2, { "outerIIFEBody": 0 }`:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, { "outerIIFEBody": 0 }] */

(function() {

  function foo(x) {
    return x + 1;
  }

})();

if (y) {
console.log('foo');
}
```

Examples of **correct** code for this rule with the options `2, { "outerIIFEBody": 0 }`:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "outerIIFEBody": 0 }] */

(function() {

function foo(x) {
  return x + 1;
}

})();

if (y) {
  console.log('foo');
}
```

Examples of **correct** code for this rule with the options `2, { "outerIIFEBody":  "off" }`:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "outerIIFEBody": "off" }] */

(function() {

function foo(x) {
  return x + 1;
}

})();

(function() {

  function foo(x) {
    return x + 1;
  }

})();

if (y) {
  console.log('foo');
}
```

### MemberExpression

Examples of **incorrect** code for this rule with the `2, { "MemberExpression": 1 }` options:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, { "MemberExpression": 1 }] */

foo
.bar
.baz()
```

Examples of **correct** code for this rule with the `2, { "MemberExpression": 1 }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "MemberExpression": 1 }] */

foo
  .bar
  .baz();
```

### FunctionDeclaration

Examples of **incorrect** code for this rule with the `2, { "FunctionDeclaration": {"body": 1, "parameters": 2, "returnType": 1} }` option:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, { "FunctionDeclaration": {"body": 1, "parameters": 2, "returnType": 1} }] */

function foo(bar,
  baz,
  qux) {
    qux();
}

function foo(a: string)
: a is 'a' {
  return bar()
}
```

Examples of **correct** code for this rule with the `2, { "FunctionDeclaration": {"body": 1, "parameters": 2, "returnType": 1} }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, { "FunctionDeclaration": {"body": 1, "parameters": 2, "returnType": 1} }] */

function foo(bar,
    baz,
    qux) {
  qux();
}

function foo(a: string)
  : a is 'a' {
  return bar()
}
```

Examples of **incorrect** code for this rule with the `2, { "FunctionDeclaration": {"parameters": "first"} }` option:

**Incorrect:**

```js
/* eslint @stylistic/indent: ["error", 2, {"FunctionDeclaration": {"parameters": "first"}}] */

function foo(bar, baz,
  qux, boop) {
  qux();
}
```

Examples of **correct** code for this rule with the `2, { "FunctionDeclaration": {"parameters": "first"} }` option:

**Correct:**

```js
/* eslint @stylistic/indent: ["error", 2, {"FunctionDeclaration": {"parameters": "first"}}] */

function foo(bar, baz,
             qux, boop) {
  qux();
}
```
