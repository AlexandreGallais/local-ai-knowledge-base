---
title: "Node-API (part 12 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 12 of 23)

### Functions to create optimized property keys

Many JavaScript engines including V8 use internalized strings as keys
to set and get property values. They typically use a hash table to create
and lookup such strings. While it adds some cost per key creation, it improves
the performance after that by enabling comparison of string pointers instead
of the whole strings.

If a new JavaScript string is intended to be used as a property key, then for
some JavaScript engines it will be more efficient to use the functions in this
section. Otherwise, use the `napi_create_string_utf8` or
`node_api_create_external_string_utf8` series functions as there may be
additional overhead in creating/storing strings with the property key
creation methods.

#### `node_api_create_property_key_latin1`

```c
napi_status NAPI_CDECL node_api_create_property_key_latin1(napi_env env,
                                                           const char* str,
                                                           size_t length,
                                                           napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] str`: Character buffer representing an ISO-8859-1-encoded string.
* `[in] length`: The length of the string in bytes, or `NAPI_AUTO_LENGTH` if it
  is null-terminated.
* `[out] result`: A `napi_value` representing an optimized JavaScript `string`
  to be used as a property key for objects.

Returns `napi_ok` if the API succeeded.

This API creates an optimized JavaScript `string` value from
an ISO-8859-1-encoded C string to be used as a property key for objects.
The native string is copied. In contrast with `napi_create_string_latin1`,
subsequent calls to this function with the same `str` pointer may benefit from a speedup
in the creation of the requested `napi_value`, depending on the engine.

The JavaScript `string` type is described in
Section string type of the ECMAScript Language Specification.

#### `node_api_create_property_key_utf16`

```c
napi_status NAPI_CDECL node_api_create_property_key_utf16(napi_env env,
                                                          const char16_t* str,
                                                          size_t length,
                                                          napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] str`: Character buffer representing a UTF16-LE-encoded string.
* `[in] length`: The length of the string in two-byte code units, or
  `NAPI_AUTO_LENGTH` if it is null-terminated.
* `[out] result`: A `napi_value` representing an optimized JavaScript `string`
  to be used as a property key for objects.

Returns `napi_ok` if the API succeeded.

This API creates an optimized JavaScript `string` value from
a UTF16-LE-encoded C string to be used as a property key for objects.
The native string is copied.

The JavaScript `string` type is described in
Section string type of the ECMAScript Language Specification.

#### `node_api_create_property_key_utf8`

```c
napi_status NAPI_CDECL node_api_create_property_key_utf8(napi_env env,
                                                         const char* str,
                                                         size_t length,
                                                         napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] str`: Character buffer representing a UTF8-encoded string.
* `[in] length`: The length of the string in two-byte code units, or
  `NAPI_AUTO_LENGTH` if it is null-terminated.
* `[out] result`: A `napi_value` representing an optimized JavaScript `string`
  to be used as a property key for objects.

Returns `napi_ok` if the API succeeded.

This API creates an optimized JavaScript `string` value from
a UTF8-encoded C string to be used as a property key for objects.
The native string is copied.

The JavaScript `string` type is described in
Section string type of the ECMAScript Language Specification.
