---
title: "Node-API (part 7 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 7 of 23)

### Cleanup on exit of the current Node.js environment

While a Node.js process typically releases all its resources when exiting,
embedders of Node.js, or future Worker support, may require addons to register
clean-up hooks that will be run once the current Node.js environment exits.

Node-API provides functions for registering and un-registering such callbacks.
When those callbacks are run, all resources that are being held by the addon
should be freed up.

#### `napi_add_env_cleanup_hook`

```c
NODE_EXTERN napi_status napi_add_env_cleanup_hook(node_api_basic_env env,
                                                  napi_cleanup_hook fun,
                                                  void* arg);
```

Registers `fun` as a function to be run with the `arg` parameter once the
current Node.js environment exits.

A function can safely be specified multiple times with different
`arg` values. In that case, it will be called multiple times as well.
Providing the same `fun` and `arg` values multiple times is not allowed
and will lead the process to abort.

The hooks will be called in reverse order, i.e. the most recently added one
will be called first.

Removing this hook can be done by using `napi_remove_env_cleanup_hook`.
Typically, that happens when the resource for which this hook was added
is being torn down anyway.

For asynchronous cleanup, `napi_add_async_cleanup_hook` is available.

#### `napi_remove_env_cleanup_hook`

```c
NAPI_EXTERN napi_status napi_remove_env_cleanup_hook(node_api_basic_env env,
                                                     void (*fun)(void* arg),
                                                     void* arg);
```

Unregisters `fun` as a function to be run with the `arg` parameter once the
current Node.js environment exits. Both the argument and the function value
need to be exact matches.

The function must have originally been registered
with `napi_add_env_cleanup_hook`, otherwise the process will abort.

#### `napi_add_async_cleanup_hook`

```c
NAPI_EXTERN napi_status napi_add_async_cleanup_hook(
    node_api_basic_env env,
    napi_async_cleanup_hook hook,
    void* arg,
    napi_async_cleanup_hook_handle* remove_handle);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] hook`: The function pointer to call at environment teardown.
* `[in] arg`: The pointer to pass to `hook` when it gets called.
* `[out] remove_handle`: Optional handle that refers to the asynchronous cleanup
  hook.

Registers `hook`, which is a function of type `napi_async_cleanup_hook`, as
a function to be run with the `remove_handle` and `arg` parameters once the
current Node.js environment exits.

Unlike `napi_add_env_cleanup_hook`, the hook is allowed to be asynchronous.

Otherwise, behavior generally matches that of `napi_add_env_cleanup_hook`.

If `remove_handle` is not `NULL`, an opaque value will be stored in it
that must later be passed to `napi_remove_async_cleanup_hook`,
regardless of whether the hook has already been invoked.
Typically, that happens when the resource for which this hook was added
is being torn down anyway.

#### `napi_remove_async_cleanup_hook`

```c
NAPI_EXTERN napi_status napi_remove_async_cleanup_hook(
    napi_async_cleanup_hook_handle remove_handle);
```

* `[in] remove_handle`: The handle to an asynchronous cleanup hook that was
  created with `napi_add_async_cleanup_hook`.

Unregisters the cleanup hook corresponding to `remove_handle`. This will prevent
the hook from being executed, unless it has already started executing.
This must be called on any `napi_async_cleanup_hook_handle` value obtained
from `napi_add_async_cleanup_hook`.

### Finalization on the exit of the Node.js environment

The Node.js environment may be torn down at an arbitrary time as soon as
possible with JavaScript execution disallowed, like on the request of
`worker.terminate()`. When the environment is being torn down, the
registered `napi_finalize` callbacks of JavaScript objects, thread-safe
functions and environment instance data are invoked immediately and
independently.

The invocation of `napi_finalize` callbacks is scheduled after the manually
registered cleanup hooks. In order to ensure a proper order of addon
finalization during environment shutdown to avoid use-after-free in the
`napi_finalize` callback, addons should register a cleanup hook with
`napi_add_env_cleanup_hook` and `napi_add_async_cleanup_hook` to manually
release the allocated resource in a proper order.

## Module registration

Node-API modules are registered in a manner similar to other modules
except that instead of using the `NODE_MODULE` macro the following
is used:

```c
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
```

The next difference is the signature for the `Init` method. For a Node-API
module it is as follows:

```c
napi_value Init(napi_env env, napi_value exports);
```

The return value from `Init` is treated as the `exports` object for the module.
The `Init` method is passed an empty object via the `exports` parameter as a
convenience. If `Init` returns `NULL`, the parameter passed as `exports` is
exported by the module. Node-API modules cannot modify the `module` object but
can specify anything as the `exports` property of the module.

To add the method `hello` as a function so that it can be called as a method
provided by the addon:

```c
napi_value Init(napi_env env, napi_value exports) {
  napi_status status;
  napi_property_descriptor desc = {
    "hello",
    NULL,
    Method,
    NULL,
    NULL,
    NULL,
    napi_writable | napi_enumerable | napi_configurable,
    NULL
  };
  status = napi_define_properties(env, exports, 1, &desc);
  if (status != napi_ok) return NULL;
  return exports;
}
```

To set a function to be returned by the `require()` for the addon:

```c
napi_value Init(napi_env env, napi_value exports) {
  napi_value method;
  napi_status status;
  status = napi_create_function(env, "exports", NAPI_AUTO_LENGTH, Method, NULL, &method);
  if (status != napi_ok) return NULL;
  return method;
}
```

To define a class so that new instances can be created (often used with
Object wrap):

```c
// NOTE: partial example, not all referenced code is included
napi_value Init(napi_env env, napi_value exports) {
  napi_status status;
  napi_property_descriptor properties[] = {
    { "value", NULL, NULL, GetValue, SetValue, NULL, napi_writable | napi_configurable, NULL },
    DECLARE_NAPI_METHOD("plusOne", PlusOne),
    DECLARE_NAPI_METHOD("multiply", Multiply),
  };

  napi_value cons;
  status =
      napi_define_class(env, "MyObject", New, NULL, 3, properties, &cons);
  if (status != napi_ok) return NULL;

  status = napi_create_reference(env, cons, 1, &constructor);
  if (status != napi_ok) return NULL;

  status = napi_set_named_property(env, exports, "MyObject", cons);
  if (status != napi_ok) return NULL;

  return exports;
}
```

You can also use the `NAPI_MODULE_INIT` macro, which acts as a shorthand
for `NAPI_MODULE` and defining an `Init` function:

```c
NAPI_MODULE_INIT(/* napi_env env, napi_value exports */) {
  napi_value answer;
  napi_status result;

  status = napi_create_int64(env, 42, &answer);
  if (status != napi_ok) return NULL;

  status = napi_set_named_property(env, exports, "answer", answer);
  if (status != napi_ok) return NULL;

  return exports;
}
```

The parameters `env` and `exports` are provided to the body of the
`NAPI_MODULE_INIT` macro.

All Node-API addons are context-aware, meaning they may be loaded multiple
times. There are a few design considerations when declaring such a module.
The documentation on context-aware addons provides more details.

The variables `env` and `exports` will be available inside the function body
following the macro invocation.

For more details on setting properties on objects, see the section on
Working with JavaScript properties.

For more details on building addon modules in general, refer to the existing
API.
