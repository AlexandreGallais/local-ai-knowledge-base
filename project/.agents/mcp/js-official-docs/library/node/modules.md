---
title: "Modules: CommonJS modules (part 1 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/modules.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: CommonJS modules

> Stability: 2 - Stable

CommonJS modules are the original way to package JavaScript code for Node.js.
Node.js also supports the ECMAScript modules standard used by browsers
and other JavaScript runtimes.

In Node.js, each file is treated as a separate module. For
example, consider a file named `foo.js`:

```js
const circle = require('./circle.js');
console.log(`The area of a circle of radius 4 is ${circle.area(4)}`);
```

On the first line, `foo.js` loads the module `circle.js` that is in the same
directory as `foo.js`.

Here are the contents of `circle.js`:

```js
const { PI } = Math;

exports.area = (r) => PI * r ** 2;

exports.circumference = (r) => 2 * PI * r;
```

The module `circle.js` has exported the functions `area()` and
`circumference()`. Functions and objects are added to the root of a module
by specifying additional properties on the special `exports` object.

Variables local to the module will be private, because the module is wrapped
in a function by Node.js (see module wrapper).
In this example, the variable `PI` is private to `circle.js`.

The `module.exports` property can be assigned a new value (such as a function
or object).

In the following code, `bar.js` makes use of the `square` module, which exports
a Square class:

```js
const Square = require('./square.js');
const mySquare = new Square(2);
console.log(`The area of mySquare is ${mySquare.area()}`);
```

The `square` module is defined in `square.js`:

```js
// Assigning to exports will not modify module, must use module.exports
module.exports = class Square {
  constructor(width) {
    this.width = width;
  }

  area() {
    return this.width ** 2;
  }
};
```

The CommonJS module system is implemented in the `module` core module.

## Enabling

Node.js has two module systems: CommonJS modules and ECMAScript modules.

By default, Node.js will treat the following as CommonJS modules:

* Files with a `.cjs` extension.

* Files with a `.js` extension or without an extension, when the nearest parent
  `package.json` file contains a top-level field `"type"` with a value of
  `"commonjs"`.

* Files with a `.js` extension or without an extension, when the nearest parent
  `package.json` file doesn't contain a top-level field `"type"` or there is
  no `package.json` in any parent folder; unless the file contains syntax that
  errors unless it is evaluated as an ES module. Package authors should include
  the `"type"` field, even in packages where all sources are CommonJS. Being
  explicit about the `type` of the package will make things easier for build
  tools and loaders to determine how the files in the package should be
  interpreted.

* Files with an extension that is not `.mjs`, `.cjs`, `.json`, `.node`, or `.js`,
  when the nearest parent `package.json` file contains a top-level field
  `"type"` with a value of `"module"`.

See Determining module system for more details.

Calling `require()` always use the CommonJS module loader. Calling `import()`
always use the ECMAScript module loader.

## Accessing the main module

When a file is run directly from Node.js, `require.main` is set to its
`module`. That means that it is possible to determine whether a file has been
run directly by testing `require.main === module`.

For a file `foo.js`, this will be `true` if run via `node foo.js`, but
`false` if run by `require('./foo')`.

When the entry point is not a CommonJS module, `require.main` is `undefined`,
and the main module is out of reach.

## Package manager tips

The semantics of the Node.js `require()` function were designed to be general
enough to support reasonable directory structures. Package manager programs
such as `dpkg`, `rpm`, and `npm` will hopefully find it possible to build
native packages from Node.js modules without modification.

In the following, we give a suggested directory structure that could work:

Let's say that we wanted to have the folder at
`/usr/lib/node/<some-package>/<some-version>` hold the contents of a
specific version of a package.

Packages can depend on one another. In order to install package `foo`, it
may be necessary to install a specific version of package `bar`. The `bar`
package may itself have dependencies, and in some cases, these may even collide
or form cyclic dependencies.

Because Node.js looks up the `realpath` of any modules it loads (that is, it
resolves symlinks) and then looks for their dependencies in `node_modules` folders,
this situation can be resolved with the following architecture:

* `/usr/lib/node/foo/1.2.3/`: Contents of the `foo` package, version 1.2.3.
* `/usr/lib/node/bar/4.3.2/`: Contents of the `bar` package that `foo` depends
  on.
* `/usr/lib/node/foo/1.2.3/node_modules/bar`: Symbolic link to
  `/usr/lib/node/bar/4.3.2/`.
* `/usr/lib/node/bar/4.3.2/node_modules/*`: Symbolic links to the packages that
  `bar` depends on.

Thus, even if a cycle is encountered, or if there are dependency
conflicts, every module will be able to get a version of its dependency
that it can use.

When the code in the `foo` package does `require('bar')`, it will get the
version that is symlinked into `/usr/lib/node/foo/1.2.3/node_modules/bar`.
Then, when the code in the `bar` package calls `require('quux')`, it'll get
the version that is symlinked into
`/usr/lib/node/bar/4.3.2/node_modules/quux`.

Furthermore, to make the module lookup process even more optimal, rather
than putting packages directly in `/usr/lib/node`, we could put them in
`/usr/lib/node_modules/<name>/<version>`. Then Node.js will not bother
looking for missing dependencies in `/usr/node_modules` or `/node_modules`.

In order to make modules available to the Node.js REPL, it might be useful to
also add the `/usr/lib/node_modules` folder to the `$NODE_PATH` environment
variable. Since the module lookups using `node_modules` folders are all
relative, and based on the real path of the files making the calls to
`require()`, the packages themselves can be anywhere.

## Loading ECMAScript modules using `require()`

The `.mjs` extension is reserved for ECMAScript Modules.
See Determining module system section for more info
regarding which files are parsed as ECMAScript modules.

`require()` only supports loading ECMAScript modules that meet the following requirements:

* The module is fully synchronous (contains no top-level `await`); and
* One of these conditions are met:
  1. The file has a `.mjs` extension.
  2. The file has a `.js` extension, and the closest `package.json` contains `"type": "module"`
  3. The file has a `.js` extension, the closest `package.json` does not contain
     `"type": "commonjs"`, and the module contains ES module syntax.

If the ES Module being loaded meets the requirements, `require()` can load it and
return the module namespace object. In this case it is similar to dynamic
`import()` but is run synchronously and returns the name space object
directly.

With the following ES Modules:

```mjs
// distance.mjs
export function distance(a, b) { return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2); }
```

```mjs
// point.mjs
export default class Point {
  constructor(x, y) { this.x = x; this.y = y; }
}
```

A CommonJS module can load them with `require()`:

```cjs
const distance = require('./distance.mjs');
console.log(distance);
// [Module: null prototype] {
//   distance: [Function: distance]
// }

const point = require('./point.mjs');
console.log(point);
// [Module: null prototype] {
//   default: [class Point],
//   __esModule: true,
// }
```

For interoperability with existing tools that convert ES Modules into CommonJS,
which could then load real ES Modules through `require()`, the returned namespace
would contain a `__esModule: true` property if it has a `default` export so that
consuming code generated by tools can recognize the default exports in real
ES Modules. If the namespace already defines `__esModule`, this would not be added.
This property is experimental and can change in the future. It should only be used
by tools converting ES modules into CommonJS modules, following existing ecosystem
conventions. Code authored directly in CommonJS should avoid depending on it.

The result returned by `require()` is the module namespace object, which places
the default export in the `.default` property, similar to the results returned by `import()`.
To customize what should be returned by `require(esm)` directly, the ES Module can export the
desired value using the string name `"module.exports"`.

```mjs
// point.mjs
export default class Point {
  constructor(x, y) { this.x = x; this.y = y; }
}

// `distance` is lost to CommonJS consumers of this module, unless it's
// added to `Point` as a static property.
export function distance(a, b) { return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2); }
export { Point as 'module.exports' };
```

```cjs
const Point = require('./point.mjs');
console.log(Point); // [class Point]

// Named exports are lost when 'module.exports' is used
const { distance } = require('./point.mjs');
console.log(distance); // undefined
```

Notice in the example above, when the `module.exports` export name is used, named exports
will be lost to CommonJS consumers. To allow CommonJS consumers to continue accessing
named exports, the module can make sure that the default export is an object with the
named exports attached to it as properties. For example with the example above,
`distance` can be attached to the default export, the `Point` class, as a static method.

```mjs
export function distance(a, b) { return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2); }

export default class Point {
  constructor(x, y) { this.x = x; this.y = y; }
  static distance = distance;
}

export { Point as 'module.exports' };
```

```cjs
const Point = require('./point.mjs');
console.log(Point); // [class Point]

const { distance } = require('./point.mjs');
console.log(distance); // [Function: distance]
```

If the module being `require()`'d contains top-level `await`, or the module
graph it `import`s contains top-level `await`,
`ERR_REQUIRE_ASYNC_MODULE` will be thrown. In this case, users should
load the asynchronous module using `import()`.

If `--experimental-print-required-tla` is enabled and the error is uncaught,
Node.js will try to locate the top-level `await`s in the `require()`'d module graph
and print the locations in the stderr.

If support for loading ES modules using `require()` results in unexpected
breakage, it can be disabled using `--no-require-module`.
To print where this feature is used, use `--trace-require-module`.

This feature can be detected by checking if
`process.features.require_module` is `true`.
