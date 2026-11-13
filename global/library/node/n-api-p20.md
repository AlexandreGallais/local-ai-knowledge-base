---
title: "Node-API (part 20 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 20 of 23)

### `napi_remove_wrap`

```c
napi_status napi_remove_wrap(napi_env env,
                             napi_value js_object,
                             void** result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] js_object`: The object associated with the native instance.
* `[out] result`: Pointer to the wrapped native instance.

Returns `napi_ok` if the API succeeded.

Retrieves a native instance that was previously wrapped in the JavaScript
object `js_object` using `napi_wrap()` and removes the wrapping. If a finalize
callback was associated with the wrapping, it will no longer be called when the
JavaScript object becomes garbage-collected.

### `napi_type_tag_object`

```c
napi_status napi_type_tag_object(napi_env env,
                                 napi_value js_object,
                                 const napi_type_tag* type_tag);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] js_object`: The JavaScript object or external to be marked.
* `[in] type_tag`: The tag with which the object is to be marked.

Returns `napi_ok` if the API succeeded.

Associates the value of the `type_tag` pointer with the JavaScript object or
external. `napi_check_object_type_tag()` can then be used to compare the tag
that was attached to the object with one owned by the addon to ensure that the
object has the right type.

If the object already has an associated type tag, this API will return
`napi_invalid_arg`.

### `napi_check_object_type_tag`

```c
napi_status napi_check_object_type_tag(napi_env env,
                                       napi_value js_object,
                                       const napi_type_tag* type_tag,
                                       bool* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] js_object`: The JavaScript object or external whose type tag to
  examine.
* `[in] type_tag`: The tag with which to compare any tag found on the object.
* `[out] result`: Whether the type tag given matched the type tag on the
  object. `false` is also returned if no type tag was found on the object.

Returns `napi_ok` if the API succeeded.

Compares the pointer given as `type_tag` with any that can be found on
`js_object`. If no tag is found on `js_object` or, if a tag is found but it does
not match `type_tag`, then `result` is set to `false`. If a tag is found and it
matches `type_tag`, then `result` is set to `true`.

### `napi_add_finalizer`

```c
napi_status napi_add_finalizer(napi_env env,
                               napi_value js_object,
                               void* finalize_data,
                               node_api_basic_finalize finalize_cb,
                               void* finalize_hint,
                               napi_ref* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] js_object`: The JavaScript object to which the native data will be
  attached.
* `[in] finalize_data`: Optional data to be passed to `finalize_cb`.
* `[in] finalize_cb`: Native callback that will be used to free the
  native data when the JavaScript object has been garbage-collected.
  `napi_finalize` provides more details.
* `[in] finalize_hint`: Optional contextual hint that is passed to the
  finalize callback.
* `[out] result`: Optional reference to the JavaScript object.

Returns `napi_ok` if the API succeeded.

Adds a `napi_finalize` callback which will be called when the JavaScript object
in `js_object` has been garbage-collected.

This API can be called multiple times on a single JavaScript object.

_Caution_: The optional returned reference (if obtained) should be deleted via
`napi_delete_reference` ONLY in response to the finalize callback
invocation. If it is deleted before then, then the finalize callback may never
be invoked. Therefore, when obtaining a reference a finalize callback is also
required in order to enable correct disposal of the reference.

#### `node_api_post_finalizer`

> Stability: 1 - Experimental

```c
napi_status node_api_post_finalizer(node_api_basic_env env,
                                    napi_finalize finalize_cb,
                                    void* finalize_data,
                                    void* finalize_hint);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] finalize_cb`: Native callback that will be used to free the
  native data when the JavaScript object has been garbage-collected.
  `napi_finalize` provides more details.
* `[in] finalize_data`: Optional data to be passed to `finalize_cb`.
* `[in] finalize_hint`: Optional contextual hint that is passed to the
  finalize callback.

Returns `napi_ok` if the API succeeded.

Schedules a `napi_finalize` callback to be called asynchronously in the
event loop.

Normally, finalizers are called while the GC (garbage collector) collects
objects. At that point calling any Node-API that may cause changes in the GC
state will be disabled and will crash Node.js.

`node_api_post_finalizer` helps to work around this limitation by allowing the
add-on to defer calls to such Node-APIs to a point in time outside of the GC
finalization.

## Simple asynchronous operations

Addon modules often need to leverage async helpers from libuv as part of their
implementation. This allows them to schedule work to be executed asynchronously
so that their methods can return in advance of the work being completed. This
allows them to avoid blocking overall execution of the Node.js application.

Node-API provides an ABI-stable interface for these
supporting functions which covers the most common asynchronous use cases.

Node-API defines the `napi_async_work` structure which is used to manage
asynchronous workers. Instances are created/deleted with
`napi_create_async_work` and `napi_delete_async_work`.

The `execute` and `complete` callbacks are functions that will be
invoked when the executor is ready to execute and when it completes its
task respectively.

The `execute` function should avoid making any Node-API calls
that could result in the execution of JavaScript or interaction with
JavaScript objects. Most often, any code that needs to make Node-API
calls should be made in `complete` callback instead.
Avoid using the `napi_env` parameter in the execute callback as
it will likely execute JavaScript.

These functions implement the following interfaces:

```c
typedef void (*napi_async_execute_callback)(napi_env env,
                                            void* data);
typedef void (*napi_async_complete_callback)(napi_env env,
                                             napi_status status,
                                             void* data);
```

When these methods are invoked, the `data` parameter passed will be the
addon-provided `void*` data that was passed into the
`napi_create_async_work` call.

Once created the async worker can be queued
for execution using the `napi_queue_async_work` function:

```c
napi_status napi_queue_async_work(node_api_basic_env env,
                                  napi_async_work work);
```

`napi_cancel_async_work` can be used if the work needs
to be cancelled before the work has started execution.

After calling `napi_cancel_async_work`, the `complete` callback
will be invoked with a status value of `napi_cancelled`.
The work should not be deleted before the `complete`
callback invocation, even when it was cancelled.

### `napi_create_async_work`

```c
napi_status napi_create_async_work(napi_env env,
                                   napi_value async_resource,
                                   napi_value async_resource_name,
                                   napi_async_execute_callback execute,
                                   napi_async_complete_callback complete,
                                   void* data,
                                   napi_async_work* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] async_resource`: An optional object associated with the async work
  that will be passed to possible `async_hooks` `init` hooks.
* `[in] async_resource_name`: Identifier for the kind of resource that is being
  provided for diagnostic information exposed by the `async_hooks` API.
* `[in] execute`: The native function which should be called to execute the
  logic asynchronously. The given function is called from a worker pool thread
  and can execute in parallel with the main event loop thread.
* `[in] complete`: The native function which will be called when the
  asynchronous logic is completed or is cancelled. The given function is called
  from the main event loop thread. `napi_async_complete_callback` provides
  more details.
* `[in] data`: User-provided data context. This will be passed back into the
  execute and complete functions.
* `[out] result`: `napi_async_work*` which is the handle to the newly created
  async work.

Returns `napi_ok` if the API succeeded.

This API allocates a work object that is used to execute logic asynchronously.
It should be freed using `napi_delete_async_work` once the work is no longer
required.

`async_resource_name` should be a null-terminated, UTF-8-encoded string.

The `async_resource_name` identifier is provided by the user and should be
representative of the type of async work being performed. It is also recommended
to apply namespacing to the identifier, e.g. by including the module name. See
the `async_hooks` documentation for more information.

### `napi_delete_async_work`

```c
napi_status napi_delete_async_work(napi_env env,
                                   napi_async_work work);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] work`: The handle returned by the call to `napi_create_async_work`.

Returns `napi_ok` if the API succeeded.

This API frees a previously allocated work object.

This API can be called even if there is a pending JavaScript exception.

### `napi_queue_async_work`

```c
napi_status napi_queue_async_work(node_api_basic_env env,
                                  napi_async_work work);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] work`: The handle returned by the call to `napi_create_async_work`.

Returns `napi_ok` if the API succeeded.

This API requests that the previously allocated work be scheduled
for execution. Once it returns successfully, this API must not be called again
with the same `napi_async_work` item or the result will be undefined.

### `napi_cancel_async_work`

```c
napi_status napi_cancel_async_work(node_api_basic_env env,
                                   napi_async_work work);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] work`: The handle returned by the call to `napi_create_async_work`.

Returns `napi_ok` if the API succeeded.

This API cancels queued work if it has not yet
been started. If it has already started executing, it cannot be
cancelled and `napi_generic_failure` will be returned. If successful,
the `complete` callback will be invoked with a status value of
`napi_cancelled`. The work should not be deleted before the `complete`
callback invocation, even if it has been successfully cancelled.

This API can be called even if there is a pending JavaScript exception.
