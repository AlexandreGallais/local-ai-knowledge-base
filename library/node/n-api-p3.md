---
title: "Node-API (part 3 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 3 of 23)

## Basic Node-API data types

Node-API exposes the following fundamental data types as abstractions that are
consumed by the various APIs. These APIs should be treated as opaque,
introspectable only with other Node-API calls.

### `napi_status`

Integral status code indicating the success or failure of a Node-API call.
Currently, the following status codes are supported.

```c
typedef enum {
  napi_ok,
  napi_invalid_arg,
  napi_object_expected,
  napi_string_expected,
  napi_name_expected,
  napi_function_expected,
  napi_number_expected,
  napi_boolean_expected,
  napi_array_expected,
  napi_generic_failure,
  napi_pending_exception,
  napi_cancelled,
  napi_escape_called_twice,
  napi_handle_scope_mismatch,
  napi_callback_scope_mismatch,
  napi_queue_full,
  napi_closing,
  napi_bigint_expected,
  napi_date_expected,
  napi_arraybuffer_expected,
  napi_detachable_arraybuffer_expected,
  napi_would_deadlock,  /* unused */
  napi_no_external_buffers_allowed,
  napi_cannot_run_js
} napi_status;
```

If additional information is required upon an API returning a failed status,
it can be obtained by calling `napi_get_last_error_info`.

### `napi_extended_error_info`

```c
typedef struct {
  const char* error_message;
  void* engine_reserved;
  uint32_t engine_error_code;
  napi_status error_code;
} napi_extended_error_info;
```

* `error_message`: UTF8-encoded string containing a VM-neutral description of
  the error.
* `engine_reserved`: Reserved for VM-specific error details. This is currently
  not implemented for any VM.
* `engine_error_code`: VM-specific error code. This is currently
  not implemented for any VM.
* `error_code`: The Node-API status code that originated with the last error.

See the Error handling section for additional information.

### `napi_env`

`napi_env` is used to represent a context that the underlying Node-API
implementation can use to persist VM-specific state. This structure is passed
to native functions when they're invoked, and it must be passed back when
making Node-API calls. Specifically, the same `napi_env` that was passed in when
the initial native function was called must be passed to any subsequent
nested Node-API calls. Caching the `napi_env` for the purpose of general reuse,
and passing the `napi_env` between instances of the same addon running on
different `Worker` threads is not allowed. The `napi_env` becomes invalid
when an instance of a native addon is unloaded. Notification of this event is
delivered through the callbacks given to `napi_add_env_cleanup_hook` and
`napi_set_instance_data`.

### `node_api_basic_env`

> Stability: 1 - Experimental

This variant of `napi_env` is passed to synchronous finalizers
(`node_api_basic_finalize`). There is a subset of Node-APIs which accept
a parameter of type `node_api_basic_env` as their first argument. These APIs do
not access the state of the JavaScript engine and are thus safe to call from
synchronous finalizers. Passing a parameter of type `napi_env` to these APIs is
allowed, however, passing a parameter of type `node_api_basic_env` to APIs that
access the JavaScript engine state is not allowed. Attempting to do so without
a cast will produce a compiler warning or an error when add-ons are compiled
with flags which cause them to emit warnings and/or errors when incorrect
pointer types are passed into a function. Calling such APIs from a synchronous
finalizer will ultimately result in the termination of the application.

### `napi_value`

This is an opaque pointer that is used to represent a JavaScript value.

### `napi_threadsafe_function`

This is an opaque pointer that represents a JavaScript function which can be
called asynchronously from multiple threads via
`napi_call_threadsafe_function()`.

### `napi_threadsafe_function_release_mode`

A value to be given to `napi_release_threadsafe_function()` to indicate whether
the thread-safe function is to be closed immediately (`napi_tsfn_abort`) or
merely released (`napi_tsfn_release`) and thus available for subsequent use via
`napi_acquire_threadsafe_function()` and `napi_call_threadsafe_function()`.

```c
typedef enum {
  napi_tsfn_release,
  napi_tsfn_abort
} napi_threadsafe_function_release_mode;
```

### `napi_threadsafe_function_call_mode`

A value to be given to `napi_call_threadsafe_function()` to indicate whether
the call should block whenever the queue associated with the thread-safe
function is full.

```c
typedef enum {
  napi_tsfn_nonblocking,
  napi_tsfn_blocking
} napi_threadsafe_function_call_mode;
```

### Node-API memory management types

#### `napi_handle_scope`

This is an abstraction used to control and modify the lifetime of objects
created within a particular scope. In general, Node-API values are created
within the context of a handle scope. When a native method is called from
JavaScript, a default handle scope will exist. If the user does not explicitly
create a new handle scope, Node-API values will be created in the default handle
scope. For any invocations of code outside the execution of a native method
(for instance, during a libuv callback invocation), the module is required to
create a scope before invoking any functions that can result in the creation
of JavaScript values.

Handle scopes are created using `napi_open_handle_scope` and are destroyed
using `napi_close_handle_scope`. Closing the scope can indicate to the GC
that all `napi_value`s created during the lifetime of the handle scope are no
longer referenced from the current stack frame.

For more details, review the Object lifetime management.

#### `napi_escapable_handle_scope`

Escapable handle scopes are a special type of handle scope to return values
created within a particular handle scope to a parent scope.

#### `napi_ref`

This is the abstraction to use to reference a `napi_value`. This allows for
users to manage the lifetimes of JavaScript values, including defining their
minimum lifetimes explicitly.

For more details, review the Object lifetime management.

#### `napi_type_tag`

A 128-bit value stored as two unsigned 64-bit integers. It serves as a UUID
with which JavaScript objects or externals can be "tagged" in order to
ensure that they are of a certain type. This is a stronger check than
`napi_instanceof`, because the latter can report a false positive if the
object's prototype has been manipulated. Type-tagging is most useful in
conjunction with `napi_wrap` because it ensures that the pointer retrieved
from a wrapped object can be safely cast to the native type corresponding to the
type tag that had been previously applied to the JavaScript object.

```c
typedef struct {
  uint64_t lower;
  uint64_t upper;
} napi_type_tag;
```

#### `napi_async_cleanup_hook_handle`

An opaque value returned by `napi_add_async_cleanup_hook`. It must be passed
to `napi_remove_async_cleanup_hook` when the chain of asynchronous cleanup
events completes.

### Node-API callback types

#### `napi_callback_info`

Opaque datatype that is passed to a callback function. It can be used for
getting additional information about the context in which the callback was
invoked.

#### `napi_callback`

Function pointer type for user-provided native functions which are to be
exposed to JavaScript via Node-API. Callback functions should satisfy the
following signature:

```c
typedef napi_value (*napi_callback)(napi_env, napi_callback_info);
```

Unless for reasons discussed in Object Lifetime Management, creating a
handle and/or callback scope inside a `napi_callback` is not necessary.

#### `node_api_basic_finalize`

> Stability: 1 - Experimental

Function pointer type for add-on provided functions that allow the user to be
notified when externally-owned data is ready to be cleaned up because the
object it was associated with has been garbage-collected. The user must provide
a function satisfying the following signature which would get called upon the
object's collection. Currently, `node_api_basic_finalize` can be used for
finding out when objects that have external data are collected.

```c
typedef void (*node_api_basic_finalize)(node_api_basic_env env,
                                      void* finalize_data,
                                      void* finalize_hint);
```

Unless for reasons discussed in Object Lifetime Management, creating a
handle and/or callback scope inside the function body is not necessary.

Since these functions may be called while the JavaScript engine is in a state
where it cannot execute JavaScript code, only Node-APIs which accept a
`node_api_basic_env` as their first parameter may be called.
`node_api_post_finalizer` can be used to schedule Node-API calls that
require access to the JavaScript engine's state to run after the current
garbage collection cycle has completed.

In the case of `node_api_create_external_string_latin1` and
`node_api_create_external_string_utf16` the `env` parameter may be null,
because external strings can be collected during the latter part of environment
shutdown.

Change History:

* experimental (`NAPI_EXPERIMENTAL`):

  Only Node-API calls that accept a `node_api_basic_env` as their first
  parameter may be called, otherwise the application will be terminated with an
  appropriate error message. This feature can be turned off by defining
  `NODE_API_EXPERIMENTAL_BASIC_ENV_OPT_OUT`.

#### `napi_finalize`

Function pointer type for add-on provided function that allow the user to
schedule a group of calls to Node-APIs in response to a garbage collection
event, after the garbage collection cycle has completed. These function
pointers can be used with `node_api_post_finalizer`.

```c
typedef void (*napi_finalize)(napi_env env,
                              void* finalize_data,
                              void* finalize_hint);
```

Change History:

* experimental (`NAPI_EXPERIMENTAL` is defined):

  A function of this type may no longer be used as a finalizer, except with
  `node_api_post_finalizer`. `node_api_basic_finalize` must be used
  instead. This feature can be turned off by defining
  `NODE_API_EXPERIMENTAL_BASIC_ENV_OPT_OUT`.

#### `napi_async_execute_callback`

Function pointer used with functions that support asynchronous
operations. Callback functions must satisfy the following signature:

```c
typedef void (*napi_async_execute_callback)(napi_env env, void* data);
```

Implementations of this function must avoid making Node-API calls that execute
JavaScript or interact with JavaScript objects. Node-API calls should be in the
`napi_async_complete_callback` instead. Do not use the `napi_env` parameter as
it will likely result in execution of JavaScript.

#### `napi_async_complete_callback`

Function pointer used with functions that support asynchronous
operations. Callback functions must satisfy the following signature:

```c
typedef void (*napi_async_complete_callback)(napi_env env,
                                             napi_status status,
                                             void* data);
```

Unless for reasons discussed in Object Lifetime Management, creating a
handle and/or callback scope inside the function body is not necessary.

#### `napi_threadsafe_function_call_js`

Function pointer used with asynchronous thread-safe function calls. The callback
will be called on the main thread. Its purpose is to use a data item arriving
via the queue from one of the secondary threads to construct the parameters
necessary for a call into JavaScript, usually via `napi_call_function`, and then
make the call into JavaScript.

The data arriving from the secondary thread via the queue is given in the `data`
parameter and the JavaScript function to call is given in the `js_callback`
parameter.

Node-API sets up the environment prior to calling this callback, so it is
sufficient to call the JavaScript function via `napi_call_function` rather than
via `napi_make_callback`.

Callback functions must satisfy the following signature:

```c
typedef void (*napi_threadsafe_function_call_js)(napi_env env,
                                                 napi_value js_callback,
                                                 void* context,
                                                 void* data);
```

* `[in] env`: The environment to use for API calls, or `NULL` if the thread-safe
  function is being torn down and `data` may need to be freed.
* `[in] js_callback`: The JavaScript function to call, or `NULL` if the
  thread-safe function is being torn down and `data` may need to be freed. It
  may also be `NULL` if the thread-safe function was created without
  `js_callback`.
* `[in] context`: The optional data with which the thread-safe function was
  created.
* `[in] data`: Data created by the secondary thread. It is the responsibility of
  the callback to convert this native data to JavaScript values (with Node-API
  functions) that can be passed as parameters when `js_callback` is invoked.
  This pointer is managed entirely by the threads and this callback. Thus this
  callback should free the data.

Unless for reasons discussed in Object Lifetime Management, creating a
handle and/or callback scope inside the function body is not necessary.

#### `napi_cleanup_hook`

Function pointer used with `napi_add_env_cleanup_hook`. It will be called
when the environment is being torn down.

Callback functions must satisfy the following signature:

```c
typedef void (*napi_cleanup_hook)(void* data);
```

* `[in] data`: The data that was passed to `napi_add_env_cleanup_hook`.

#### `napi_async_cleanup_hook`

Function pointer used with `napi_add_async_cleanup_hook`. It will be called
when the environment is being torn down.

Callback functions must satisfy the following signature:

```c
typedef void (*napi_async_cleanup_hook)(napi_async_cleanup_hook_handle handle,
                                        void* data);
```

* `[in] handle`: The handle that must be passed to
  `napi_remove_async_cleanup_hook` after completion of the asynchronous
  cleanup.
* `[in] data`: The data that was passed to `napi_add_async_cleanup_hook`.

The body of the function should initiate the asynchronous cleanup actions at the
end of which `handle` must be passed in a call to
`napi_remove_async_cleanup_hook`.
