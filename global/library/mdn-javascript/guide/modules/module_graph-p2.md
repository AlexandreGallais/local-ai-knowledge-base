---
title: "Understanding the module graph (part 2 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/modules/module_graph/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Understanding the module graph (part 2 of 4)

## Errors during the module pipeline

Any point in the module pipeline—load, link, and evaluate—could fail. The errors might leave the graph in a half-processed state.

### Errors from loading

Loading errors for a module request may be for one of the following reasons (this step is performed by the host, so many reasons are host-specific):

- The specifier failed to resolve (for example, it's not a valid URL)
- The request contains invalid import attributes
- The request returned an error status or the file system generated an error
- The source code failed to parse

If a module request failed, the loading process for this graph stops immediately without processing any unprocessed module requests. Already in-progress requests may still complete normally and be used later.

For example, suppose we add an import to `config.js` in the graph above:

```js
// -- config.js --
import "./non-existent.js";

export default {
  locale: "en-US",
  defaultLocale: "en-US",
};
```

1. `main.js` starts loading both `formatters.js` and `config.js`.
2. `config.js` finishes first.
3. Its request for `non-existent.js` fails (in Node.js, resolution throws `ERR_MODULE_NOT_FOUND`) while `formatters.js` is still loading.
4. The request for `formatters.js` can still finish, but this graph's loading process no longer traverses its dependencies, so `logger.js` is never requested by this traversal.

This assumes a fresh load without preloading or another entry point requesting these modules; if `formatters.js` had finished earlier, `logger.js` might already be loading too. No modules in this example are linked or evaluated.

Retry behavior depends on the host and the kind of failure. For browser-specific retry behavior, see Module caching on the web. Unlike module loading, `fetch()` does not reject merely because the response has an HTTP error status.

Linking is only performed if _all_ modules in the graph completed loading. A graph partially loaded due to errors is never linked.

### Errors from linking

Linking errors for an import may be for one of the following reasons:

- The import points to a non-exported binding in the target module
- The import points to a binding that's cyclically exported and never actually defined (for example, `a.js` writes `export { x } from "./b.js"` and `b.js` writes `export { x } from "./a.js"`)
- The import points to a binding that's ambiguous between two `export * from` declarations

For example, starting from the original graph without the loading error, suppose we add `missing` to the import from `logger.js` in `formatters.js`:

```js
// -- formatters.js --
import config from "./config.js";
import { log, missing } from "./logger.js";

// The rest of the module is unchanged.
```

1. All four modules finish loading and are marked as unlinked.
2. Linking starts with `main.js`, then visits `formatters.js` and its dependencies.
3. `config.js` and `logger.js` are linked successfully.
4. While setting up the environment for `formatters.js`, the engine creates the imports for `config` and `log`, but cannot resolve `missing`, because `logger.js` does not export that name. It throws a `SyntaxError`.
5. `formatters.js` and `main.js`, which were still being linked, return to the unlinked state. `config.js` and `logger.js` remain linked. No module bodies are evaluated.

Note that linking is synchronous and side-effect-free. The host can do it after loading and before evaluation, and even retry it if it fails (although the same graph of JavaScript modules will encounter the same linking error). If a linking error occurs, this import does not start evaluation. Shared dependencies may already have been evaluated through another entry point.

### Errors from evaluation

Errors from evaluation are the normal errors you get from executing JavaScript: using `throw` statements, making invalid function calls, accessing uninitialized variables, etc. When evaluation of a module throws, it may also leave the module graph in a partially-evaluated state.

For example, starting from the original graph without the loading or linking errors, suppose we add a top-level `throw` to `config.js`:

```js
// -- config.js --
export default {
  locale: "en-US",
  defaultLocale: "en-US",
};

throw new Error("Configuration unavailable");
```

We also add one more dependency before the existing imports in `main.js`, just to show the case where a module finished evaluating successfully.

1. All five modules finish loading and linking successfully.
2. Evaluation starts with `main.js`, then visits its first dependency, `extra.js`, which finishes evaluating successfully.
3. The traversal visits `formatters.js`, then its first dependency, `config.js`, which creates the configuration object, then reaches the `throw` statement.
4. The error propagates through `formatters.js` to `main.js`. Neither module's body starts executing, so `greet("Josh", config.locale)` is never called.
5. `config.js`, `formatters.js`, and `main.js` are marked as evaluated, with the error recorded. `extra.js` remains successfully evaluated. The traversal never reaches `logger.js`, which remains linked but unevaluated.

The _evaluated_ status means the evaluation attempt is finished, not necessarily that the module's body ran successfully—or at all. Because module evaluation has side effects, the engine guarantees that the same module is only ever evaluated once, whether or not it encountered an error (including when its dependency errored). Subsequent imports that reuse this module expose the same module namespace object on success, or propagate the recorded error on failure. The namespace object continues to expose live bindings. A new environment, such as a new page or worker, can load and evaluate the source again. Any effects of code that ran before the error are not undone.

## Cyclic imports

The module dependency graph is traversed using depth-first search (DFS) twice for linking and evaluation (loading can traverse branches concurrently in a non-deterministic order, and cycles do not affect it any more than normal shared dependencies do). This strategy works well for acyclic dependency graphs, like the example presented above. Even the case where two modules import the same module is minimally problematic—there's always a well-defined "end" (`config.js` and `logger.js`) from where we can work backwards. We just need to be careful not to link or evaluate the same module twice.

However, cycles are often inevitable. A cyclic import arises if module `a` imports module `b`, but `b` directly or indirectly depends on `a`. For example, consider the simplest two-module cycle:

```js
// -- a.js --
import { b } from "./b.js";

export const a = 2;
```

```js
// -- b.js --
import { a } from "./a.js";

export const b = 1;
```

Assuming no errors are ever thrown (including errors caused by accessing uninitialized imports, which we'll talk about very soon), the naïve DFS approach actually still works. Take the linking steps as an example:

- The engine visits `a.js` and marks it as currently linking. But before actually setting up its module environment, its dependencies must be visited first.
- The engine visits `b.js` and marks it as currently linking. But before actually setting up its module environment, its dependencies must be visited first.
- The engine visits `a.js` again, and sees that it's already marked as linking. There's no other downstream dependency.
- The engine links `b.js`, pointing `a` to the `export const a` in `a.js`.
- The engine links `a.js` by pointing `b` similarly.
- No upstream dependency is waiting for `a.js` and `b.js` to link; the whole graph finishes.

As long as each import can be traced back to some concrete definition and not a cyclic re-export (for example, `a.js` writes `export { x } from "./b.js"` and `b.js` writes `export { x } from "./a.js"`), linking does not require the definition to come from an already-linked module.

Similarly, for evaluation, `b.js` evaluates first because it's a dependency of `a.js`. It also depends on `a.js`, but `a.js` is already marked as evaluating, so the engine doesn't go back to `a.js`. The `b.js` module then evaluates the `const b` initialization. Finally, the `a.js` module evaluates and initializes `a = 2`.

As this example shows, cyclic imports don't always fail. The imported variable's value is only retrieved when the variable is actually used (hence allowing live bindings), and only if the variable remains uninitialized at that time will a `ReferenceError` be thrown. So for example, even if you use the value of `a` and `b`, you can prevent errors if you make sure the initialization happens before the usage:

```js
// -- a.js --
import { b } from "./b.js";

setTimeout(() => {
  console.log(b); // 1
}, 10);

export const a = 2;
```

```js
// -- b.js --
import { a } from "./a.js";

setTimeout(() => {
  console.log(a); // 2
}, 10);

export const b = 1;
```

In this example, both `a` and `b` are used asynchronously. Therefore, at the time the module is evaluated, neither `b` nor `a` is actually read, so the rest of the code is executed as normal, and the two `export` declarations produce the values of `a` and `b`. Then, after the timeout, both `a` and `b` are available, so the two `console.log` statements also execute as normal.

If you change the code to use `a` synchronously, the module evaluation fails:

```js
// -- a.js (entry module) --
import { b } from "./b.js";

export const a = 2;
```

```js
// -- b.js --
import { a } from "./a.js";

console.log(a); // ReferenceError: Cannot access 'a' before initialization
export const b = 1;
```

This is because when JavaScript evaluates `a.js`, it needs to first evaluate `b.js`, the dependency of `a.js`. However, `b.js` uses `a`, which is not yet available.

On the other hand, if you change the code to use `b` synchronously but `a` asynchronously, the module evaluation succeeds:

```js
// -- a.js (entry module) --
import { b } from "./b.js";

console.log(b); // 1
export const a = 2;
```

```js
// -- b.js --
import { a } from "./a.js";

setTimeout(() => {
  console.log(a); // 2
}, 10);
export const b = 1;
```

This is because the evaluation of `b.js` completes normally, so the value of `b` is available when `a.js` is evaluated.

Function declarations are much more resilient in cycles, because they are initialized during linking, before any module body runs. Just like how hoisting allows two functions to call each other regardless of their declaration order, link-time initialization allows the same to happen across module boundaries.

```js
// -- a.js (entry module) --
import { isEven } from "./b.js";

export function isOdd(n) {
  return n !== 0 && isEven(n - 1);
}
```

```js
// -- b.js --
import { isOdd } from "./a.js";

console.log(isEven(5)); // false

export function isEven(n) {
  return n === 0 || isOdd(n - 1);
}
```

Even though there's no asynchronous waiting, the `isOdd` binding in `a.js` was already initialized with its function object during linking, before `a.js`'s body has run. These modules only export function declarations, and their functions do not read any state initialized during module evaluation, so they can safely call each other. Reading an uninitialized `let`, `const`, or `class` binding would still throw, even if that binding were private to an exported function's module.

### Errors with cyclic imports

The problem becomes more complicated when there's a linking or evaluation error. Suppose we add `throw new Error("Evaluation failed");` after `export const a = 2;` in the two-module cycle above. A naïve traversal would mark `b.js` as evaluated successfully before executing `a.js`, which then throws:

In this example, if `a.js` fails to link or evaluate, we don't want to mark `b.js` as successful even though it has finished its own linking and evaluating—because its success is contingent on the success of `a.js`, a dependency of `b.js`! Therefore, in a cycle, we must mark all modules as succeeding or failing together.

The precise term we are looking for is a _strongly connected component_ (SCC). An SCC is a maximal group of modules where every module can reach every other module. An SCC can consist of a single cycle or a union of cycles that share vertices, as long as the group is maximal:

In graph theory, we know that any directed graph can be seen as an acyclic graph of SCCs (by viewing SCCs as nodes, we get a "condensation graph"). So if we process SCCs like we process single nodes (marking everything as succeeding or failing together), then we would end up with an acyclic graph, which we've established as easy to handle.

The end effect is that, in the case above, when `b.js` finishes evaluating, it is not marked as evaluated yet—it waits until `a.js` finishes.

### Avoiding cyclic imports

You should usually avoid cyclic imports in your project, because they make your code more error-prone. Some common cycle-elimination techniques are:

- Merge the two modules into one.
- Move the shared code into a third module.
- Move some code from one module to the other.

However, cyclic imports can also occur if the libraries depend on each other, which is harder to fix.
