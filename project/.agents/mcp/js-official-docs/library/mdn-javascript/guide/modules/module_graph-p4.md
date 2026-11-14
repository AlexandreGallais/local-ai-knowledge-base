---
title: "Understanding the module graph (part 4 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/modules/module_graph/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Understanding the module graph (part 4 of 4)

## Controlling import phases

Ordinary `import` declarations trigger the whole load-link-evaluate process. _Import phase modifiers_ let the importer pause the process at a certain stage. The later phases can be triggered at some point during execution only when actually needed.

With `import source`, the process is stopped partway through _loading_: the requested module itself is fetched and parsed, but its dependencies are not requested. The imported value is a _module source object_, which can be linked and evaluated using other mechanisms. The following example uses JavaScript source imports:

> **Note:**
> JavaScript source imports and passing a module source object to `import()` are still proposed features, defined by the ECMAScript Module Phase Imports proposal.

```js
// -- main.js --
import source formattersSource from "./formatters.js";
import config from "./config.js";

process.stdin.on("data", async (data) => {
  if (data.toString().trim() !== "Hi") return;
  const { greet } = await import(formattersSource);
  greet("Josh", config.locale);
});
```

After `main.js` evaluates, `formatters.js` has been parsed, but its dependencies have not been traversed through the source import. `logger.js` has not been requested. `config.js` has evaluated because `main.js` imports it normally:

When the listener receives `Hi`, it passes the module source object to `import()`. This starts loading `formatters.js`'s dependencies, reusing `config.js` and loading `logger.js`, then links and evaluates the remaining modules. The promise fulfills with the namespace after evaluation succeeds. Repeated `Hi` inputs reuse the same module instance, without causing another evaluation.

With `import defer`, the process is stopped before _evaluation_ (but asynchronous evaluation, if any, remains eager). The imported value is a _deferred module namespace object_. For example:

```js
// -- main.js --
import defer * as formatters from "./formatters.js";
import config from "./config.js";

process.stdin.on("data", (data) => {
  if (data.toString().trim() !== "Hi") return;
  formatters.greet("Josh", config.locale);
});
```

Assuming the original synchronous modules and no other imports, `main.js` can finish evaluating with `formatters.js` and `logger.js` still linked but unevaluated. `config.js` evaluates because `main.js` also imports it normally:

When the listener receives `Hi`, reading `formatters.greet` triggers synchronous evaluation of `logger.js` and then `formatters.js`, reusing the already evaluated `config.js`. If evaluation throws, the property access throws. Loading and linking errors, however, have already been checked before `main.js` executes.

Deferred imports can also be nested, creating a pausing boundary at each `defer`. In the following example, `a.js` defers `b.js`, which defers `c.js`, which in turn defers `d.js`. The other imports are ordinary imports. All modules are synchronous. Each timer reads a property of a deferred namespace, triggering the next stage of evaluation. Each timer has a one-second delay measured from when it is scheduled, so the stages occur roughly 1, 2, and 3 seconds after startup.

At startup, all seven modules are loaded and linked, but only `a.js` evaluates. It schedules a timer without accessing `b`'s properties:

When the first timer runs, reading `b.x` evaluates `e.js`, `f.js`, and then `b.js`. Evaluating `b.js` schedules another timer. Its deferred import of `c.js` does not evaluate it, so `c.js`, `d.js`, and `g.js` remain linked:

When the second timer runs, reading `c.x` evaluates `g.js` and then `c.js`. Evaluating `c.js` schedules the third timer, without accessing `d`'s properties yet:

When the third timer runs, reading `d.x` evaluates `d.js`, reusing the already evaluated `e.js` and `g.js`. All modules have now evaluated:

As explained in Tainting effects of top-level await, modules containing top-level `await` and their dependencies must execute eagerly, immediately following the initial linking. Only the remaining synchronous execution can stay deferred.

For both kinds of phase modifiers, note that the modifier acts on the _import_, not on the _target module_. This means another ordinary import can cause the same module to evaluate earlier, and no separate cache entries are created for deferred and eager imports of the same module. For more information, see the caching semantics of `import defer` and `import source`.

Just like `import` is to `import()`, `import source` and `import defer` declarations also have dynamic `import.source()` and `import.defer()` forms, which start their requests when the expressions evaluate.

## See also

- JavaScript modules
- Using modules on the web
- Modules across platforms
