---
title: "Node-API (part 17 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 17 of 23)

### Functions

#### `napi_get_property_names`

```c
napi_status napi_get_property_names(napi_env env,
                                    napi_value object,
                                    napi_value* result);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] object`: The object from which to retrieve the properties.
* `[out] result`: A `napi_value` representing an array of JavaScript values
  that represent the property names of the object. The API can be used to
  iterate over `result` using `napi_get_array_length`
  and `napi_get_element`.

Returns `napi_ok` if the API succeeded.

This API returns the names of the enumerable properties of `object` as an array
of strings. The properties of `object` whose key is a symbol will not be
included.

#### `napi_get_all_property_names`

```c
napi_get_all_property_names(napi_env env,
                            napi_value object,
                            napi_key_collection_mode key_mode,
                            napi_key_filter key_filter,
                            napi_key_conversion key_conversion,
                            napi_value* result);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] object`: The object from which to retrieve the properties.
* `[in] key_mode`: Whether to retrieve prototype properties as well.
* `[in] key_filter`: Which properties to retrieve
  (enumerable/readable/writable).
* `[in] key_conversion`: Whether to convert numbered property keys to strings.
* `[out] result`: A `napi_value` representing an array of JavaScript values
  that represent the property names of the object. `napi_get_array_length`
  and `napi_get_element` can be used to iterate over `result`.

Returns `napi_ok` if the API succeeded.

This API returns an array containing the names of the available properties
of this object.

#### `napi_set_property`

```c
napi_status napi_set_property(napi_env env,
                              napi_value object,
                              napi_value key,
                              napi_value value);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] object`: The object on which to set the property.
* `[in] key`: The name of the property to set.
* `[in] value`: The property value.

Returns `napi_ok` if the API succeeded.

This API set a property on the `Object` passed in.

#### `napi_get_property`

```c
napi_status napi_get_property(napi_env env,
                              napi_value object,
                              napi_value key,
                              napi_value* result);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] object`: The object from which to retrieve the property.
* `[in] key`: The name of the property to retrieve.
* `[out] result`: The value of the property.

Returns `napi_ok` if the API succeeded.

This API gets the requested property from the `Object` passed in.

#### `napi_has_property`

```c
napi_status napi_has_property(napi_env env,
                              napi_value object,
                              napi_value key,
                              bool* result);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] object`: The object to query.
* `[in] key`: The name of the property whose existence to check.
* `[out] result`: Whether the property exists on the object or not.

Returns `napi_ok` if the API succeeded.

This API checks if the `Object` passed in has the named property.

#### `napi_delete_property`

```c
napi_status napi_delete_property(napi_env env,
                                 napi_value object,
                                 napi_value key,
                                 bool* result);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] object`: The object to query.
* `[in] key`: The name of the property to delete.
* `[out] result`: Whether the property deletion succeeded or not. `result` can
  optionally be ignored by passing `NULL`.

Returns `napi_ok` if the API succeeded.

This API attempts to delete the `key` own property from `object`.

#### `napi_has_own_property`

```c
napi_status napi_has_own_property(napi_env env,
                                  napi_value object,
                                  napi_value key,
                                  bool* result);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] object`: The object to query.
* `[in] key`: The name of the own property whose existence to check.
* `[out] result`: Whether the own property exists on the object or not.

Returns `napi_ok` if the API succeeded.

This API checks if the `Object` passed in has the named own property. `key` must
be a `string` or a `symbol`, or an error will be thrown. Node-API will not
perform any conversion between data types.

#### `napi_set_named_property`

```c
napi_status napi_set_named_property(napi_env env,
                                    napi_value object,
                                    const char* utf8Name,
                                    napi_value value);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] object`: The object on which to set the property.
* `[in] utf8Name`: The name of the property to set.
* `[in] value`: The property value.

Returns `napi_ok` if the API succeeded.

This method is equivalent to calling `napi_set_property` with a `napi_value`
created from the string passed in as `utf8Name`.

#### `napi_get_named_property`

```c
napi_status napi_get_named_property(napi_env env,
                                    napi_value object,
                                    const char* utf8Name,
                                    napi_value* result);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] object`: The object from which to retrieve the property.
* `[in] utf8Name`: The name of the property to get.
* `[out] result`: The value of the property.

Returns `napi_ok` if the API succeeded.

This method is equivalent to calling `napi_get_property` with a `napi_value`
created from the string passed in as `utf8Name`.

#### `napi_has_named_property`

```c
napi_status napi_has_named_property(napi_env env,
                                    napi_value object,
                                    const char* utf8Name,
                                    bool* result);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] object`: The object to query.
* `[in] utf8Name`: The name of the property whose existence to check.
* `[out] result`: Whether the property exists on the object or not.

Returns `napi_ok` if the API succeeded.

This method is equivalent to calling `napi_has_property` with a `napi_value`
created from the string passed in as `utf8Name`.

#### `napi_set_element`

```c
napi_status napi_set_element(napi_env env,
                             napi_value object,
                             uint32_t index,
                             napi_value value);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] object`: The object from which to set the properties.
* `[in] index`: The index of the property to set.
* `[in] value`: The property value.

Returns `napi_ok` if the API succeeded.

This API sets an element on the `Object` passed in.

#### `napi_get_element`

```c
napi_status napi_get_element(napi_env env,
                             napi_value object,
                             uint32_t index,
                             napi_value* result);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] object`: The object from which to retrieve the property.
* `[in] index`: The index of the property to get.
* `[out] result`: The value of the property.

Returns `napi_ok` if the API succeeded.

This API gets the element at the requested index.

#### `napi_has_element`

```c
napi_status napi_has_element(napi_env env,
                             napi_value object,
                             uint32_t index,
                             bool* result);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] object`: The object to query.
* `[in] index`: The index of the property whose existence to check.
* `[out] result`: Whether the property exists on the object or not.

Returns `napi_ok` if the API succeeded.

This API returns if the `Object` passed in has an element at the
requested index.

#### `napi_delete_element`

```c
napi_status napi_delete_element(napi_env env,
                                napi_value object,
                                uint32_t index,
                                bool* result);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] object`: The object to query.
* `[in] index`: The index of the property to delete.
* `[out] result`: Whether the element deletion succeeded or not. `result` can
  optionally be ignored by passing `NULL`.

Returns `napi_ok` if the API succeeded.

This API attempts to delete the specified `index` from `object`.

#### `napi_define_properties`

```c
napi_status napi_define_properties(napi_env env,
                                   napi_value object,
                                   size_t property_count,
                                   const napi_property_descriptor* properties);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] object`: The object from which to retrieve the properties.
* `[in] property_count`: The number of elements in the `properties` array.
* `[in] properties`: The array of property descriptors.

Returns `napi_ok` if the API succeeded.

This method allows the efficient definition of multiple properties on a given
object. The properties are defined using property descriptors (see
`napi_property_descriptor`). Given an array of such property descriptors,
this API will set the properties on the object one at a time, as defined by
`DefineOwnProperty()` (described in Section DefineOwnProperty of the ECMA-262
specification).

#### `napi_object_freeze`

```c
napi_status napi_object_freeze(napi_env env,
                               napi_value object);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] object`: The object to freeze.

Returns `napi_ok` if the API succeeded.

This method freezes a given object. This prevents new properties from
being added to it, existing properties from being removed, prevents
changing the enumerability, configurability, or writability of existing
properties, and prevents the values of existing properties from being changed.
It also prevents the object's prototype from being changed. This is described
in Section 19.1.2.6 of the
ECMA-262 specification.

#### `napi_object_seal`

```c
napi_status napi_object_seal(napi_env env,
                             napi_value object);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] object`: The object to seal.

Returns `napi_ok` if the API succeeded.

This method seals a given object. This prevents new properties from being
added to it, as well as marking all existing properties as non-configurable.
This is described in Section 19.1.2.20
of the ECMA-262 specification.

#### `node_api_set_prototype`

> Stability: 1 - Experimental

```c
napi_status node_api_set_prototype(napi_env env,
                                   napi_value object,
                                   napi_value value);
```

* `[in] env`: The environment that the Node-API call is invoked under.
* `[in] object`: The object on which to set the prototype.
* `[in] value`: The prototype value.

Returns `napi_ok` if the API succeeded.

This API sets the prototype of the `Object` passed in.
