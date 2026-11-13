---
title: "Node-API (part 19 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 19 of 23)

## Object wrap

Node-API offers a way to "wrap" C++ classes and instances so that the class
constructor and methods can be called from JavaScript.

1. The `napi_define_class` API defines a JavaScript class with constructor,
   static properties and methods, and instance properties and methods that
   correspond to the C++ class.
2. When JavaScript code invokes the constructor, the constructor callback
   uses `napi_wrap` to wrap a new C++ instance in a JavaScript object,
   then returns the wrapper object.
3. When JavaScript code invokes a method or property accessor on the class,
   the corresponding `napi_callback` C++ function is invoked. For an instance
   callback, `napi_unwrap` obtains the C++ instance that is the target of
   the call.

For wrapped objects it may be difficult to distinguish between a function
called on a class prototype and a function called on an instance of a class.
A common pattern used to address this problem is to save a persistent
reference to the class constructor for later `instanceof` checks.

```c
napi_value MyClass_constructor = NULL;
status = napi_get_reference_value(env, MyClass::es_constructor, &MyClass_constructor);
assert(napi_ok == status);
bool is_instance = false;
status = napi_instanceof(env, es_this, MyClass_constructor, &is_instance);
assert(napi_ok == status);
if (is_instance) {
  // napi_unwrap() ...
} else {
  // otherwise...
}
```

The reference must be freed once it is no longer needed.

There are occasions where `napi_instanceof()` is insufficient for ensuring that
a JavaScript object is a wrapper for a certain native type. This is the case
especially when wrapped JavaScript objects are passed back into the addon via
static methods rather than as the `this` value of prototype methods. In such
cases there is a chance that they may be unwrapped incorrectly.

```js
const myAddon = require('./build/Release/my_addon.node');

// `openDatabase()` returns a JavaScript object that wraps a native database
// handle.
const dbHandle = myAddon.openDatabase();

// `query()` returns a JavaScript object that wraps a native query handle.
const queryHandle = myAddon.query(dbHandle, 'Gimme ALL the things!');

// There is an accidental error in the line below. The first parameter to
// `myAddon.queryHasRecords()` should be the database handle (`dbHandle`), not
// the query handle (`query`), so the correct condition for the while-loop
// should be
//
// myAddon.queryHasRecords(dbHandle, queryHandle)
//
while (myAddon.queryHasRecords(queryHandle, dbHandle)) {
  // retrieve records
}
```

In the above example `myAddon.queryHasRecords()` is a method that accepts two
arguments. The first is a database handle and the second is a query handle.
Internally, it unwraps the first argument and casts the resulting pointer to a
native database handle. It then unwraps the second argument and casts the
resulting pointer to a query handle. If the arguments are passed in the wrong
order, the casts will work, however, there is a good chance that the underlying
database operation will fail, or will even cause an invalid memory access.

To ensure that the pointer retrieved from the first argument is indeed a pointer
to a database handle and, similarly, that the pointer retrieved from the second
argument is indeed a pointer to a query handle, the implementation of
`queryHasRecords()` has to perform a type validation. Retaining the JavaScript
class constructor from which the database handle was instantiated and the
constructor from which the query handle was instantiated in `napi_ref`s can
help, because `napi_instanceof()` can then be used to ensure that the instances
passed into `queryHashRecords()` are indeed of the correct type.

Unfortunately, `napi_instanceof()` does not protect against prototype
manipulation. For example, the prototype of the database handle instance can be
set to the prototype of the constructor for query handle instances. In this
case, the database handle instance can appear as a query handle instance, and it
will pass the `napi_instanceof()` test for a query handle instance, while still
containing a pointer to a database handle.

To this end, Node-API provides type-tagging capabilities.

A type tag is a 128-bit integer unique to the addon. Node-API provides the
`napi_type_tag` structure for storing a type tag. When such a value is passed
along with a JavaScript object or external stored in a `napi_value` to
`napi_type_tag_object()`, the JavaScript object will be "marked" with the
type tag. The "mark" is invisible on the JavaScript side. When a JavaScript
object arrives into a native binding, `napi_check_object_type_tag()` can be used
along with the original type tag to determine whether the JavaScript object was
previously "marked" with the type tag. This creates a type-checking capability
of a higher fidelity than `napi_instanceof()` can provide, because such type-
tagging survives prototype manipulation and addon unloading/reloading.

Continuing the above example, the following skeleton addon implementation
illustrates the use of `napi_type_tag_object()` and
`napi_check_object_type_tag()`.

```c
// This value is the type tag for a database handle. The command
//
//   uuidgen | sed -r -e 's/-//g' -e 's/(.{16})(.*)/0x\1, 0x\2/'
//
// can be used to obtain the two values with which to initialize the structure.
static const napi_type_tag DatabaseHandleTypeTag = {
  0x1edf75a38336451d, 0xa5ed9ce2e4c00c38
};

// This value is the type tag for a query handle.
static const napi_type_tag QueryHandleTypeTag = {
  0x9c73317f9fad44a3, 0x93c3920bf3b0ad6a
};

static napi_value
openDatabase(napi_env env, napi_callback_info info) {
  napi_status status;
  napi_value result;

  // Perform the underlying action which results in a database handle.
  DatabaseHandle* dbHandle = open_database();

  // Create a new, empty JS object.
  status = napi_create_object(env, &result);
  if (status != napi_ok) return NULL;

  // Tag the object to indicate that it holds a pointer to a `DatabaseHandle`.
  status = napi_type_tag_object(env, result, &DatabaseHandleTypeTag);
  if (status != napi_ok) return NULL;

  // Store the pointer to the `DatabaseHandle` structure inside the JS object.
  status = napi_wrap(env, result, dbHandle, NULL, NULL, NULL);
  if (status != napi_ok) return NULL;

  return result;
}

// Later when we receive a JavaScript object purporting to be a database handle
// we can use `napi_check_object_type_tag()` to ensure that it is indeed such a
// handle.

static napi_value
query(napi_env env, napi_callback_info info) {
  napi_status status;
  size_t argc = 2;
  napi_value argv[2];
  bool is_db_handle;

  status = napi_get_cb_info(env, info, &argc, argv, NULL, NULL);
  if (status != napi_ok) return NULL;

  // Check that the object passed as the first parameter has the previously
  // applied tag.
  status = napi_check_object_type_tag(env,
                                      argv[0],
                                      &DatabaseHandleTypeTag,
                                      &is_db_handle);
  if (status != napi_ok) return NULL;

  // Throw a `TypeError` if it doesn't.
  if (!is_db_handle) {
    // Throw a TypeError.
    return NULL;
  }
}
```

### `napi_define_class`

```c
napi_status napi_define_class(napi_env env,
                              const char* utf8name,
                              size_t length,
                              napi_callback constructor,
                              void* data,
                              size_t property_count,
                              const napi_property_descriptor* properties,
                              napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] utf8name`: Name of the JavaScript constructor function. For clarity,
  it is recommended to use the C++ class name when wrapping a C++ class.
* `[in] length`: The length of the `utf8name` in bytes, or `NAPI_AUTO_LENGTH`
  if it is null-terminated.
* `[in] constructor`: Callback function that handles constructing instances
  of the class. When wrapping a C++ class, this method must be a static member
  with the `napi_callback` signature. A C++ class constructor cannot be
  used. `napi_callback` provides more details.
* `[in] data`: Optional data to be passed to the constructor callback as
  the `data` property of the callback info.
* `[in] property_count`: Number of items in the `properties` array argument.
* `[in] properties`: Array of property descriptors describing static and
  instance data properties, accessors, and methods on the class
  See `napi_property_descriptor`.
* `[out] result`: A `napi_value` representing the constructor function for
  the class.

Returns `napi_ok` if the API succeeded.

Defines a JavaScript class, including:

* A JavaScript constructor function that has the class name. When wrapping a
  corresponding C++ class, the callback passed via `constructor` can be used to
  instantiate a new C++ class instance, which can then be placed inside the
  JavaScript object instance being constructed using `napi_wrap`.
* Properties on the constructor function whose implementation can call
  corresponding _static_ data properties, accessors, and methods of the C++
  class (defined by property descriptors with the `napi_static` attribute).
* Properties on the constructor function's `prototype` object. When wrapping a
  C++ class, _non-static_ data properties, accessors, and methods of the C++
  class can be called from the static functions given in the property
  descriptors without the `napi_static` attribute after retrieving the C++ class
  instance placed inside the JavaScript object instance by using
  `napi_unwrap`.

When wrapping a C++ class, the C++ constructor callback passed via `constructor`
should be a static method on the class that calls the actual class constructor,
then wraps the new C++ instance in a JavaScript object, and returns the wrapper
object. See `napi_wrap` for details.

The JavaScript constructor function returned from `napi_define_class` is
often saved and used later to construct new instances of the class from native
code, and/or to check whether provided values are instances of the class. In
that case, to prevent the function value from being garbage-collected, a
strong persistent reference to it can be created using
`napi_create_reference`, ensuring that the reference count is kept >= 1.

Any non-`NULL` data which is passed to this API via the `data` parameter or via
the `data` field of the `napi_property_descriptor` array items can be associated
with the resulting JavaScript constructor (which is returned in the `result`
parameter) and freed whenever the class is garbage-collected by passing both
the JavaScript function and the data to `napi_add_finalizer`.

### `napi_wrap`

```c
napi_status napi_wrap(napi_env env,
                      napi_value js_object,
                      void* native_object,
                      napi_finalize finalize_cb,
                      void* finalize_hint,
                      napi_ref* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] js_object`: The JavaScript object that will be the wrapper for the
  native object.
* `[in] native_object`: The native instance that will be wrapped in the
  JavaScript object.
* `[in] finalize_cb`: Optional native callback that can be used to free the
  native instance when the JavaScript object has been garbage-collected.
  `napi_finalize` provides more details.
* `[in] finalize_hint`: Optional contextual hint that is passed to the
  finalize callback.
* `[out] result`: Optional reference to the wrapped object.

Returns `napi_ok` if the API succeeded.

Wraps a native instance in a JavaScript object. The native instance can be
retrieved later using `napi_unwrap()`.

When JavaScript code invokes a constructor for a class that was defined using
`napi_define_class()`, the `napi_callback` for the constructor is invoked.
After constructing an instance of the native class, the callback must then call
`napi_wrap()` to wrap the newly constructed instance in the already-created
JavaScript object that is the `this` argument to the constructor callback.
(That `this` object was created from the constructor function's `prototype`,
so it already has definitions of all the instance properties and methods.)

Typically when wrapping a class instance, a finalize callback should be
provided that simply deletes the native instance that is received as the `data`
argument to the finalize callback.

The optional returned reference is initially a weak reference, meaning it
has a reference count of 0. Typically this reference count would be incremented
temporarily during async operations that require the instance to remain valid.

_Caution_: The optional returned reference (if obtained) should be deleted via
`napi_delete_reference` ONLY in response to the finalize callback
invocation. If it is deleted before then, then the finalize callback may never
be invoked. Therefore, when obtaining a reference a finalize callback is also
required in order to enable correct disposal of the reference.

Finalizer callbacks may be deferred, leaving a window where the object has
been garbage collected (and the weak reference is invalid) but the finalizer
hasn't been called yet. When using `napi_get_reference_value()` on weak
references returned by `napi_wrap()`, you should still handle an empty result.

Calling `napi_wrap()` a second time on an object will return an error. To
associate another native instance with the object, use `napi_remove_wrap()`
first.

### `napi_unwrap`

```c
napi_status napi_unwrap(napi_env env,
                        napi_value js_object,
                        void** result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] js_object`: The object associated with the native instance.
* `[out] result`: Pointer to the wrapped native instance.

Returns `napi_ok` if the API succeeded.

Retrieves a native instance that was previously wrapped in a JavaScript
object using `napi_wrap()`.

When JavaScript code invokes a method or property accessor on the class, the
corresponding `napi_callback` is invoked. If the callback is for an instance
method or accessor, then the `this` argument to the callback is the wrapper
object; the wrapped C++ instance that is the target of the call can be obtained
then by calling `napi_unwrap()` on the wrapper object.
