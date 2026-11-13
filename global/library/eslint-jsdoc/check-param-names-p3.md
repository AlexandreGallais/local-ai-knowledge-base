---
title: "check-param-names (part 3 of 3)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/check-param-names.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# check-param-names (part 3 of 3)

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param bar
 * @param foo
 */
function quux (foo, bar) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"badParamOrder":false,"enableFixer":true}]

/**
 * @param foo
 * @param foo
 */
function quux (foo) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"duplicateParams":false,"enableFixer":true}]

/**
 *
 */
function quux (foo) {

}

/**
 * @param foo
 */
function quux (foo) {

}

/**
 * @param foo
 * @param bar
 */
function quux (foo, bar) {

}

/**
 * @param foo
 * @param bar
 */
function quux (foo, bar, baz) {

}

/**
 * @param foo
 * @param foo.foo
 * @param bar
 */
function quux (foo, bar) {

}

/**
 * @param args
 */
function quux (...args) {

}

/**
 * @param foo
 * @param foo.a
 * @param foo.b
 */
function quux ({a, b}) {

}

/**
 * @param foo
 * @param foo.a
 * @param foo.b
 */
function quux ({"a": A, b}) {

}

/**
 * @param foo
 * @param foo."a"
 * @param foo.b
 */
function quux ({a: A, b}) {

}

/**
 * @param foo
 * @param foo."a-b"
 * @param foo.b
 */
function quux ({"a-b": A, b}) {

}

/**
 * @param foo
 * @param foo.bar
 * @param foo.baz
 * @param bar
 */
function quux (foo, bar) {

}

/**
 * Assign the project to a list of employees.
 * @param {object[]} employees - The employees who are responsible for the project.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].department - The employee's department.
 */
function assign (employees) {

};

export class SomeClass {
  /**
   * @param property
   */
  constructor(private property: string) {}
}

export class SomeClass {
  /**
   * @param options
   * @param options.foo
   * @param options.bar
   */
  constructor(options: { foo: string, bar: string }) {}
}

export class SomeClass {
  /**
   * @param options
   * @param options.foo
   * @param options.bar
   */
  constructor({ foo, bar }: { foo: string, bar: string }) {}
}

export class SomeClass {
  /**
   * @param options
   * @param options.foo
   * @param options.bar
   */
  constructor({ foo, bar }: { foo: string, bar: string }) {}
}

/**
 * @param {Error} error Exit code
 * @param {number} [code = 1] Exit code
 */
function quux (error, code = 1) {
};

/**
 * @param foo
 * @param bar
 */
function quux (foo) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"allowExtraTrailingParamDocs":true}]

/**
 * @param cfg
 * @param cfg.foo
 * @param baz
 */
function quux ({foo}, baz) {

}

/**
 * @param cfg
 * @param cfg.foo
 * @param cfg2
 */
function quux ({foo}, cfg2) {

}

/**
 * @param cfg
 * @param cfg.foo
 * @param baz
 * @param baz.cfg
 */
function quux ({foo}, {cfg}) {

}

/**
 * @param options
 * @param options.foo
 */
function quux ({foo, ...extra}) {
}

/**
 * @param foo
 * @param bar
 */
function quux (foo, bar, ...extra) {

}

/**
 * Converts an SVGRect into an object.
 * @param {SVGRect} bbox - a SVGRect
 */
const bboxToObj = function ({x, y, width, height}) {
  return {x, y, width, height};
};

/**
* Converts an SVGRect into an object.
* @param {object} bbox - a SVGRect
*/
const bboxToObj = function ({x, y, width, height}) {
  return {x, y, width, height};
};
// "jsdoc/check-param-names": ["error"|"warn", {"checkTypesPattern":"SVGRect"}]

class CSS {
  /**
   * Set one or more CSS properties for the set of matched elements.
   *
   * @param {Object} propertyObject - An object of property-value pairs to set.
   */
  setCssObject(propertyObject: {[key: <example-value>]: string | number}): void {
  }
}

/**
 * Logs a string.
 *
 * @param input - String to output.
 */
export default function (input: {
  [foo: string]: { a: string; b: string };
}): void {
  input;
}

export class Thing {
  foo: any;

  /**
   * @param {} C
   */
  constructor(C: { new (): any }) {
    this.foo = new C();
  }
}

/**
 * @param foo
 * @param root
 */
function quux (foo, {bar}) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"checkDestructured":false}]

class A {
  /**
   * Show a prompt.
   * @param hideButton true if button should be hidden, false otherwise
   * @param onHidden delegate to call when the prompt is hidden
   */
  public async showPrompt(hideButton: boolean, onHidden: {(): void}): Promise<void>
  {
  }
}

/**
 * Description.
 * @param {Object} options Options.
 * @param {FooBar} options.foo foo description.
 */
function quux ({ foo: { bar }}) {}

/**
 * Description.
 * @param {FooBar} options
 * @param {Object} options.foo
 */
function quux ({ foo: { bar } }) {}
// "jsdoc/check-param-names": ["error"|"warn", {"checkTypesPattern":"FooBar"}]

/**
 * Description.
 * @param {Object} options
 * @param {FooBar} options.foo
 * @param {FooBar} options.baz
 */
function quux ({ foo: { bar }, baz: { cfg } }) {}

/**
 * Item
 *
 * @param {object} props
 * @param {object} props.data - case data
 * @param {string} props.data.className - additional css class
 * @param props.val
 */
export default function Item({
  data: {
    className,
  } = {},
  val = 4
}) {
}

/**
 * @param obj
 * @param obj.data
 * @param obj.data."0"
 * @param obj.data."1"
 * @param obj.data."2"
 * @param obj.defaulting
 * @param obj.defaulting."0"
 * @param obj.defaulting."1"
 */
function Item({
  data: [foo, bar, ...baz],
  defaulting: [quux, xyz] = []
}) {
}

/**
* Returns a number.
* @param {Object} props Props.
* @param {Object} props.prop Prop.
* @param {string} props.prop.a String.
* @param {string} props.prop.b String.
* @return {number} A number.
*/
export function testFn1 ({ prop = { a: 1, b: 2 } }) {
}
// "jsdoc/check-param-names": ["error"|"warn", {"useDefaultObjectProperties":true}]

/**
 * @param {object} root
 * @param {object} root.cfg
 * @param {string} root.cfg.foo
 * @param {string} root.cfg.bar
 * @param {object} root.cfg.extra
 */
function quux ({cfg}) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"disableExtraPropertyReporting":true}]

class A {
    /**
     * @param cfg
     * @param cfg.abc
     */
    constructor({
        [new.target.prop]: cX,
        abc
    }) {
    }
}

/**
 * @param root
 * @param root."0" Ignored
 * @param root."1" Our "b"
 */
const foo = ([, b]) => b;

/**
 * @param arg1 This is the description for arg1.
 */
function foo(this: void, arg1: number): void;

declare global {
  /**
   * @param arg1 This is the number for foo.
   */
  function foo(this: void, arg1: number): void;
}

declare global {
  /**
   * @param r Range is 0-1.
   * @param g Range is 0-1.
   * @param b Range is 0-1.
   */
  function Color(
    this: void,
    r: float,
    g: float,
    b: float,
  ): Color;
}

/**
 * @param this desc
 * @param bar number to return
 * @returns number returned back to caller
 */
function foo(this: T, bar: number): number {
  console.log(this.name);
  return bar;
}

/**
 * @param bar number to return
 * @param this desc
 * @returns number returned back to caller
 */
function foo(this: T, bar: number): number {
  console.log(this.name);
  return bar;
}
// "jsdoc/check-param-names": ["error"|"warn", {"badParamOrder":false}]

/**
 * Documentation
 */
function quux (foo, bar) {
}
// "jsdoc/check-param-names": ["error"|"warn", {"disableMissingParamChecks":true}]

/**
 * @param bar
 * @param bar.baz
 */
function quux (foo, bar) {
}
// "jsdoc/check-param-names": ["error"|"warn", {"disableMissingParamChecks":true}]

/**
 * @param foo
 */
function quux (foo, bar) {
}
// "jsdoc/check-param-names": ["error"|"warn", {"disableMissingParamChecks":true}]

/**
 * @param type Type
 * @param arg Arg
 */
export function fn(...[type, arg]: FnArgs): void {
  // ...
}

/**
 * @param c c
 * @param d d
 */
const inner = (c: number, d: string): void => {
  console.log(c);
  console.log(d);
};
// Settings: {"jsdoc":{"contexts":["VariableDeclaration"]}}

const emit = defineEmits<{
  /**
   * Fired when an editable field is submitted.
   * @param index the index of the editable field
   */
  submitField: [index: number];
}>();
````
