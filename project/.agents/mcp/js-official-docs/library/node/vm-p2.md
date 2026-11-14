---
title: "VM (executing JavaScript) (part 2 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/vm.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# VM (executing JavaScript) (part 2 of 7)

## Class: `vm.Module`

> Stability: 1 - Experimental

This feature is only available with the `--experimental-vm-modules` command
flag enabled.

The `vm.Module` class provides a low-level interface for using
ECMAScript modules in VM contexts. It is the counterpart of the `vm.Script`
class that closely mirrors Module Records as defined in the ECMAScript
specification.

Unlike `vm.Script` however, every `vm.Module` object is bound to a context from
its creation.

Using a `vm.Module` object requires three distinct steps: creation/parsing,
linking, and evaluation. These three steps are illustrated in the following
example.

This implementation lies at a lower level than the ECMAScript Module
loader. There is also no way to interact with the Loader yet, though
support is planned.

```mjs
import vm from 'node:vm';

const contextifiedObject = vm.createContext({
  secret: 42,
  print: console.log,
});

// Step 1
//
// Create a Module by constructing a new `vm.SourceTextModule` object. This
// parses the provided source text, throwing a `SyntaxError` if anything goes
// wrong. By default, a Module is created in the top context. But here, we
// specify `contextifiedObject` as the context this Module belongs to.
//
// Here, we attempt to obtain the default export from the module "foo", and
// put it into local binding "<example-value>".

const rootModule = new vm.SourceTextModule(`
  import s from 'foo';
  s;
  print(s);
`, { context: contextifiedObject });

// Step 2
//
// "Link" the imported dependencies of this Module to it.
//
// Obtain the requested dependencies of a SourceTextModule by
// `sourceTextModule.moduleRequests` and resolve them.
//
// Even top-level Modules without dependencies must be explicitly linked. The
// array passed to `sourceTextModule.linkRequests(modules)` can be
// empty, however.
//
// Note: This is a contrived example in that the resolveAndLinkDependencies
// creates a new "foo" module every time it is called. In a full-fledged
// module system, a cache would probably be used to avoid duplicated modules.

const moduleMap = new Map([
  ['root', rootModule],
]);

function resolveAndLinkDependencies(module) {
  const requestedModules = module.moduleRequests.map((request) => {
    // In a full-fledged module system, the resolveAndLinkDependencies would
    // resolve the module with the module cache key `[specifier, attributes]`.
    // In this example, we just use the specifier as the key.
    const specifier = request.specifier;

    let requestedModule = moduleMap.get(specifier);
    if (requestedModule === undefined) {
      requestedModule = new vm.SourceTextModule(`
        // The "<example-value>" <example-value> refers to the global variable we added to
        // "contextifiedObject" when creating the context.
        export default secret;
      `, { context: module.context });
      moduleMap.set(specifier, requestedModule);
      // Resolve the dependencies of the new module as well.
      resolveAndLinkDependencies(requestedModule);
    }

    return requestedModule;
  });

  module.linkRequests(requestedModules);
}

resolveAndLinkDependencies(rootModule);
rootModule.instantiate();

// Step 3
//
// Evaluate the Module. The evaluate() method returns a promise which will
// resolve after the module has finished evaluating.

// Prints 42.
await rootModule.evaluate();
```

```cjs
const vm = require('node:vm');

const contextifiedObject = vm.createContext({
  secret: 42,
  print: console.log,
});

(async () => {
  // Step 1
  //
  // Create a Module by constructing a new `vm.SourceTextModule` object. This
  // parses the provided source text, throwing a `SyntaxError` if anything goes
  // wrong. By default, a Module is created in the top context. But here, we
  // specify `contextifiedObject` as the context this Module belongs to.
  //
  // Here, we attempt to obtain the default export from the module "foo", and
  // put it into local binding "<example-value>".

  const rootModule = new vm.SourceTextModule(`
    import s from 'foo';
    s;
    print(s);
  `, { context: contextifiedObject });

  // Step 2
  //
  // "Link" the imported dependencies of this Module to it.
  //
  // Obtain the requested dependencies of a SourceTextModule by
  // `sourceTextModule.moduleRequests` and resolve them.
  //
  // Even top-level Modules without dependencies must be explicitly linked. The
  // array passed to `sourceTextModule.linkRequests(modules)` can be
  // empty, however.
  //
  // Note: This is a contrived example in that the resolveAndLinkDependencies
  // creates a new "foo" module every time it is called. In a full-fledged
  // module system, a cache would probably be used to avoid duplicated modules.

  const moduleMap = new Map([
    ['root', rootModule],
  ]);

  function resolveAndLinkDependencies(module) {
    const requestedModules = module.moduleRequests.map((request) => {
      // In a full-fledged module system, the resolveAndLinkDependencies would
      // resolve the module with the module cache key `[specifier, attributes]`.
      // In this example, we just use the specifier as the key.
      const specifier = request.specifier;

      let requestedModule = moduleMap.get(specifier);
      if (requestedModule === undefined) {
        requestedModule = new vm.SourceTextModule(`
          // The "<example-value>" <example-value> refers to the global variable we added to
          // "contextifiedObject" when creating the context.
          export default secret;
        `, { context: module.context });
        moduleMap.set(specifier, requestedModule);
        // Resolve the dependencies of the new module as well.
        resolveAndLinkDependencies(requestedModule);
      }

      return requestedModule;
    });

    module.linkRequests(requestedModules);
  }

  resolveAndLinkDependencies(rootModule);
  rootModule.instantiate();

  // Step 3
  //
  // Evaluate the Module. The evaluate() method returns a promise which will
  // resolve after the module has finished evaluating.

  // Prints 42.
  await rootModule.evaluate();
})();
```

### `module.error`

* Type: {any}

If the `module.status` is `'errored'`, this property contains the exception
thrown by the module during evaluation. If the status is anything else,
accessing this property will result in a thrown exception.

The value `undefined` cannot be used for cases where there is not a thrown
exception due to possible ambiguity with `throw undefined;`.

Corresponds to the `[[EvaluationError]]` field of Cyclic Module Records
in the ECMAScript specification.

### `module.evaluate([options])`

* `options` {Object}
  * `timeout` {integer} Specifies the number of milliseconds to evaluate
    before terminating execution. If execution is interrupted, an `Error`
    will be thrown. This value must be a strictly positive integer.
  * `breakOnSigint` {boolean} If `true`, receiving `SIGINT`
    (`Ctrl`+`C`) will terminate execution and throw an
    `Error`. Existing handlers for the event that have been attached via
    `process.on('SIGINT')` are disabled during script execution, but continue to
    work after that. **Default:** `false`.
* Returns: {Promise} Fulfills with `undefined` upon success.

Evaluate the module and its dependencies. Corresponds to the Evaluate() concrete method field of
Cyclic Module Records in the ECMAScript specification.

If the module is a `vm.SourceTextModule`, `evaluate()` must be called after the module has been instantiated;
otherwise `evaluate()` will return a rejected promise.

For a `vm.SourceTextModule`, the promise returned by `evaluate()` may be fulfilled either
synchronously or asynchronously:

1. If the `vm.SourceTextModule` has no top-level `await` in itself or any of its dependencies, the promise will be
   fulfilled _synchronously_ after the module and all its dependencies have been evaluated.
   1. If the evaluation succeeds, the promise will be _synchronously_ resolved to `undefined`.
   2. If the evaluation results in an exception, the promise will be _synchronously_ rejected with the exception
      that causes the evaluation to fail, which is the same as `module.error`.
2. If the `vm.SourceTextModule` has top-level `await` in itself or any of its dependencies, the promise will be
   fulfilled _asynchronously_ after the module and all its dependencies have been evaluated.
   1. If the evaluation succeeds, the promise will be _asynchronously_ resolved to `undefined`.
   2. If the evaluation results in an exception, the promise will be _asynchronously_ rejected with the exception
      that causes the evaluation to fail.

If the module is a `vm.SyntheticModule`, `evaluate()` always returns a promise that fulfills synchronously, see
the specification of Evaluate() of a Synthetic Module Record:

1. If the `evaluateCallback` passed to its constructor throws an exception synchronously, `evaluate()` returns
   a promise that will be synchronously rejected with that exception.
2. If the `evaluateCallback` does not throw an exception, `evaluate()` returns a promise that will be
   synchronously resolved to `undefined`.

The `evaluateCallback` of a `vm.SyntheticModule` is executed synchronously within the `evaluate()` call, and its
return value is discarded. This means if `evaluateCallback` is an asynchronous function, the promise returned by
`evaluate()` will not reflect its asynchronous behavior, and any rejections from an asynchronous
`evaluateCallback` will be lost.

`evaluate()` could also be called again after the module has already been evaluated, in which case:

1. If the initial evaluation ended in success (`module.status` is `'evaluated'`), it will do nothing
   and return a promise that resolves to `undefined`.
2. If the initial evaluation resulted in an exception (`module.status` is `'errored'`), it will re-reject
   the exception that the initial evaluation resulted in.

This method cannot be called while the module is being evaluated (`module.status` is `'evaluating'`).

### `module.identifier`

* Type: {string}

The identifier of the current module, as set in the constructor.

### `module.link(linker)`

* `linker` {Function}
  * `specifier` {string} The specifier of the requested module:
    ```mjs
    import foo from 'foo';
    //              ^^^^^ the module specifier
    ```

  * `referencingModule` {vm.Module} The `Module` object `link()` is called on.

  * `extra` {Object}
    * `attributes` {Object} The data from the attribute:
      ```mjs
      import foo from 'foo' with { name: 'value' };
      //                         ^^^^^^^^^^^^^^^^^ the attribute
      ```
      Per ECMA-262, hosts are expected to trigger an error if an
      unsupported attribute is present.
    * `assert` {Object} Alias for `extra.attributes`.

  * Returns: {vm.Module|Promise}
* Returns: {Promise}

Link module dependencies. This method must be called before evaluation, and
can only be called once per module.

Use `sourceTextModule.linkRequests(modules)` and
`sourceTextModule.instantiate()` to link modules either synchronously or
asynchronously.

The function is expected to return a `Module` object or a `Promise` that
eventually resolves to a `Module` object. The returned `Module` must satisfy the
following two invariants:

* It must belong to the same context as the parent `Module`.
* Its `status` must not be `'errored'`.

If the returned `Module`'s `status` is `'unlinked'`, this method will be
recursively called on the returned `Module` with the same provided `linker`
function.

`link()` returns a `Promise` that will either get resolved when all linking
instances resolve to a valid `Module`, or rejected if the linker function either
throws an exception or returns an invalid `Module`.

The linker function roughly corresponds to the implementation-defined
HostResolveImportedModule abstract operation in the ECMAScript
specification, with a few key <example-value>:

* The linker function is allowed to be asynchronous while
  HostResolveImportedModule is synchronous.

The actual HostResolveImportedModule implementation used during module
linking is one that returns the modules linked during linking. Since at
that point all modules would have been fully linked already, the
HostResolveImportedModule implementation is fully synchronous per
specification.

Corresponds to the Link() concrete method field of Cyclic Module
Records in the ECMAScript specification.

### `module.namespace`

* Type: {Object}

The namespace object of the module. This is only available after linking
(`module.link()`) has completed.

Corresponds to the GetModuleNamespace abstract operation in the ECMAScript
specification.

### `module.status`

* Type: {string}

The current status of the module. Will be one of:

* `'unlinked'`: `module.link()` has not yet been called.

* `'linking'`: `module.link()` has been called, but not all Promises returned
  by the linker function have been resolved yet.

* `'linked'`: The module has been linked successfully, and all of its
  dependencies are linked, but `module.evaluate()` has not yet been called.

* `'evaluating'`: The module is being evaluated through a `module.evaluate()` on
  itself or a parent module.

* `'evaluated'`: The module has been successfully evaluated.

* `'errored'`: The module has been evaluated, but an exception was thrown.

Other than `'errored'`, this status string corresponds to the specification's
Cyclic Module Record's `[[Status]]` field. `'errored'` corresponds to
`'evaluated'` in the specification, but with `[[EvaluationError]]` set to a
value that is not `undefined`.
