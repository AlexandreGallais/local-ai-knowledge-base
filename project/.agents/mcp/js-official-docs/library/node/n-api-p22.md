---
title: "Node-API (part 22 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 22 of 23)

## Script execution

Node-API provides an API for executing a string containing JavaScript using the
underlying JavaScript engine.

### `napi_run_script`

```c
NAPI_EXTERN napi_status napi_run_script(napi_env env,
                                        napi_value script,
                                        napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] script`: A JavaScript string containing the script to execute.
* `[out] result`: The value resulting from having executed the script.

This function executes a string of JavaScript code and returns its result with
the following caveats:

* Unlike `eval`, this function does not allow the script to access the current
  lexical scope, and therefore also does not allow to access the
  module scope, meaning that pseudo-globals such as `require` will not be
  available.
* The script can access the global scope. Function and `var` declarations
  in the script will be added to the `global` object. Variable declarations
  made using `let` and `const` will be visible globally, but will not be added
  to the `global` object.
* The value of `this` is `global` within the script.

## libuv event loop

Node-API provides a function for getting the current event loop associated with
a specific `napi_env`.

### `napi_get_uv_event_loop`

```c
NAPI_EXTERN napi_status napi_get_uv_event_loop(node_api_basic_env env,
                                               struct uv_loop_s** loop);
```

* `[in] env`: The environment that the API is invoked under.
* `[out] loop`: The current libuv loop instance.

Note: While libuv only guarantees ABI stability
in a major version, its use may result in an addon that does not work across
Node.js major versions.

ThreadSafeFunction
is an ABI-stable alternative for many use cases to calling into the
JavaScript thread from another thread.
