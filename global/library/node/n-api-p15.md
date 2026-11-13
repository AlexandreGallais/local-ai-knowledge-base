---
title: "Node-API (part 15 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 15 of 23)

## Working with JavaScript values and abstract operations

Node-API exposes a set of APIs to perform some abstract operations on JavaScript
values.

These APIs support doing one of the following:

1. Coerce JavaScript values to specific JavaScript types (such as `number` or
   `string`).
2. Check the type of a JavaScript value.
3. Check for equality between two JavaScript values.

### `napi_coerce_to_bool`

```c
napi_status napi_coerce_to_bool(napi_env env,
                                napi_value value,
                                napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: The JavaScript value to coerce.
* `[out] result`: `napi_value` representing the coerced JavaScript `Boolean`.

Returns `napi_ok` if the API succeeded.

This API implements the abstract operation `ToBoolean()` as defined in
Section ToBoolean of the ECMAScript Language Specification.

### `napi_coerce_to_number`

```c
napi_status napi_coerce_to_number(napi_env env,
                                  napi_value value,
                                  napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: The JavaScript value to coerce.
* `[out] result`: `napi_value` representing the coerced JavaScript `number`.

Returns `napi_ok` if the API succeeded.

This API implements the abstract operation `ToNumber()` as defined in
Section ToNumber of the ECMAScript Language Specification.
This function potentially runs JS code if the passed-in value is an
object.

### `napi_coerce_to_object`

```c
napi_status napi_coerce_to_object(napi_env env,
                                  napi_value value,
                                  napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: The JavaScript value to coerce.
* `[out] result`: `napi_value` representing the coerced JavaScript `Object`.

Returns `napi_ok` if the API succeeded.

This API implements the abstract operation `ToObject()` as defined in
Section ToObject of the ECMAScript Language Specification.

### `napi_coerce_to_string`

```c
napi_status napi_coerce_to_string(napi_env env,
                                  napi_value value,
                                  napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: The JavaScript value to coerce.
* `[out] result`: `napi_value` representing the coerced JavaScript `string`.

Returns `napi_ok` if the API succeeded.

This API implements the abstract operation `ToString()` as defined in
Section ToString of the ECMAScript Language Specification.
This function potentially runs JS code if the passed-in value is an
object.

### `napi_typeof`

```c
napi_status napi_typeof(napi_env env, napi_value value, napi_valuetype* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: The JavaScript value whose type to query.
* `[out] result`: The type of the JavaScript value.

Returns `napi_ok` if the API succeeded.

* `napi_invalid_arg` if the type of `value` is not a known ECMAScript type and
  `value` is not an External value.

This API represents behavior similar to invoking the `typeof` Operator on
the object as defined in Section typeof operator of the ECMAScript Language
Specification. However, there are some differences:

1. It has support for detecting an External value.
2. It detects `null` as a separate type, while ECMAScript `typeof` would detect
   `object`.

If `value` has a type that is invalid, an error is returned.

### `napi_instanceof`

```c
napi_status napi_instanceof(napi_env env,
                            napi_value object,
                            napi_value constructor,
                            bool* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] object`: The JavaScript value to check.
* `[in] constructor`: The JavaScript function object of the constructor function
  to check against.
* `[out] result`: Boolean that is set to true if `object instanceof constructor`
  is true.

Returns `napi_ok` if the API succeeded.

This API represents invoking the `instanceof` Operator on the object as
defined in Section instanceof operator of the ECMAScript Language Specification.

### `napi_is_array`

```c
napi_status napi_is_array(napi_env env, napi_value value, bool* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: The JavaScript value to check.
* `[out] result`: Whether the given object is an array.

Returns `napi_ok` if the API succeeded.

This API represents invoking the `IsArray` operation on the object
as defined in Section IsArray of the ECMAScript Language Specification.

### `napi_is_arraybuffer`

```c
napi_status napi_is_arraybuffer(napi_env env, napi_value value, bool* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: The JavaScript value to check.
* `[out] result`: Whether the given object is an `ArrayBuffer`.

Returns `napi_ok` if the API succeeded.

This API checks if the `Object` passed in is an array buffer.

### `napi_is_buffer`

```c
napi_status napi_is_buffer(napi_env env, napi_value value, bool* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: The JavaScript value to check.
* `[out] result`: Whether the given `napi_value` represents a `node::Buffer` or
  `Uint8Array` object.

Returns `napi_ok` if the API succeeded.

This API checks if the `Object` passed in is a buffer or Uint8Array.
`napi_is_typedarray` should be preferred if the caller needs to check if the
value is a Uint8Array.

### `napi_is_date`

```c
napi_status napi_is_date(napi_env env, napi_value value, bool* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: The JavaScript value to check.
* `[out] result`: Whether the given `napi_value` represents a JavaScript `Date`
  object.

Returns `napi_ok` if the API succeeded.

This API checks if the `Object` passed in is a date.

### `napi_is_error`

```c
napi_status napi_is_error(napi_env env, napi_value value, bool* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: The JavaScript value to check.
* `[out] result`: Whether the given `napi_value` represents an `Error` object.

Returns `napi_ok` if the API succeeded.

This API checks if the `Object` passed in is an `Error`.

### `napi_is_typedarray`

```c
napi_status napi_is_typedarray(napi_env env, napi_value value, bool* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: The JavaScript value to check.
* `[out] result`: Whether the given `napi_value` represents a `TypedArray`.

Returns `napi_ok` if the API succeeded.

This API checks if the `Object` passed in is a typed array.

### `napi_is_dataview`

```c
napi_status napi_is_dataview(napi_env env, napi_value value, bool* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: The JavaScript value to check.
* `[out] result`: Whether the given `napi_value` represents a `DataView`.

Returns `napi_ok` if the API succeeded.

This API checks if the `Object` passed in is a `DataView`.

### `napi_strict_equals`

```c
napi_status napi_strict_equals(napi_env env,
                               napi_value lhs,
                               napi_value rhs,
                               bool* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] lhs`: The JavaScript value to check.
* `[in] rhs`: The JavaScript value to check against.
* `[out] result`: Whether the two `napi_value` objects are equal.

Returns `napi_ok` if the API succeeded.

This API represents the invocation of the Strict Equality algorithm as
defined in Section IsStrictlyEqual of the ECMAScript Language Specification.

### `napi_detach_arraybuffer`

```c
napi_status napi_detach_arraybuffer(napi_env env,
                                    napi_value arraybuffer)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] arraybuffer`: The JavaScript `ArrayBuffer` to be detached.

Returns `napi_ok` if the API succeeded. If a non-detachable `ArrayBuffer` is
passed in it returns `napi_detachable_arraybuffer_expected`.

Generally, an `ArrayBuffer` is non-detachable if it has been detached before.
The engine may impose additional conditions on whether an `ArrayBuffer` is
detachable. For example, V8 requires that the `ArrayBuffer` be external,
that is, created with `napi_create_external_arraybuffer`.

This API represents the invocation of the `ArrayBuffer` detach operation as
defined in Section detachArrayBuffer of the ECMAScript Language Specification.

### `napi_is_detached_arraybuffer`

```c
napi_status napi_is_detached_arraybuffer(napi_env env,
                                         napi_value arraybuffer,
                                         bool* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] arraybuffer`: The JavaScript `ArrayBuffer` to be checked.
* `[out] result`: Whether the `arraybuffer` is detached.

Returns `napi_ok` if the API succeeded.

The `ArrayBuffer` is considered detached if its internal data is `null`.

This API represents the invocation of the `ArrayBuffer` `IsDetachedBuffer`
operation as defined in Section isDetachedBuffer of the ECMAScript Language
Specification.

### `node_api_is_sharedarraybuffer`

> Stability: 1 - Experimental

```c
napi_status node_api_is_sharedarraybuffer(napi_env env, napi_value value, bool* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: The JavaScript value to check.
* `[out] result`: Whether the given `napi_value` represents a `SharedArrayBuffer`.

Returns `napi_ok` if the API succeeded.

This API checks if the Object passed in is a `SharedArrayBuffer`.

### `node_api_create_sharedarraybuffer`

> Stability: 1 - Experimental

```c
napi_status node_api_create_sharedarraybuffer(napi_env env,
                                             size_t byte_length,
                                             void** data,
                                             napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] byte_length`: The length in bytes of the shared array buffer to create.
* `[out] data`: Pointer to the underlying byte buffer of the `SharedArrayBuffer`.
  `data` can optionally be ignored by passing `NULL`.
* `[out] result`: A `napi_value` representing a JavaScript `SharedArrayBuffer`.

Returns `napi_ok` if the API succeeded.

This API returns a Node-API value corresponding to a JavaScript `SharedArrayBuffer`.
`SharedArrayBuffer`s are used to represent fixed-length binary data buffers that
can be shared across multiple workers.

The `SharedArrayBuffer` allocated will have an underlying byte buffer whose size is
determined by the `byte_length` parameter that's passed in.
The underlying buffer is optionally returned back to the caller in case the
caller wants to directly manipulate the buffer. This buffer can only be
written to directly from native code. To write to this buffer from JavaScript,
a typed array or `DataView` object would need to be created.

JavaScript `SharedArrayBuffer` objects are described in
Section SharedArrayBuffer objects of the ECMAScript Language Specification.
