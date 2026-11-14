---
title: "Node-API (part 14 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 14 of 23)

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: `napi_value` representing JavaScript string.
* `[in] buf`: Buffer to write the UTF8-encoded string into. If `NULL` is passed
  in, the length of the string in bytes and excluding the null terminator is
  returned in `result`.
* `[in] bufsize`: Size of the destination buffer. When this value is
  insufficient, the returned string is truncated and null-terminated.
  If this value is zero, then the string is not returned and no changes are done
  to the buffer.
* `[out] result`: Number of bytes copied into the buffer, excluding the null
  terminator.

Returns `napi_ok` if the API succeeded. If a non-`string` `napi_value`
is passed in it returns `napi_string_expected`.

This API returns the UTF8-encoded string corresponding the value passed in.

#### `napi_get_value_string_utf16`

```c
napi_status napi_get_value_string_utf16(napi_env env,
                                        napi_value value,
                                        char16_t* buf,
                                        size_t bufsize,
                                        size_t* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: `napi_value` representing JavaScript string.
* `[in] buf`: Buffer to write the UTF16-LE-encoded string into. If `NULL` is
  passed in, the length of the string in 2-byte code units and excluding the
  null terminator is returned.
* `[in] bufsize`: Size of the destination buffer. When this value is
  insufficient, the returned string is truncated and null-terminated.
  If this value is zero, then the string is not returned and no changes are done
  to the buffer.
* `[out] result`: Number of 2-byte code units copied into the buffer, excluding
  the null terminator.

Returns `napi_ok` if the API succeeded. If a non-`string` `napi_value`
is passed in it returns `napi_string_expected`.

This API returns the UTF16-encoded string corresponding the value passed in.

#### `napi_get_value_uint32`

```c
napi_status napi_get_value_uint32(napi_env env,
                                  napi_value value,
                                  uint32_t* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: `napi_value` representing JavaScript `number`.
* `[out] result`: C primitive equivalent of the given `napi_value` as a
  `uint32_t`.

Returns `napi_ok` if the API succeeded. If a non-number `napi_value`
is passed in it returns `napi_number_expected`.

This API returns the C primitive equivalent of the given `napi_value` as a
`uint32_t`.

### Functions to get global instances

#### `napi_get_boolean`

```c
napi_status napi_get_boolean(napi_env env, bool value, napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: The value of the boolean to retrieve.
* `[out] result`: `napi_value` representing JavaScript `Boolean` singleton to
  retrieve.

Returns `napi_ok` if the API succeeded.

This API is used to return the JavaScript singleton object that is used to
represent the given boolean value.

#### `napi_get_global`

```c
napi_status napi_get_global(napi_env env, napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[out] result`: `napi_value` representing JavaScript `global` object.

Returns `napi_ok` if the API succeeded.

This API returns the `global` object.

#### `napi_get_null`

```c
napi_status napi_get_null(napi_env env, napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[out] result`: `napi_value` representing JavaScript `null` object.

Returns `napi_ok` if the API succeeded.

This API returns the `null` object.

#### `napi_get_undefined`

```c
napi_status napi_get_undefined(napi_env env, napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[out] result`: `napi_value` representing JavaScript Undefined value.

Returns `napi_ok` if the API succeeded.

This API returns the Undefined object.
