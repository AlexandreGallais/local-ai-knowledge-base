---
title: "Node-API (part 2 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 2 of 23)

## Node-API version matrix

Up until version 9, Node-API versions were additive and versioned
independently from Node.js. This meant that any version was
an extension to the previous version in that it had all of
the APIs from the previous version with some additions. Each
Node.js version only supported a single Node-API version.
For example v18.15.0 supports only Node-API version 8. ABI stability was
achieved because 8 was a strict superset of all previous versions.

As of version 9, while Node-API versions continue to be versioned
independently, an add-on that ran with Node-API version 9 may need
code updates to run with Node-API version 10. ABI stability
is maintained, however, because Node.js versions that support
Node-API versions higher than 8 will support all versions
between 8 and the highest version they support and will default
to providing the version 8 APIs unless an add-on opts into a
higher Node-API version. This approach provides the flexibility
of better optimizing existing Node-API functions while
maintaining ABI stability. Existing add-ons can continue to run without
recompilation using an earlier version of Node-API. If an add-on
needs functionality from a newer Node-API version, changes to existing
code and recompilation will be needed to use those new functions anyway.

In versions of Node.js that support Node-API version 9 and later, defining
`NAPI_VERSION=X` and using the existing add-on initialization macros
will bake in the requested Node-API version that will be used at runtime
into the add-on. If `NAPI_VERSION` is not set it will default to 8.

This table may not be up to date in older streams, the most up to date
information is in the latest API documentation in:
Node-API version matrix

     | Node-API version
     | Supported In

     | 10
     | v22.14.0+, 23.6.0+ and all later versions

     | 9
     | v18.17.0+, 20.3.0+, 21.0.0 and all later versions

     | 8
     | v12.22.0+, v14.17.0+, v15.12.0+, 16.0.0 and all later versions

     | 7
     | v10.23.0+, v12.19.0+, v14.12.0+, 15.0.0 and all later versions

     | 6
     | v10.20.0+, v12.17.0+, 14.0.0 and all later versions

     | 5
     | v10.17.0+, v12.11.0+, 13.0.0 and all later versions

     | 4
     | v10.16.0+, v11.8.0+, 12.0.0 and all later versions

     | 3
     | v6.14.2*, 8.11.2+, v9.11.0+*, 10.0.0 and all later versions

     | 2
     | v8.10.0+*, v9.3.0+*, 10.0.0 and all later versions

     | 1
     | v8.6.0+**, v9.0.0+*, 10.0.0 and all later versions

\* Node-API was experimental.

\*\* Node.js 8.0.0 included Node-API as experimental. It was released as
Node-API version 1 but continued to evolve until Node.js 8.6.0. The API is
different in versions prior to Node.js 8.6.0. We recommend Node-API version 3 or
later.

Each API documented for Node-API will have a header named `added in:`, and APIs
which are stable will have the additional header `Node-API version:`.
APIs are directly usable when using a Node.js version which supports
the Node-API version shown in `Node-API version:` or higher.
When using a Node.js version that does not support the
`Node-API version:` listed or if there is no `Node-API version:` listed,
then the API will only be available if
`#define NAPI_EXPERIMENTAL` precedes the inclusion of `node_api.h`
or `js_native_api.h`. If an API appears not to be available on
a version of Node.js which is later than the one shown in `added in:` then
this is most likely the reason for the apparent absence.

The Node-APIs associated strictly with accessing ECMAScript features from native
code can be found separately in `js_native_api.h` and `js_native_api_types.h`.
The APIs defined in these headers are included in `node_api.h` and
`node_api_types.h`. The headers are structured in this way in order to allow
implementations of Node-API outside of Node.js. For those implementations the
Node.js specific APIs may not be applicable.

The Node.js-specific parts of an addon can be separated from the code that
exposes the actual functionality to the JavaScript environment so that the
latter may be used with multiple implementations of Node-API. In the example
below, `addon.c` and `addon.h` refer only to `js_native_api.h`. This ensures
that `addon.c` can be reused to compile against either the Node.js
implementation of Node-API or any implementation of Node-API outside of Node.js.

`addon_node.c` is a separate file that contains the Node.js specific entry point
to the addon and which instantiates the addon by calling into `addon.c` when the
addon is loaded into a Node.js environment.

```c
// addon.h
#ifndef _ADDON_H_
#define _ADDON_H_
#include <js_native_api.h>
napi_value create_addon(napi_env env);
#endif  // _ADDON_H_
```

```c
// addon.c
#include "addon.h"

#define NODE_API_CALL(env, call)                                  \
  do {                                                            \
    napi_status status = (call);                                  \
    if (status != napi_ok) {                                      \
      const napi_extended_error_info* error_info = NULL;          \
      napi_get_last_error_info((env), &error_info);               \
      const char* err_message = error_info->error_message;        \
      bool is_pending;                                            \
      napi_is_exception_pending((env), &is_pending);              \
      /* If an exception is already pending, don't rethrow it */  \
      if (!is_pending) {                                          \
        const char* message = (err_message == NULL)               \
            ? "empty error message"                               \
            : err_message;                                        \
        napi_throw_error((env), NULL, message);                   \
      }                                                           \
      return NULL;                                                \
    }                                                             \
  } while(0)

static napi_value
DoSomethingUseful(napi_env env, napi_callback_info info) {
  // Do something useful.
  return NULL;
}

napi_value create_addon(napi_env env) {
  napi_value result;
  NODE_API_CALL(env, napi_create_object(env, &result));

  napi_value exported_function;
  NODE_API_CALL(env, napi_create_function(env,
                                          "doSomethingUseful",
                                          NAPI_AUTO_LENGTH,
                                          DoSomethingUseful,
                                          NULL,
                                          &exported_function));

  NODE_API_CALL(env, napi_set_named_property(env,
                                             result,
                                             "doSomethingUseful",
                                             exported_function));

  return result;
}
```

```c
// addon_node.c
#include <node_api.h>
#include "addon.h"

NAPI_MODULE_INIT(/* napi_env env, napi_value exports */) {
  // This function body is expected to return a `napi_value`.
  // The variables `napi_env env` and `napi_value exports` may be used within
  // the body, as they are provided by the definition of `NAPI_MODULE_INIT()`.
  return create_addon(env);
}
```

## Environment life cycle APIs

Section Agents of the ECMAScript Language Specification defines the concept
of an "Agent" as a self-contained environment in which JavaScript code runs.
Multiple such Agents may be started and terminated either concurrently or in
sequence by the process.

A Node.js environment corresponds to an ECMAScript Agent. In the main process,
an environment is created at startup, and additional environments can be created
on separate threads to serve as worker threads. When Node.js is embedded in
another application, the main thread of the application may also construct and
destroy a Node.js environment multiple times during the life cycle of the
application process such that each Node.js environment created by the
application may, in turn, during its life cycle create and destroy additional
environments as worker threads.

From the perspective of a native addon this means that the bindings it provides
may be called multiple times, from multiple contexts, and even concurrently from
multiple threads.

Native addons may need to allocate global state which they use during
their life cycle of an Node.js environment such that the state can be
unique to each instance of the addon.

To this end, Node-API provides a way to associate data such that its life cycle
is tied to the life cycle of a Node.js environment.

### `napi_set_instance_data`

```c
napi_status napi_set_instance_data(node_api_basic_env env,
                                   void* data,
                                   napi_finalize finalize_cb,
                                   void* finalize_hint);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] data`: The data item to make available to bindings of this instance.
* `[in] finalize_cb`: The function to call when the environment is being torn
  down. The function receives `data` so that it might free it.
  `napi_finalize` provides more details.
* `[in] finalize_hint`: Optional hint to pass to the finalize callback during
  collection.

Returns `napi_ok` if the API succeeded.

This API associates `data` with the currently running Node.js environment. `data`
can later be retrieved using `napi_get_instance_data()`. Any existing data
associated with the currently running Node.js environment which was set by means
of a previous call to `napi_set_instance_data()` will be overwritten. If a
`finalize_cb` was provided by the previous call, it will not be called.

### `napi_get_instance_data`

```c
napi_status napi_get_instance_data(node_api_basic_env env,
                                   void** data);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[out] data`: The data item that was previously associated with the currently
  running Node.js environment by a call to `napi_set_instance_data()`.

Returns `napi_ok` if the API succeeded.

This API retrieves data that was previously associated with the currently
running Node.js environment via `napi_set_instance_data()`. If no data is set,
the call will succeed and `data` will be set to `NULL`.
