---
title: "Understanding the module graph (part 3 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/modules/module_graph/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Understanding the module graph (part 3 of 4)

## Top-level await and asynchronous evaluation

Modules can use `await` at the top level, outside any function. This allows a module to finish asynchronous initialization before modules that depend on it execute. Previously, our evaluation was synchronous; now, we must make it asynchronous too, which has lots of implications about side-effect ordering and errors.

For example, suppose we change `config.js` to retrieve its configuration from a server, which returns the same object as in our original example:

```js
// -- config.js --
const response = await fetch("https://example.com/config.json");
if (!response.ok) {
  throw new Error(`Failed to fetch configuration: ${response.status}`);
}
export default await response.json();
```

The other modules don't need to change: the module system automatically waits for `config.js` to finish before executing their bodies and executing their dependents like `main.js`.

Previously, a module was either evaluated, unevaluated, or in an SCC and waiting for other modules to evaluate. Now, a module can also be _in progress_. This status covers both modules whose own asynchronous execution is in progress and modules waiting for asynchronous dependencies. A module can therefore have this status without containing an `await` expression.

The engine still traverses dependencies depth-first, in the order their module requests appear in the source. However, it no longer needs to finish executing one branch before visiting another. For an acyclic graph, the process is:

- The engine visits a module's dependencies, as before. If a dependency is still in progress, the engine records that this module must wait for it, but continues visiting the other dependencies.
- Once all dependencies have been visited and none is in progress, the engine starts the module's body. A module with top-level `await` executes until it reaches an `await`, then suspends until the awaited value settles. It remains in progress until its entire body finishes, including any further `await` expressions.
- A module whose dependencies are still in progress is also in progress and waits without executing any of its body, even the code before its first `await`. This also applies to modules that have no top-level `await` themselves.
- When a module finishes successfully, the engine checks which waiting importers can now execute. An importer starts only after all the dependencies it was waiting for have finished successfully. If several modules become ready together, the engine uses the evaluation order established by the depth-first traversal to decide which to start first.

> **Note:**
> When multiple asynchronous modules are simultaneously executing (for example if `logger.js` also contains a top-level `await`), the behavior is the same as executing two async functions concurrently: each `await` yields out the current job and allows the other module to resume. See control flow effects of `await`.

In our example, the engine reaches `config.js` through `main.js` and `formatters.js`. It starts the fetch and suspends `config.js` at the first `await`. It then visits and evaluates `logger.js`, which doesn't depend on the configuration. `formatters.js` must wait for `config.js`, and `main.js` must wait for both `formatters.js` and `config.js`. After the response body has been parsed and `config.js` finishes, `formatters.js` executes, followed by `main.js`, which calls `greet()`.

### Tainting effects of top-level await

Top-level `await` therefore affects more than the module that contains it: it makes the evaluation of every module that transitively imports it asynchronous too. In the following module graph, only `Config` and `Database` contain top-level `await`, but `Auth`, `Reports`, `Documents`, `Router`, `Dashboard`, `Editor`, and `App` all depend on their asynchronous completion. The other branches can still evaluate synchronously.

This matters when an API needs evaluation to finish synchronously. In Node.js, `require()` can load an ES module only if its entire dependency graph is synchronous. A module with top-level `await` "taints" every module above it (in other words, everything that imports it), so they cannot be synchronously imported with `require()`. In the graph above, `require()` can load `Help`, but it cannot load `Router`, even though `Router` itself contains no `await`.

The `import defer` declaration (see Controlling import phases) is another example: the deferred evaluation is triggered by accessing a property on the namespace object, which must be able to finish synchronously, so it cannot entirely defer the evaluation of an asynchronous subgraph. However, in this case, it wouldn't just give up on deferral, or throw an error like `require()` does. Rather, it eagerly evaluates just those parts that prevent the graph from becoming synchronous—namely, the modules that use top-level await plus all their dependencies. For example, if another module uses `import defer` to import `App` in the graph above, then `Config` and `Database`, together with their dependencies `Parse` and `Codec`, evaluate before that importer's body runs. The bodies of `App` and its remaining dependencies can stay deferred. Essentially, the graph's dependencies on these asynchronous modules are replaced with results that are synchronously available, removing the taint and allowing the deferred evaluation to synchronously proceed later.

Adding top-level `await` to an existing module can be a breaking change for its importers, even if its exports remain unchanged. It delays their entire bodies, including statements written before their `import` declarations, while independent modules can continue executing. This can alter the execution order of sibling modules.

For example, these modules rely on the order of sibling imports to initialize a global variable before reading it:

```js
// -- entry.js --
import "./setup.js";
import "./display.js";
```

```js
// -- setup.js --
import { locale } from "./settings.js";

globalThis.appLocale = locale;
```

```js
// -- settings.js --
export const locale = "en-US";
```

```js
// -- display.js --
console.log(globalThis.appLocale); // "en-US"
```

Now suppose `settings.js` introduces top-level `await`:

```js
// -- settings.js --
export const locale = await Promise.resolve("en-US");
```

`setup.js` now waits for `settings.js` before executing the assignment to `globalThis.appLocale`. Meanwhile, `display.js` executes and logs `undefined`, assuming `appLocale` was not already defined. The order of imports in `entry.js` does not make `display.js` wait for `setup.js` to finish.

To preserve the required ordering, make `display.js` explicitly depend on `setup.js`. This is safe because a module is only evaluated once per application.

```js
// -- display.js --
import "./setup.js";

console.log(globalThis.appLocale); // "en-US"
```

The same issue can occur if `setup.js` and `display.js` are entry points of separate `<script type="module">` elements in that order. The explicit import ensures that `display.js` waits for setup in that case too.

### Handling cycles with top-level await

Cycles require an additional distinction between the static dependency graph and the dependencies that evaluation actually waits for. Consider the asynchronous example in the specification, with `a.js` as the entry point and all five modules containing top-level `await`:

The modules `a.js`, `b.js`, `c.js`, and `d.js` form one SCC. The engine first visits `a.js`, `b.js`, and `d.js`. When it encounters `d.js`'s import of `a.js`, it breaks out of the cycle as before. At this point, `a.js` has not yet been recorded as awaiting asynchronous completion, so this edge does not make `d.js` wait for `a.js`. `d.js` starts executing. The engine then visits the other branch through `c.js`, finds that `d.js` is pending, and starts `e.js`.

Suppose the asynchronous operations finish in the following order:

- `e.js` finishes. `c.js` still waits for `d.js`, so no other module starts yet.
- `d.js` finishes. Both `b.js` and `c.js` are now ready. `b.js` starts first, following the traversal's evaluation order, but when it suspends at `await`, `c.js` can start too.
- `c.js` finishes. `a.js` still waits for `b.js`.
- `b.js` finishes. `a.js` can now start executing its body.
- `a.js` finishes. The entry point's evaluation promise fulfills.

Unlike the synchronous cycles discussed earlier, the modules in an asynchronous SCC do not necessarily transition to _evaluated_ together. Each can finish at a different time. To preserve the component's overall outcome, the engine associates its modules with a _cycle root_: the first module visited in that SCC, `a.js` in our case. Imports that encounter the component after its initial traversal use this root to wait for the component's completion and check for an evaluation error. A module's body finishing successfully does not, by itself, mean that the whole component can be imported successfully.

For example, suppose `c.js` fails while `b.js` is still awaiting. The error propagates to `a.js`, whose body never starts, and the entry point's evaluation promise rejects. `b.js` keeps executing. Nevertheless, a later dynamic import of `b.js` rejects with the error recorded on the cycle root `a.js`. The successful execution of `b.js` does not erase the component's failure.

### Deadlocks

You can have deadlocks with modules containing top-level await:

```js
// -- a.js --
import { resolve } from "./b.js";

resolve();
```

```js
// -- b.js --
const { promise, resolve } = Promise.withResolvers();
export { resolve };
await promise;
```

If evaluation starts at `a.js`, it waits for `b.js` to finish before executing its body. But `b.js` awaits a promise that only the call to `resolve()` in `a.js` can fulfill. Neither evaluation can complete. The module algorithm does not automatically reject the promises to break this deadlock.

The above may look contrived. A more realistic situation is when you wait on a dynamic import of a module that depends on the current module.

```js
// -- a.js --
await import("./b.js");
```

```js
// -- b.js --
import "./a.js";
```

Similarly in this case, `b.js` waits for the dynamic import in `a.js` to complete, but the dynamic import can only complete when `b.js` finishes executing.

## Dynamic imports

Everything introduced so far uses static `import` with the entry point being the entry point to the whole application (the `node` command line, the HTML file, etc.), so the loading and linking happens before any user code is run. A dynamic import, `import()`, instead starts an import when user code execution reaches the expression, with the requested module as the entry point. This allows you to dynamically _augment_ the module graph after the initial graph is already up and running (or—with top-level `await`—_while_ the initial graph is evaluating).

For example, we can change the original `main.js` to listen for data from Node.js's `process.stdin`, and import `formatters.js` only when the user types `Hi` and presses Enter:

```js
// -- main.js --
import config from "./config.js";

process.stdin.on("data", async (data) => {
  if (data.toString().trim() !== "Hi") return;
  const { greet } = await import("./formatters.js");
  greet("Josh", config.locale);
});
```

Initially, loading `main.js` discovers `config.js`. Registering the listener completes `main.js`'s evaluation without loading `formatters.js`. When the listener receives `Hi`, another loading process starts from `formatters.js` and discovers its imports of `config.js` and `logger.js`. In this case, `config.js` is already available and is reused, while `logger.js` needs to be loaded too, assuming nothing else has requested it. The new branch therefore joins the existing graph at `config.js`, reusing the same module.

Augmentation of the module graph can encounter existing modules in any state, and that state is preserved—loading modules keep loading, loaded modules aren't re-fetched, linked modules aren't re-linked, evaluated modules are never re-evaluated (including if the previous evaluation threw an error). In the example above, `config.js` has already evaluated, so only `logger.js` and `formatters.js` need to execute. The dynamically imported module itself may also already exist in the module graph and get reused.

Dynamic import is async, because the loading may need to fetch new modules and evaluation may need to wait for top-level `await`. The `import()` promise resolves when the requested module's evaluation finishes successfully.

The new traversal can also reach the module that called `import()` (`main.js`, for example). Because dynamic imports do not constitute dependency edges (they are only entry points), this does not create a cycle. However, if the caller uses top-level `await` to wait for that import, neither can finish, as shown in the deadlock example.

## Module caching

_Module caching_ means reusing a module's identity and state. Repeated successful requests from the same importer, with the same specifier and import attributes, must refer to the same module. Different requests can also refer to the same module, such as when two modules import the same dependency. The host determines how requests map to module identities; see Module caching on the web for browser-specific rules.

This means importers share the module's bindings, including changes made after evaluation. For example, this `counter.js` module keeps a count:

```js
export let count = 0;

export function increment() {
  count++;
}
```

Another module can access the same counter through both static and dynamic imports. The namespace object is shared too.

```js
import * as counter from "./counter.js";

counter.increment();

const sameCounter = await import("./counter.js");
console.log(sameCounter === counter); // true
console.log(sameCounter.count); // 1

sameCounter.increment();
console.log(counter.count); // 2
```

JavaScript provides no standard API for clearing the module cache. If callers need independent state, the module can export a function that creates it:

```js
export function createCounter() {
  let count = 0;
  return {
    increment() {
      return ++count;
    },
  };
}
```

Alternatively, you can add an arbitrary query or fragment to your URL specifier (see `import()`).
