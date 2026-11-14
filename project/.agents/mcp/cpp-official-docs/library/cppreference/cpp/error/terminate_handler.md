# std::terminate_handler

Defined in header `<exception>`

`typedef void ( *terminate_handler )();`

`std::terminate_handler` is the function pointer type (pointer to function that takes no arguments and returns `void`), which is installed and queried by the functions `std::set_terminate` and `std::get_terminate` and called by `std::terminate`.

A `std::terminate_handler` shall terminate execution of the program without returning to the caller, otherwise the behavior is undefined.

The C++ implementation provides a default `std::terminate_handler` function, which calls `std::abort()`. If the null pointer value is installed (by means of `std::set_terminate`), the implementation may restore the default handler instead.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| terminate | function called when exception handling fails (function) |
| set_terminate | changes the function to be called by `std::terminate` (function) |
| get_terminate (C++11) | obtains the current terminate_handler (function) |
