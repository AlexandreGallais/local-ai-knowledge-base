---
title: "Understanding the module graph (part 1 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/modules/module_graph/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Understanding the module graph

Through `import` and `export` declarations, JavaScript modules form a complex graph of dependencies. This guide talks about various concepts related to how modules are loaded, and how that impacts the way you structure and author your code.

## What is the module graph?

In the JavaScript modules guide, we already showed a basic <example-value> of a module graph:

Graphs are made of nodes connected by edges. In this module graph, the nodes are the different JavaScript files being imported (all modules here are JavaScript, but JSON, CSS, WebAssembly, etc. would all be valid). Each time you write `import ... from "module B"` (or `export ... from "module B"`) in `module A`, you create a directed edge from `module A` to `module B`. The HTML file itself is not part of the module graph, but it defines all the _entry points_.

Each module graph needs at least one entry point, from which the runtime starts discovering dependencies. In the example above, there are multiple entry points: each `<script>` element starts one. In Node.js (or other server-side runtimes), this entry point is the file you invoked `node` with. In workers, this is the file you passed to the `Worker()` constructor. Graphs from different entry points aren't necessarily disjoint: if they import the same module (or the entry point itself is already imported), they can be merged into one larger graph.

## From module source to execution

Let's talk about how modules are loaded and evaluated, using the following example. We'll assume it is run in Node with `node main.js` (there's nothing Node-specific here, but modules are easier to spin up in Node).

```js
// -- main.js --
import { greet } from "./formatters.js";
import config from "./config.js";

greet("Josh", config.locale);
```

```js
// -- formatters.js --
import config from "./config.js";
import { log } from "./logger.js";

export function greet(name, localeName = config.defaultLocale) {
  const locale = new Intl.Locale(localeName);
  if (locale.language === "en") {
    log(`Hello, ${name}!`);
  } else if (locale.language === "fr") {
    log(`Bonjour, ${name} !`);
  } else {
    throw new Error(`Sorry, I don't speak ${locale}.`);
  }
}
```

```js
// -- config.js --
export default {
  locale: "en-US",
  defaultLocale: "en-US",
};
```

```js
// -- logger.js --
export function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}
```

### Loading the graph

Module loading requires a close collaboration between the host (Node) and the engine (V8). This happens recursively, where at each level of recursion, the host receives a _modules request_ (containing the module specifier and import attributes, if any), and then:

- The host loads the respective module's source code (such as by mapping it to a file system location and reading that file's content).
  - This step can be further broken down into two steps: specifier resolution and actually sending the request, which may be an HTTP request in browsers or a file system access in Node.
  - The entry point is slightly different: there's usually no specifier resolution. For example, the `main.js` command-line argument is directly read as a file path, and the `src` attribute of `<script>` elements is directly read as a URL; neither are module specifiers. The fetching process might also be slightly different.
- The host gives the engine the module source code. The engine parses the source code and collects all `import` and `export from` declarations, which create new module requests. (If the source is not JavaScript, the host may ask some other parser to process the source code instead.)
- All these module requests are given to the host and the host starts the whole process again, possibly handling multiple requests concurrently.
- If the host finds out that it has already loaded or is loading a module request (in browsers and Node.js, modules are cached by both resolved URLs and module types), it does not fetch it again and does not ask the engine to parse again. Instead, it supplies the existing module, waiting for the ongoing load to finish if necessary.

In this particular example:

- The host reads the `main.js` file and asks the engine to parse it.
- The engine finds two module requests, for `./formatters.js` and `./config.js`. It sends those module requests to the host.
- The host loads both of them by reading the corresponding files. Suppose `formatters.js` finishes loading first, so the host sends its source text to the engine first.
- Parsing `formatters.js` reveals another request for `./config.js`, as well as a new dependency, `./logger.js`. The engine sends both of them to the host.
- The host finds out that `./config.js` was already requested by `main.js` and skips it (although it's still loading), and starts loading `logger.js`.
- The loading for both `logger.js` and `config.js` finishes; neither contains further requests.

After this step, the module graph is already established. All modules have been loaded and parsed, but no JavaScript module bodies have been executed by this loading process.

### Linking modules

After the graph has finished loading successfully, the host asks the engine to _link_ the entry module. The main goal of linking is to set up the module environment, i.e., the various bindings, including the bindings to be exported. Each imported name is resolved to the place where it's actually defined and exported, potentially going through multiple layers of `export from` declarations. All modules in the graph need to be linked before they can be evaluated, so that importing a name that isn't exported on the other side can be caught early, before any code starts evaluating. It also makes subsequent evaluation easier because it avoids walking the module graph many times as each imported name gets used.

During the linking phase, the engine traverses the module graph using depth-first search (DFS). This happens recursively, where at each level of recursion, the engine visits a module (starting at the entry point), and then:

- If the module is already linked, or is already being linked (which happens with cyclic imports), the engine does not process it again. Otherwise, the engine marks the module as currently linking.
- The engine recursively links each of the module's dependencies using the same process. Unlike loading, linking is fully synchronous and deterministic: dependencies are visited in the order their module requests appear in the source.
- After all dependencies have been visited, the engine sets up the module's own environment. It creates a binding for each top-level declaration of the module. For each imported name (other than imports that resolve to a module namespace object), it resolves the name to the binding in the module that actually declares it, then creates an _indirect binding_: a name in the importing module that permanently refers to that other module's binding. Imports that resolve to a module namespace object, including named imports of `export * as ns from` exports, instead create local bindings initialized with that object. If some imported name cannot be resolved, linking fails.
- This module is marked as linked. (If there's a cycle, then they are all marked as linked together; again, we'll talk about this later.)

Just like normal declarations (see hoisting), exported bindings are also created and initialized in separate steps—function declarations are initialized during linking, `var` declarations are initialized to `undefined`, while `export default`, `let`, `const`, and `class` declarations remain uninitialized until evaluation reaches them.

In our example:

- The engine starts with `main.js`, follows its dependency on `formatters.js`, and then reaches `config.js`. It marks `main.js` and `formatters.js` as "linking".

  > **Note:**
  > This is how the traversal is "depth-first": the engine first goes as far as possible until it hits a module with no further unprocessed requests, and works back from there.

- For `config.js`, the engine creates a binding for the default export, but does not yet evaluate the object literal—evaluation happens in the next phase. The binding remains uninitialized.
- Next, it links `logger.js`, the next dependency of `formatters.js`. The engine creates the `log` binding and initializes it with the function object.
- The engine returns to `formatters.js`. Its imported `config` binding refers to the default export of `config.js`, and its imported `log` binding refers to the `log` binding in `logger.js`. Its own `greet` binding is initialized with the function object.
- Finally, the engine returns to `main.js`. Its other dependency, `config.js`, has already been linked, so it is not linked again. The engine connects `main.js`'s `greet` and `config` imports to their respective exported bindings.

Most of the time, the imported name is declared directly in the imported module, as in the example here, so the binding connections follow the same paths as the module dependency graph. However, if you use `export from`, or export an identifier you imported, the linker will follow those layers until it finds the place where it's actually declared.

Here, although the import chain is `a.js → b.js → c.js → d.js`, every single `x` binding in this chain eventually resolves to the same `const` declaration in `d.js`, while `c.js` has no module-scoped binding. The binding connections go directly to `d.js`, while the module dependency graph still includes the entire import chain.

An `export * from` declaration re-exports all names from another module (except for `default`) as named exports of the current module. When resolving an imported name, the engine first checks for an explicit export of that name. If there is none, it follows the `export * from` declarations and recursively resolves the name in those modules.

Multiple `export * from` declarations may make the current module export the same name multiple times (again, `export * from` never collides with an explicit named export; the latter always takes priority). If these declarations eventually resolve to the same binding, then there's no ambiguity. If they resolve to different bindings, the name is ambiguous, even if those bindings happen to contain the same value. For example:

```js
// -- first.js --
export const x = 1;
```

```js
// -- second.js --
export const x = 1;
```

```js
// -- combined.js --
export * from "./first.js";
export * from "./second.js";
// Should "x" from this module resolve to first.js or second.js?
```

The star exports alone do not cause an error. However, `import { x } from "./combined.js"` or `export { x } from "./combined.js"` causes a `SyntaxError` during linking. A namespace import, `import * as combined from "./combined.js"`, succeeds, but the namespace object has no `x` property.

Adding `export { x } from "./first.js"` to `combined.js` resolves the ambiguity: explicit exports take precedence over star exports, regardless of declaration order.

### Evaluating modules

Now that all modules have their environment prepared, they are finally ready for evaluation. The host asks the engine to evaluate the entry module. The engine traverses the module graph yet again, using depth-first search. For now, assume no module uses top-level `await`. This happens recursively, where at each level of recursion, the engine visits a module (starting at the entry point), and then:

- If the module has already been evaluated successfully, it does not execute it again. If a previous evaluation failed, the engine propagates the recorded error instead. If the module is already being evaluated, the engine does not visit its dependencies again, avoiding infinite recursion in a cycle. Otherwise, it marks the module as currently evaluating.
- The engine recursively evaluates each dependency using the same process, in the order their module requests appear in the source.
- After visiting all dependencies, the engine executes the module body. Variable initializers run, initializing the bindings prepared during linking, and other statements execute in source order. Imported names access the bindings connected during linking. In a cycle, a dependency's body may not have executed yet, so an imported binding may still be uninitialized; we'll discuss this later.
- After the module body finishes successfully, the module is marked as evaluated. In a cycle, modules in the same strongly connected component are marked as evaluated together once their bodies have finished.

In our example:

- The engine starts with `main.js`, follows its dependency on `formatters.js`, and then reaches `config.js`. It marks `main.js` and `formatters.js` as "evaluating".
- For `config.js`, the engine evaluates the object literal and initializes the default-export binding with the resulting object.
- Next, it evaluates `logger.js`, the next dependency of `formatters.js`. Its `log` function was already created during linking, and the function body does not execute until the function is called, so there's nothing else to evaluate here.
- The engine returns to `formatters.js`. Its `greet` function was also created during linking, so again nothing to evaluate here.
- Finally, the engine returns to `main.js`. Its other dependency, `config.js`, has already been evaluated, so it is not executed again. The engine calls `greet("Josh", config.locale)`, which calls `log` and prints a timestamp followed by `Hello, Josh!`.

Moving the `import` declarations below the `greet()` call, while keeping their relative order, would not change this order: dependencies are evaluated before the importing module's body starts, regardless of where its import declarations appear among other statements.

If evaluation throws an uncaught error, it propagates through the dependent modules being evaluated, and the entry module's evaluation promise rejects. Effects of code that already ran are not undone, and the error is retained so subsequent evaluation attempts do not execute the failed module again.

With top-level `await`, a module can suspend execution and delay modules that depend on it while other branches continue; we'll cover this in asynchronous evaluation.
