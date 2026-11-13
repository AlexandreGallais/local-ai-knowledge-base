---
title: "Node-API (part 18 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 18 of 23)

## Working with JavaScript functions

Node-API provides a set of APIs that allow JavaScript code to
call back into native code. Node-APIs that support calling back
into native code take in a callback functions represented by
the `napi_callback` type. When the JavaScript VM calls back to
native code, the `napi_callback` function provided is invoked. The APIs
documented in this section allow the callback function to do the
following:

* Get information about the context in which the callback was invoked.
* Get the arguments passed into the callback.
* Return a `napi_value` back from the callback.

Additionally, Node-API provides a set of functions which allow calling
JavaScript functions from native code. One can either call a function
like a regular JavaScript function call, or as a constructor
function.

Any non-`NULL` data which is passed to this API via the `data` field of the
`napi_property_descriptor` items can be associated with `object` and freed
whenever `object` is garbage-collected by passing both `object` and the data to
`napi_add_finalizer`.

### `napi_call_function`

```c
NAPI_EXTERN napi_status napi_call_function(napi_env env,
                                           napi_value recv,
                                           napi_value func,
                                           size_t argc,
                                           const napi_value* argv,
                                           napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] recv`: The `this` value passed to the called function.
* `[in] func`: `napi_value` representing the JavaScript function to be invoked.
* `[in] argc`: The count of elements in the `argv` array.
* `[in] argv`: Array of `napi_values` representing JavaScript values passed in
  as arguments to the function.
* `[out] result`: `napi_value` representing the JavaScript object returned.

Returns `napi_ok` if the API succeeded.

This method allows a JavaScript function object to be called from a native
add-on. This is the primary mechanism of calling back _from_ the add-on's
native code _into_ JavaScript. For the special case of calling into JavaScript
after an async operation, see `napi_make_callback`.

A sample use case might look as follows. Consider the following JavaScript
snippet:

```js
function AddTwo(num) {
  return num + 2;
}
global.AddTwo = AddTwo;
```

Then, the above function can be invoked from a native add-on using the
following code:

```c
// Get the function named "AddTwo" on the global object
napi_value global, add_two, arg;
napi_status status = napi_get_global(env, &global);
if (status != napi_ok) return;

status = napi_get_named_property(env, global, "AddTwo", &add_two);
if (status != napi_ok) return;

// const arg = 1337
status = napi_create_int32(env, 1337, &arg);
if (status != napi_ok) return;

napi_value* argv = &arg;
size_t argc = 1;

// AddTwo(arg);
napi_value return_val;
status = napi_call_function(env, global, add_two, argc, argv, &return_val);
if (status != napi_ok) return;

// Convert the result back to a native type
int32_t result;
status = napi_get_value_int32(env, return_val, &result);
if (status != napi_ok) return;
```

### `napi_create_function`

```c
napi_status napi_create_function(napi_env env,
                                 const char* utf8name,
                                 size_t length,
                                 napi_callback cb,
                                 void* data,
                                 napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] utf8Name`: Optional name of the function encoded as UTF8. This is
  visible within JavaScript as the new function object's `name` property.
* `[in] length`: The length of the `utf8name` in bytes, or `NAPI_AUTO_LENGTH` if
  it is null-terminated.
* `[in] cb`: The native function which should be called when this function
  object is invoked. `napi_callback` provides more details.
* `[in] data`: User-provided data context. This will be passed back into the
  function when invoked later.
* `[out] result`: `napi_value` representing the JavaScript function object for
  the newly created function.

Returns `napi_ok` if the API succeeded.

This API allows an add-on author to create a function object in native code.
This is the primary mechanism to allow calling _into_ the add-on's native code
_from_ JavaScript.

The newly created function is not automatically visible from script after this
call. Instead, a property must be explicitly set on any object that is visible
to JavaScript, in order for the function to be accessible from script.

In order to expose a function as part of the
add-on's module exports, set the newly created function on the exports
object. A sample module might look as follows:

```c
napi_value SayHello(napi_env env, napi_callback_info info) {
  printf("Hello\n");
  return NULL;
}

napi_value Init(napi_env env, napi_value exports) {
  napi_status status;

  napi_value fn;
  status = napi_create_function(env, NULL, 0, SayHello, NULL, &fn);
  if (status != napi_ok) return NULL;

  status = napi_set_named_property(env, exports, "sayHello", fn);
  if (status != napi_ok) return NULL;

  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
```

Given the above code, the add-on can be used from JavaScript as follows:

```js
const myaddon = require('./addon');
myaddon.sayHello();
```

The string passed to `require()` is the name of the target in `binding.gyp`
responsible for creating the `.node` file.

Any non-`NULL` data which is passed to this API via the `data` parameter can
be associated with the resulting JavaScript function (which is returned in the
`result` parameter) and freed whenever the function is garbage-collected by
passing both the JavaScript function and the data to `napi_add_finalizer`.

JavaScript `Function`s are described in Section Function objects of the ECMAScript
Language Specification.

### `napi_get_cb_info`

```c
napi_status napi_get_cb_info(napi_env env,
                             napi_callback_info cbinfo,
                             size_t* argc,
                             napi_value* argv,
                             napi_value* thisArg,
                             void** data)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] cbinfo`: The callback info passed into the callback function.
* `[in-out] argc`: Specifies the length of the provided `argv` array and
  receives the actual count of arguments. `argc` can
  optionally be ignored by passing `NULL`.
* `[out] argv`: C array of `napi_value`s to which the arguments will be
  copied. If there are more arguments than the provided count, only the
  requested number of arguments are copied. If there are fewer arguments
  provided than claimed, the rest of `argv` is filled with `napi_value` values
  that represent `undefined`. `argv` can optionally be ignored by
  passing `NULL`.
* `[out] thisArg`: Receives the JavaScript `this` argument for the call.
  `thisArg` can optionally be ignored by passing `NULL`.
* `[out] data`: Receives the data pointer for the callback. `data` can
  optionally be ignored by passing `NULL`.

Returns `napi_ok` if the API succeeded.

This method is used within a callback function to retrieve details about the
call like the arguments and the `this` pointer from a given callback info.

### `napi_get_new_target`

```c
napi_status napi_get_new_target(napi_env env,
                                napi_callback_info cbinfo,
                                napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] cbinfo`: The callback info passed into the callback function.
* `[out] result`: The `new.target` of the constructor call.

Returns `napi_ok` if the API succeeded.

This API returns the `new.target` of the constructor call. If the current
callback is not a constructor call, the result is `NULL`.

### `napi_new_instance`

```c
napi_status napi_new_instance(napi_env env,
                              napi_value cons,
                              size_t argc,
                              napi_value* argv,
                              napi_value* result)
```

* `[in] env`: The environment that the API is invoked under.
* `[in] cons`: `napi_value` representing the JavaScript function to be invoked
  as a constructor.
* `[in] argc`: The count of elements in the `argv` array.
* `[in] argv`: Array of JavaScript values as `napi_value` representing the
  arguments to the constructor. If `argc` is zero this parameter may be
  omitted by passing in `NULL`.
* `[out] result`: `napi_value` representing the JavaScript object returned,
  which in this case is the constructed object.

This method is used to instantiate a new JavaScript value using a given
`napi_value` that represents the constructor for the object. For example,
consider the following snippet:

```js
function MyObject(param) {
  this.param = param;
}

const arg = 'hello';
const value = new MyObject(arg);
```

The following can be approximated in Node-API using the following snippet:

```c
// Get the constructor function MyObject
napi_value global, constructor, arg, value;
napi_status status = napi_get_global(env, &global);
if (status != napi_ok) return;

status = napi_get_named_property(env, global, "MyObject", &constructor);
if (status != napi_ok) return;

// const arg = "hello"
status = napi_create_string_utf8(env, "hello", NAPI_AUTO_LENGTH, &arg);
if (status != napi_ok) return;

napi_value* argv = &arg;
size_t argc = 1;

// const value = new MyObject(arg)
status = napi_new_instance(env, constructor, argc, argv, &value);
```

Returns `napi_ok` if the API succeeded.
