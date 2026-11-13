---
title: "Migrating from JavaScript (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/tutorials/Migrating from JavaScript.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# Migrating from JavaScript (part 2 of 2)

## Moving to TypeScript Files

At this point, you're probably ready to start using TypeScript files.
The first step is to rename one of your `.js` files to `.ts`.
If your file uses JSX, you'll need to rename it to `.tsx`.

Finished with that step?
Great!
You've successfully migrated a file from JavaScript to TypeScript!

Of course, that might not feel right.
If you open that file in an editor with TypeScript support (or if you run `tsc --pretty`), you might see red squiggles on certain lines.
You should think of these the same way you'd think of red squiggles in an editor like Microsoft Word.
TypeScript will still translate your code, just like Word will still let you print your documents.

If that sounds too lax for you, you can tighten that behavior up.
If, for instance, you _don't_ want TypeScript to compile to JavaScript in the face of errors, you can use the `noEmitOnError` option.
In that sense, TypeScript has a dial on its strictness, and you can turn that knob up as high as you want.

If you plan on using the stricter settings that are available, it's best to turn them on now (see Getting Stricter Checks below).
For instance, if you never want TypeScript to silently infer `any` for a type without you explicitly saying so, you can use `noImplicitAny` before you start modifying your files.
While it might feel somewhat overwhelming, the long-term gains become apparent much more quickly.

### Weeding out Errors

Like we mentioned, it's not unexpected to get error messages after conversion.
The important thing is to actually go one by one through these and decide how to deal with the errors.
Often these will be legitimate bugs, but sometimes you'll have to explain what you're trying to do a little better to TypeScript.

#### Importing from Modules

You might start out getting a bunch of errors like `Cannot find name 'require'.`, and `Cannot find name 'define'.`.
In these cases, it's likely that you're using modules.
While you can just convince TypeScript that these exist by writing out

```ts
// For Node/CommonJS
declare function require(path: string): any;
```

or

```ts
// For RequireJS/AMD
declare function define(...args: any[]): any;
```

it's better to get rid of those calls and use TypeScript syntax for imports.

First, you'll need to enable some module system by setting TypeScript's `module` option.
Valid options are `commonjs`, `amd`, `system`, and `umd`.

If you had the following Node/CommonJS code:

```js
var foo = require("foo");

foo.doStuff();
```

or the following RequireJS/AMD code:

```js
define(["foo"], function (foo) {
  foo.doStuff();
});
```

then you would write the following TypeScript code:

```ts
import foo = require("foo");

foo.doStuff();
```

#### Getting Declaration Files

If you started converting over to TypeScript imports, you'll probably run into errors like `Cannot find module 'foo'.`.
The issue here is that you likely don't have _declaration files_ to describe your library.
Luckily this is pretty easy.
If TypeScript complains about a package like `lodash`, you can just write

```shell
npm install -S @types/lodash
```

If you're using a module option other than `commonjs`, you'll need to set your `moduleResolution` option to `node`.

After that, you'll be able to import lodash with no issues, and get accurate completions.

#### Exporting from Modules

Typically, exporting from a module involves adding properties to a value like `exports` or `module.exports`.
TypeScript allows you to use top-level export statements.
For instance, if you exported a function like so:

```js
module.exports.feedPets = function (pets) {
  // ...
};
```

you could write that out as the following:

```ts
export function feedPets(pets) {
  // ...
}
```

Sometimes you'll entirely overwrite the exports object.
This is a common pattern people use to make their modules immediately callable like in this snippet:

```js
var express = require("express");
var app = express();
```

You might have previously written that like so:

```js
function foo() {
  // ...
}
module.exports = foo;
```

In TypeScript, you can model this with the `export =` construct.

```ts
function foo() {
  // ...
}
export = foo;
```

#### Too many/too few arguments

You'll sometimes find yourself calling a function with too many/few arguments.
Typically, this is a bug, but in some cases, you might have declared a function that uses the `arguments` object instead of writing out any parameters:

```js
function myCoolFunction() {
  if (arguments.length == 2 && !Array.isArray(arguments[1])) {
    var f = arguments[0];
    var arr = arguments[1];
    // ...
  }
  // ...
}

myCoolFunction(
  function (x) {
    console.log(x);
  },
  [1, 2, 3, 4]
);
myCoolFunction(
  function (x) {
    console.log(x);
  },
  1,
  2,
  3,
  4
);
```

In this case, we need to use TypeScript to tell any of our callers about the ways `myCoolFunction` can be called using function overloads.

```ts
function myCoolFunction(f: (x: number) => void, nums: number[]): void;
function myCoolFunction(f: (x: number) => void, ...nums: number[]): void;
function myCoolFunction() {
  if (arguments.length == 2 && !Array.isArray(arguments[1])) {
    var f = arguments[0];
    var arr = arguments[1];
    // ...
  }
  // ...
}
```

We added two overload signatures to `myCoolFunction`.
The first checks states that `myCoolFunction` takes a function (which takes a `number`), and then a list of `number`s.
The second one says that it will take a function as well, and then uses a rest parameter (`...nums`) to state that any number of arguments after that need to be `number`s.

#### Sequentially Added Properties

Some people find it more aesthetically pleasing to create an object and add properties immediately after like so:

```js
var options = {};
options.color = "red";
options.volume = 11;
```

TypeScript will say that you can't assign to `color` and `volume` because it first figured out the type of `options` as `{}` which doesn't have any properties.
If you instead moved the declarations into the object literal themselves, you'd get no errors:

```ts
let options = {
  color: "red",
  volume: 11,
};
```

You could also define the type of `options` and add a type assertion on the object literal.

```ts
interface Options {
  color: string;
  volume: number;
}

let options = {} as Options;
options.color = "red";
options.volume = 11;
```

Alternatively, you can just say `options` has the type `any` which is the easiest thing to do, but which will benefit you the least.

#### `any`, `Object`, and `{}`

You might be tempted to use `Object` or `{}` to say that a value can have any property on it because `Object` is, for most purposes, the most general type.
However **`any` is actually the type you want to use** in those situations, since it's the most _flexible_ type.

For instance, if you have something that's typed as `Object` you won't be able to call methods like `toLowerCase()` on it.
Being more general usually means you can do less with a type, but `any` is special in that it is the most general type while still allowing you to do anything with it.
That means you can call it, construct it, access properties on it, etc.
Keep in mind though, whenever you use `any`, you lose out on most of the error checking and editor support that TypeScript gives you.

If a decision ever comes down to `Object` and `{}`, you should prefer `{}`.
While they are mostly the same, technically `{}` is a more general type than `Object` in certain esoteric cases.

### Getting Stricter Checks

TypeScript comes with certain checks to give you more safety and analysis of your program.
Once you've converted your codebase to TypeScript, you can start enabling these checks for greater safety.

#### No Implicit `any`

There are certain cases where TypeScript can't figure out what certain types should be.
To be as lenient as possible, it will decide to use the type `any` in its place.
While this is great for migration, using `any` means that you're not getting any type safety, and you won't get the same tooling support you'd get elsewhere.
You can tell TypeScript to flag these locations down and give an error with the `noImplicitAny` option.

#### Strict `null` & `undefined` Checks

By default, TypeScript assumes that `null` and `undefined` are in the domain of every type.
That means anything declared with the type `number` could be `null` or `undefined`.
Since `null` and `undefined` are such a frequent source of bugs in JavaScript and TypeScript, TypeScript has the `strictNullChecks` option to spare you the stress of worrying about these issues.

When `strictNullChecks` is enabled, `null` and `undefined` get their own types called `null` and `undefined` respectively.
Whenever anything is _possibly_ `null`, you can use a union type with the original type.
So for instance, if something could be a `number` or `null`, you'd write the type out as `number | null`.

If you ever have a value that TypeScript thinks is possibly `null`/`undefined`, but you know better, you can use the postfix `!` operator to tell it otherwise.

```ts
declare var foo: string[] | null;

foo.length; // error - 'foo' is possibly 'null'

foo!.length; // okay - 'foo!' just has type 'string[]'
```

As a heads up, when using `strictNullChecks`, your dependencies may need to be updated to use `strictNullChecks` as well.

#### No Implicit `any` for `this`

When you use the `this` keyword outside of classes, it has the type `any` by default.
For instance, imagine a `Point` class, and imagine a function that we wish to add as a method:

```ts
class Point {
  constructor(public x, public y) {}
  getDistance(p: Point) {
    let dx = p.x - this.x;
    let dy = p.y - this.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }
}
// ...

// Reopen the interface.
interface Point {
  distanceFromOrigin(): number;
}
Point.prototype.distanceFromOrigin = function () {
  return this.getDistance({ x: 0, y: 0 });
};
```

This has the same problems we mentioned above - we could easily have misspelled `getDistance` and not gotten an error.
For this reason, TypeScript has the `noImplicitThis` option.
When that option is set, TypeScript will issue an error when `this` is used without an explicit (or inferred) type.
The fix is to use a `this`-parameter to give an explicit type in the interface or in the function itself:

```ts
Point.prototype.distanceFromOrigin = function (this: Point) {
  return this.getDistance({ x: 0, y: 0 });
};
```
