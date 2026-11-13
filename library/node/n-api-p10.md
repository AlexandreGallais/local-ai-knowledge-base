---
title: "Node-API (part 10 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 10 of 23)

```c
napi_status node_api_symbol_for(napi_env env,
                                const char* utf8description,
                                size_t length,
                                napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] utf8description`: UTF-8 C string representing the text to be used as the
  description for the symbol.
* `[in] length`: The length of the description string in bytes, or
  `NAPI_AUTO_LENGTH` if it is null-terminated.
* `[out] result`: A `napi_value` representing a JavaScript `symbol`.

Returns `napi_ok` if the API succeeded.

This API searches in the global registry for an existing symbol with the given
description. If the symbol already exists it will be returned, otherwise a new
symbol will be created in the registry.

The JavaScript `symbol` type is described in Section symbol type of the ECMAScript
Language Specification.

#### `napi_create_typedarray`

```c
napi_status napi_create_typedarray(napi_env env,
                                   napi_typedarray_type type,
                                   size_t length,
                                   napi_value arraybuffer,
                                   size_t byte_offset,
                                   napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] type`: Scalar datatype of the elements within the `TypedArray`.
* `[in] length`: Number of elements in the `TypedArray`.
* `[in] arraybuffer`: `ArrayBuffer` or `SharedArrayBuffer` underlying the
  typed array.
* `[in] byte_offset`: The byte offset within the `ArrayBuffer` or
  `SharedArrayBuffer` from which to start projecting the `TypedArray`.
* `[out] result`: A `napi_value` representing a JavaScript `TypedArray`.

Returns `napi_ok` if the API succeeded.

This API creates a JavaScript `TypedArray` object over an existing
`ArrayBuffer` or `SharedArrayBuffer`. `TypedArray` objects provide an
array-like view over an underlying data buffer where each element has the same
underlying binary scalar datatype.

It is required that `(length * size_of_element) + byte_offset` is less than or
equal to the size in bytes of the `ArrayBuffer` or `SharedArrayBuffer` passed
in. If not, a `RangeError` exception is raised.

For element sizes greater than 1, `byte_offset` is required to be a multiple
of the element size. If not, a `RangeError` exception is raised.

JavaScript `TypedArray` objects are described in
Section TypedArray objects of the ECMAScript Language Specification.

#### `node_api_create_buffer_from_arraybuffer`

```c
napi_status NAPI_CDECL node_api_create_buffer_from_arraybuffer(napi_env env,
                                                              napi_value arraybuffer,
                                                              size_t byte_offset,
                                                              size_t byte_length,
                                                              napi_value* result)
```

* **`[in] env`**: The environment that the API is invoked under.
* **`[in] arraybuffer`**: The `ArrayBuffer` from which the buffer will be created.
* **`[in] byte_offset`**: The byte offset within the `ArrayBuffer` from which to start creating the buffer.
* **`[in] byte_length`**: The length in bytes of the buffer to be created from the `ArrayBuffer`.
* **`[out] result`**: A `napi_value` representing the created JavaScript `Buffer` object.

Returns `napi_ok` if the API succeeded.

This API creates a JavaScript `Buffer` object from an existing `ArrayBuffer`.
The `Buffer` object is a Node.js-specific class that provides a way to work with binary data directly in JavaScript.

The byte range `[byte_offset, byte_offset + byte_length)`
must be within the bounds of the `ArrayBuffer`. If `byte_offset + byte_length`
exceeds the size of the `ArrayBuffer`, a `RangeError` exception is raised.

#### `napi_create_dataview`

```c
napi_status napi_create_dataview(napi_env env,
                                 size_t byte_length,
                                 napi_value arraybuffer,
                                 size_t byte_offset,
                                 napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] length`: Number of elements in the `DataView`.
* `[in] arraybuffer`: `ArrayBuffer` or `SharedArrayBuffer` underlying the
  `DataView`.
* `[in] byte_offset`: The byte offset within the `ArrayBuffer` from which to
  start projecting the `DataView`.
* `[out] result`: A `napi_value` representing a JavaScript `DataView`.

Returns `napi_ok` if the API succeeded.

This API creates a JavaScript `DataView` object over an existing `ArrayBuffer`
or `SharedArrayBuffer`. `DataView` objects provide an array-like view over an
underlying data buffer, but one which allows items of different size and type in
the `ArrayBuffer` or `SharedArrayBuffer`.

It is required that `byte_length + byte_offset` is less than or equal to the
size in bytes of the array passed in. If not, a `RangeError` exception is
raised.

JavaScript `DataView` objects are described in
Section DataView objects of the ECMAScript Language Specification.
