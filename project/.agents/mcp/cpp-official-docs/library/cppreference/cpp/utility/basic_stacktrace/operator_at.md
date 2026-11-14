# std::basic_stacktrace<Allocator>::operator[]

`const_reference operator[]( size_type pos ) const;` (since C++23)

Returns a reference to the entry at specified location `pos`. No bounds checking is performed.

If `pos` is not within the range of the stacktrace, i.e. `pos >= size()`, the behavior is undefined.

### Parameters

pos - position of the stacktrace entry to return

### Return value

Reference to the requested entry.

### Exceptions

Throws nothing.

### Complexity

Constant.

### Example

This section is incomplete Reason: no example

### See also

at access specified stacktrace entry with bounds checking (public member function)
