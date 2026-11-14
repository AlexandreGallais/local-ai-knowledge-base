# std::align_val_t

| Defined in header `<new>` |  |
| --- | --- |
| `enum class align_val_t : std::size_t {};` | (since C++17) |

Both new-expression and delete-expression, when used with objects whose alignment requirement is greater than `__STDCPP_DEFAULT_NEW_ALIGNMENT__`, pass that alignment requirement as an argument of type `std::align_val_t` to the selected allocation/deallocation function.

### Notes

Alignment (as obtained by `alignof`) has the type `std::size_t`, but placement forms of allocation and deallocation functions that take `std::size_t` as an additional parameter are already in use, so this type is used instead.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_aligned_new` | `201606L` | (C++17) | Dynamic memory allocation for over-aligned data |

### See also

|  |  |
| --- | --- |
| operator new, operator new[] | allocation functions (function) |
| operator delete, operator delete[] | deallocation functions (function) |
