---
title: "Node-API (part 6 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 6 of 23)

## Object lifetime management

As Node-API calls are made, handles to objects in the heap for the underlying
VM may be returned as `napi_values`. These handles must hold the
objects 'live' until they are no longer required by the native code,
otherwise the objects could be collected before the native code was
finished using them.

As object handles are returned they are associated with a
'scope'. The lifespan for the default scope is tied to the lifespan
of the native method call. The result is that, by default, handles
remain valid and the objects associated with these handles will be
held live for the lifespan of the native method call.

In many cases, however, it is necessary that the handles remain valid for
either a shorter or longer lifespan than that of the native method.
The sections which follow describe the Node-API functions that can be used
to change the handle lifespan from the default.

### Making handle lifespan shorter than that of the native method

It is often necessary to make the lifespan of handles shorter than
the lifespan of a native method. For example, consider a native method
that has a loop which iterates through the elements in a large array:

```c
for (int i = 0; i < 1000000; i++) {
  napi_value result;
  napi_status status = napi_get_element(env, object, i, &result);
  if (status != napi_ok) {
    break;
  }
  // do something with element
}
```

This would result in a large number of handles being created, consuming
substantial resources. In addition, even though the native code could only
use the most recent handle, all of the associated objects would also be
kept alive since they all share the same scope.

To handle this case, Node-API provides the ability to establish a new 'scope' to
which newly created handles will be associated. Once those handles
are no longer required, the scope can be 'closed' and any handles associated
with the scope are invalidated. The methods available to open/close scopes are
`napi_open_handle_scope` and `napi_close_handle_scope`.

Node-API only supports a single nested hierarchy of scopes. There is only one
active scope at any time, and all new handles will be associated with that
scope while it is active. Scopes must be closed in the reverse order from
which they are opened. In addition, all scopes created within a native method
must be closed before returning from that method.

Taking the earlier example, adding calls to `napi_open_handle_scope` and
`napi_close_handle_scope` would ensure that at most a single handle
is valid throughout the execution of the loop:

```c
for (int i = 0; i < 1000000; i++) {
  napi_handle_scope scope;
  napi_status status = napi_open_handle_scope(env, &scope);
  if (status != napi_ok) {
    break;
  }
  napi_value result;
  status = napi_get_element(env, object, i, &result);
  if (status != napi_ok) {
    break;
  }
  // do something with element
  status = napi_close_handle_scope(env, scope);
  if (status != napi_ok) {
    break;
  }
}
```

When nesting scopes, there are cases where a handle from an
inner scope needs to live beyond the lifespan of that scope. Node-API supports
an 'escapable scope' in order to support this case. An escapable scope
allows one handle to be 'promoted' so that it 'escapes' the
current scope and the lifespan of the handle changes from the current
scope to that of the outer scope.

The methods available to open/close escapable scopes are
`napi_open_escapable_handle_scope` and
`napi_close_escapable_handle_scope`.

The request to promote a handle is made through `napi_escape_handle` which
can only be called once.

#### `napi_open_handle_scope`

```c
NAPI_EXTERN napi_status napi_open_handle_scope(napi_env env,
                                               napi_handle_scope* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[out] result`: `napi_value` representing the new scope.

Returns `napi_ok` if the API succeeded.

This API opens a new scope.

#### `napi_close_handle_scope`

```c
NAPI_EXTERN napi_status napi_close_handle_scope(napi_env env,
                                                napi_handle_scope scope);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] scope`: `napi_value` representing the scope to be closed.

Returns `napi_ok` if the API succeeded.

This API closes the scope passed in. Scopes must be closed in the
reverse order from which they were created.

This API can be called even if there is a pending JavaScript exception.

#### `napi_open_escapable_handle_scope`

```c
NAPI_EXTERN napi_status
    napi_open_escapable_handle_scope(napi_env env,
                                     napi_handle_scope* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[out] result`: `napi_value` representing the new scope.

Returns `napi_ok` if the API succeeded.

This API opens a new scope from which one object can be promoted
to the outer scope.

#### `napi_close_escapable_handle_scope`

```c
NAPI_EXTERN napi_status
    napi_close_escapable_handle_scope(napi_env env,
                                      napi_handle_scope scope);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] scope`: `napi_value` representing the scope to be closed.

Returns `napi_ok` if the API succeeded.

This API closes the scope passed in. Scopes must be closed in the
reverse order from which they were created.

This API can be called even if there is a pending JavaScript exception.

#### `napi_escape_handle`

```c
napi_status napi_escape_handle(napi_env env,
                               napi_escapable_handle_scope scope,
                               napi_value escapee,
                               napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] scope`: `napi_value` representing the current scope.
* `[in] escapee`: `napi_value` representing the JavaScript `Object` to be
  escaped.
* `[out] result`: `napi_value` representing the handle to the escaped `Object`
  in the outer scope.

Returns `napi_ok` if the API succeeded.

This API promotes the handle to the JavaScript object so that it is valid
for the lifetime of the outer scope. It can only be called once per scope.
If it is called more than once an error will be returned.

This API can be called even if there is a pending JavaScript exception.

### References to values with a lifespan longer than that of the native method

In some cases, an addon will need to be able to create and reference values
with a lifespan longer than that of a single native method invocation. For
example, to create a constructor and later use that constructor
in a request to create instances, it must be possible to reference
the constructor object across many different instance creation requests. This
would not be possible with a normal handle returned as a `napi_value` as
described in the earlier section. The lifespan of a normal handle is
managed by scopes and all scopes must be closed before the end of a native
method.

Node-API provides methods for creating persistent references to values.
Currently Node-API only allows references to be created for a
limited set of value types, including object, external, function, and symbol.

Each reference has an associated count with a value of 0 or higher,
which determines whether the reference will keep the corresponding value alive.
References with a count of 0 do not prevent values from being collected.
Values of object (object, function, external) and symbol types are becoming
'weak' references and can still be accessed while they are not collected.
Any count greater than 0 will prevent the values from being collected.

Symbol values have different flavors. The true weak reference behavior is
only supported by local symbols created with the `napi_create_symbol` function
or the JavaScript `Symbol()` constructor calls. Globally registered symbols
created with the `node_api_symbol_for` function or JavaScript `Symbol.for()`
function calls remain always strong references because the garbage collector
does not collect them. The same is true for well-known symbols such as
`Symbol.iterator`. They are also never collected by the garbage collector.

References can be created with an initial reference count. The count can
then be modified through `napi_reference_ref` and
`napi_reference_unref`. If an object is collected while the count
for a reference is 0, all subsequent calls to
get the object associated with the reference `napi_get_reference_value`
will return `NULL` for the returned `napi_value`. An attempt to call
`napi_reference_ref` for a reference whose object has been collected
results in an error.

References must be deleted once they are no longer required by the addon. When
a reference is deleted, it will no longer prevent the corresponding object from
being collected. Failure to delete a persistent reference results in
a 'memory leak' with both the native memory for the persistent reference and
the corresponding object on the heap being retained forever.

There can be multiple persistent references created which refer to the same
object, each of which will either keep the object live or not based on its
individual count. Multiple persistent references to the same object
can result in unexpectedly keeping alive native memory. The native structures
for a persistent reference must be kept alive until finalizers for the
referenced object are executed. If a new persistent reference is created
for the same object, the finalizers for that object will not be
run and the native memory pointed by the earlier persistent reference
will not be freed. This can be avoided by calling
`napi_delete_reference` in addition to `napi_reference_unref` when possible.

**Change History:**

* Version 10 (`NAPI_VERSION` is defined as `10` or higher):

  References can be created for all value types. The new supported value
  types do not support weak reference semantic and the values of these types
  are released when the reference count becomes 0 and cannot be accessed from
  the reference anymore.

#### `napi_create_reference`

```c
NAPI_EXTERN napi_status napi_create_reference(napi_env env,
                                              napi_value value,
                                              uint32_t initial_refcount,
                                              napi_ref* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: The `napi_value` for which a reference is being created.
* `[in] initial_refcount`: Initial reference count for the new reference.
* `[out] result`: `napi_ref` pointing to the new reference.

Returns `napi_ok` if the API succeeded.

This API creates a new reference with the specified reference count
to the value passed in.

#### `napi_delete_reference`

```c
NAPI_EXTERN napi_status napi_delete_reference(napi_env env, napi_ref ref);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] ref`: `napi_ref` to be deleted.

Returns `napi_ok` if the API succeeded.

This API deletes the reference passed in.

This API can be called even if there is a pending JavaScript exception.

#### `napi_reference_ref`

```c
NAPI_EXTERN napi_status napi_reference_ref(napi_env env,
                                           napi_ref ref,
                                           uint32_t* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] ref`: `napi_ref` for which the reference count will be incremented.
* `[out] result`: The new reference count.

Returns `napi_ok` if the API succeeded.

This API increments the reference count for the reference
passed in and returns the resulting reference count.

#### `napi_reference_unref`

```c
NAPI_EXTERN napi_status napi_reference_unref(napi_env env,
                                             napi_ref ref,
                                             uint32_t* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] ref`: `napi_ref` for which the reference count will be decremented.
* `[out] result`: The new reference count.

Returns `napi_ok` if the API succeeded.

This API decrements the reference count for the reference
passed in and returns the resulting reference count.

#### `napi_get_reference_value`

```c
NAPI_EXTERN napi_status napi_get_reference_value(napi_env env,
                                                 napi_ref ref,
                                                 napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] ref`: The `napi_ref` for which the corresponding value is
  being requested.
* `[out] result`: The `napi_value` referenced by the `napi_ref`.

Returns `napi_ok` if the API succeeded.

If still valid, this API returns the `napi_value` representing the
JavaScript value associated with the `napi_ref`. Otherwise, result
will be `NULL`.
