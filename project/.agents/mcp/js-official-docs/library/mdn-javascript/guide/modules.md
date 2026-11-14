---
title: "JavaScript modules (part 1 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/modules/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# JavaScript modules

This guide gives you all you need to get started with JavaScript module syntax.

## Module philosophy

Before we look at what syntax is available inside modules, let's first talk at a high level about what modules are, how they differ from traditional scripts, and why you might need them.

### A background on modules

JavaScript programs started off pretty small — most of its usage in the early days was to do isolated scripting tasks, providing a bit of interactivity to your web pages where needed, so large scripts were generally not needed. Fast forward a few years and we now have complete applications being run in browsers with a lot of JavaScript, as well as JavaScript being used in other contexts (Node.js, for example).

Complex projects necessitate a mechanism for splitting JavaScript programs into separate modules: units of code that can be imported when needed. Node.js has had this ability for a long time, and there are a number of JavaScript libraries and tools that enable module usage (for example, AMD loaders like RequireJS, bundlers like webpack, and compilers like Babel).

All modern browsers support module features natively without needing transpilation. It can only be a good thing — browsers can automatically handle the module loading process, without requiring a library. It does not obsolete bundlers like webpack, though — bundlers still do a good job at partitioning code into reasonably sized chunks, and are able to do other optimizations like minification, dead code elimination, and tree shaking.

### What's a module?

JavaScript code can be evaluated in two ways: as a _script_ (also called "classic script" or "traditional script") or as a _module_. There are two main differences:

1. At parsing time, modules are parsed with a slightly different syntax. Namely, they are automatically in strict mode, and you can only use `import` and `export` statements in modules.
2. At runtime, modules are executed in their own scope, not in the global scope. This means that variables, functions, classes, etc. declared in a module are not visible outside the module unless they are either explicitly exported (so they can be imported in other modules), or are made available globally by attaching them to the global object (e.g., `window` in a browser). Uncaught errors from modules still show in the DevTools, but you won't be able to access module-scoped variables in the JavaScript console.

There are other differences, but they are specific to modules on the web. Find them in Using modules on the web.

Here is how scripts are traditionally attached to web pages:

```html
<head>
  <script src="external-script.js"></script>
</head>
<body>
  <!-- page content -->
  <script src="external-script-2.js"></script>
  <script>
    // inline script
  </script>
</body>
```

```js
// -- external-script.js --
function $() {
  // …
}
// …
```

```js
// -- external-script-2.js --
$.ajax(/* … */);
// …
```

Most notably, all classic scripts attached to the webpage are executed under the same scope—the global scope. Any variables, unless they are contained within other functions or blocks, can be accessed from anywhere later in the page. This can be both convenient and dangerous. Shown in this figure is how the second and third scripts are able to access the `$` variable declared in the first script, thanks to them all being in the global scope.

This pattern is very convenient, but it gets unwieldy at scale:

- Scope pollution and identifier conflicts become a big concern. Popular libraries like jQuery and Underscore put everything under special identifiers like `$` and `_` to minimize the risk, but many third-party libraries compete for common names like `map`, `merge`, `debounce`, etc.
- All dependencies must be explicitly declared and managed by the author. If library A imports library B, then it's the application author's job to add a `<script>` element that loads library B and ensure that it happens before A.
- It's hard to load libraries on demand: everything is loaded and initialized as soon as the page loads.

Now, let us consider how this same code may look with modules. The first script, `external-script.js`, wants to share the variable `$` with the rest of the scripts. It is done above by putting the variable in the global scope. In the module version, we can export the variable and import it in the other scripts.

```html
<head>
  <script type="module" src="external-script-2.js"></script>
  <script type="module">
    import { $ } from "./external-script.js";
    // inline script
  </script>
</head>
<body>
  <!-- page content -->
</body>
```

```js
// -- external-script.js --
function $() {
  // …
}
// …
export { $ };
```

```js
// -- external-script-2.js --
import { $ } from "./external-script.js";

$.ajax(/* … */);
// …
```

Whereas the script version formed a _linear_ order of dependencies where each piece of code has access to all of the code coming earlier, the module version forms a _dependency graph_ where each module explicitly declares the modules it relies on, and what variables it needs from those dependencies.

As we said, modules are parsed differently from scripts—this means that the JavaScript engine needs to know whether to apply the module or script parsing rules. Hosts commonly specify this using an _out-of-band signaling mechanism_, where the behavior of the code is configured by information outside of the code itself. (This is different from strict mode, where the interpretation mode is declared inside the script with `"use strict"`.) There are many ways to give such information:

- If this module is referenced from a `<script>` tag, you can use the `type="module"` attribute. Also see Using modules on the web.
- If you are using Node.js, you can use the `.mjs` file extension, or add `"type": "module"` to the closest `package.json` file. Also see Modules across platforms.
- If this module is to be used as a worker, you can pass `type: "module"` when calling the `Worker()` constructor.

> **Note:**
> Certain runtimes, like Node.js, also have implicit module type detection if there's no explicit indication, based on whether the code uses syntax like `import`/`export` that's unavailable in non-modules. Browsers don't offer this.

Modules still have access to global variables. For example, a module can use a variable declared by a classic script:

```html
<script>
  var text = "Hello";
</script>
<script type="module" src="render.js"></script>
```

```js
// -- render.js --
document.body.textContent = text;
```

### Aside — .mjs versus .js

Throughout this article, we've used `.js` extensions for our module files, but in other resources you may see the `.mjs` extension used instead. V8's documentation recommends this, for example. The reasons given are:

- You can tell if a file is a module or a script directly from the file, without looking at contextual clues like the HTML tag or the package.json.
- Outside of browsers, it's almost universally accepted as directly entering module mode, including by runtimes such as Node.js and build tools such as Babel.

For browsers, the difference is purely cosmetic. The file extension doesn't matter on the web—JavaScript is identified by the `Content-Type` header, and modules are identified by the `type="module"` attribute in the `<script>` tag. To get modules to work correctly in a browser, you need to make sure that your server is serving them with a `Content-Type` header that contains a JavaScript MIME type such as `text/javascript`. If you don't, you'll get a strict MIME type checking error along the lines of "The server responded with a non-JavaScript MIME type" and the browser won't run your JavaScript.

We decided to keep to `.js`. The main benefit is that the `.js` extension is much more widely understood than `.mjs`, and although the latter is catching up, you might always run into certain software that doesn't understand `.mjs`.

- Most servers automatically set the correct type for `.js` files, but some don't for `.mjs` files. Servers that already serve `.mjs` files correctly include GitHub Pages and `http-server` for Node.js. This is OK if you are using such an environment already, or if you aren't but you have access to configure your server to set the correct `Content-Type` for `.mjs` files. It could however cause confusion if you don't control the server you are serving files from, or are publishing files for public use, as we are here.
- The file extension is used by many tools other than the HTTP server. It may be used by your editor, the operating system, static analysis tools, formatters, and more. `.mjs` may be less well-supported by tooling at large. For example, some operating systems might not recognize it, or try to replace it with something else, such as implicitly appending a `.js` extension when you try to open it.

If you really value the clarity of using `.mjs` for modules versus using `.js` for "normal" JavaScript files, but don't want to run into the problem described above, you could always use `.mjs` during development and convert them to `.js` during your build step.

## Working with examples

To demonstrate usage of modules, we've created a simple set of examples that you can find on GitHub. These examples demonstrate a simple set of modules that create a `<canvas>` element on a webpage, and then draw (and report information about) different shapes on the canvas.

These are fairly trivial, but have been kept deliberately simple to demonstrate modules clearly.

In our first example (see basic-modules) we have a file structure as follows:

```plain
index.html
main.js
modules/
    canvas.js
    square.js
```

> **Note:**
> All of the examples in this guide have essentially this same structure.

The `index.html` file only declares the DOM and applies the `main.js` module; all code we demonstrate subsequently concerns only the `.js` files.

The `modules` directory's two modules are described below:

- `canvas.js` — contains functions related to setting up the canvas:
  - `create()` — creates a canvas with a specified `width` and `height` inside a wrapper `` with a specified ID, which is itself appended inside a specified parent element. Returns an object containing the canvas's 2D context and the wrapper's ID.
  - `createReportList()` — creates an unordered list appended inside a specified wrapper element, which can be used to output report data into. Returns the list's ID.
- `square.js` — contains:
  - `name` — a constant containing the string 'square'.
  - `draw()` — draws a square on a specified canvas, with a specified size, position, and color. Returns an object containing the square's size, position, and color.
  - `reportArea()` — writes a square's area to a specific report list, given its length.
  - `reportPerimeter()` — writes a square's perimeter to a specific report list, given its length.

After you've downloaded these examples, start a local server and visit the `index.html` file.

## Named exports

Unlike scripts, where all variables declared at the top level are implicitly accessible to subsequent scripts, you must explicitly `export` variables for them to be accessible in other modules. You can place this keyword in front of any declaration—including `var`, `let`, `const`, `function`, `class`, and more. They need to be top-level items: for example, you can't use `export` inside a function.

```js
export const name = "square";

export function draw(ctx, length, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, length, length);

  return { length, x, y, color };
}
```

Equivalently, you can export things you already declared elsewhere inside this module by using `export` followed by a comma-separated list of variable names within curly braces:

```js
export { name, draw, reportArea, reportPerimeter };
```

## Named imports

Once you've exported some variables out of your module, you need to import them into another module to use them. You use the `import` statement, followed by a comma-separated list of the names you want to import wrapped in curly braces, followed by the keyword `from`, followed by the _module specifier_.

```js
import { name, draw, reportArea, reportPerimeter } from "./modules/square.js";
```

You can see such lines in action in `main.js`.

> **Note:**
> The _module specifier_ is a string that points to the module that exports these variables. In a browser, this is usually the URL relative to the URL of the current module, similar to the `href` attribute of `` elements. For example, if our module above is served at `https://example.com/basic-modules/main.js`, and the `square.js` module is served at `https://example.com/basic-modules/modules/square.js`, then all of the following are equivalent:
>
> ```plain
> "https://example.com/basic-modules/modules/square.js"
> "/basic-modules/modules/square.js"
> "./modules/square.js"
> ```
>
> Different runtimes (browsers, Node, bundler, etc.) have different rules for the specifier format. You can read more about these differences in Using modules on the web and Modules across platforms.

Once you've imported the features into your script, you can use them just like they were defined inside the same file. The following is found in `main.js`, below the import lines:

```js
const myCanvas = create("myCanvas", document.body, 480, 320);
const reportList = createReportList(myCanvas.id);

const square = draw(myCanvas.ctx, 50, 50, 100, "blue");
reportArea(square.length, reportList);
reportPerimeter(square.length, reportList);
```

> **Note:**
> The imported values are read-only views of the features that were exported. Similar to `const` variables, you cannot re-assign the variable that was imported, but you can still modify properties of object values. The value can only be re-assigned by the module exporting it. See the `import` reference for an example.
