# std::filesystem::directory_iterator::operator++, std::filesystem::directory_iterator::increment

|  |  |  |
| --- | --- | --- |
| `directory_iterator& operator++();` | (1) | (since C++17) |
| `directory_iterator& increment( std::error_code& ec );` | (2) | (since C++17) |

Advances the iterator to the next entry. Invalidates all copies of the previous value of `*this`.

This section is incomplete

### Parameters

ec - error code to store error status to

### Return value

`*this`

### Exceptions

Any overload not marked `noexcept` may throw `std::bad_alloc` if memory allocation fails.

1) Throws `std::filesystem::filesystem_error` on underlying OS API errors, constructed with the OS error code as the error code argument.

2) Sets a `std::error_code&` parameter to the OS API error code if an OS API call fails, and executes `ec.clear()` if no errors occur.

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3013 | C++17 | `error_code` overload marked noexcept but can allocate memory | noexcept removed |
