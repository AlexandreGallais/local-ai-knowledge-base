---
title: "Node-API (part 8 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 8 of 23)

## Working with JavaScript values

Node-API exposes a set of APIs to create all types of JavaScript values.
Some of these types are documented under Section language types
of the ECMAScript Language Specification.

Fundamentally, these APIs are used to do one of the following:

1. Create a new JavaScript object
2. Convert from a primitive C type to a Node-API value
3. Convert from Node-API value to a primitive C type
4. Get global instances including `undefined` and `null`

Node-API values are represented by the type `napi_value`.
Any Node-API call that requires a JavaScript value takes in a `napi_value`.
In some cases, the API does check the type of the `napi_value` up-front.
However, for better performance, it's better for the caller to make sure that
the `napi_value` in question is of the JavaScript type expected by the API.

### Enum types

#### `napi_key_collection_mode`

```c
typedef enum {
  napi_key_include_prototypes,
  napi_key_own_only
} napi_key_collection_mode;
```

Describes the `Keys/Properties` filter enums:

`napi_key_collection_mode` limits the range of collected properties.

`napi_key_own_only` limits the collected properties to the given
object only. `napi_key_include_prototypes` will include all keys
of the objects's prototype chain as well.

#### `napi_key_filter`

```c
typedef enum {
  napi_key_all_properties = 0,
  napi_key_writable = 1,
  napi_key_enumerable = 1 << 1,
  napi_key_configurable = 1 << 2,
  napi_key_skip_strings = 1 << 3,
  napi_key_skip_symbols = 1 << 4
} napi_key_filter;
```

Property filter bit flag. This works with bit operators to build a composite filter.

#### `napi_key_conversion`

```c
typedef enum {
  napi_key_keep_numbers,
  napi_key_numbers_to_strings
} napi_key_conversion;
```

`napi_key_numbers_to_strings` will convert integer indexes to
strings. `napi_key_keep_numbers` will return numbers for integer
indexes.

#### `napi_valuetype`

```c
typedef enum {
  // ES6 types (corresponds to typeof)
  napi_undefined,
  napi_null,
  napi_boolean,
  napi_number,
  napi_string,
  napi_symbol,
  napi_object,
  napi_function,
  napi_external,
  napi_bigint,
} napi_valuetype;
```

Describes the type of a `napi_value`. This generally corresponds to the types
described in Section language types of the ECMAScript Language Specification.
In addition to types in that section, `napi_valuetype` can also represent
`Function`s and `Object`s with external data.

A JavaScript value of type `napi_external` appears in JavaScript as a plain
object such that no properties can be set on it, and no prototype.

#### `napi_typedarray_type`

```c
typedef enum {
  napi_int8_array,
  napi_uint8_array,
  napi_uint8_clamped_array,
  napi_int16_array,
  napi_uint16_array,
  napi_int32_array,
  napi_uint32_array,
  napi_float32_array,
  napi_float64_array,
  napi_bigint64_array,
  napi_biguint64_array,
  napi_float16_array,
} napi_typedarray_type;
```

This represents the underlying binary scalar datatype of the `TypedArray`.
Elements of this enum correspond to
Section TypedArray objects of the ECMAScript Language Specification.
