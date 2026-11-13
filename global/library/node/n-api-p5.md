---
title: "Node-API (part 5 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API (part 5 of 23)

### Fatal errors

In the event of an unrecoverable error in a native addon, a fatal error can be
thrown to immediately terminate the process.

#### `napi_fatal_error`

```c
NAPI_NO_RETURN void napi_fatal_error(const char* location,
                                     size_t location_len,
                                     const char* message,
                                     size_t message_len);
```

* `[in] location`: Optional location at which the error occurred.
* `[in] location_len`: The length of the location in bytes, or
  `NAPI_AUTO_LENGTH` if it is null-terminated.
* `[in] message`: The message associated with the error.
* `[in] message_len`: The length of the message in bytes, or `NAPI_AUTO_LENGTH`
  if it is null-terminated.

The function call does not return, the process will be terminated.

This API can be called even if there is a pending JavaScript exception.
