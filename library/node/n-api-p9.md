---
title: "Node-API (part 9 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 9 of 23)

### Object creation functions

#### `napi_create_array`

```c
napi_status napi_create_array(napi_env env, napi_value* result)
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[out] result`: A `napi_value` representing a JavaScript `Array`.

Returns `napi_ok` if the API succeeded.

This API returns a Node-API value corresponding to a JavaScript `Array` type.
JavaScript arrays are described in
Section Array objects of the ECMAScript Language Specification.

#### `napi_create_array_with_length`

```c
napi_status napi_create_array_with_length(napi_env env,
                                          size_t length,
                                          napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] length`: The initial length of the `Array`.
* `[out] result`: A `napi_value` representing a JavaScript `Array`.

Returns `napi_ok` if the API succeeded.

This API returns a Node-API value corresponding to a JavaScript `Array` type.
The `Array`'s length property is set to the passed-in length parameter.
However, the underlying buffer is not guaranteed to be pre-allocated by the VM
when the array is created. That behavior is left to the underlying VM
implementation. If the buffer must be a contiguous block of memory that can be
directly read and/or written via C, consider using
`napi_create_external_arraybuffer`.

JavaScript arrays are described in
Section Array objects of the ECMAScript Language Specification.

#### `napi_create_arraybuffer`

```c
napi_status napi_create_arraybuffer(napi_env env,
                                    size_t byte_length,
                                    void** data,
                                    napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] length`: The length in bytes of the array buffer to create.
* `[out] data`: Pointer to the underlying byte buffer of the `ArrayBuffer`.
  `data` can optionally be ignored by passing `NULL`.
* `[out] result`: A `napi_value` representing a JavaScript `ArrayBuffer`.

Returns `napi_ok` if the API succeeded.

This API returns a Node-API value corresponding to a JavaScript `ArrayBuffer`.
`ArrayBuffer`s are used to represent fixed-length binary data buffers. They are
normally used as a backing-buffer for `TypedArray` objects.
The `ArrayBuffer` allocated will have an underlying byte buffer whose size is
determined by the `length` parameter that's passed in.
The underlying buffer is optionally returned back to the caller in case the
caller wants to directly manipulate the buffer. This buffer can only be
written to directly from native code. To write to this buffer from JavaScript,
a typed array or `DataView` object would need to be created.

JavaScript `ArrayBuffer` objects are described in
Section ArrayBuffer objects of the ECMAScript Language Specification.

#### `napi_create_buffer`

```c
napi_status napi_create_buffer(napi_env env,
                               size_t size,
                               void** data,
                               napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] size`: Size in bytes of the underlying buffer.
* `[out] data`: Raw pointer to the underlying buffer.
  `data` can optionally be ignored by passing `NULL`.
* `[out] result`: A `napi_value` representing a `node::Buffer`.

Returns `napi_ok` if the API succeeded.

This API allocates a `node::Buffer` object. While this is still a
fully-supported data structure, in most cases using a `TypedArray` will suffice.

#### `napi_create_buffer_copy`

```c
napi_status napi_create_buffer_copy(napi_env env,
                                    size_t length,
                                    const void* data,
                                    void** result_data,
                                    napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] size`: Size in bytes of the input buffer (should be the same as the size
  of the new buffer).
* `[in] data`: Raw pointer to the underlying buffer to copy from.
* `[out] result_data`: Pointer to the new `Buffer`'s underlying data buffer.
  `result_data` can optionally be ignored by passing `NULL`.
* `[out] result`: A `napi_value` representing a `node::Buffer`.

Returns `napi_ok` if the API succeeded.

This API allocates a `node::Buffer` object and initializes it with data copied
from the passed-in buffer. While this is still a fully-supported data
structure, in most cases using a `TypedArray` will suffice.

#### `napi_create_date`

```c
napi_status napi_create_date(napi_env env,
                             double time,
                             napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] time`: ECMAScript time value in milliseconds since 01 January, 1970 UTC.
* `[out] result`: A `napi_value` representing a JavaScript `Date`.

Returns `napi_ok` if the API succeeded.

This API does not observe leap seconds; they are ignored, as
ECMAScript aligns with POSIX time specification.

This API allocates a JavaScript `Date` object.

JavaScript `Date` objects are described in
Section Date objects of the ECMAScript Language Specification.

#### `napi_create_external`

```c
napi_status napi_create_external(napi_env env,
                                 void* data,
                                 napi_finalize finalize_cb,
                                 void* finalize_hint,
                                 napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] data`: Raw pointer to the external data.
* `[in] finalize_cb`: Optional callback to call when the external value is being
  collected. `napi_finalize` provides more details.
* `[in] finalize_hint`: Optional hint to pass to the finalize callback during
  collection.
* `[out] result`: A `napi_value` representing an external value.

Returns `napi_ok` if the API succeeded.

This API allocates a JavaScript value with external data attached to it. This
is used to pass external data through JavaScript code, so it can be retrieved
later by native code using `napi_get_value_external`.

The API adds a `napi_finalize` callback which will be called when the JavaScript
object just created has been garbage collected.

The created value is not an object, and therefore does not support additional
properties. It is considered a distinct value type: calling `napi_typeof()` with
an external value yields `napi_external`.

#### `napi_create_external_arraybuffer`

```c
napi_status
napi_create_external_arraybuffer(napi_env env,
                                 void* external_data,
                                 size_t byte_length,
                                 napi_finalize finalize_cb,
                                 void* finalize_hint,
                                 napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] external_data`: Pointer to the underlying byte buffer of the
  `ArrayBuffer`.
* `[in] byte_length`: The length in bytes of the underlying buffer.
* `[in] finalize_cb`: Optional callback to call when the `ArrayBuffer` is being
  collected. `napi_finalize` provides more details.
* `[in] finalize_hint`: Optional hint to pass to the finalize callback during
  collection.
* `[out] result`: A `napi_value` representing a JavaScript `ArrayBuffer`.

Returns `napi_ok` if the API succeeded.

**Some runtimes other than Node.js have dropped support for external buffers**.
On runtimes other than Node.js this method may return
`napi_no_external_buffers_allowed` to indicate that external
buffers are not supported. One such runtime is Electron as
described in this issue
electron/issues/35801.

In order to maintain broadest compatibility with all runtimes
you may define `NODE_API_NO_EXTERNAL_BUFFERS_ALLOWED` in your addon before
includes for the node-api headers. Doing so will hide the 2 functions
that create external buffers. This will ensure a compilation error
occurs if you accidentally use one of these methods.

This API returns a Node-API value corresponding to a JavaScript `ArrayBuffer`.
The underlying byte buffer of the `ArrayBuffer` is externally allocated and
managed. The caller must ensure that the byte buffer remains valid until the
finalize callback is called.

The API adds a `napi_finalize` callback which will be called when the JavaScript
object just created has been garbage collected.

JavaScript `ArrayBuffer`s are described in
Section ArrayBuffer objects of the ECMAScript Language Specification.

#### `node_api_create_external_sharedarraybuffer`

```c
napi_status
node_api_create_external_sharedarraybuffer(napi_env env,
                                           void* external_data,
                                           size_t byte_length,
                                           node_api_noenv_finalize finalize_cb,
                                           void* finalize_hint,
                                           napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] external_data`: Pointer to the underlying byte buffer of the
  `SharedArrayBuffer`.
* `[in] byte_length`: The length in bytes of the underlying buffer.
* `[in] finalize_cb`: Optional callback to call when the `SharedArrayBuffer` is
  being collected. Called on an arbitrary thread. Because a `SharedArrayBuffer`
  can outlive the environment it's created in, the callback does not receive a
  reference to `env`.
* `[in] finalize_hint`: Optional hint to pass to the finalize callback during
  collection.
* `[out] result`: A `napi_value` representing a JavaScript `SharedArrayBuffer`.

Returns `napi_ok` if the API succeeded.

Create a `SharedArrayBuffer` with externally managed memory.

See the entry on `napi_create_external_arraybuffer` for runtime
compatibility.

#### `napi_create_external_buffer`

```c
napi_status napi_create_external_buffer(napi_env env,
                                        size_t length,
                                        void* data,
                                        napi_finalize finalize_cb,
                                        void* finalize_hint,
                                        napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] length`: Size in bytes of the input buffer (should be the same as the
  size of the new buffer).
* `[in] data`: Raw pointer to the underlying buffer to expose to JavaScript.
* `[in] finalize_cb`: Optional callback to call when the `ArrayBuffer` is being
  collected. `napi_finalize` provides more details.
* `[in] finalize_hint`: Optional hint to pass to the finalize callback during
  collection.
* `[out] result`: A `napi_value` representing a `node::Buffer`.

Returns `napi_ok` if the API succeeded.

**Some runtimes other than Node.js have dropped support for external buffers**.
On runtimes other than Node.js this method may return
`napi_no_external_buffers_allowed` to indicate that external
buffers are not supported. One such runtime is Electron as
described in this issue
electron/issues/35801.

In order to maintain broadest compatibility with all runtimes
you may define `NODE_API_NO_EXTERNAL_BUFFERS_ALLOWED` in your addon before
includes for the node-api headers. Doing so will hide the 2 functions
that create external buffers. This will ensure a compilation error
occurs if you accidentally use one of these methods.

This API allocates a `node::Buffer` object and initializes it with data
backed by the passed in buffer. While this is still a fully-supported data
structure, in most cases using a `TypedArray` will suffice.

The API adds a `napi_finalize` callback which will be called when the JavaScript
object just created has been garbage collected.

For Node.js >=4 `Buffers` are `Uint8Array`s.

#### `napi_create_object`

```c
napi_status napi_create_object(napi_env env, napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[out] result`: A `napi_value` representing a JavaScript `Object`.

Returns `napi_ok` if the API succeeded.

This API allocates a default JavaScript `Object`.
It is the equivalent of doing `new Object()` in JavaScript.

The JavaScript `Object` type is described in Section object type of the
ECMAScript Language Specification.

#### `node_api_create_object_with_properties`

> Stability: 1 - Experimental

```cpp
napi_status node_api_create_object_with_properties(napi_env env,
                                                   napi_value prototype_or_null,
                                                   const napi_value* property_names,
                                                   const napi_value* property_values,
                                                   size_t property_count,
                                                   napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] prototype_or_null`: The prototype object for the new object. Can be a
  `napi_value` representing a JavaScript object to use as the prototype, a
  `napi_value` representing JavaScript `null`, or a `nullptr` that will be converted to `null`.
* `[in] property_names`: Array of `napi_value` representing the property names.
* `[in] property_values`: Array of `napi_value` representing the property values.
* `[in] property_count`: Number of properties in the arrays.
* `[out] result`: A `napi_value` representing a JavaScript `Object`.

Returns `napi_ok` if the API succeeded.

This API creates a JavaScript `Object` with the specified prototype and
properties. This is more efficient than calling `napi_create_object` followed
by multiple `napi_set_property` calls, as it can create the object with all
properties atomically, avoiding potential V8 map transitions.

The arrays `property_names` and `property_values` must have the same length
specified by `property_count`. The properties are added to the object in the
order they appear in the arrays.

#### `napi_create_symbol`

```c
napi_status napi_create_symbol(napi_env env,
                               napi_value description,
                               napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] description`: Optional `napi_value` which refers to a JavaScript
  `string` to be set as the description for the symbol.
* `[out] result`: A `napi_value` representing a JavaScript `symbol`.

Returns `napi_ok` if the API succeeded.

This API creates a JavaScript `symbol` value from a UTF8-encoded C string.

The JavaScript `symbol` type is described in Section symbol type
of the ECMAScript Language Specification.

#### `node_api_symbol_for`

```c
napi_status node_api_symbol_for(napi_env env,
                                const char* utf8description,
                                size_t length,
                                napi_value* result)
```
