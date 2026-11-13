---
title: "require-throws"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-throws.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-throws`

* Options
    * `contexts`
    * `exemptedBy`
* Context and settings
* Failing examples
* Passing examples

Requires that throw statements are documented.

See
this discussion
on why TypeScript doesn't offer such a feature.

Note that since throw statements within async functions end up as rejected
`Promise`'s, they are not considered as throw statements for the purposes of
this rule. See the `require-rejects` rule for a non-standard way to document
`Promise` rejections.

## Options

A single options object has the following properties.

### `contexts`

Set this to an array of strings representing the AST context
(or objects with optional `context` and `comment` properties) where you wish
the rule to be applied.

`context` defaults to `any` and `comment` defaults to no specific comment context.

Overrides the default contexts (`ArrowFunctionExpression`, `FunctionDeclaration`,
`FunctionExpression`). Set to `"any"` if you want
the rule to apply to any JSDoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., `@callback` or `@function` (or its aliases `@func` or
`@method`) (including those associated with an `@interface`).

### `exemptedBy`

Array of tags (e.g., `['type']`) whose presence on the
document block avoids the need for a `@throws`. Defaults to an array
with `inheritdoc`. If you set this array, it will overwrite the default,
so be sure to add back `inheritdoc` if you wish its presence to cause
exemption of the rule.

## Context and settings

| | |
| -------- | --- |
| Context  | `ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled |
| Tags     | `throws` |
| Aliases  | `exception` |
|Recommended|false|
| Options  |`contexts`, `exemptedBy`|
| Settings | `ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs` |

## Failing examples

The following patterns are considered problems:

````ts
/**
 *
 */
function quux (foo) {
  throw new Error('err')
}
// Message: Missing JSDoc @throws declaration.

class Quux {
  /**
   *
   */
  constructor (foo) {
    throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
const quux = function (foo) {
  throw new Error('err')
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
const quux = (foo) => {
  throw new Error('err')
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  while(true) {
    throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  do {
    throw new Error('err')
  } while(true)
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  for(var i = 0; i <= 10; i++) {
    throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  for(num in [1,2,3]) {
    throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  for(const num of [1,2,3]) {
    throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  for(const index in [1,2,3]) {
    throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  with(foo) {
    throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  if (true) {
    throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  if (false) {
    // do nothing
  } else {
    throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  try {
    throw new Error('err')
  } catch(e) {
    throw new Error(e.message)
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  try {
    // do nothing
  } finally {
    throw new Error(e.message)
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  const a = 'b'
  switch(a) {
    case 'b':
      throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 * @throws
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"throws":false}}}
// Message: Unexpected tag `@throws`

/**
 *
 */
const directThrowAfterArrow = (b) => {
  const a = () => {};
  if (b) {
    throw new Error('oops')
  }
  return a;
};
// Message: Missing JSDoc @throws declaration.

/**
 * @throws {never}
 */
function quux (foo) {
  throw new Error('err')
}
// Message: JSDoc @throws declaration set to "never" but throw value found.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @throws An error.
 */
function quux () {
  throw new Error('err')
}

/**
 *
 */
function quux (foo) {
  try {
    throw new Error('err')
  } catch(e) {}
}

/**
 * @throws {object}
 */
function quux (foo) {
  throw new Error('err')
}

/**
 * @inheritdoc
 */
function quux (foo) {
  throw new Error('err')
}

/**
 * @abstract
 */
function quux (foo) {
  throw new Error('err')
}

/**
 *
 */
function quux (foo) {
}

/**
 * @type {MyCallback}
 */
function quux () {
  throw new Error('err')
}
// "jsdoc/require-throws": ["error"|"warn", {"exemptedBy":["type"]}]

/**
 *
 */
const itself = (n) => n;

/**
 * Not tracking on nested function
 */
const nested = () => () => {throw new Error('oops');};

/**
 */
async function foo() {
  throw Error("bar");
}

/**
 * @throws {never}
 */
function quux (foo) {
}
````
