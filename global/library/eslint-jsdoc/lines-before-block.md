---
title: "lines-before-block"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/lines-before-block.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `lines-before-block`

This rule enforces minimum number of newlines before JSDoc comment blocks
(except at the beginning of a block or file).

## Options

A single options object has the following properties.

### `checkBlockStarts`

Whether to additionally check the start of blocks, such as classes or functions.
Defaults to `false`.

### `excludedTags`

An array of tags whose presence in the JSDoc block will prevent the
application of the rule. Defaults to `['type']` (i.e., if `@type` is present,
lines before the block will not be added).

### `ignoreSameLine`

This option excludes cases where the JSDoc block occurs on the same line as a
preceding code or comment. Defaults to `true`.

### `ignoreSingleLines`

This option excludes cases where the JSDoc block is only one line long.
Defaults to `true`.

### `lines`

The minimum number of lines to require. Defaults to 1.

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|false|
|Settings||
|Options|`checkBlockStarts`, `excludedTags`, `ignoreSameLine`, `ignoreSingleLines`, `lines`|

## Failing examples

The following patterns are considered problems:

````ts
someCode;
/**
 *
 */
// Message: Required 1 line(s) before JSDoc block

someCode; /**
 *
 */
// "jsdoc/lines-before-block": ["error"|"warn", {"ignoreSameLine":false}]
// Message: Required 1 line(s) before JSDoc block

someCode; /** */
// "jsdoc/lines-before-block": ["error"|"warn", {"ignoreSameLine":false,"ignoreSingleLines":false}]
// Message: Required 1 line(s) before JSDoc block

someCode;
/**
 *
 */
// "jsdoc/lines-before-block": ["error"|"warn", {"lines":2}]
// Message: Required 2 line(s) before JSDoc block

// Some comment
/**
 *
 */
// Message: Required 1 line(s) before JSDoc block

/* Some comment */
/**
 *
 */
// Message: Required 1 line(s) before JSDoc block

/**
 * Some comment
 */
/**
 *
 */
// Message: Required 1 line(s) before JSDoc block

{
  /**
   * Description.
   */
  let value;
}
// "jsdoc/lines-before-block": ["error"|"warn", {"checkBlockStarts":true}]
// Message: Required 1 line(s) before JSDoc block

class MyClass {
  /**
   * Description.
   */
  method() {}
}
// "jsdoc/lines-before-block": ["error"|"warn", {"checkBlockStarts":true}]
// Message: Required 1 line(s) before JSDoc block

function myFunction() {
  /**
   * Description.
   */
  let value;
}
// "jsdoc/lines-before-block": ["error"|"warn", {"checkBlockStarts":true}]
// Message: Required 1 line(s) before JSDoc block

const values = [
  /**
   * Description.
   */
  value,
];
// "jsdoc/lines-before-block": ["error"|"warn", {"checkBlockStarts":true}]
// Message: Required 1 line(s) before JSDoc block

const values = [
  value1,
  /**
   * Description.
   */
  value2
];
// Message: Required 1 line(s) before JSDoc block

const values = [
  value1,
  value2
]
/**
 * Description.
 */
// Message: Required 1 line(s) before JSDoc block

const value = 123
/**
 * Description.
 */
// Message: Required 1 line(s) before JSDoc block

type UnionDocumentation =
  /** Description. */
  | { someProp: number }
  /** Description. */
  | { otherProp: string }

type IntersectionDocumentation =
  /** Description. */
  { someProp: number } &
  /** Description. */
  { otherProp: string }
// "jsdoc/lines-before-block": ["error"|"warn", {"ignoreSingleLines":false}]
// Message: Required 1 line(s) before JSDoc block

type IntersectionDocumentation = {
  someProp: number;
} & /** Description. */ {
  otherProp: string;
};
// "jsdoc/lines-before-block": ["error"|"warn", {"ignoreSameLine":false,"ignoreSingleLines":false}]
// Message: Required 1 line(s) before JSDoc block

/** The parameters for a request */
export type RequestParams = {
  /** The year to retrieve. */
  year: `${number}`;
  /**
   * The month to retrieve.
   */
  month: `${number}`;
}
// "jsdoc/lines-before-block": ["error"|"warn", {"ignoreSingleLines":true}]
// Message: Required 1 line(s) before JSDoc block
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
*
*/

someCode;

/**
 *
 */

someCode;

/**
 *
 */
// "jsdoc/lines-before-block": ["error"|"warn", {"lines":2}]

// Some comment

/**
 *
 */

/* Some comment */

/**
 *
 */

/**
 * Some comment
 */

/**
 *
 */

someCode; /** */

const a = {
  someProp: /** @type {SomeCast} */ (someVal)
};

const a = /** @lends SomeClass */ {
  someProp: (someVal)
};
// "jsdoc/lines-before-block": ["error"|"warn", {"excludedTags":["lends"],"ignoreSameLine":false}]

{
  /**
   * Description.
   */
  let value;
}

class MyClass {
  /**
   * Description.
   */
  method() {}
}

function myFunction() {
  /**
   * Description.
   */
  let value;
}

class SomeClass {
  constructor(
    /**
     * Description.
     */
    param
  ) {};

  method(
    /**
     * Description.
     */
    param
  ) {};
}

type FunctionAlias1 =
  /**
   * @param param - Description.
   */
  (param: number) => void;

type FunctionAlias2 = (
  /**
   * @param param - Description.
   */
  param: number
) => void;

type UnionDocumentation =
  /** Description. */
  | { someProp: number }

  /** Description. */
  | { otherProp: string }

type IntersectionDocumentation =
  /** Description. */
  { someProp: number } &

  /** Description. */
  { otherProp: string }

type IntersectionDocumentation = {
  someProp: number;
} & /** Description. */ {
  otherProp: string;
};

/** The parameters for a request */
export type RequestParams = {
  /** The year to retrieve. */
  year: `${number}`;
  /** The month to retrieve. */
  month: `${number}`;
}
// "jsdoc/lines-before-block": ["error"|"warn", {"ignoreSingleLines":true}]
````
