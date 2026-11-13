---
title: "Node-API (part 21 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 21 of 23)

## Custom asynchronous operations

The simple asynchronous work APIs above may not be appropriate for every
scenario. When using any other asynchronous mechanism, the following APIs
are necessary to ensure an asynchronous operation is properly tracked by
the runtime.

### `napi_async_init`

```c
napi_status napi_async_init(napi_env env,
                            napi_value async_resource,
                            napi_value async_resource_name,
                            napi_async_context* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] async_resource`: Object associated with the async work
  that will be passed to possible `async_hooks` `init` hooks and can be
  accessed by `async_hooks.executionAsyncResource()`.
* `[in] async_resource_name`: Identifier for the kind of resource that is being
  provided for diagnostic information exposed by the `async_hooks` API.
* `[out] result`: The initialized async context.

Returns `napi_ok` if the API succeeded.

In order to retain ABI compatibility with previous versions, passing `NULL`
for `async_resource` does not result in an error. However, this is not
recommended as this will result in undesirable behavior with  `async_hooks`
`init` hooks and `async_hooks.executionAsyncResource()` as the resource is
now required by the underlying `async_hooks` implementation in order to provide
the linkage between async callbacks.

Previous versions of this API were not maintaining a strong reference to
`async_resource` while the `napi_async_context` object existed and instead
expected the caller to hold a strong reference. This has been changed, as a
corresponding call to `napi_async_destroy` for every call to
`napi_async_init()` is a requirement in any case to avoid memory leaks.

### `napi_async_destroy`

```c
napi_status napi_async_destroy(napi_env env,
                               napi_async_context async_context);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] async_context`: The async context to be destroyed.

Returns `napi_ok` if the API succeeded.

This API can be called even if there is a pending JavaScript exception.

### `napi_make_callback`

```c
NAPI_EXTERN napi_status napi_make_callback(napi_env env,
                                           napi_async_context async_context,
                                           napi_value recv,
                                           napi_value func,
                                           size_t argc,
                                           const napi_value* argv,
                                           napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] async_context`: Context for the async operation that is
  invoking the callback. This should normally be a value previously
  obtained from `napi_async_init`.
  In order to retain ABI compatibility with previous versions, passing `NULL`
  for `async_context` does not result in an error. However, this results
  in incorrect operation of async hooks. Potential issues include loss of
  async context when using the `AsyncLocalStorage` API.
* `[in] recv`: The `this` value passed to the called function.
* `[in] func`: `napi_value` representing the JavaScript function to be invoked.
* `[in] argc`: The count of elements in the `argv` array.
* `[in] argv`: Array of JavaScript values as `napi_value` representing the
  arguments to the function. If `argc` is zero this parameter may be
  omitted by passing in `NULL`.
* `[out] result`: `napi_value` representing the JavaScript object returned.

Returns `napi_ok` if the API succeeded.

This method allows a JavaScript function object to be called from a native
add-on. This API is similar to `napi_call_function`. However, it is used to call
_from_ native code back _into_ JavaScript _after_ returning from an async
operation (when there is no other script on the stack). It is a fairly simple
wrapper around `node::MakeCallback`.

Note it is _not_ necessary to use `napi_make_callback` from within a
`napi_async_complete_callback`; in that situation the callback's async
context has already been set up, so a direct call to `napi_call_function`
is sufficient and appropriate. Use of the `napi_make_callback` function
may be required when implementing custom async behavior that does not use
`napi_create_async_work`.

Any `process.nextTick`s or Promises scheduled on the microtask queue by
JavaScript during the callback are ran before returning back to C/C++.

### `napi_open_callback_scope`

```c
NAPI_EXTERN napi_status napi_open_callback_scope(napi_env env,
                                                 napi_value resource_object,
                                                 napi_async_context context,
                                                 napi_callback_scope* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] resource_object`: An object associated with the async work
  that will be passed to possible `async_hooks` `init` hooks. This
  parameter has been deprecated and is ignored at runtime. Use the
  `async_resource` parameter in `napi_async_init` instead.
* `[in] context`: Context for the async operation that is invoking the callback.
  This should be a value previously obtained from `napi_async_init`.
* `[out] result`: The newly created scope.

There are cases (for example, resolving promises) where it is
necessary to have the equivalent of the scope associated with a callback
in place when making certain Node-API calls. If there is no other script on
the stack the `napi_open_callback_scope` and
`napi_close_callback_scope` functions can be used to open/close
the required scope.

### `napi_close_callback_scope`

```c
NAPI_EXTERN napi_status napi_close_callback_scope(napi_env env,
                                                  napi_callback_scope scope)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] scope`: The scope to be closed.

This API can be called even if there is a pending JavaScript exception.

## Version management

### `napi_get_node_version`

```c
typedef struct {
  uint32_t major;
  uint32_t minor;
  uint32_t patch;
  const char* release;
} napi_node_version;

napi_status napi_get_node_version(node_api_basic_env env,
                                  const napi_node_version** version);
```

* `[in] env`: The environment that the API is invoked under.
* `[out] version`: A pointer to version information for Node.js itself.

Returns `napi_ok` if the API succeeded.

This function fills the `version` struct with the major, minor, and patch
version of Node.js that is currently running, and the `release` field with the
value of `process.release.name`.

The returned buffer is statically allocated and does not need to be freed.

### `napi_get_version`

```c
napi_status napi_get_version(node_api_basic_env env,
                             uint32_t* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[out] result`: The highest version of Node-API supported.

Returns `napi_ok` if the API succeeded.

This API returns the highest Node-API version supported by the
Node.js runtime. Node-API is planned to be additive such that
newer releases of Node.js may support additional API functions.
In order to allow an addon to use a newer function when running with
versions of Node.js that support it, while providing
fallback behavior when running with Node.js versions that don't
support it:

* Call `napi_get_version()` to determine if the API is available.
* If available, dynamically load a pointer to the function using `uv_dlsym()`.
* Use the dynamically loaded pointer to invoke the function.
* If the function is not available, provide an alternate implementation
  that does not use the function.

## Memory management

### `napi_adjust_external_memory`

```c
NAPI_EXTERN napi_status napi_adjust_external_memory(node_api_basic_env env,
                                                    int64_t change_in_bytes,
                                                    int64_t* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] change_in_bytes`: The change in externally allocated memory that is kept
  alive by JavaScript objects.
* `[out] result`: The adjusted value. This value should reflect the
  total amount of external memory with the given `change_in_bytes` included.
  The absolute value of the returned value should not  be depended on.
  For example, implementations may use a single counter for all addons, or a
  counter for each addon.

Returns `napi_ok` if the API succeeded.

This function gives the runtime an indication of the amount of externally
allocated memory that is kept alive by JavaScript objects
(i.e. a JavaScript object that points to its own memory allocated by a
native addon). Registering externally allocated memory may, but is not
guaranteed to, trigger global garbage collections more
often than it would otherwise.

This function is expected to be called in a manner such that an
addon does not decrease the external memory more than it has
increased the external memory.

## Promises

Node-API provides facilities for creating `Promise` objects as described in
Section Promise objects of the ECMA specification. It implements promises as a pair of
objects. When a promise is created by `napi_create_promise()`, a "deferred"
object is created and returned alongside the `Promise`. The deferred object is
bound to the created `Promise` and is the only means to resolve or reject the
`Promise` using `napi_resolve_deferred()` or `napi_reject_deferred()`. The
deferred object that is created by `napi_create_promise()` is freed by
`napi_resolve_deferred()` or `napi_reject_deferred()`. The `Promise` object may
be returned to JavaScript where it can be used in the usual fashion.

For example, to create a promise and pass it to an asynchronous worker:

```c
napi_deferred deferred;
napi_value promise;
napi_status status;

// Create the promise.
status = napi_create_promise(env, &deferred, &promise);
if (status != napi_ok) return NULL;

// Pass the deferred to a function that performs an asynchronous action.
do_something_asynchronous(deferred);

// Return the promise to JS
return promise;
```

The above function `do_something_asynchronous()` would perform its asynchronous
action and then it would resolve or reject the deferred, thereby concluding the
promise and freeing the deferred:

```c
napi_deferred deferred;
napi_value undefined;
napi_status status;

// Create a value with which to conclude the deferred.
status = napi_get_undefined(env, &undefined);
if (status != napi_ok) return NULL;

// Resolve or reject the promise associated with the deferred depending on
// whether the asynchronous action succeeded.
if (asynchronous_action_succeeded) {
  status = napi_resolve_deferred(env, deferred, undefined);
} else {
  status = napi_reject_deferred(env, deferred, undefined);
}
if (status != napi_ok) return NULL;

// At this point the deferred has been freed, so we should assign NULL to it.
deferred = NULL;
```

### `napi_create_promise`

```c
napi_status napi_create_promise(napi_env env,
                                napi_deferred* deferred,
                                napi_value* promise);
```

* `[in] env`: The environment that the API is invoked under.
* `[out] deferred`: A newly created deferred object which can later be passed to
  `napi_resolve_deferred()` or `napi_reject_deferred()` to resolve resp. reject
  the associated promise.
* `[out] promise`: The JavaScript promise associated with the deferred object.

Returns `napi_ok` if the API succeeded.

This API creates a deferred object and a JavaScript promise.

### `napi_resolve_deferred`

```c
napi_status napi_resolve_deferred(napi_env env,
                                  napi_deferred deferred,
                                  napi_value resolution);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] deferred`: The deferred object whose associated promise to resolve.
* `[in] resolution`: The value with which to resolve the promise.

This API resolves a JavaScript promise by way of the deferred object
with which it is associated. Thus, it can only be used to resolve JavaScript
promises for which the corresponding deferred object is available. This
effectively means that the promise must have been created using
`napi_create_promise()` and the deferred object returned from that call must
have been retained in order to be passed to this API.

The deferred object is freed upon successful completion.

### `napi_reject_deferred`

```c
napi_status napi_reject_deferred(napi_env env,
                                 napi_deferred deferred,
                                 napi_value rejection);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] deferred`: The deferred object whose associated promise to resolve.
* `[in] rejection`: The value with which to reject the promise.

This API rejects a JavaScript promise by way of the deferred object
with which it is associated. Thus, it can only be used to reject JavaScript
promises for which the corresponding deferred object is available. This
effectively means that the promise must have been created using
`napi_create_promise()` and the deferred object returned from that call must
have been retained in order to be passed to this API.

The deferred object is freed upon successful completion.

### `napi_is_promise`

```c
napi_status napi_is_promise(napi_env env,
                            napi_value value,
                            bool* is_promise);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: The value to examine
* `[out] is_promise`: Flag indicating whether `promise` is a native promise
  object (that is, a promise object created by the underlying engine).
