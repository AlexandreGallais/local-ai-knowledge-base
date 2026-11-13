---
title: "require-jsdoc (part 7 of 7)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-jsdoc.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# require-jsdoc (part 7 of 7)

````ts
  set aName (val) {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkGetters":"no-setter","checkSetters":false,"contexts":["MethodDefinition > FunctionExpression"]}]

const obj = {
  get aName () {},
  set aName (val) {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkGetters":"no-setter","checkSetters":false,"contexts":["Property > FunctionExpression"]}]

class Foo {
  set aName (val) {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkSetters":false,"contexts":["MethodDefinition > FunctionExpression"]}]

class Foo {
  get aName () {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkGetters":false,"contexts":["MethodDefinition > FunctionExpression"]}]

class Foo {
  /**
   *
   */
  set aName (val) {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkSetters":"no-getter","contexts":["MethodDefinition > FunctionExpression"]}]

class Foo {
  /**
   *
   */
  get aName () {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkGetters":"no-setter","contexts":["MethodDefinition > FunctionExpression"]}]

class Foo {
  get aName () {}
  set aName (val) {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkGetters":false,"checkSetters":"no-getter","contexts":["MethodDefinition > FunctionExpression"]}]

class Base {
  constructor() {
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["MethodDefinition"],"exemptEmptyConstructors":true}]

/**
 * This is a text.
 */
export function a(); // Reports an error
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSDeclareFunction"],"require":{"FunctionDeclaration":true}}]

/**
 * Foo
 */
export function foo(): void {
  function bar(): void {
    console.log('bar');
  }

  console.log('foo');
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true}]

const foo = {
  bar: () => {
    // ...
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":[":not(Property) > ArrowFunctionExpression"],"require":{"ArrowFunctionExpression":false,"ClassDeclaration":true,"ClassExpression":true}}]

/** Defines the current user's settings. */
@Injectable({
  providedIn: 'root',
})
@State<Partial<UserSettingsStateModel>>
({
  name: 'userSettings',
  defaults: {
    isDev: !environment.production,
  },
})
export class UserSettingsState { }
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ClassDeclaration":true}}]

/**
 * Entity to represent a user in the system.
 */
@Entity('users')
export class User {
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["Decorator"],"require":{"FunctionDeclaration":false}}]

  function quux () {
  return 3;
}

function b () {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"minLineCount":4}]

function quux () {
  return 3;
}

var a = {
  b: 1,
  c: 2
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["ClassDeclaration",{"context":"FunctionDeclaration","minLineCount":4},{"context":"VariableDeclaration","minLineCount":5}],"require":{"FunctionDeclaration":false}}]

class A {
  setId(newId: number): void {
    this.id = id;
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":[{"context":"MethodDefinition","minLineCount":4}],"require":{"ClassDeclaration":false,"FunctionExpression":false,"MethodDefinition":false}}]

export default class Test {
  private abc(a) {
    this.a = a;
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"ArrowFunctionExpression":false,"ClassDeclaration":false,"ClassExpression":false,"FunctionDeclaration":false,"FunctionExpression":false,"MethodDefinition":true}}]

export default {
  created() {
    this.getData();
  },

  beforeUpdate() {},

  watch: {
    someValue(val) {}
  },

  computed: {
    loaded() {},
    selection() {}
  },

  methods: {
    getData(id) {}
  }
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["ExportDefaultDeclaration > ObjectExpression > Property[key.name!=/^(created|beforeUpdate)$/] > FunctionExpression","ExportDefaultDeclaration > ObjectExpression > Property[key.name!=/^(watch|computed|methods)$/] > ObjectExpression > Property > FunctionExpression"]}]

export class MyClass {
  #myPrivateMethod(): void { }

  #myPrivateProp = 5;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["PropertyDefinition"],"publicOnly":true,"require":{"MethodDefinition":true}}]

class Abc {
  static {
    this.x = '2'
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"ClassDeclaration":true}}]

/**
 * Array map function with overload for NonEmptyArray
 * @example
 * const data = [{value: 'value'}] as const;
 * const result1: NonEmptyReadonlyArray<'value'> = arrayMap(data, (value) => value.value); // pick type from data
 * const result2: NonEmptyReadonlyArray<'value'> = arrayMap<'value', typeof data>(data, (value) => value.value); // enforce output type
 * @template Target - The type of the array to map to
 * @template Source - The type of the array to map from
 * @param {Source} data - The array to map
 * @param {MapCallback<Target, Source>} callback - Callback function to map data from the array
 * @returns {AnyArrayType<Target>} Mapped array
 * @since v0.2.0
 */
export function arrayMap<Target, Source extends NonEmptyArray<unknown> | NonEmptyReadonlyArray<unknown>>(
  data: Source,
  callback: MapCallback<Target, Source>,
): NonEmptyArray<Target>;
export function arrayMap<Target, Source extends Array<unknown>>(data: Source, callback: MapCallback<Target, Source>): Array<Target>;
export function arrayMap<Target, Source extends AnyArrayType>(data: Source, callback: MapCallback<Target, Source>): AnyArrayType<Target> {
  return data.map(callback);
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"skipInterveningOverloadedDeclarations":true}]

/**
 * Array map function with overload for NonEmptyArray
 * @example
 * const data = [{value: 'value'}] as const;
 * const result1: NonEmptyReadonlyArray<'value'> = arrayMap(data, (value) => value.value); // pick type from data
 * const result2: NonEmptyReadonlyArray<'value'> = arrayMap<'value', typeof data>(data, (value) => value.value); // enforce output type
 * @template Target - The type of the array to map to
 * @template Source - The type of the array to map from
 * @param {Source} data - The array to map
 * @param {MapCallback<Target, Source>} callback - Callback function to map data from the array
 * @returns {AnyArrayType<Target>} Mapped array
 * @since v0.2.0
 */
export function arrayMap<Target, Source extends NonEmptyArray<unknown> | NonEmptyReadonlyArray<unknown>>(
  data: Source,
  callback: MapCallback<Target, Source>,
): NonEmptyArray<Target>;
export function arrayMap<Target, Source extends Array<unknown>>(data: Source, callback: MapCallback<Target, Source>): Array<Target>;
export function arrayMap<Target, Source extends AnyArrayType>(data: Source, callback: MapCallback<Target, Source>): AnyArrayType<Target> {
  return data.map(callback);
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSDeclareFunction"],"exemptOverloadedImplementations":false,"skipInterveningOverloadedDeclarations":true}]

export interface A {
  a: string;
  /**
   * Documentation.
   */
  f(): void;
}

export class B implements A {
  a = 'abc';
  public f(): void {
    //
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["MethodDefinition"]}]

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
 * Test function with param.
 * @param foo - Test param.
 */
function myFunction(foo: string): void;
/**
 * Test function without param.
 */
function myFunction(): void;
function myFunction(foo?: string) {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSDeclareFunction"],"exemptOverloadedImplementations":true,"skipInterveningOverloadedDeclarations":false}]

/**
 * Test function with param.
 * @param foo - Test param.
 */
export function myFunction(foo: string): void;
/**
 * Test function without param.
 */
export function myFunction(): void;
export function myFunction(foo?: string) {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSDeclareFunction"],"exemptOverloadedImplementations":true,"skipInterveningOverloadedDeclarations":false}]

/**
 *
 */
const quux = () => {
  /**
   *
   */
  function myFunction(foo?: string) {}
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"exemptOverloadedImplementations":true,"require":{"ArrowFunctionExpression":true}}]

/**
 * JSdoc for foo function
 */
const foo = autolog(function foo() {
    log.debug('inside foo', 'this is a test helper function')
})
// Settings: {"jsdoc":{"skipInvokedExpressionsForCommentFinding":true}}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkAllFunctionExpressions":true,"contexts":["FunctionDeclaration","MethodDefinition","ClassDeclaration","TSDeclareFunction"],"require":{"FunctionExpression":true}}]

/**
 * Description for myFunction
 */
function myFunction(foo: string): string
function myFunction(foo: number): string
function myFunction(...args: any[]) {
  return ''
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"FunctionDeclaration":true,"MethodDefinition":true}}]

class Foo {
  /**
   * Description for bar
   */
  bar(foo: string): string
  bar(foo: number): string
  bar(...args: any[]) {
    return ''
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"FunctionDeclaration":true,"MethodDefinition":true}}]

/** Foo here */
export class Foo {
    /** with string */
    constructor(arg1: string);
    /** with number */
    constructor(arg1: number);

    constructor(arg1: string | number) {
        // implementation
    }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"MethodDefinition":true}}]

const obj = {
  method () {
  },
};
export default wrap(function () {
});
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]
````
