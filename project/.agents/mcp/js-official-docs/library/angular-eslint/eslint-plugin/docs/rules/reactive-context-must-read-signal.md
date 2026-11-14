---
title: "@angular-eslint/reactive-context-must-read-signal (part 1 of 2)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/reactive-context-must-read-signal.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/reactive-context-must-read-signal`

Ensures that reactive contexts such as computed(), linkedSignal() and effect() read at least one reactive value (a signal). A reactive context with no reactive dependencies never re-runs, which is almost always a mistake.

- Type: problem

## Rationale

Reactive contexts like `computed()`, `linkedSignal()`, `effect()` and `afterRenderEffect()` re-run whenever a signal they read changes. If the relevant function never reads a signal, the context runs once and can never react to anything, so it adds overhead without providing reactivity. This is usually a mistake: either the developer forgot to call a signal (e.g. wrote `firstName` instead of `firstName()`), or the value is actually static and should be a plain constant, a `signal()`, or an `afterNextRender()` in the case of `afterRenderEffect()`. To avoid false positives, the rule only reports when everything the tracked function does is known not to read a signal. Calls into the TypeScript standard library (arrays, strings, `Math`, `JSON`, `console`, DOM APIs, etc.) are known to be safe; anything else keeps the rule silent, including a helper function, a service method, a getter, an unresolved symbol, and any Angular API such as `untracked()`. One known limitation: a standard library call that reaches user code through a protocol method, such as `toJSON()` in `JSON.stringify()` or `toString()` in a template literal, is still treated as safe, so a signal read inside such a method is not detected. For `resource()`/`rxResource()` only the `params` function defines the dependencies, and these are opt-in via the `checkResources` option.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Also check that the `params` function of `resource()` and `rxResource()` reads a signal.
   *
   * Default: `false`
   */
  checkResources?: boolean;
}

```
