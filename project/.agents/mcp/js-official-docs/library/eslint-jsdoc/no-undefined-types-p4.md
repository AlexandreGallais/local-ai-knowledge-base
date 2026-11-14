---
title: "no-undefined-types (part 4 of 4)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/no-undefined-types.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# no-undefined-types (part 4 of 4)

````ts
export function f(): void {}

export namespace Api {
  export function fn(): void {}
  export declare function declared(): void;
}
/** See {@link Api.fn} and {@link Api.declared}. */
export function f(): void {}

export namespace Api {
  export import Alias = Elsewhere.Thing;
  console.log('init');
}
/**
 * @param {Api.Alias} a The alias.
 */
export function f(a: Api.Alias): void {}

declare module "my-module" {
  export interface ModuleType {}
}
/** @type {import("my-module").ModuleType} */
const x = {};

class Test {}
/**
 * @template {Test} T
 * @typedef {T extends Test<infer I> ? I : never} TestType
 */

/**
 * @template T
 */
class Test {
  /** @typedef {T} Type */
  /** @type {Type} */
  t;
}

console.log(Test);

declare global {
  const foo: number;
}

/**
 * {@link foo}
 */
export const bar = 1;

/** {@link foo} */
function a(foo: number) {}

/** {@link foo} */
const b = function (foo: number) {};

/** {@link foo} */
const b = (foo: number) => {};

/**
 * @param {...Iterable<any>} its
 * @returns {IteratorObject<any>}
 * @see https://developer.mozilla.org/Web/JavaScript/Reference/Global_Objects/Iterator/concat
 */
const concatIteratorJSDoc = (...its) => {
    return Iterator.from(its.flat());
};

/** xyz {@link property} */
export class MyClass {
  public property: boolean
}

/** xyz {@link property} */
export default class MyClass {
  property = true;
}

/** @type {Readonly<Record<string, string>>} */
export const a = {};

/** @type {ReadonlySet<string>} */
export const b = new Set();

/** @type {ReadonlyMap<string, number>} */
export const c = new Map();

/** @type {ReadonlyArray<string>} */
export const d = [];

/** @type {PropertyKey} */
export const e = 'e';

/**
 * @param {ArrayLike<number>} list
 * @param {PromiseLike<void>} thenable
 * @param {TemplateStringsArray} strings
 * @returns {Generator<number, void, unknown>}
 */
export function * f (list, thenable, strings) {}

/**
 * @param {AsyncIterable<string>} source
 * @returns {AsyncGenerator<string>}
 */
export async function * g (source) {}

/**
 * @template [T = unknown]
 * @param {T} [x]
 * @returns {T|undefined}
 */
function get (x) {
  return x;
}

/**
 * @param {<T>(value: T, cb?: (value: T) => string) => void} a
 * @param {<T, U>(x: T[], f: (t: T) => U) => Promise<U[]>} b
 * @param {<K extends string>(k: K) => {[P in K]: number}} c
 * @param {{<T>(x: T): T}} d
 * @param {{map<U>(f: (x: number) => U): U[]}} e
 * @param {{new <T>(x: T): T}} f
 * @param {<T>() => <U>(x: U) => [T, U]} g
 * @returns {void}
 */
function quux (a, b, c, d, e, f, g) {}

/** @typedef {(value: unknown) => value is string} IsString */

/**
 * @param {(x: unknown) => x is string} a
 * @param {(x: unknown) => asserts x is string} b
 * @param {(x: unknown) => asserts x} c
 * @param {{check(x: unknown): x is string}} d
 * @param {{(x: unknown): x is string}} e
 * @returns {void}
 */
function quux (a, b, c, d, e) {}
````
