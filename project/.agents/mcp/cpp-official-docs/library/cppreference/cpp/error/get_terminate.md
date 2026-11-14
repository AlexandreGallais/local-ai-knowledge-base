# std::get_terminate

| Defined in header `<exception>` |  |
| --- | --- |
| `std::terminate_handler get_terminate() noexcept;` | (since C++11) |

Returns the currently installed `std::terminate_handler`, which may be a null pointer.

This function is thread-safe. Prior call to `std::set_terminate` *synchronizes-with* (see `std::memory_order`) this function.

### Parameters

(none)

### Return value

The currently installed `std::terminate_handler`.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| terminate_handler | the type of the function called by `std::terminate` (typedef) |
| set_terminate | changes the function to be called by `std::terminate` (function) |
