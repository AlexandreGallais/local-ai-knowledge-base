# std::get_unexpected

| Defined in header `<exception>` |  |
| --- | --- |
| `std::unexpected_handler get_unexpected() noexcept;` | (deprecated in C++11) (removed in C++17) |

Returns the currently installed `std::unexpected_handler`, which may be a null pointer.

This function is thread-safe. Prior call to `std::set_unexpected` *synchronizes-with* (see `std::memory_order`) the subsequent calls to this function. (since C++11)

### Parameters

(none)

### Return value

The currently installed `std::unexpected_handler`.

### See also

|  |  |
| --- | --- |
| unexpected_handler (deprecated in C++11), (removed in C++17) | the type of the function called by `std::unexpected` (typedef) |
| set_unexpected (deprecated in C++11), (removed in C++17) | changes the function to be called by `std::unexpected` (function) |
