---
title: "Node-API (part 11 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 11 of 23)

### Functions to convert from C types to Node-API

#### `napi_create_int32`

```c
napi_status napi_create_int32(napi_env env, int32_t value, napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: Integer value to be represented in JavaScript.
* `[out] result`: A `napi_value` representing a JavaScript `number`.

Returns `napi_ok` if the API succeeded.

This API is used to convert from the C `int32_t` type to the JavaScript
`number` type.

The JavaScript `number` type is described in
Section number type of the ECMAScript Language Specification.

#### `napi_create_uint32`

```c
napi_status napi_create_uint32(napi_env env, uint32_t value, napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: Unsigned integer value to be represented in JavaScript.
* `[out] result`: A `napi_value` representing a JavaScript `number`.

Returns `napi_ok` if the API succeeded.

This API is used to convert from the C `uint32_t` type to the JavaScript
`number` type.

The JavaScript `number` type is described in
Section number type of the ECMAScript Language Specification.

#### `napi_create_int64`

```c
napi_status napi_create_int64(napi_env env, int64_t value, napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: Integer value to be represented in JavaScript.
* `[out] result`: A `napi_value` representing a JavaScript `number`.

Returns `napi_ok` if the API succeeded.

This API is used to convert from the C `int64_t` type to the JavaScript
`number` type.

The JavaScript `number` type is described in Section number type
of the ECMAScript Language Specification. Note the complete range of `int64_t`
cannot be represented with full precision in JavaScript. Integer values
outside the range of `Number.MIN_SAFE_INTEGER` `-(2**53 - 1)` -
`Number.MAX_SAFE_INTEGER` `(2**53 - 1)` will lose precision.

#### `napi_create_double`

```c
napi_status napi_create_double(napi_env env, double value, napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: Double-precision value to be represented in JavaScript.
* `[out] result`: A `napi_value` representing a JavaScript `number`.

Returns `napi_ok` if the API succeeded.

This API is used to convert from the C `double` type to the JavaScript
`number` type.

The JavaScript `number` type is described in
Section number type of the ECMAScript Language Specification.

#### `napi_create_bigint_int64`

```c
napi_status napi_create_bigint_int64(napi_env env,
                                     int64_t value,
                                     napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: Integer value to be represented in JavaScript.
* `[out] result`: A `napi_value` representing a JavaScript `BigInt`.

Returns `napi_ok` if the API succeeded.

This API converts the C `int64_t` type to the JavaScript `BigInt` type.

#### `napi_create_bigint_uint64`

```c
napi_status napi_create_bigint_uint64(napi_env env,
                                      uint64_t value,
                                      napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: Unsigned integer value to be represented in JavaScript.
* `[out] result`: A `napi_value` representing a JavaScript `BigInt`.

Returns `napi_ok` if the API succeeded.

This API converts the C `uint64_t` type to the JavaScript `BigInt` type.

#### `napi_create_bigint_words`

```c
napi_status napi_create_bigint_words(napi_env env,
                                     int sign_bit,
                                     size_t word_count,
                                     const uint64_t* words,
                                     napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] sign_bit`: Determines if the resulting `BigInt` will be positive or
  negative.
* `[in] word_count`: The length of the `words` array.
* `[in] words`: An array of `uint64_t` little-endian 64-bit words.
* `[out] result`: A `napi_value` representing a JavaScript `BigInt`.

Returns `napi_ok` if the API succeeded.

This API converts an array of unsigned 64-bit words into a single `BigInt`
value.

The resulting `BigInt` is calculated as: (–1)`sign_bit` (`words[0]`
× (264)0 + `words[1]` × (264)1 + …)

#### `napi_create_string_latin1`

```c
napi_status napi_create_string_latin1(napi_env env,
                                      const char* str,
                                      size_t length,
                                      napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] str`: Character buffer representing an ISO-8859-1-encoded string.
* `[in] length`: The length of the string in bytes, or `NAPI_AUTO_LENGTH` if it
  is null-terminated.
* `[out] result`: A `napi_value` representing a JavaScript `string`.

Returns `napi_ok` if the API succeeded.

This API creates a JavaScript `string` value from an ISO-8859-1-encoded C
string. The native string is copied.

The JavaScript `string` type is described in
Section string type of the ECMAScript Language Specification.

#### `node_api_create_external_string_latin1`

```c
napi_status
node_api_create_external_string_latin1(napi_env env,
                                       char* str,
                                       size_t length,
                                       napi_finalize finalize_callback,
                                       void* finalize_hint,
                                       napi_value* result,
                                       bool* copied);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] str`: Character buffer representing an ISO-8859-1-encoded string.
* `[in] length`: The length of the string in bytes, or `NAPI_AUTO_LENGTH` if it
  is null-terminated.
* `[in] finalize_callback`: The function to call when the string is being
  collected. The function will be called with the following parameters:
  * `[in] env`: The environment in which the add-on is running. This value
    may be null if the string is being collected as part of the termination
    of the worker or the main Node.js instance.
  * `[in] data`: This is the value `str` as a `void*` pointer.
  * `[in] finalize_hint`: This is the value `finalize_hint` that was given
    to the API.
    `napi_finalize` provides more details.
    This parameter is optional. Passing a null value means that the add-on
    doesn't need to be notified when the corresponding JavaScript string is
    collected.
* `[in] finalize_hint`: Optional hint to pass to the finalize callback during
  collection.
* `[out] result`: A `napi_value` representing a JavaScript `string`.
* `[out] copied`: Whether the string was copied. If it was, the finalizer will
  already have been invoked to destroy `str`.

Returns `napi_ok` if the API succeeded.

This API creates a JavaScript `string` value from an ISO-8859-1-encoded C
string. The native string may not be copied and must thus exist for the entire
life cycle of the JavaScript value.

The JavaScript `string` type is described in
Section string type of the ECMAScript Language Specification.

#### `napi_create_string_utf16`

```c
napi_status napi_create_string_utf16(napi_env env,
                                     const char16_t* str,
                                     size_t length,
                                     napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] str`: Character buffer representing a UTF16-LE-encoded string.
* `[in] length`: The length of the string in two-byte code units, or
  `NAPI_AUTO_LENGTH` if it is null-terminated.
* `[out] result`: A `napi_value` representing a JavaScript `string`.

Returns `napi_ok` if the API succeeded.

This API creates a JavaScript `string` value from a UTF16-LE-encoded C string.
The native string is copied.

The JavaScript `string` type is described in
Section string type of the ECMAScript Language Specification.

#### `node_api_create_external_string_utf16`

```c
napi_status
node_api_create_external_string_utf16(napi_env env,
                                      char16_t* str,
                                      size_t length,
                                      napi_finalize finalize_callback,
                                      void* finalize_hint,
                                      napi_value* result,
                                      bool* copied);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] str`: Character buffer representing a UTF16-LE-encoded string.
* `[in] length`: The length of the string in two-byte code units, or
  `NAPI_AUTO_LENGTH` if it is null-terminated.
* `[in] finalize_callback`: The function to call when the string is being
  collected. The function will be called with the following parameters:
  * `[in] env`: The environment in which the add-on is running. This value
    may be null if the string is being collected as part of the termination
    of the worker or the main Node.js instance.
  * `[in] data`: This is the value `str` as a `void*` pointer.
  * `[in] finalize_hint`: This is the value `finalize_hint` that was given
    to the API.
    `napi_finalize` provides more details.
    This parameter is optional. Passing a null value means that the add-on
    doesn't need to be notified when the corresponding JavaScript string is
    collected.
* `[in] finalize_hint`: Optional hint to pass to the finalize callback during
  collection.
* `[out] result`: A `napi_value` representing a JavaScript `string`.
* `[out] copied`: Whether the string was copied. If it was, the finalizer will
  already have been invoked to destroy `str`.

Returns `napi_ok` if the API succeeded.

This API creates a JavaScript `string` value from a UTF16-LE-encoded C string.
The native string may not be copied and must thus exist for the entire life
cycle of the JavaScript value.

The JavaScript `string` type is described in
Section string type of the ECMAScript Language Specification.

#### `napi_create_string_utf8`

```c
napi_status napi_create_string_utf8(napi_env env,
                                    const char* str,
                                    size_t length,
                                    napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] str`: Character buffer representing a UTF8-encoded string.
* `[in] length`: The length of the string in bytes, or `NAPI_AUTO_LENGTH` if it
  is null-terminated.
* `[out] result`: A `napi_value` representing a JavaScript `string`.

Returns `napi_ok` if the API succeeded.

This API creates a JavaScript `string` value from a UTF8-encoded C string.
The native string is copied.

The JavaScript `string` type is described in
Section string type of the ECMAScript Language Specification.
