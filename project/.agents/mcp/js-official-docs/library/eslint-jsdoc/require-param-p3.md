---
title: "require-param (part 3 of 4)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-param.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# require-param (part 3 of 4)

````ts
/**
 *
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 *
 */
function quux (foo) {

}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["FunctionDeclaration"]}]
// Message: Missing JSDoc @param "foo" declaration.

/**
 *
 */
function quux ({foo}) {

}
// Message: Missing JSDoc @param "root0" declaration.

/**
 * @param foo
 */
function quux (foo, bar, {baz}) {

}
// "jsdoc/require-param": ["error"|"warn", {"checkDestructured":false}]
// Message: Missing JSDoc @param "bar" declaration.

/**
 * @param foo
 */
function quux (foo, bar, {baz}) {

}
// "jsdoc/require-param": ["error"|"warn", {"checkDestructuredRoots":false}]
// Message: Missing JSDoc @param "bar" declaration.

/**
 *
 */
function quux ({foo}) {

}
// "jsdoc/require-param": ["error"|"warn", {"enableFixer":false}]
// Message: Missing JSDoc @param "root0" declaration.

/**
 *
 */
function quux ({foo: bar = 5} = {}) {

}
// Message: Missing JSDoc @param "root0" declaration.

/**
 * @param
 */
function quux ({foo}) {

}
// Message: Missing JSDoc @param "root0" declaration.

/**
 * @param
 */
function quux ({foo}) {

}
// "jsdoc/require-param": ["error"|"warn", {"autoIncrementBase":1}]
// Message: Missing JSDoc @param "root1" declaration.

/**
 * @param options
 */
function quux ({foo}) {

}
// Message: Missing JSDoc @param "options.foo" declaration.

/**
 * @param
 */
function quux ({ foo, bar: { baz }}) {

}
// Message: Missing JSDoc @param "root0" declaration.

/**
 * @param root0
 * @param root0.foo
 * @param root0.bar.baz
 */
function quux ({ foo, bar: { baz }}) {
}
// Message: Missing JSDoc @param "root0.bar" declaration.

/**
 *
 */
function quux ({foo}, {bar}) {

}
// "jsdoc/require-param": ["error"|"warn", {"unnamedRootBase":["arg"]}]
// Message: Missing JSDoc @param "arg0" declaration.

/**
 *
 */
function quux ({foo}, {bar}) {

}
// "jsdoc/require-param": ["error"|"warn", {"unnamedRootBase":["arg","config"]}]
// Message: Missing JSDoc @param "arg" declaration.

/**
 *
 */
function quux ({foo}, {bar}) {

}
// "jsdoc/require-param": ["error"|"warn", {"enableRootFixer":false,"unnamedRootBase":["arg","config"]}]
// Message: Missing JSDoc @param "arg" declaration.

/**
 *
 */
function quux (foo, bar) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @param foo
 */
function quux (foo, bar) {

}
// Message: Missing JSDoc @param "bar" declaration.

/**
 * @param bar
 */
function quux (foo, bar, baz) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @param foo
 * @param bar
 */
function quux (foo, bar, baz) {

}
// Message: Missing JSDoc @param "baz" declaration.

/**
 * @param baz
 */
function quux (foo, bar, baz) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @param
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}
// Message: Missing JSDoc @arg "foo" declaration.

/**
 * @override
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"overrideReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @ignore
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignoreReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @implements
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"implementsReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @augments
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @extends
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @override
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"overrideReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @ignore
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"ignoreReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @implements
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"implementsReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @augments
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @extends
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Message: Missing JSDoc @param "foo" declaration.

export class SomeClass {
  /**
   * @param property
   */
  constructor(private property: string, private foo: number) {}
}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @param
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`

/**
 *
 */
function quux ({bar, baz}, foo) {
}
// Message: Missing JSDoc @param "root0" declaration.

/**
 *
 */
function quux (foo, {bar, baz}) {
}
// Message: Missing JSDoc @param "foo" declaration.

/**
 *
 */
function quux ([bar, baz], foo) {
}
// Message: Missing JSDoc @param "root0" declaration.

/**
 *
 */
function quux (foo) {
}
// "jsdoc/require-param": ["error"|"warn", {"exemptedBy":["notPresent"]}]
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @inheritdoc
 */
function quux (foo) {

}
// "jsdoc/require-param": ["error"|"warn", {"exemptedBy":[]}]
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @inheritdoc
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * Assign the project to a list of employees.
 * @param {object[]} employees - The employees who are responsible for the project.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].department - The employee's department.
 */
function assign (employees, name) {

};
// Message: Missing JSDoc @param "name" declaration.

interface ITest {
/**
 * Test description.
 */
TestMethod(id: number): void;
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSMethodSignature"]}]
// Message: Missing JSDoc @param "id" declaration.

/**
 * A test class.
 */
abstract class TestClass
{
/**
 * A test method.
 */
abstract TestFunction(id);
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSEmptyBodyFunctionExpression"]}]
// Message: Missing JSDoc @param "id" declaration.

/**
 * A test class.
 */
declare class TestClass
{
/**
 *
 */
TestMethod(id);
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSEmptyBodyFunctionExpression"]}]
// Message: Missing JSDoc @param "id" declaration.

/**
 * A test function.
 */
declare let TestFunction: (id) => void;
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

/**
 * A test function.
 */
let TestFunction: (id) => void;
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

/**
 * A test function.
 */
function test(
  processor: (id: number) => string
) {
  return processor(10);
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

/**
 * A test function.
 */
let test = (processor: (id: number) => string) =>
{
  return processor(10);
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

class TestClass {
  /**
  * A class property.
  */
  public Test: (id: number) => string;
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

class TestClass {
  /**
   * A class method.
   */
  public TestMethod(): (id: number) => string
  {
  }
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

interface TestInterface {
/**
 * An interface property.
 */
Test: (id: number) => string;
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

interface TestInterface {
  /**
   * An interface method.
   */
  TestMethod(): (id: number) => string;
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

/**
 * A function with return type
 */
function test(): (id: number) => string;
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

/**
 * @param baz
 * @param options
 */
function quux (baz, {foo: bar}) {

}
// Message: Missing JSDoc @param "options.foo" declaration.

class Client {
  /**
   * Set collection data.
   * @param  {Object}   data                    The collection data object.
   * @param  {number}   data.last_modified
   * @param  {Object}   options            The options object.
   * @param  {Object}   [options.headers]       The headers object option.
   * @param  {Number}   [options.retry=0]       Number of retries to make
   *     when faced with transient errors.
   * @param  {Boolean}  [options.safe]          The safe option.
   * @param  {Boolean}  [options.patch]         The patch option.
   * @param  {Number}   [options.last_modified] The last_modified option.
   * @return {Promise<Object, Error>}
   */
  async setData(
    data: { last_modified?: number },
    options: {
      headers?: Record<string, string>;
      safe?: boolean;
      retry?: number;
      patch?: boolean;
      last_modified?: number;
      permissions?: [];
    } = {}
  ) {}
}
// Message: Missing JSDoc @param "options.permissions" declaration.

/**
 *
 */
function quux (foo) {

}
// "jsdoc/require-param": ["error"|"warn", {"enableFixer":false}]
// Message: Missing JSDoc @param "foo" declaration.

class Client {
  /**
   * Set collection data.
   * @return {Promise<Object, Error>}
   */
  async setData(
    data: { last_modified?: number }
  ) {}
}
// Message: Missing JSDoc @param "data" declaration.

/**
 * @param cfg
 * @param cfg.num
 */
function quux ({num, ...extra}) {
}
// "jsdoc/require-param": ["error"|"warn", {"checkRestProperty":true}]
// Message: Missing JSDoc @param "cfg.extra" declaration.

/**
 * @param cfg
 * @param cfg.opts
 * @param cfg.opts.num
 */
function quux ({opts: {num, ...extra}}) {
}
// "jsdoc/require-param": ["error"|"warn", {"checkRestProperty":true}]
// Message: Missing JSDoc @param "cfg.opts.extra" declaration.

/**
 * @param {GenericArray} cfg
 * @param {number} cfg."0"
 */
function baar ([a, ...extra]) {
  //
}
// Message: Missing JSDoc @param "cfg."1"" declaration.

/**
 * @param a
 */
function baar (a, ...extra) {
  //
}
// Message: Missing JSDoc @param "extra" declaration.

/**
 * Converts an SVGRect into an object.
 * @param {SVGRect} bbox - a SVGRect
 */
const bboxToObj = function ({x, y, width, height}) {
  return {x, y, width, height};
};
// "jsdoc/require-param": ["error"|"warn", {"checkTypesPattern":"SVGRect"}]
// Message: Missing JSDoc @param "bbox.x" declaration.

/**
 * Converts an SVGRect into an object.
 * @param {object} bbox - a SVGRect
 */
const bboxToObj = function ({x, y, width, height}) {
  return {x, y, width, height};
};
// Message: Missing JSDoc @param "bbox.x" declaration.

module.exports = class GraphQL {
  /**
   * @param fetchOptions
   * @param cacheKey
   */
  fetch = ({ url, ...options }, cacheKey) => {
  }
};
// "jsdoc/require-param": ["error"|"warn", {"checkRestProperty":true}]
// Message: Missing JSDoc @param "fetchOptions.url" declaration.

(function() {
	/**
	 * A function.
	 */
	function f(param) {
		return !param;
	}
})();
// Message: Missing JSDoc @param "param" declaration.

/**
 * Description.
 * @param {Object} options
 * @param {Object} options.foo
 */
function quux ({ foo: { bar } }) {}
// Message: Missing JSDoc @param "options.foo.bar" declaration.

/**
 * Description.
 * @param {FooBar} options
 * @param {FooBar} options.foo
 */
function quux ({ foo: { bar } }) {}
// "jsdoc/require-param": ["error"|"warn", {"checkTypesPattern":"FooBar"}]
// Message: Missing JSDoc @param "options.foo.bar" declaration.

/**
 * Description.
 * @param {Object} options
 * @param {FooBar} foo
 */
function quux ({ foo: { bar } }) {}
// Message: Missing JSDoc @param "options.foo" declaration.

/**
 * Description.
 * @param {Object} options
 * @param options.foo
 */
function quux ({ foo: { bar } }) {}
// Message: Missing JSDoc @param "options.foo.bar" declaration.

/**
 * Description.
 * @param {object} options Options.
 * @param {object} options.foo A description.
 * @param {object} options.foo.bar
 */
function foo({ foo: { bar: { baz } }}) {}
// Message: Missing JSDoc @param "options.foo.bar.baz" declaration.

/**
 * Returns a number.
 * @param {Object} props Props.
 * @param {Object} props.prop Prop.
 * @return {number} A number.
 */
export function testFn1 ({ prop = { a: 1, b: 2 } }) {
}
// "jsdoc/require-param": ["error"|"warn", {"useDefaultObjectProperties":true}]
// Message: Missing JSDoc @param "props.prop.a" declaration.

/** Foo. */
function foo(a, b, c) {}
// Message: Missing JSDoc @param "a" declaration.

/**
 * @param foo Some number.
 * @param bar Some number.
 */
export function myPublicFunction(foo: number, bar: number, baz: number) {}
// "jsdoc/require-param": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[tag=\"param\"])","context":"FunctionDeclaration"}]}]
// Message: Missing JSDoc @param "baz" declaration.

/**
 * [A description]
 */
class A {
  /**
   * openConfirmModal
   * @memberof CreateEditTestWizardComponent
   */
  public openConfirmModal(btnState: string) {
    this.modalBtnState = btnState;
    this.openModal();
  }
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["MethodDefinition"]}]
// Message: Missing JSDoc @param "btnState" declaration.

class A {
  /**
   * @param root0
   * @param root0.foo
   */
  quux({ foo }, { bar }) {
    console.log(foo, bar);
  }
}
// Message: Missing JSDoc @param "root1" declaration.

/**
 * Some desc.
 * @param a
 */
function quux (a, b) {}
// "jsdoc/require-param": ["error"|"warn", {"ignoreWhenAllParamsMissing":true}]
// Message: Missing JSDoc @param "b" declaration.

/**
 * Some test function type.
 */
export type Test = (foo: number) => string;
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "foo" declaration.

/**
 *
 */
const quux = function quux (foo) {
};
// "jsdoc/require-param": ["error"|"warn", {"interfaceExemptsParamsCheck":true}]
// Message: Missing JSDoc @param "foo" declaration.

/**
 *
 */
function quux ({
  abc,
  def
}) {
}
// "jsdoc/require-param": ["error"|"warn", {"interfaceExemptsParamsCheck":true}]
// Message: Missing JSDoc @param "root0" declaration.

/**
 * @param foo
 * @param baz
 * @returns {number}
 */
function quux (foo, bar, baz) {
  return foo + bar + baz;
}
// Message: Missing JSDoc @param "bar" declaration.

/**
 * @example
 * ```ts
 * app.use(checkResourceOwnership({ entryPoint: 'seller_product' }));
 * ```
 *
````
