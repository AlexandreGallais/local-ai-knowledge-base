---
title: "Modules - Theory (part 1 of 5)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/modules-reference/Theory.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# Modules - Theory

## Scripts and modules in JavaScript

In the early days of JavaScript, when the language only ran in browsers, there were no modules, but it was still possible to split the JavaScript for a web page into multiple files by using multiple `script` tags in HTML:

```html
<html>
  <head>
    <script src="a.js"></script>
    <script src="b.js"></script>
  </head>
  <body></body>
</html>
```

This approach had some downsides, especially as web pages grew larger and more complex. In particular, all scripts loaded onto the same page share the same scope—appropriately called the “global scope”—meaning the scripts had to be very careful not to overwrite each others’ variables and functions.

Any system that solves this problem by giving files their own scope while still providing a way to make bits of code available to other files can be called a “module system.” (It may sound obvious to say that each file in a module system is called a “module,” but the term is often used to contrast with _script_ files, which run outside a module system, in a global scope.)

> There are many module systems, and TypeScript supports emitting several, but this documentation will focus on the two most important systems today: ECMAScript modules (ESM) and CommonJS (CJS).
>
> ECMAScript Modules (ESM) is the module system built into the language, supported in modern browsers and in Node.js since v12. It uses dedicated `import` and `export` syntax:
>
> ```js
> // a.js
> export default "Hello from a.js";
> ```
>
> ```js
> // b.js
> import a from "./a.js";
> console.log(a); // 'Hello from a.js'
> ```
>
> CommonJS (CJS) is the module system that originally shipped in Node.js, before ESM was part of the language specification. It’s still supported in Node.js alongside ESM. It uses plain JavaScript objects and functions named `exports` and `require`:
>
> ```js
> // a.js
> exports.message = "Hello from a.js";
> ```
>
> ```js
> // b.js
> const a = require("./a");
> console.log(a.message); // 'Hello from a.js'
> ```

Accordingly, when TypeScript detects that a file is a CommonJS or ECMAScript module, it starts by assuming that file will have its own scope. Beyond that, though, the compiler’s job gets a little more complicated.

## TypeScript’s job concerning modules

The TypeScript compiler’s chief goal is to prevent certain kinds of runtime errors by catching them at compile time. With or without modules involved, the compiler needs to know about the code’s intended runtime environment—what globals are available, for example. When modules are involved, there are several additional questions the compiler needs to answer in order to do its job. Let’s use a few lines of input code as an example to think about all the information needed to analyze it:

```ts
import sayHello from "greetings";
sayHello("world");
```

To check this file, the compiler needs to know the type of `sayHello` (is it a function that can accept one string argument?), which opens quite a few additional questions:

1. Will the module system load this TypeScript file directly, or will it load a JavaScript file that I (or another compiler) generate from this TypeScript file?
2. What _kind_ of module does the module system expect to find, given the file name it will load and its location on disk?
3. If output JavaScript is being emitted, how will the module syntax present in this file be transformed in the output code?
4. Where will the module system look to find the module specified by `"greetings"`? Will the lookup succeed?
5. What kind of module is the file resolved by that lookup?
6. Does the module system allow the kind of module detected in (2) to reference the kind of module detected in (5) with the syntax decided in (3)?
7. Once the `"greetings"` module has been analyzed, what piece of that module is bound to `sayHello`?

Notice that all of these questions depend on characteristics of the _host_—the system that ultimately consumes the output JavaScript (or raw TypeScript, as the case may be) to direct its module loading behavior, typically either a runtime (like Node.js) or bundler (like Webpack).

The ECMAScript specification defines how ESM imports and exports link up with each other, but it doesn’t specify how the file lookup in (4), known as _module resolution_, happens, and it doesn’t say anything about other module systems like CommonJS. So runtimes and bundlers, especially those that want to support both ESM and CJS, have a lot of freedom to design their own rules. Consequently, the way TypeScript should answer the questions above can vary dramatically depending on where the code is intended to run. There’s no single right answer, so the compiler must be told the rules through configuration options.

The other key idea to keep in mind is that TypeScript almost always thinks about these questions in terms of its _output_ JavaScript files, not its _input_ TypeScript (or JavaScript!) files. Today, some runtimes and bundlers support loading TypeScript files directly, and in those cases, it doesn’t make sense to think about separate input and output files. Most of this document discusses cases where TypeScript files are compiled to JavaScript files, which in turn are loaded by the runtime module system. Examining these cases is essential for building an understanding of the compiler’s options and behavior—it’s easier to start there and simplify when thinking about esbuild, Bun, and other TypeScript-first runtimes and bundlers. So for now, we can summarize TypeScript’s job when it comes to modules in terms of output files:

Understand the **rules of the host** enough

1. to compile files into a valid **output module format**,
2. to ensure that imports in those **outputs** will **resolve successfully**, and
3. to know what **type** to assign to **imported names**.

## Who is the host?

Before we move on, it’s worth making sure we’re on the same page about the term _host_, because it will come up frequently. We defined it before as “the system that ultimately consumes the output code to direct its module loading behavior.” In other words, it’s the system outside of TypeScript that TypeScript’s module analysis tries to model:

- When the output code (whether produced by `tsc` or a third-party transpiler) is run directly in a runtime like Node.js, the runtime is the host.
- When there is no “output code” because a runtime consumes TypeScript files directly, the runtime is still the host.
- When a bundler consumes TypeScript inputs or outputs and produces a bundle, the bundler is the host, because it looked at the original set of imports/requires, looked up what files they referenced, and produced a new file or set of files where the original imports and requires are erased or transformed beyond recognition. (That bundle itself might comprise modules, and the runtime that runs it will be its host, but TypeScript doesn’t know about anything that happens post-bundler.)
- If another transpiler, optimizer, or formatter runs on TypeScript’s outputs, it’s _not_ a host that TypeScript cares about, as long as it leaves the imports and exports it sees alone.
- When loading modules in a web browser, the behaviors TypeScript needs to model are actually split between the web server and the module system running in the browser. The browser’s JavaScript engine (or a script-based module-loading framework like RequireJS) controls what module formats are accepted, while the web server decides what file to send when one module triggers a request to load another.
- The TypeScript compiler itself is not a host, because it does not provide any behavior related to modules beyond trying to model other hosts.
