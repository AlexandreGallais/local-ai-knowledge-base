# std::is_sufficiently_aligned

| Defined in header `<memory>` |  |
| --- | --- |
| `template< std::size_t N, class T > bool is_sufficiently_aligned( T* ptr );` | (since C++26) |

Checks whether the pointer `ptr` points to an object whose alignment has a value of at least `N`.

The behavior is undefined if `ptr` does not point to an object of type `T` (ignoring cv-qualification at every level).

### Return value

`true` if `ptr` points to an object that has alignment at least `N`; otherwise `false`.

### Exceptions

Throws nothing.

### Notes

`std::is_sufficiently_aligned` can be used as a precondition to `std::assume_aligned`.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_is_sufficiently_aligned` | `202411L` | (C++26) | `std::is_sufficiently_aligned` |

### Possible implementation

`template<std::size_t N, class T> bool is_sufficiently_aligned(T* ptr) { return std::bit_cast<std::uintptr_t>(ptr) % N == 0; }`

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| `alignof` (C++11) | queries alignment requirements of a type (operator) |
| `alignas` (C++11) | specifies that the storage for the variable should be aligned by specific amount (specifier) |
| aligned_storage (since C++11), (deprecated in C++23) | defines the type suitable for use as uninitialized storage for types of given size (class template) |
| align (C++11) | aligns a pointer in a buffer (function) |
| aligned_accessor (C++26) | a type for aligned access to elements of `mdspan` (class template) |
