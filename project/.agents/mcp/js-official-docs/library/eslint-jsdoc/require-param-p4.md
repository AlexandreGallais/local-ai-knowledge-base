---
title: "require-param (part 4 of 4)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-param.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# require-param (part 4 of 4)

````ts
 * @example
 * ```ts
 * app.use(checkResourceOwnership({ entryPoint: 'service_zone' }));
 * ```
 *
 * @param options - configuration
 * @param options.entryPoint
 * @param options.filterField
 * @param options.paramIdField
 */
export const checkResourceOwnership = ({ entryPoint, filterField, paramIdField, resourceId = () => '' }) => {};
// Message: Missing JSDoc @param "options.resourceId" declaration.

/**\r
 * Does it.\r
 */\r
function quux (foo, bar) {}
// Message: Missing JSDoc @param "foo" declaration.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param foo
 */
function quux (foo) {

}

/**
 * @param root0
 * @param root0.foo
 */
function quux ({foo}) {

}

/**
 * @param root0
 * @param root0.foo
 * @param root1
 * @param root1.bar
 */
function quux ({foo}, {bar}) {

}

/**
 * @param arg0
 * @param arg0.foo
 * @param arg1
 * @param arg1.bar
 */
function quux ({foo}, {bar}) {

}
// "jsdoc/require-param": ["error"|"warn", {"unnamedRootBase":["arg"]}]

/**
 * @param arg
 * @param arg.foo
 * @param config0
 * @param config0.bar
 * @param config1
 * @param config1.baz
 */
function quux ({foo}, {bar}, {baz}) {

}
// "jsdoc/require-param": ["error"|"warn", {"unnamedRootBase":["arg","config"]}]

/**
 * @inheritdoc
 */
function quux (foo) {

}

/**
 * @inheritDoc
 */
function quux (foo) {

}

/**
 * @arg foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}

/**
 * @override
 * @param foo
 */
function quux (foo) {

}

/**
 * @override
 */
function quux (foo) {

}

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

/**
 * @override
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"overrideReplacesDocs":true}}

/**
 * @ignore
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignoreReplacesDocs":true}}

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

/**
 * @implements
 */
function quux (foo) {

}

/**
 * @implements
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"implementsReplacesDocs":true}}

/**
 * @implements
 * @param foo
 */
function quux (foo) {

}

/**
 * @augments
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @augments
 * @param foo
 */
function quux (foo) {

}

/**
 * @extends
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @extends
 * @param foo
 */
function quux (foo) {

}

/**
 * @override
 */
class A {
  /**
  * @param foo
  */
  quux (foo) {

  }
}

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
// Settings: {"jsdoc":{"overrideReplacesDocs":true}}

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
// Settings: {"jsdoc":{"ignoreReplacesDocs":true}}

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
// Settings: {"jsdoc":{"implementsReplacesDocs":true}}

/**
 * @implements
 */
class A {
  /**
   * @param foo
   */
  quux (foo) {

  }
}

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
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @augments
 */
class A {
  /**
   * @param foo
   */
  quux (foo) {

  }
}

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
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @extends
 */
class A {
  /**
   * @param foo
   */
  quux (foo) {

  }
}

/**
 * @internal
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignoreInternal":true}}

/**
 * @private
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignorePrivate":true}}

/**
 * @access private
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignorePrivate":true}}

// issue 182: optional chaining
/** @const {boolean} test */
const test = something?.find(_ => _)

/** @type {RequestHandler} */
function foo(req, res, next) {}

/**
 * @type {MyCallback}
 */
function quux () {

}
// "jsdoc/require-param": ["error"|"warn", {"exemptedBy":["type"]}]

/**
 * @override
 */
var A = class {
  /**
    *
    */
  quux (foo) {

  }
}

export class SomeClass {
  /**
   * @param property
   */
  constructor(private property: string) {}
}

/**
 * Assign the project to an employee.
 *
 * @param {object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */
function assign({name, department}) {
  // ...
}

export abstract class StephanPlugin<O, D> {

    /**
     * Called right after Stephan loads the plugin file.
     *
     * @example
     *```typescript
     * type Options = {
     *      verbose?: boolean;
     *      token?: string;
     * }
     * ```
     *
     * Note that your Options type should only have optional properties...
     *
     * @param args Arguments compiled and provided by StephanClient.
     * @param args.options The options as provided by the user, or an empty object if not provided.
     * @param args.client The options as provided by the user, or an empty object if not provided.
     * @param defaultOptions The default options as provided by the plugin, or an empty object.
     */
    public constructor({options, client}: {
        options: O;
        client: unknown;
    }, defaultOptions: D) {

    }
}

/**
 *
 */
function quux (foo) {

}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["ArrowFunctionExpression"]}]

/**
* A function with return type
*
* @param id
*/
let test = (): (id: number) => string =>
{
  return (id) => `${id}`;
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]

/** @abstract */
class base {
/** @param {boolean} arg0 */
constructor(arg0) {}
}

class foo extends base {
/** @inheritDoc */
constructor(arg0) {
super(arg0);
this.arg0 = arg0;
}
}
// Settings: {"jsdoc":{"mode":"closure"}}

    export abstract class StephanPlugin<O, D> {

    /**
     * Called right after Stephan loads the plugin file.
     *
     * @example
     *```typescript
     * type Options = {
     *      verbose?: boolean;
     *      token?: string;
     * }
     * ```
     *
     * Note that your Options type should only have optional properties...
     *
     * @param args Arguments compiled and provided by StephanClient.
     * @param args.options The options as provided by the user, or an empty object if not provided.
     * @param args.client The options as provided by the user, or an empty object if not provided.
     * @param args.client.name The name of the client.
     * @param defaultOptions The default options as provided by the plugin, or an empty object.
     */
    public constructor({ options, client: { name } }: {
        options: O;
        client: { name: string };
    }, defaultOptions: D) {

    }
}

/**
* @param {string} cb
*/
function createGetter (cb) {
  return function (...args) {
    cb();
  };
}

/**
 * @param cfg
 * @param cfg.num
 */
function quux ({num, ...extra}) {
}

/**
  * @param {GenericArray} cfg
  * @param {number} cfg."0"
 */
function baar ([a, ...extra]) {
  //
}
// "jsdoc/require-param": ["error"|"warn", {"enableRestElementFixer":false}]

/**
  * @param a
 */
function baar (a, ...extra) {
  //
}
// "jsdoc/require-param": ["error"|"warn", {"enableRestElementFixer":false}]

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
// "jsdoc/require-param": ["error"|"warn", {"checkTypesPattern":"SVGRect"}]

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
 * @param foo
 * @param bar
 * @param cfg
 */
function quux (foo, bar, {baz}) {

}
// "jsdoc/require-param": ["error"|"warn", {"checkDestructured":false}]

/**
 * @param foo
 * @param bar
 */
function quux (foo, bar, {baz}) {

}
// "jsdoc/require-param": ["error"|"warn", {"checkDestructuredRoots":false}]

/**
 * @param root
 * @param root.foo
 */
function quux ({"foo": bar}) {

}

/**
 * @param root
 * @param root."foo"
 */
function quux ({foo: bar}) {

}

/**
 * Description.
 * @param {string} b Description `/**`.
 */
module.exports = function a(b) {
  console.info(b);
};

/**
 * Description.
 * @param {Object} options Options.
 * @param {FooBar} options.foo foo description.
 */
function quux ({ foo: { bar } }) {}

/**
 * Description.
 * @param {FooBar} options
 * @param {Object} options.foo
 */
function quux ({ foo: { bar } }) {}
// "jsdoc/require-param": ["error"|"warn", {"checkTypesPattern":"FooBar"}]

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
* @return {number} A number.
*/
export function testFn1 ({ prop = { a: 1, b: 2 } }) {
}
// "jsdoc/require-param": ["error"|"warn", {"useDefaultObjectProperties":false}]

/**
 * @param this The this object
 * @param bar number to return
 * @returns number returned back to caller
 */
function foo(this: T, bar: number): number {
  console.log(this.name);
  return bar;
}

/**
 * @param bar number to return
 * @returns number returned back to caller
 */
function foo(this: T, bar: number): number {
  console.log(this.name);
  return bar;
}

/** {@link someOtherval} */
function a (b) {}
// "jsdoc/require-param": ["error"|"warn", {"contexts":[{"comment":"*:not(JsdocBlock:has(JsdocInlineTag[tag=link]))","context":"FunctionDeclaration"}]}]

/**
 * Returns the sum of two numbers
 * @param options Object to destructure
 * @param options.a First value
 * @param options.b Second value
 * @returns Sum of a and b
 */
function sumDestructure(this: unknown, { a, b }: { a: number, b: number }) {
  return a + b;
}

/**
 *
 */
const inner = (c: number, d: string): void => {
  console.log(c);
  console.log(d);
};
// Settings: {"jsdoc":{"contexts":["VariableDeclaration"]}}

/**
 * Some desc.
 */
function quux (a, b) {}
// "jsdoc/require-param": ["error"|"warn", {"ignoreWhenAllParamsMissing":true}]

/**
 * Test function with param.
 * @param foo - Test param.
 */
function myFunction(foo: string): void;
/**
 * Test function without param.
 */
function myFunction(): void;
function myFunction(foo?: string) {}

/**
 *
 */
const quux: FunctionInterface = function quux (foo) {
};
// "jsdoc/require-param": ["error"|"warn", {"interfaceExemptsParamsCheck":true}]

/**
 *
 */
function quux ({
  abc,
  def
}: FunctionInterface) {
}
// "jsdoc/require-param": ["error"|"warn", {"interfaceExemptsParamsCheck":true}]

/**
 *
 */
export async function fetchMarketstackEOD(
  parameters: FetchEODParameters,
): Promise<MarketstackDataPoint[]>
{
  // ...
};
// "jsdoc/require-param": ["error"|"warn", {"interfaceExemptsParamsCheck":true}]

/**
 * @param {string}
 *   foo The foo.
 */
export function x(foo) {
  console.log(foo);
}

/**
 * A function with return type
 */
let test = (): (id: number) => string =>
{
  return (id) => `${id}`;
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
````
