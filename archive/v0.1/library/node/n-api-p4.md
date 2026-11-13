---
title: "Node-API (part 4 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 4 of 23)

## Error handling

Node-API uses both return values and JavaScript exceptions for error handling.
The following sections explain the approach for each case.

### Return values

All of the Node-API functions share the same error handling pattern. The
return type of all API functions is `napi_status`.

The return value will be `napi_ok` if the request was successful and
no uncaught JavaScript exception was thrown. If an error occurred AND
an exception was thrown, the `napi_status` value for the error
will be returned. If an exception was thrown, and no error occurred,
`napi_pending_exception` will be returned.

In cases where a return value other than `napi_ok` or
`napi_pending_exception` is returned, `napi_is_exception_pending`
must be called to check if an exception is pending.
See the section on exceptions for more details.

The full set of possible `napi_status` values is defined
in `napi_api_types.h`.

The `napi_status` return value provides a VM-independent representation of
the error which occurred. In some cases it is useful to be able to get
more detailed information, including a string representing the error as well as
VM (engine)-specific information.

In order to retrieve this information `napi_get_last_error_info`
is provided which returns a `napi_extended_error_info` structure.
The format of the `napi_extended_error_info` structure is as follows:

```c
typedef struct napi_extended_error_info {
  const char* error_message;
  void* engine_reserved;
  uint32_t engine_error_code;
  napi_status error_code;
};
```

* `error_message`: Textual representation of the error that occurred.
* `engine_reserved`: Opaque handle reserved for engine use only.
* `engine_error_code`: VM specific error code.
* `error_code`: Node-API status code for the last error.

`napi_get_last_error_info` returns the information for the last
Node-API call that was made.

Do not rely on the content or format of any of the extended information as it
is not subject to SemVer and may change at any time. It is intended only for
logging purposes.

#### `napi_get_last_error_info`

```c
napi_status
napi_get_last_error_info(node_api_basic_env env,
                         const napi_extended_error_info** result);
```

* `[in] env`: The environment that the API is invoked under.
* `[out] result`: The `napi_extended_error_info` structure with more
  information about the error.

Returns `napi_ok` if the API succeeded.

This API retrieves a `napi_extended_error_info` structure with information
about the last error that occurred.

The content of the `napi_extended_error_info` returned is only valid up until
a Node-API function is called on the same `env`. This includes a call to
`napi_is_exception_pending` so it may often be necessary to make a copy
of the information so that it can be used later. The pointer returned
in `error_message` points to a statically-defined string so it is safe to use
that pointer if you have copied it out of the `error_message` field (which will
be overwritten) before another Node-API function was called.

Do not rely on the content or format of any of the extended information as it
is not subject to SemVer and may change at any time. It is intended only for
logging purposes.

This API can be called even if there is a pending JavaScript exception.

### Exceptions

Any Node-API function call may result in a pending JavaScript exception. This is
the case for any of the API functions, even those that may not cause the
execution of JavaScript.

If the `napi_status` returned by a function is `napi_ok` then no
exception is pending and no additional action is required. If the
`napi_status` returned is anything other than `napi_ok` or
`napi_pending_exception`, in order to try to recover and continue
instead of simply returning immediately, `napi_is_exception_pending`
must be called in order to determine if an exception is pending or not.

In many cases when a Node-API function is called and an exception is
already pending, the function will return immediately with a
`napi_status` of `napi_pending_exception`. However, this is not the case
for all functions. Node-API allows a subset of the functions to be
called to allow for some minimal cleanup before returning to JavaScript.
In that case, `napi_status` will reflect the status for the function. It
will not reflect previous pending exceptions. To avoid confusion, check
the error status after every function call.

When an exception is pending one of two approaches can be employed.

The first approach is to do any appropriate cleanup and then return so that
execution will return to JavaScript. As part of the transition back to
JavaScript, the exception will be thrown at the point in the JavaScript
code where the native method was invoked. The behavior of most Node-API calls
is unspecified while an exception is pending, and many will simply return
`napi_pending_exception`, so do as little as possible and then return to
JavaScript where the exception can be handled.

The second approach is to try to handle the exception. There will be cases
where the native code can catch the exception, take the appropriate action,
and then continue. This is only recommended in specific cases
where it is known that the exception can be safely handled. In these
cases `napi_get_and_clear_last_exception` can be used to get and
clear the exception. On success, result will contain the handle to
the last JavaScript `Object` thrown. If it is determined, after
retrieving the exception, the exception cannot be handled after all
it can be re-thrown it with `napi_throw` where error is the
JavaScript value to be thrown.

The following utility functions are also available in case native code
needs to throw an exception or determine if a `napi_value` is an instance
of a JavaScript `Error` object: `napi_throw_error`,
`napi_throw_type_error`, `napi_throw_range_error`, `node_api_throw_syntax_error` and `napi_is_error`.

The following utility functions are also available in case native
code needs to create an `Error` object: `napi_create_error`,
`napi_create_type_error`, `napi_create_range_error` and `node_api_create_syntax_error`,
where result is the `napi_value` that refers to the newly created
JavaScript `Error` object.

The Node.js project is adding error codes to all of the errors
generated internally. The goal is for applications to use these
error codes for all error checking. The associated error messages
will remain, but will only be meant to be used for logging and
display with the expectation that the message can change without
SemVer applying. In order to support this model with Node-API, both
in internal functionality and for module specific functionality
(as its good practice), the `throw_` and `create_` functions
take an optional code parameter which is the string for the code
to be added to the error object. If the optional parameter is `NULL`
then no code will be associated with the error. If a code is provided,
the name associated with the error is also updated to be:

```text
originalName [code]
```

where `originalName` is the original name associated with the error
and `code` is the code that was provided. For example, if the code
is `'ERR_ERROR_1'` and a `TypeError` is being created the name will be:

```text
TypeError [ERR_ERROR_1]
```

#### `napi_throw`

```c
NAPI_EXTERN napi_status napi_throw(napi_env env, napi_value error);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] error`: The JavaScript value to be thrown.

Returns `napi_ok` if the API succeeded.

This API throws the JavaScript value provided.

#### `napi_throw_error`

```c
NAPI_EXTERN napi_status napi_throw_error(napi_env env,
                                         const char* code,
                                         const char* msg);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] code`: Optional error code to be set on the error.
* `[in] msg`: C string representing the text to be associated with the error.

Returns `napi_ok` if the API succeeded.

This API throws a JavaScript `Error` with the text provided.

#### `napi_throw_type_error`

```c
NAPI_EXTERN napi_status napi_throw_type_error(napi_env env,
                                              const char* code,
                                              const char* msg);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] code`: Optional error code to be set on the error.
* `[in] msg`: C string representing the text to be associated with the error.

Returns `napi_ok` if the API succeeded.

This API throws a JavaScript `TypeError` with the text provided.

#### `napi_throw_range_error`

```c
NAPI_EXTERN napi_status napi_throw_range_error(napi_env env,
                                               const char* code,
                                               const char* msg);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] code`: Optional error code to be set on the error.
* `[in] msg`: C string representing the text to be associated with the error.

Returns `napi_ok` if the API succeeded.

This API throws a JavaScript `RangeError` with the text provided.

#### `node_api_throw_syntax_error`

```c
NAPI_EXTERN napi_status node_api_throw_syntax_error(napi_env env,
                                                    const char* code,
                                                    const char* msg);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] code`: Optional error code to be set on the error.
* `[in] msg`: C string representing the text to be associated with the error.

Returns `napi_ok` if the API succeeded.

This API throws a JavaScript `SyntaxError` with the text provided.

#### `napi_is_error`

```c
NAPI_EXTERN napi_status napi_is_error(napi_env env,
                                      napi_value value,
                                      bool* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] value`: The `napi_value` to be checked.
* `[out] result`: Boolean value that is set to true if `napi_value` represents
  an error, false otherwise.

Returns `napi_ok` if the API succeeded.

This API queries a `napi_value` to check if it represents an error object.

#### `napi_create_error`

```c
NAPI_EXTERN napi_status napi_create_error(napi_env env,
                                          napi_value code,
                                          napi_value msg,
                                          napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] code`: Optional `napi_value` with the string for the error code to be
  associated with the error.
* `[in] msg`: `napi_value` that references a JavaScript `string` to be used as
  the message for the `Error`.
* `[out] result`: `napi_value` representing the error created.

Returns `napi_ok` if the API succeeded.

This API returns a JavaScript `Error` with the text provided.

#### `napi_create_type_error`

```c
NAPI_EXTERN napi_status napi_create_type_error(napi_env env,
                                               napi_value code,
                                               napi_value msg,
                                               napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] code`: Optional `napi_value` with the string for the error code to be
  associated with the error.
* `[in] msg`: `napi_value` that references a JavaScript `string` to be used as
  the message for the `Error`.
* `[out] result`: `napi_value` representing the error created.

Returns `napi_ok` if the API succeeded.

This API returns a JavaScript `TypeError` with the text provided.

#### `napi_create_range_error`

```c
NAPI_EXTERN napi_status napi_create_range_error(napi_env env,
                                                napi_value code,
                                                napi_value msg,
                                                napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] code`: Optional `napi_value` with the string for the error code to be
  associated with the error.
* `[in] msg`: `napi_value` that references a JavaScript `string` to be used as
  the message for the `Error`.
* `[out] result`: `napi_value` representing the error created.

Returns `napi_ok` if the API succeeded.

This API returns a JavaScript `RangeError` with the text provided.

#### `node_api_create_syntax_error`

```c
NAPI_EXTERN napi_status node_api_create_syntax_error(napi_env env,
                                                     napi_value code,
                                                     napi_value msg,
                                                     napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] code`: Optional `napi_value` with the string for the error code to be
  associated with the error.
* `[in] msg`: `napi_value` that references a JavaScript `string` to be used as
  the message for the `Error`.
* `[out] result`: `napi_value` representing the error created.

Returns `napi_ok` if the API succeeded.

This API returns a JavaScript `SyntaxError` with the text provided.

#### `napi_get_and_clear_last_exception`

```c
napi_status napi_get_and_clear_last_exception(napi_env env,
                                              napi_value* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[out] result`: The exception if one is pending, `NULL` otherwise.

Returns `napi_ok` if the API succeeded.

This API can be called even if there is a pending JavaScript exception.

#### `napi_is_exception_pending`

```c
napi_status napi_is_exception_pending(napi_env env, bool* result);
```

* `[in] env`: The environment that the API is invoked under.
* `[out] result`: Boolean value that is set to true if an exception is pending.

Returns `napi_ok` if the API succeeded.

This API can be called even if there is a pending JavaScript exception.

#### `napi_fatal_exception`

```c
napi_status napi_fatal_exception(napi_env env, napi_value err);
```

* `[in] env`: The environment that the API is invoked under.
* `[in] err`: The error that is passed to `'uncaughtException'`.

Trigger an `'uncaughtException'` in JavaScript. Useful if an async
callback throws an exception with no way to recover.
