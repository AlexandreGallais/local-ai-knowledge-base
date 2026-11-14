---
title: "require-jsdoc (part 4 of 7)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-jsdoc.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# require-jsdoc (part 4 of 7)

````ts
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["MethodDefinition:not([key.name=\"componentDidMount\"]):not([key.name=\"render\"])"],"require":{"ClassDeclaration":true}}]
// Message: Missing JSDoc comment.

function foo(arg: boolean): boolean {
  return arg;
}

function bar(arg: true): true;
function bar(arg: false): false;
function bar(arg: boolean): boolean {
  return arg;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSDeclareFunction:not(TSDeclareFunction + TSDeclareFunction)","FunctionDeclaration:not(TSDeclareFunction + FunctionDeclaration)"],"require":{"FunctionDeclaration":false}}]
// Message: Missing JSDoc comment.

export function foo(arg: boolean): boolean {
  return arg;
}

export function bar(arg: true): true;
export function bar(arg: false): false;
export function bar(arg: boolean): boolean {
  return arg;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["ExportNamedDeclaration[declaration.type=\"TSDeclareFunction\"]:not(ExportNamedDeclaration[declaration.type=\"TSDeclareFunction\"] + ExportNamedDeclaration[declaration.type=\"TSDeclareFunction\"])","ExportNamedDeclaration[declaration.type=\"FunctionDeclaration\"]:not(ExportNamedDeclaration[declaration.type=\"TSDeclareFunction\"] + ExportNamedDeclaration[declaration.type=\"FunctionDeclaration\"])"],"require":{"FunctionDeclaration":false}}]
// Message: Missing JSDoc comment.

module.exports.foo = (bar) => {
  return bar + "biz"
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":false,"require":{"ArrowFunctionExpression":true,"FunctionDeclaration":true,"FunctionExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

class Animal {

  #name: string;

  private species: string;

  public color: string;

  @SomeAnnotation('optionalParameter')
  tail: boolean;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["PropertyDefinition"]}]
// Message: Missing JSDoc comment.

@Entity('users')
export class User {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ClassDeclaration":true}}]
// Message: Missing JSDoc comment.

/**
 *
 */
class Foo {
    constructor() {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"exemptEmptyConstructors":false,"require":{"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

/**
 *
 */
class Foo {
    constructor(notEmpty) {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"exemptEmptyConstructors":true,"require":{"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

/**
 *
 */
class Foo {
    constructor() {
        const notEmpty = true;
        return notEmpty;
    }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"exemptEmptyConstructors":true,"require":{"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

/**
 *
 */
function quux() {

}
// Settings: {"jsdoc":{"structuredTags":{"see":{"name":false,"required":["name"]}}}}
// Message: Cannot add "name" to `require` with the tag's `name` set to `false`

class Test {
  aFunc() {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkConstructors":false,"require":{"ArrowFunctionExpression":true,"ClassDeclaration":false,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

class Test {
  aFunc = () => {}
  anotherFunc() {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ArrowFunctionExpression":true,"ClassDeclaration":false,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

export enum testEnum {
  A, B
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSEnumDeclaration"],"publicOnly":true}]
// Message: Missing JSDoc comment.

export interface Test {
  aFunc: () => void;
  aVar: string;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSInterfaceDeclaration"],"publicOnly":true}]
// Message: Missing JSDoc comment.

export type testType = string | number;
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSTypeAliasDeclaration"],"publicOnly":true}]
// Message: Missing JSDoc comment.

export interface Foo {
    bar: number;
    baz: string;
    quux(): void;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSPropertySignature","TSMethodSignature"],"publicOnly":true}]
// Message: Missing JSDoc comment.

export class MyComponentComponent {
  @Output()
  public changed = new EventEmitter();

  public test = 'test';

  @Input()
  public value = new EventEmitter();
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["PropertyDefinition > Decorator[expression.callee.name=\"Input\"]"]}]
// Message: Missing JSDoc comment.

requestAnimationFrame(draw)

function bench() {
}
// Message: Missing JSDoc comment.

class Foo {
  set aName (val) {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkSetters":"no-getter","contexts":["MethodDefinition > FunctionExpression"]}]
// Message: Missing JSDoc comment.

class Foo {
  get aName () {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkGetters":"no-setter","contexts":["MethodDefinition > FunctionExpression"]}]
// Message: Missing JSDoc comment.

const obj = {
  get aName () {},
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkGetters":"no-setter","contexts":["Property > FunctionExpression"]}]
// Message: Missing JSDoc comment.

function comment () {
  return "comment";
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"enableFixer":true,"fixerMessage":" TODO: add comment"}]
// Message: Missing JSDoc comment.

function comment () {
  return "comment";
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["any",{"context":"FunctionDeclaration","inlineCommentBlock":true}],"fixerMessage":"TODO: add comment "}]
// Message: Missing JSDoc comment.

function comment () {
  return "comment";
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"enableFixer":false,"fixerMessage":" TODO: add comment"}]
// Message: Missing JSDoc comment.

export class InovaAutoCompleteComponent {
  public disabled = false;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["PropertyDefinition"],"publicOnly":true}]
// Message: Missing JSDoc comment.

export default (arg) => arg;
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"ArrowFunctionExpression":true,"ClassDeclaration":true,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

export function outer() {
    function inner() {
        console.log('foo');
    }

    inner();
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"ArrowFunctionExpression":true,"ClassDeclaration":true,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

export const outer = () => {
    const inner = () => {
        console.log('foo');
    };

    inner();
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"ArrowFunctionExpression":true,"ClassDeclaration":true,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

/**
 *
 */
export class InovaAutoCompleteComponent {
  public disabled = false;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["PropertyDefinition"],"publicOnly":true}]
// Message: Missing JSDoc comment.

/**
* Some comment.
*/
export class Component {
    public foo?: number;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkConstructors":false,"contexts":["PropertyDefinition"],"publicOnly":true}]
// Message: Missing JSDoc comment.

class Utility {
    /**
     *
     */
    mthd() {
        return false;
    }
}

module.exports = Utility;
// "jsdoc/require-jsdoc": ["error"|"warn", {"enableFixer":false,"publicOnly":true,"require":{"ArrowFunctionExpression":true,"ClassDeclaration":true,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

/**
 *
 */
module.exports = class Utility {
  mthd() {
    return false;
  }
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"enableFixer":false,"publicOnly":true,"require":{"ArrowFunctionExpression":true,"ClassDeclaration":true,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

function quux () {
  return 3;
}

function b () {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"minLineCount":2}]
// Message: Missing JSDoc comment.

function quux () {
  return 3;
}

var a = {};
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":[{"context":"FunctionDeclaration","minLineCount":2},{"context":"VariableDeclaration","minLineCount":2}],"require":{"FunctionDeclaration":false}}]
// Message: Missing JSDoc comment.

function quux () {
  return 3;
}

var a = {
  b: 1,
  c: 2
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":[{"context":"FunctionDeclaration","minLineCount":4},{"context":"VariableDeclaration","minLineCount":2}],"require":{"FunctionDeclaration":false}}]
// Message: Missing JSDoc comment.

class A {
  setId(newId: number): void {
    this.id = id;
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":[{"context":"MethodDefinition","minLineCount":3}],"require":{"ClassDeclaration":false,"FunctionExpression":false,"MethodDefinition":false}}]
// Message: Missing JSDoc comment.

export class MyClass {

  public myPublicProperty: number = 1;
      /* ^ Missing JSDoc comment. eslint(jsdoc/require-jsdoc) - expected ✅ */

  private myPrivateProp: number = -1;
      /* ^ Missing JSDoc comment. eslint(jsdoc/require-jsdoc) - unexpected ❌ */

  // ...
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["PropertyDefinition"],"publicOnly":true}]
// Message: Missing JSDoc comment.

export const Comp = observer(() => <>Hello</>);
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["CallExpression[callee.name=\"observer\"]"],"enableFixer":false,"publicOnly":true,"require":{"ArrowFunctionExpression":true,"ClassDeclaration":true,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

/**
 * Command options for the login command
 */
export type LoginOptions = CmdOptions<{
  username?: string;
  password?: string;
}>;
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSTypeAliasDeclaration","TSInterfaceDeclaration","TSMethodSignature","TSPropertySignature"],"publicOnly":{"ancestorsOnly":true}}]
// Message: Missing JSDoc comment.

type Props = {
  variant: string
}

export type { Props as ComponentProps };
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["VariableDeclaration","TSTypeAliasDeclaration","TSPropertySignature","TSInterfaceDeclaration","TSMethodSignature","TSEnumDeclaration"],"enableFixer":true,"publicOnly":{"esm":true},"require":{"ArrowFunctionExpression":true,"ClassDeclaration":true,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

export interface A {
  a: string;
}

export class B implements A, B {
  a = 'abc';
  public f(): void {
    //
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["MethodDefinition"]}]
// Message: Missing JSDoc comment.

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
// "jsdoc/require-jsdoc": ["error"|"warn", {"skipInterveningOverloadedDeclarations":false}]
// Message: Missing JSDoc comment.

/**
 * Test function without param.
 */
function myFunction(): void;
/**
 * Test function with param.
 * @param foo - Test param.
 */
function myFunction(foo: string): void;
function myFunction(foo?: string) {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"skipInterveningOverloadedDeclarations":false}]
// Message: Missing JSDoc comment.

/**
 * Test function with param.
 * @param foo - Test param.
 */
function myFunction(foo: string): void;
function myFunction(): void;
/**
 * Function implementation
 * @param foo
 */
function myFunction(foo?: string) {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSDeclareFunction"],"exemptOverloadedImplementations":false,"skipInterveningOverloadedDeclarations":false}]
// Message: Missing JSDoc comment.

/**
 * Test function with param.
 * @param foo - Test param.
 */
function myFunction(foo: string): void;
function myFunction(): void;
function myFunction(foo?: string) {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSDeclareFunction"],"exemptOverloadedImplementations":true,"skipInterveningOverloadedDeclarations":false}]
// Message: Missing JSDoc comment.

const foo = autolog(
    function foo() {
        log.debug('inside foo', 'this is a test helper function')
    },
    { withGovernance: true, withProfiling: true },
)
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkAllFunctionExpressions":true,"contexts":["FunctionExpression"],"require":{"FunctionExpression":false}}]
// Message: Missing JSDoc comment.

function quux (foo) {\r
}
// Message: Missing JSDoc comment.

/** The controller. */
export default class extends Controller {
  connect () {
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

export default {
  data () {
  },
  methods: {
    go () {
    },
  },
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export const obj = {
  method () {
  },
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.
````
