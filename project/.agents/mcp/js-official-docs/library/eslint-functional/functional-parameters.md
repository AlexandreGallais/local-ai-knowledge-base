---
title: "functional/functional-parameters"
tool: "eslint-functional"
version: "10.0"
source: "https://github.com/eslint-functional/eslint-plugin-functional/blob/d7aa1dd4ae4ef804f3010a92d3e7b385153415d8/docs/rules/functional-parameters.md"
commit: "d7aa1dd4ae4ef804f3010a92d3e7b385153415d8"
license: "MIT"
---

# functional/functional-parameters

📝 Enforce functional parameters.

💼 This rule is enabled in the following configs:  `currying`, ☑️ `lite`, ✅ `recommended`, 🔒 `strict`.

💭 This rule requires type information.

Disallow use of rest parameters, the `arguments` keyword and enforces that functions take at least 1 parameter.

Note: type information is only required when using the overrides option.

## Rule Details

In functions, `arguments` is a special variable that is implicitly available.
This variable is an array containing the arguments passed to the function call and is often used to allow for any number
of parameters to be passed to a function. Rest parameters are another way any number of parameters can be passed to a
function.

When it comes to functional programming, known and explicit parameters must be used.

Note: With an unknown number of parameters, currying functions is a lot more difficult/impossible.

### ❌ Incorrect

```js
/* eslint functional/functional-parameters: "error" */

function add() {
  return arguments.reduce((sum, number) => sum + number, 0);
}
```

```js
/* eslint functional/functional-parameters: "error" */

function add(...numbers) {
  return numbers.reduce((sum, number) => sum + number, 0);
}
```

### ✅ Correct

```js
/* eslint functional/functional-parameters: "error" */

function add(numbers) {
  return numbers.reduce((sum, number) => sum + number, 0);
}
```

## Options

This rule accepts an options object of the following type:

```ts
type Options = {
  allowRestParameter: boolean;
  allowArgumentsKeyword: boolean;
  enforceParameterCount:
    | "atLeastOne"
    | "exactlyOne"
    | false
    | {
        count: "atLeastOne" | "exactlyOne";
        ignoreLambdaExpression: boolean;
        ignoreIIFE: boolean;
        ignoreGettersAndSetters: boolean;
      };
  ignoreIdentifierPattern?: string[] | string;
  ignorePrefixSelector?: string[] | string;
  overrides?: Array<{
    match: Array<
      | {
          from: "file";
          path?: string;
          name?: string | string[];
          pattern?: RegExp | RegExp[];
          ignoreName?: string | string[];
          ignorePattern?: RegExp | RegExp[];
        }
      | {
          from: "lib";
          name?: string | string[];
          pattern?: RegExp | RegExp[];
          ignoreName?: string | string[];
          ignorePattern?: RegExp | RegExp[];
        }
      | {
          from: "package";
          package?: string;
          name?: string | string[];
          pattern?: RegExp | RegExp[];
          ignoreName?: string | string[];
          ignorePattern?: RegExp | RegExp[];
        }
    >;
    options: Omit<Options, "overrides">;
    inherit?: boolean;
    disable: boolean;
  }>;
};
```

### Default Options

```ts
const defaults = {
  allowRestParameter: false,
  allowArgumentsKeyword: false,
  enforceParameterCount: {
    count: "atLeastOne",
    ignoreLambdaExpression: false,
    ignoreIIFE: true,
    ignoreGettersAndSetters: true,
  },
};
```

### Preset Overrides

#### `recommended`

```ts
const recommendedOptions = {
  enforceParameterCount: false,
  overrides: [
    {
      specifiers: [
        {
          from: "file",
        },
      ],
      options: {
        enforceParameterCount: {
          count: "atLeastOne",
          ignoreLambdaExpression: true,
          ignoreIIFE: true,
          ignoreGettersAndSetters: true,
        },
      },
    },
  ],
};
```

#### `lite`

```ts
const liteOptions = {
  enforceParameterCount: false,
};
```

### `allowRestParameter`

If true, this option allows for the use of rest parameters.

### `allowArgumentsKeyword`

If true, this option allows for the use of the `arguments` keyword.

### `enforceParameterCount`

This option enforces the number of parameters each function takes.

#### false

Don't enforce a parameter count.

#### "atLeastOne"

Require all functions to have a least one parameter.

There's not much point of having a function that doesn't take any parameters in functional programming.

#### "exactlyOne"

Require all functions to have exactly one parameter.

Any function that takes multiple parameter can be rewritten as a higher-order function that only takes one.

Example:

```js
// This function
function add(x, y) {
  return x + y;
}

// can be rewritten like this.
function add(x) {
  return (y) => x + y;
}
```

See Currying and
Higher-order function on Wikipedia for more information.

#### `enforceParameterCount.count`

See enforceParameterCount.

#### `enforceParameterCount.ignoreLambdaExpression`

If true, this option allows for the use of lambda function expressions that do not have any parameters.
Here, a lambda function expression refers to any function being defined in place as passed directly as an argument to
another function.

#### `enforceParameterCount.ignoreIIFE`

If true, this option allows for the use of IIFEs that do not
have any parameters.

#### `enforceParameterCount.ignoreGettersAndSetters`

Getters should always take zero parameters, and setter one. If for some reason you want to treat these function like any
other function, then you can set this option to `false`.

### `ignorePrefixSelector`

This allows for ignore functions where one of the given selectors matches the parent node in the AST of the function
node.\
For more information see ESLint Selectors.

Example:

With the following config:

```json
{
  "enforceParameterCount": "exactlyOne",
  "ignorePrefixSelector": "CallExpression[callee.property.name='reduce']"
}
```

The following inline callback won't be flagged:

```js
const sum = [1, 2, 3].reduce((carry, current) => current, 0);
```

### `ignoreIdentifierPattern`

This option takes a RegExp string or an array of RegExp strings.
It allows for the ability to ignore violations based on a function's name.

### `overrides`

_Using this option requires type infomation._

Allows for applying overrides to the options based on the function's type.
This can be used to override the settings for types coming from 3rd party libraries.

Note: Only the first matching override will be used.

#### `overrides[n].specifiers`

A specifier, or an array of specifiers to match the function type against.

In the case of reference types, both the type and its generics will be recursively checked.
If any of them match, the specifier will be considered a match.

#### `overrides[n].options`

The options to use when a specifiers matches.

#### `overrides[n].inherit`

Inherit the root options? Default is `true`.

#### `overrides[n].disable`

If true, when a specifier matches, this rule will not be applied to the matching node.
