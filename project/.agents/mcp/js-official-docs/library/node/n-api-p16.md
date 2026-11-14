---
title: "Node-API (part 16 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 16 of 23)

## Working with JavaScript properties

Node-API exposes a set of APIs to get and set properties on JavaScript
objects.

Properties in JavaScript are represented as a tuple of a key and a value.
Fundamentally, all property keys in Node-API can be represented in one of the
following forms:

* Named: a simple UTF8-encoded string
* Integer-Indexed: an index value represented by `uint32_t`
* JavaScript value: these are represented in Node-API by `napi_value`. This can
  be a `napi_value` representing a `string`, `number`, or `symbol`.

Node-API values are represented by the type `napi_value`.
Any Node-API call that requires a JavaScript value takes in a `napi_value`.
However, it's the caller's responsibility to make sure that the
`napi_value` in question is of the JavaScript type expected by the API.

The APIs documented in this section provide a simple interface to
get and set properties on arbitrary JavaScript objects represented by
`napi_value`.

For instance, consider the following JavaScript code snippet:

```js
const obj = {};
obj.myProp = 123;
```

The equivalent can be done using Node-API values with the following snippet:

```c
napi_status status = napi_generic_failure;

// const obj = {}
napi_value obj, value;
status = napi_create_object(env, &obj);
if (status != napi_ok) return status;

// Create a napi_value for 123
status = napi_create_int32(env, 123, &value);
if (status != napi_ok) return status;

// obj.myProp = 123
status = napi_set_named_property(env, obj, "myProp", value);
if (status != napi_ok) return status;
```

Indexed properties can be set in a similar manner. Consider the following
JavaScript snippet:

```js
const arr = [];
arr[123] = 'hello';
```

The equivalent can be done using Node-API values with the following snippet:

```c
napi_status status = napi_generic_failure;

// const arr = [];
napi_value arr, value;
status = napi_create_array(env, &arr);
if (status != napi_ok) return status;

// Create a napi_value for 'hello'
status = napi_create_string_utf8(env, "hello", NAPI_AUTO_LENGTH, &value);
if (status != napi_ok) return status;

// arr[123] = 'hello';
status = napi_set_element(env, arr, 123, value);
if (status != napi_ok) return status;
```

Properties can be retrieved using the APIs described in this section.
Consider the following JavaScript snippet:

```js
const arr = [];
const value = arr[123];
```

The following is the approximate equivalent of the Node-API counterpart:

```c
napi_status status = napi_generic_failure;

// const arr = []
napi_value arr, value;
status = napi_create_array(env, &arr);
if (status != napi_ok) return status;

// const value = arr[123]
status = napi_get_element(env, arr, 123, &value);
if (status != napi_ok) return status;
```

Finally, multiple properties can also be defined on an object for performance
reasons. Consider the following JavaScript:

```js
const obj = {};
Object.defineProperties(obj, {
  'foo': { value: 123, writable: true, configurable: true, enumerable: true },
  'bar': { value: 456, writable: true, configurable: true, enumerable: true },
});
```

The following is the approximate equivalent of the Node-API counterpart:

```c
napi_status status = napi_status_generic_failure;

// const obj = {};
napi_value obj;
status = napi_create_object(env, &obj);
if (status != napi_ok) return status;

// Create napi_values for 123 and 456
napi_value fooValue, barValue;
status = napi_create_int32(env, 123, &fooValue);
if (status != napi_ok) return status;
status = napi_create_int32(env, 456, &barValue);
if (status != napi_ok) return status;

// Set the properties
napi_property_descriptor descriptors[] = {
  { "foo", NULL, NULL, NULL, NULL, fooValue, napi_writable | napi_configurable, NULL },
  { "bar", NULL, NULL, NULL, NULL, barValue, napi_writable | napi_configurable, NULL }
}
status = napi_define_properties(env,
                                obj,
                                sizeof(descriptors) / sizeof(descriptors[0]),
                                descriptors);
if (status != napi_ok) return status;
```

### Structures

#### `napi_property_attributes`

```c
typedef enum {
  napi_default = 0,
  napi_writable = 1 << 0,
  napi_enumerable = 1 << 1,
  napi_configurable = 1 << 2,

  // Used with napi_define_class to distinguish static properties
  // from instance properties. Ignored by napi_define_properties.
  napi_static = 1 << 10,

  // Default for class methods.
  napi_default_method = napi_writable | napi_configurable,

  // Default for object properties, like in JS obj[prop].
  napi_default_jsproperty = napi_writable |
                          napi_enumerable |
                          napi_configurable,
} napi_property_attributes;
```

`napi_property_attributes` are bit flags used to control the behavior of
properties set on a JavaScript object. Other than `napi_static` they
correspond to the attributes listed in Section property attributes
of the ECMAScript Language Specification.
They can be one or more of the following bit flags:

* `napi_default`: No explicit attributes are set on the property. By default, a
  property is read only, not enumerable and not configurable.
* `napi_writable`: The property is writable.
* `napi_enumerable`: The property is enumerable.
* `napi_configurable`: The property is configurable as defined in
  Section property attributes of the ECMAScript Language Specification.
* `napi_static`: The property will be defined as a static property on a class as
  opposed to an instance property, which is the default. This is used only by
  `napi_define_class`. It is ignored by `napi_define_properties`.
* `napi_default_method`: Like a method in a JS class, the property is
  configurable and writable, but not enumerable.
* `napi_default_jsproperty`: Like a property set via assignment in JavaScript,
  the property is writable, enumerable, and configurable.

#### `napi_property_descriptor`

```c
typedef struct {
  // One of utf8name or name should be NULL.
  const char* utf8name;
  napi_value name;

  napi_callback method;
  napi_callback getter;
  napi_callback setter;
  napi_value value;

  napi_property_attributes attributes;
  void* data;
} napi_property_descriptor;
```

* `utf8name`: Optional string describing the key for the property,
  encoded as UTF8. One of `utf8name` or `name` must be provided for the
  property.
* `name`: Optional `napi_value` that points to a JavaScript string or symbol
  to be used as the key for the property. One of `utf8name` or `name` must
  be provided for the property.
* `value`: The value that's retrieved by a get access of the property if the
  property is a data property. If this is passed in, set `getter`, `setter`,
  `method` and `data` to `NULL` (since these members won't be used).
* `getter`: A function to call when a get access of the property is performed.
  If this is passed in, set `value` and `method` to `NULL` (since these members
  won't be used). The given function is called implicitly by the runtime when
  the property is accessed from JavaScript code (or if a get on the property is
  performed using a Node-API call). `napi_callback` provides more details.
* `setter`: A function to call when a set access of the property is performed.
  If this is passed in, set `value` and `method` to `NULL` (since these members
  won't be used). The given function is called implicitly by the runtime when
  the property is set from JavaScript code (or if a set on the property is
  performed using a Node-API call). `napi_callback` provides more details.
* `method`: Set this to make the property descriptor object's `value`
  property to be a JavaScript function represented by `method`. If this is
  passed in, set `value`, `getter` and `setter` to `NULL` (since these members
  won't be used). `napi_callback` provides more details.
* `attributes`: The attributes associated with the particular property. See
  `napi_property_attributes`.
* `data`: The callback data passed into `method`, `getter` and `setter` if this
  function is invoked.
