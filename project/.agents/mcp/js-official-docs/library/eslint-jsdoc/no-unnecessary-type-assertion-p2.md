---
title: "no-unnecessary-type-assertion (part 2 of 2)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/no-unnecessary-type-assertion.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# no-unnecessary-type-assertion (part 2 of 2)

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @type {5}
 */
const a = 5;
// Message: The @type tag declaring "5" is redundant as TypeScript infers it automatically.

/**
 * This is a special comment.
 * @type {5}
 */
const a = 5;
// Message: The @type tag declaring "5" is redundant as TypeScript infers it automatically.

/**
 * @type {string}
 */
const a = 'hello';
// Message: The @type tag declaring "string" is redundant as TypeScript infers it automatically.

/**
 * @type {string}
 */
const a = 'hello';
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"typesToIgnore":["number","boolean"]}]
// Message: The @type tag declaring "string" is redundant as TypeScript infers it automatically.

/**
 * @type {const}
 */
const a = 'hello';
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":true}]
// Message: The @type tag declaring "const" is redundant as TypeScript infers it automatically for literals.

/**
 * @type {const}
 */
const a = true;
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":true}]
// Message: The @type tag declaring "const" is redundant as TypeScript infers it automatically for literals.

/**
 * @param {"a"|15} b
 */
function quux (b) {
  /**
   * @type {const}
   */
  const a = b;
}
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":true}]
// Message: The @type tag declaring "const" is redundant as TypeScript infers it automatically for literals.

/**
 * @param {true} a
 */
function quux (a) {
  /**
   * @type {boolean}
   */
  const b = a;
}
// Message: The @type tag declaring "boolean" is redundant as TypeScript infers it automatically.

const a = /** @type {any} */ (5);
/**
 * @type {any}
 */
const b = a;
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"treatAnyAsRedundant":true}]
// Message: The @type tag declaring "any" is redundant as TypeScript infers it automatically.

const a = /** @type {5} */ (5);
// Message: The @type tag declaring "5" is redundant as TypeScript infers it automatically.

const a = /** @type {boolean} */ (true);
/**
 * @type {true}
 */
const b = a;
// Message: The @type tag declaring "boolean" is redundant as TypeScript infers it automatically.

foo(/** @type {number[]} */ ([1, 2]));
// Message: The @type tag declaring "number[]" is redundant as TypeScript infers it automatically.

const d = /** @type {Date} */ (new Date());
// Message: The @type tag declaring "Date" is redundant as TypeScript infers it automatically.

const u = /** @type {unknown} */ (5);
// Message: The @type tag declaring "unknown" is redundant as TypeScript infers it automatically.

let a;
a = /** @type {5} */ (5);
// Message: The @type tag declaring "5" is redundant as TypeScript infers it automatically.

const a = /** @type {const} */ (5);
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":true}]
// Message: The @type tag declaring "const" is redundant as TypeScript infers it automatically for literals.

const arr = [1];
arr[/** @type {0} */ (0)];
// Message: The @type tag declaring "0" is redundant as TypeScript infers it automatically.

const a = globalThis.b ? /** @type {5} */ (5) : 6;
// Message: The @type tag declaring "5" is redundant as TypeScript infers it automatically.

const a = /** @type {5} */ (5);
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"enableFixer":false}]
// Message: The @type tag declaring "5" is redundant as TypeScript infers it automatically.

/** @type {{prop: string}} */
const mapPaths = {prop: "text"};
// Message: The @type tag declaring "{prop: string}" is redundant as TypeScript infers it automatically.

/** @type {string} */
const a = 'x', b = 2;
// Message: The @type tag declaring "string" is redundant as TypeScript infers it automatically.

/**
 * Keep me.
 * @type {string}
 */
const a = 'hello';
// Message: The @type tag declaring "string" is redundant as TypeScript infers it automatically.

/**
 * @type {string}
 */
const a = 'hello';
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"enableFixer":false}]
// Message: The @type tag declaring "string" is redundant as TypeScript infers it automatically.

const arr = /** @type {['foo']} */ (['foo']);
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"preferConstToLiteralTuples":true}]
// Message: The @type tag declaring "['foo']" is better written as the "const" assertion `/** @type {const} */` (TypeScript 4.5+).

/**
 * @type {['foo', 1]}
 */
const arr = ['foo', 1];
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"preferConstToLiteralTuples":true}]
// Message: The @type tag declaring "['foo', 1]" is better written as the "const" assertion `/** @type {const} */` (TypeScript 4.5+).

foo(/** @type {['foo']} */ (['foo']));
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"preferConstToLiteralTuples":true}]
// Message: The @type tag declaring "['foo']" is better written as the "const" assertion `/** @type {const} */` (TypeScript 4.5+).

const arr = /** @type {['foo']} */ (['foo']);
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"enableFixer":false,"preferConstToLiteralTuples":true}]
// Message: The @type tag declaring "['foo']" is better written as the "const" assertion `/** @type {const} */` (TypeScript 4.5+).

export function w8b(/** @type {string} */ s) {
  let x = /** @type {unknown} */ (s);
  x = 5;
  return x;
}
// Message: The @type tag declaring "unknown" is redundant as TypeScript infers it automatically.

export const f1 = /** @type {"x"|"y"} */ ("x");
// Message: The @type tag declaring ""x"|"y"" is redundant as TypeScript infers it automatically.

export function r2(/** @type {string} */ s) {
  return /** @type {unknown} */ (s);
}
// Message: The @type tag declaring "unknown" is redundant as TypeScript infers it automatically.

export function w8b(/** @type {string} */ s) {
  let x = /** @type {unknown} */ (s);
  x = 5;
  return x;
}
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"fixTypeChangingCasts":false}]
// Message: The @type tag declaring "unknown" is redundant as TypeScript infers it automatically.

export const f1 = /** @type {"x"|"y"} */ ("x");
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"fixTypeChangingCasts":false}]
// Message: The @type tag declaring ""x"|"y"" is redundant as TypeScript infers it automatically.

export function r2(/** @type {string} */ s) {
  return /** @type {unknown} */ (s);
}
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"fixTypeChangingCasts":false}]
// Message: The @type tag declaring "unknown" is redundant as TypeScript infers it automatically.

/**
 * @type {string | number}
 */
const wide = 'hello';
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"fixTypeChangingCasts":false}]
// Message: The @type tag declaring "string | number" is redundant as TypeScript infers it automatically.

export const ok1 = /** @type {number} */ (3 + 5);
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"fixTypeChangingCasts":false}]
// Message: The @type tag declaring "number" is redundant as TypeScript infers it automatically.

/**
 * @type {string}
 */
const widened = 'hello';
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"fixTypeChangingCasts":false}]
// Message: The @type tag declaring "string" is redundant as TypeScript infers it automatically.

/**
 * @type {const}
 */
const five = 5;
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":true,"fixTypeChangingCasts":false}]
// Message: The @type tag declaring "const" is redundant as TypeScript infers it automatically for literals.

export function w8b(/** @type {string} */ s) {
  let x = /** @type {unknown} */ (s);
  x = 5;
  return x;
}
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"enableFixer":false,"fixTypeChangingCasts":false}]
// Message: The @type tag declaring "unknown" is redundant as TypeScript infers it automatically.

/**
 * @type {string | number}
 */
const wide = 'hello';
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"enableFixer":false,"fixTypeChangingCasts":false}]
// Message: The @type tag declaring "string | number" is redundant as TypeScript infers it automatically.

const text = String(1);

export const first = /** @type {string} */ (text);
export const second = /** @type {string} */ (text);
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"enableFixer":false}]
// Message: The @type tag declaring "string" is redundant as TypeScript infers it automatically.

/**
 * @type {'a' | 'b'}
 */
const mode = 'a';
// Message: The @type tag declaring "'a' | 'b'" is redundant as TypeScript infers it automatically.

/**
 * @type {string}
 */
let mode = 'a';
// Message: The @type tag declaring "string" is redundant as TypeScript infers it automatically.

/**
 * @type {string}
 */
var mode = 'a';
// Message: The @type tag declaring "string" is redundant as TypeScript infers it automatically.

/**
 * @type {{mode: string}}
 */
const {mode} = {mode: 'a'};
// Message: The @type tag declaring "{mode: string}" is redundant as TypeScript infers it automatically.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {boolean} a
 */
function quux (a) {
  /**
   * @type {true}
   */
  const b = a;
}

const a = /** @type {string} */ (5);

const a = /** @type {any} */ (5);

const a = /** @type {5} */ (5);
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"typesToIgnore":["5"]}]

/**
 * @type {() => void}
 */
function quux () {}

let a = /** @type {5} */ (5);

let a = /** @type {const} */ (5);
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":true}]

foo(/** @type {const} */ (5));
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":true}]

const f = () => /** @type {const} */ (5);
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":true}]

/**
 * @type {string}
 */
const a = 5;

/**
 * @type {any}
 */
const a = 5;

const a = /** @type {any} */ (5);
/**
 * @type {any}
 */
const b = a;
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"treatAnyAsRedundant":false}]

/**
 * @type {const}
 */
const a = 'hello';
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":false}]

/**
 * @type {string}
 */
const a = 'hello';
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"typesToIgnore":["number","string"]}]

/**
 * @param {string} b
 */
function quux (b) {
  /**
   * @type {const}
   */
  const a = b;
}
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":true}]

/** @type {string[]} */
const mapPaths = [];

/** @type {{prop?: string}} */
const mapPaths = {};

/** @type {{prop?: string}} */
const mapPaths = {prop: "text"};

/** @type {string} */
const a = 5, b = 'x';

/**
 * @param {string} sel
 * @returns {HTMLElement[]}
 */
const $$ = (sel) => [...(/** @type {NodeListOf<HTMLElement>} */ (
  document.querySelectorAll(sel)
))];

/**
 * @param {string} sel
 */
const q = (sel) => {
  /** @type {NodeListOf<HTMLElement>} */
  const els = document.querySelectorAll(sel);
  return els;
};

const p = /** @type {Promise<number>} */ (Promise.resolve(5));

const m = /** @type {Map<string, number>} */ (new Map());

let match = null;
// ...
const mtch = /** @type {RegExpMatchArray} */ (
  /** @type {unknown} */ (match)
);

/**
 * @typedef {"Int8Array"|"Uint8Array"|"Uint8ClampedArray"|
 *   "Int16Array"|"Uint16Array"|"Int32Array"|"Uint32Array"|
 *   "Float32Array"|"Float64Array"|"BigInt64Array"|
 *   "BigUint64Array"} TypedArray
 */

/**
 * @param {string} s
 */
const parse = (s) => {
  const bufferSourceClass = 'someClass';
  const o = JSON.parse(s);
  return getTypedArray(
    /** @type {TypedArray} */ (o.typedArray ?? bufferSourceClass)
  );
};

/**
 * @param {string} s
 */
const setter = (s) => {
  const o = JSON.parse(s);
  typedArray.set(...(
    /**
     * @type {[
     *   array: Array<bigint> & Array<number>,
     *   offset?: number | undefined
     * ]}
     */ (o.set)
  ));
};

const reader = new FileReader();
reader.addEventListener(
  'error',
  async function () {
    await dialogs.alert(/** @type {string} */ (
      /** @type {DOMException} */ (reader.error).message
    ));
  }
);

const parsed = JSON.parse('{}');
const z = /** @type {string} */ (
  /** @type {{y: string}} */ (parsed).y
);

const aType = 'array';
const newType = /** @type {"arrayReference"|"objectReference"} */ (
  `${aType}Reference`
);

const aType = 'array';
/** @type {"arrayReference"|"objectReference"} */
const newType = `${aType}Reference`;

/** @type {{[key: (string|number)]: any}} */
const retObj = this.array && !this.record ? [] : {};

/** @type {({[key: <example-value>]: any})|any[]} */
const ret = someString === 'object' ? {} : [];

const list = /** @type {string[] | undefined} */ (
  Math.random() ? [] : undefined
);

const a = /* @type {number} */ (3 + 5);

const arr = /** @type {['foo']} */ (['foo']);

/**
 * @type {['foo']}
 */
const arr = ['foo'];

const arr = /** @type {[string]} */ (['foo']);
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"preferConstToLiteralTuples":true}]

/**
 * @typedef {"single-panel"|"panels-dialogs"|"user"} ViewType
 */

/** @type {ViewType[]} */
const viewTypes = ['single-panel', 'panels-dialogs', 'user'];

/**
 * @typedef {"single-panel"|"panels-dialogs"|"user"} ViewType
 */

const viewTypes = /** @type {ViewType[]} */ (['single-panel', 'panels-dialogs', 'user']);

/**
 * @type {{
 *   main: (...arg: string[]) => string[]
 * }}
 */
const keyRange = {
  main (...args) {
    return args;
  },
};

const keyRange = /** @type {{
  main: (...arg: string[]) => string[]
}} */ ({
  main (...args) {
    return args;
  },
});

const base = {};

/**
 * @type {{
 *   run: (arg: string) => string
 * }}
 */
const keyRange = {
  ...base,
  run: (arg) => arg,
};

/**
 * @type {'a' | 'b'}
 */
let mode = 'a';

/**
 * @type {'a' | 'b'}
 */
var mode = 'a';

/**
 * @type {{mode: 'a' | 'b'}}
 */
let {mode} = {mode: 'a'};

/**
 * @type {{mode: 'a' | 'b'}}
 */
var {mode} = {mode: 'a'};

/**
 * @type {'a' | 'b'}
 */
let mode = 'a', other = 'c';
````
