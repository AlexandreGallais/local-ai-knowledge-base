---
title: "TypeScript 2.0 (part 2 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 2.0.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 2.0 (part 2 of 3)

## Specifying the type of `this` for functions

Following up on specifying the type of `this` in a class or an interface, functions and methods can now declare the type of `this` they expect.

By default the type of `this` inside a function is `any`.
Starting with TypeScript 2.0, you can provide an explicit `this` parameter.
`this` parameters are fake parameters that come first in the parameter list of a function:

```ts
function f(this: void) {
  // make sure `this` is unusable in this standalone function
}
```

## `this` parameters in callbacks

Libraries can also use `this` parameters to declare how callbacks will be invoked.

##### Example

```ts
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}
```

`this: void` means that `addClickListener` expects `onclick` to be a function that does not require a `this` type.

Now if you annotate calling code with `this`:

```ts
class Handler {
  info: string;
  onClickBad(this: Handler, e: Event) {
    // oops, used this here. using this callback would crash at runtime
    this.info = e.message;
  }
}
let h = new Handler();
uiElement.addClickListener(h.onClickBad); // error!
```

## `--noImplicitThis`

A new flag is also added in TypeScript 2.0 to flag all uses of `this` in functions without an explicit type annotation.

## Glob support in `tsconfig.json`

Glob support is here!! Glob support has been one of the most requested features.

Glob-like file patterns are supported by two properties `include` and `exclude`.

##### Example

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "outFile": "../../built/local/tsc.js",
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

The supported glob wildcards are:

- `*` matches zero or more characters (excluding directory separators)
- `?` matches any one character (excluding directory separators)
- `**/` recursively matches any subdirectory

If a segment of a glob pattern includes only `*` or `.*`, then only files with supported extensions are included (e.g. `.ts`, `.tsx`, and `.d.ts` by default with `.js` and `.jsx` if `allowJs` is set to true).

If the `files` and `include` are both left unspecified, the compiler defaults to including all TypeScript (`.ts`, `.d.ts` and `.tsx`) files in the containing directory and subdirectories except those excluded using the `exclude` property. JS files (`.js` and `.jsx`) are also included if `allowJs` is set to true.

If the `files` or `include` properties are specified, the compiler will instead include the union of the files included by those two properties.
Files in the directory specified using the `outDir` compiler option are always excluded unless explicitly included via the `files` property (even when the `exclude` property is specified).

Files included using `include` can be filtered using the `exclude` property.
However, files included explicitly using the `files` property are always included regardless of `exclude`.
The `exclude` property defaults to excluding the `node_modules`, `bower_components`, and `jspm_packages` directories when not specified.

## Module resolution enhancements: BaseUrl, Path mapping, rootDirs and tracing

TypeScript 2.0 provides a set of additional module resolution knops to _inform_ the compiler where to find declarations for a given module.

See Module Resolution documentation for more details.

## Base URL

Using a `baseUrl` is a common practice in applications using AMD module loaders where modules are "deployed" to a single folder at run-time.
All module imports with bare specifier names are assumed to be relative to the `baseUrl`.

##### Example

```json
{
  "compilerOptions": {
    "baseUrl": "./modules"
  }
}
```

Now imports to `"moduleA"` would be looked up in `./modules/moduleA`

```ts
import A from "moduleA";
```

## Path mapping

Sometimes modules are not directly located under _baseUrl_.
Loaders use a mapping configuration to map module names to files at run-time, see RequireJs documentation and SystemJS documentation.

The TypeScript compiler supports the declaration of such mappings using `paths` property in `tsconfig.json` files.

##### Example

For instance, an import to a module `"jquery"` would be translated at runtime to `"node_modules/jquery/dist/jquery.slim.min.js"`.

```json
{
  "compilerOptions": {
    "baseUrl": "./node_modules",
    "paths": {
      "jquery": ["jquery/dist/jquery.slim.min"]
    }
}
```

Using `paths` also allows for more sophisticated mappings including multiple fall back locations.
Consider a project configuration where only some modules are available in one location, and the rest are in another.

## Virtual Directories with `rootDirs`

Using 'rootDirs', you can inform the compiler of the _roots_ making up this "virtual" directory;
and thus the compiler can resolve relative modules imports within these "virtual" directories _as if_ they were merged together in one directory.

##### Example

Given this project structure:

```tree
 src
 └── views
     └── view1.ts (imports './template1')
     └── view2.ts

 generated
 └── templates
         └── views
             └── template1.ts (imports './view2')
```

A build step will copy the files in `/src/views` and `/generated/templates/views` to the same directory in the output.
At run-time, a view can expect its template to exist next to it, and thus should import it using a relative name as `"./template"`.

`rootDirs` specify a list of _roots_ whose contents are expected to merge at run-time.
So following our example, the `tsconfig.json` file should look like:

```json
{
  "compilerOptions": {
    "rootDirs": ["src/views", "generated/templates/views"]
  }
}
```

## Tracing module resolution

`traceResolution` offers a handy way to understand how modules have been resolved by the compiler.

```shell
tsc --traceResolution
```

## Shorthand ambient module declarations

If you don't want to take the time to write out declarations before using a new module, you can now just use a shorthand declaration to get started quickly.

##### declarations.d.ts

```ts
declare module "hot-new-module";
```

All imports from a shorthand module will have the any type.

```ts
import x, { y } from "hot-new-module";
x(y);
```

## Wildcard character in module names

Importing non-code resources using module loaders extension (e.g. AMD or SystemJS) has not been easy before;
previously an ambient module declaration had to be defined for each resource.

TypeScript 2.0 supports the use of the wildcard character (`*`) to declare a "family" of module names;
this way, a declaration is only required once for an extension, and not for every resource.

##### Example

```ts
declare module "*!text" {
  const content: string;
  export default content;
}
// Some do it the other way around.
declare module "json!*" {
  const value: any;
  export default value;
}
```

Now you can import things that match `"*!text"` or `"json!*"`.

```ts
import fileContent from "./xyz.txt!text";
import data from "json!http://example.com/data.json";
console.log(data, fileContent);
```

Wildcard module names can be even more useful when migrating from an un-typed code base.
Combined with Shorthand ambient module declarations, a set of modules can be easily declared as `any`.

##### Example

```ts
declare module "myLibrary/*";
```

All imports to any module under `myLibrary` would be considered to have the type `any` by the compiler;
thus, shutting down any checking on the shapes or types of these modules.

```ts
import { readFile } from "myLibrary/fileSystem/readFile`;

readFile(); // readFile is 'any'
```

## Support for UMD module definitions

Some libraries are designed to be used in many module loaders, or with no module loading (global variables).
These are known as UMD or Isomorphic modules.
These libraries can be accessed through either an import or a global variable.

For example:

##### math-lib.d.ts

```ts
export const isPrime(x: number): boolean;
export as namespace mathLib;
```

The library can then be used as an import within modules:

```ts
import { isPrime } from "math-lib";
isPrime(2);
mathLib.isPrime(2); // ERROR: can't use the global definition from inside a module
```

It can also be used as a global variable, but only inside of a script.
(A script is a file with no imports or exports.)

```ts
mathLib.isPrime(2);
```

## Optional class properties

Optional properties and methods can now be declared in classes, similar to what is already permitted in interfaces.

##### Example

```ts
class Bar {
  a: number;
  b?: number;
  f() {
    return 1;
  }
  g?(): number; // Body of optional method can be omitted
  h?() {
    return 2;
  }
}
```

When compiled in `strictNullChecks` mode, optional properties and methods automatically have `undefined` included in their type. Thus, the `b` property above is of type `number | undefined` and the `g` method above is of type `(() => number) | undefined`.
Type guards can be used to strip away the `undefined` part of the type:

```ts
function test(x: Bar) {
  x.a; // number
  x.b; // number | undefined
  x.f; // () => number
  x.g; // (() => number) | undefined
  let f1 = x.f(); // number
  let g1 = x.g && x.g(); // number | undefined
  let g2 = x.g ? x.g() : 0; // number
}
```

## Private and Protected Constructors

A class constructor may be marked `private` or `protected`.
A class with a private constructor cannot be instantiated outside the class body, and cannot be extended.
A class with a protected constructor cannot be instantiated outside the class body, but can be extended.

##### Example

```ts
class Singleton {
  private static instance: Singleton;

  private constructor() {}

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

let e = new Singleton(); // Error: constructor of 'Singleton' is private.
let v = Singleton.getInstance();
```

## Abstract properties and accessors

An abstract class can declare abstract properties and/or accessors.
Any sub class will need to declare the abstract properties or be marked as abstract.
Abstract properties cannot have an initializer.
Abstract accessors cannot have bodies.

##### Example

```ts
abstract class Base {
  abstract name: string;
  abstract get value();
  abstract set value(v: number);
}

class Derived extends Base {
  name = "derived";

  value = 1;
}
```

## Implicit index signatures

An object literal type is now assignable to a type with an index signature if all known properties in the object literal are assignable to that index signature. This makes it possible to pass a variable that was initialized with an object literal as parameter to a function that expects a map or dictionary:

```ts
function httpService(path: string, headers: { [x: string]: string }) {}

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};

httpService("", { "Content-Type": "application/x-www-form-urlencoded" }); // Ok
httpService("", headers); // Now ok, previously wasn't
```

## Including built-in type declarations with `--lib`

Getting to ES6/ES2015 built-in API declarations were only limited to `target: ES6`.
Enter `lib`; with `lib` you can specify a list of built-in API declaration groups that you can choose to include in your project.
For instance, if you expect your runtime to have support for `Map`, `Set` and `Promise` (e.g. most evergreen browsers today), just include `--lib es2015.collection,es2015.promise`.
Similarly you can exclude declarations you do not want to include in your project, e.g. DOM if you are working on a node project using `--lib es5,es6`.

Here is a list of available API groups:

- dom
- webworker
- es5
- es6 / es2015
- es2015.core
- es2015.collection
- es2015.iterable
- es2015.promise
- es2015.proxy
- es2015.reflect
- es2015.generator
- es2015.symbol
- es2015.symbol.wellknown
- es2016
- es2016.array.include
- es2017
- es2017.object
- es2017.sharedmemory
- scripthost

##### Example

```bash
tsc --target es5 --lib es5,es2015.promise
```

```json
"compilerOptions": {
    "lib": ["es5", "es2015.promise"]
}
```

## Flag unused declarations with `--noUnusedParameters` and `--noUnusedLocals`

TypeScript 2.0 has two new flags to help you maintain a clean code base.
`noUnusedParameters` flags any unused function or method parameters errors.
`noUnusedLocals` flags any unused local (un-exported) declaration like variables, functions, classes, imports, etc...
Also, unused private members of a class would be flagged as errors under `noUnusedLocals`.

##### Example

```ts
import B, { readFile } from "./b";
//     ^ Error: `B` declared but never used
readFile();

export function write(message: string, args: string[]) {
  //                                 ^^^^  Error: 'arg' declared but never used.
  console.log(message);
}
```

Parameters declaration with names starting with `_` are exempt from the unused parameter checking.
e.g.:

```ts
function returnNull(_a) {
  // OK
  return null;
}
```

## Module identifiers allow for `.js` extension

Before TypeScript 2.0, a module identifier was always assumed to be extension-less;
for instance, given an import as `import d from "./moduleA.js"`, the compiler looked up the definition of `"moduleA.js"` in `./moduleA.js.ts` or `./moduleA.js.d.ts`.
This made it hard to use bundling/loading tools like SystemJS that expect URI's in their module identifier.

With TypeScript 2.0, the compiler will look up definition of `"moduleA.js"` in `./moduleA.ts` or `./moduleA.d.t`.

## Support 'target : es5' with 'module: es6'

Previously flagged as an invalid flag combination, `target: es5` and 'module: es6' is now supported.
This should facilitate using ES2015-based tree shakers like rollup.

## Trailing commas in function parameter and argument lists

Trailing comma in function parameter and argument lists are now allowed.
This is an implementation for a Stage-3 ECMAScript proposal that emits down to valid ES3/ES5/ES6.

##### Example

```ts
function foo(
  bar: Bar,
  baz: Baz // trailing commas are OK in parameter lists
) {
  // Implementation...
}

foo(
  bar,
  baz // and in argument lists
);
```
