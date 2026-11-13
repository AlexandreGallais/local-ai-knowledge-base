---
title: "Node-API (part 13 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 13 of 23)

### Functions to convert from Node-API to C types

#### `napi_get_array_length`

```c
napi_status napi_get_array_length(napi_env env,
                                  napi_value value,
                                  uint32_t* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: `napi_value` representing the JavaScript `Array` whose length is
  being queried.
* `[out] result`: `uint32` representing length of the array.

Returns `napi_ok` if the API succeeded.

This API returns the length of an array.

`Array` length is described in Section Array instance length of the ECMAScript Language
Specification.

#### `napi_get_arraybuffer_info`

```c
napi_status napi_get_arraybuffer_info(napi_env env,
                                      napi_value arraybuffer,
                                      void** data,
                                      size_t* byte_length)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] arraybuffer`: `napi_value` representing the `ArrayBuffer` or `SharedArrayBuffer` being queried.
* `[out] data`: The underlying data buffer of the `ArrayBuffer` or `SharedArrayBuffer`
  is `0`, this may be `NULL` or any other pointer value.
* `[out] byte_length`: Length in bytes of the underlying data buffer.

Returns `napi_ok` if the API succeeded.

This API is used to retrieve the underlying data buffer of an `ArrayBuffer` or `SharedArrayBuffer` and its length.

_WARNING_: Use caution while using this API. The lifetime of the underlying data
buffer is managed by the `ArrayBuffer` or `SharedArrayBuffer` even after it's returned. A
possible safe way to use this API is in conjunction with
`napi_create_reference`, which can be used to guarantee control over the
lifetime of the `ArrayBuffer` or `SharedArrayBuffer`. It's also safe to use the returned data buffer
within the same callback as long as there are no calls to other APIs that might
trigger a GC.

#### `napi_get_buffer_info`

```c
napi_status napi_get_buffer_info(napi_env env,
                                 napi_value value,
                                 void** data,
                                 size_t* length)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: `napi_value` representing the `node::Buffer` or `Uint8Array`
  being queried.
* `[out] data`: The underlying data buffer of the `node::Buffer` or
  `Uint8Array`. If length is `0`, this may be `NULL` or any other pointer value.
* `[out] length`: Length in bytes of the underlying data buffer.

Returns `napi_ok` if the API succeeded.

This method returns the identical `data` and `byte_length` as
`napi_get_typedarray_info`. And `napi_get_typedarray_info` accepts a
`node::Buffer` (a Uint8Array) as the value too.

This API is used to retrieve the underlying data buffer of a `node::Buffer`
and its length.

_Warning_: Use caution while using this API since the underlying data buffer's
lifetime is not guaranteed if it's managed by the VM.

#### `napi_get_prototype`

```c
napi_status napi_get_prototype(napi_env env,
                               napi_value object,
                               napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] object`: `napi_value` representing JavaScript `Object` whose prototype
  to return. This returns the equivalent of `Object.getPrototypeOf` (which is
  not the same as the function's `prototype` property).
* `[out] result`: `napi_value` representing prototype of the given object.

Returns `napi_ok` if the API succeeded.

#### `napi_get_typedarray_info`

```c
napi_status napi_get_typedarray_info(napi_env env,
                                     napi_value typedarray,
                                     napi_typedarray_type* type,
                                     size_t* length,
                                     void** data,
                                     napi_value* arraybuffer,
                                     size_t* byte_offset)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] typedarray`: `napi_value` representing the `TypedArray` whose
  properties to query.
* `[out] type`: Scalar datatype of the elements within the `TypedArray`.
* `[out] length`: The number of elements in the `TypedArray`.
* `[out] data`: The data buffer underlying the `TypedArray` adjusted by
  the `byte_offset` value so that it points to the first element in the
  `TypedArray`. If the length of the array is `0`, this may be `NULL` or
  any other pointer value.
* `[out] arraybuffer`: The `ArrayBuffer` or `SharedArrayBuffer` underlying the
  `TypedArray`.
* `[out] byte_offset`: The byte offset within the underlying native array
  at which the first element of the arrays is located. The value for the data
  parameter has already been adjusted so that data points to the first element
  in the array. Therefore, the first byte of the native array would be at
  `data - byte_offset`.

Returns `napi_ok` if the API succeeded.

This API returns various properties of a typed array.

Any of the out parameters may be `NULL` if that property is unneeded.

_Warning_: Use caution while using this API since the underlying data buffer
is managed by the VM.

#### `napi_get_dataview_info`

```c
napi_status napi_get_dataview_info(napi_env env,
                                   napi_value dataview,
                                   size_t* byte_length,
                                   void** data,
                                   napi_value* arraybuffer,
                                   size_t* byte_offset)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] dataview`: `napi_value` representing the `DataView` whose
  properties to query.
* `[out] byte_length`: Number of bytes in the `DataView`.
* `[out] data`: The data buffer underlying the `DataView`.
  If byte\_length is `0`, this may be `NULL` or any other pointer value.
* `[out] arraybuffer`: `ArrayBuffer` underlying the `DataView`.
* `[out] byte_offset`: The byte offset within the data buffer from which
  to start projecting the `DataView`.

Returns `napi_ok` if the API succeeded.

Any of the out parameters may be `NULL` if that property is unneeded.

This API returns various properties of a `DataView`.

#### `napi_get_date_value`

```c
napi_status napi_get_date_value(napi_env env,
                                napi_value value,
                                double* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: `napi_value` representing a JavaScript `Date`.
* `[out] result`: Time value as a `double` represented as milliseconds since
  midnight at the beginning of 01 January, 1970 UTC.

This API does not observe leap seconds; they are ignored, as
ECMAScript aligns with POSIX time specification.

Returns `napi_ok` if the API succeeded. If a non-date `napi_value` is passed
in it returns `napi_date_expected`.

This API returns the C double primitive of time value for the given JavaScript
`Date`.

#### `napi_get_value_bool`

```c
napi_status napi_get_value_bool(napi_env env, napi_value value, bool* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: `napi_value` representing JavaScript `Boolean`.
* `[out] result`: C boolean primitive equivalent of the given JavaScript
  `Boolean`.

Returns `napi_ok` if the API succeeded. If a non-boolean `napi_value` is
passed in it returns `napi_boolean_expected`.

This API returns the C boolean primitive equivalent of the given JavaScript
`Boolean`.

#### `napi_get_value_double`

```c
napi_status napi_get_value_double(napi_env env,
                                  napi_value value,
                                  double* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: `napi_value` representing JavaScript `number`.
* `[out] result`: C double primitive equivalent of the given JavaScript
  `number`.

Returns `napi_ok` if the API succeeded. If a non-number `napi_value` is passed
in it returns `napi_number_expected`.

This API returns the C double primitive equivalent of the given JavaScript
`number`.

#### `napi_get_value_bigint_int64`

```c
napi_status napi_get_value_bigint_int64(napi_env env,
                                        napi_value value,
                                        int64_t* result,
                                        bool* lossless);
```

* `[in] env`: The environment that the API is invoked under
* `[in] value`: `napi_value` representing JavaScript `BigInt`.
* `[out] result`: C `int64_t` primitive equivalent of the given JavaScript
  `BigInt`.
* `[out] lossless`: Indicates whether the `BigInt` value was converted
  losslessly.

Returns `napi_ok` if the API succeeded. If a non-`BigInt` is passed in it
returns `napi_bigint_expected`.

This API returns the C `int64_t` primitive equivalent of the given JavaScript
`BigInt`. If needed it will truncate the value, setting `lossless` to `false`.

#### `napi_get_value_bigint_uint64`

```c
napi_status napi_get_value_bigint_uint64(napi_env env,
                                        napi_value value,
                                        uint64_t* result,
                                        bool* lossless);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: `napi_value` representing JavaScript `BigInt`.
* `[out] result`: C `uint64_t` primitive equivalent of the given JavaScript
  `BigInt`.
* `[out] lossless`: Indicates whether the `BigInt` value was converted
  losslessly.

Returns `napi_ok` if the API succeeded. If a non-`BigInt` is passed in it
returns `napi_bigint_expected`.

This API returns the C `uint64_t` primitive equivalent of the given JavaScript
`BigInt`. If needed it will truncate the value, setting `lossless` to `false`.

#### `napi_get_value_bigint_words`

```c
napi_status napi_get_value_bigint_words(napi_env env,
                                        napi_value value,
                                        int* sign_bit,
                                        size_t* word_count,
                                        uint64_t* words);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: `napi_value` representing JavaScript `BigInt`.
* `[out] sign_bit`: Integer representing if the JavaScript `BigInt` is positive
  or negative.
* `[in/out] word_count`: Must be initialized to the length of the `words`
  array. Upon return, it will be set to the actual number of words that
  would be needed to store this `BigInt`.
* `[out] words`: Pointer to a pre-allocated 64-bit word array.

Returns `napi_ok` if the API succeeded.

This API converts a single `BigInt` value into a sign bit, 64-bit little-endian
array, and the number of elements in the array. `sign_bit` and `words` may be
both set to `NULL`, in order to get only `word_count`.

#### `napi_get_value_external`

```c
napi_status napi_get_value_external(napi_env env,
                                    napi_value value,
                                    void** result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: `napi_value` representing JavaScript external value.
* `[out] result`: Pointer to the data wrapped by the JavaScript external value.

Returns `napi_ok` if the API succeeded. If a non-external `napi_value` is
passed in it returns `napi_invalid_arg`.

This API retrieves the external data pointer that was previously passed to
`napi_create_external()`.

#### `napi_get_value_int32`

```c
napi_status napi_get_value_int32(napi_env env,
                                 napi_value value,
                                 int32_t* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: `napi_value` representing JavaScript `number`.
* `[out] result`: C `int32` primitive equivalent of the given JavaScript
  `number`.

Returns `napi_ok` if the API succeeded. If a non-number `napi_value`
is passed in `napi_number_expected`.

This API returns the C `int32` primitive equivalent
of the given JavaScript `number`.

If the number exceeds the range of the 32 bit integer, then the result is
truncated to the equivalent of the bottom 32 bits. This can result in a large
positive number becoming a negative number if the value is > 231 - 1.

Non-finite number values (`NaN`, `+Infinity`, or `-Infinity`) set the
result to zero.

#### `napi_get_value_int64`

```c
napi_status napi_get_value_int64(napi_env env,
                                 napi_value value,
                                 int64_t* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: `napi_value` representing JavaScript `number`.
* `[out] result`: C `int64` primitive equivalent of the given JavaScript
  `number`.

Returns `napi_ok` if the API succeeded. If a non-number `napi_value`
is passed in it returns `napi_number_expected`.

This API returns the C `int64` primitive equivalent of the given JavaScript
`number`.

`number` values outside the range of `Number.MIN_SAFE_INTEGER`
`-(2**53 - 1)` - `Number.MAX_SAFE_INTEGER` `(2**53 - 1)` will lose
precision.

Non-finite number values (`NaN`, `+Infinity`, or `-Infinity`) set the
result to zero.

#### `napi_get_value_string_latin1`

```c
napi_status napi_get_value_string_latin1(napi_env env,
                                         napi_value value,
                                         char* buf,
                                         size_t bufsize,
                                         size_t* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: `napi_value` representing JavaScript string.
* `[in] buf`: Buffer to write the ISO-8859-1-encoded string into. If `NULL` is
  passed in, the length of the string in bytes and excluding the null terminator
  is returned in `result`.
* `[in] bufsize`: Size of the destination buffer. When this value is
  insufficient, the returned string is truncated and null-terminated.
  If this value is zero, then the string is not returned and no changes are done
  to the buffer.
* `[out] result`: Number of bytes copied into the buffer, excluding the null
  terminator.

Returns `napi_ok` if the API succeeded. If a non-`string` `napi_value`
is passed in it returns `napi_string_expected`.

This API returns the ISO-8859-1-encoded string corresponding the value passed
in.

#### `napi_get_value_string_utf8`

```c
napi_status napi_get_value_string_utf8(napi_env env,
                                       napi_value value,
                                       char* buf,
                                       size_t bufsize,
                                       size_t* result)
```
