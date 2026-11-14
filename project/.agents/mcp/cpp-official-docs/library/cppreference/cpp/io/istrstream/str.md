# std::istrstream::str

`char* str();` (deprecated in C++98) (removed in C++26)

Returns the pointer to the beginning of the buffer, after freezing it. Effectively calls `rdbuf()->str()`.

### Parameters

(none)

### Return value

Pointer to the beginning of the buffer in the associated `std::strstreambuf` or a null pointer if no buffer is available.

### Example

This section is incomplete Reason: no example
