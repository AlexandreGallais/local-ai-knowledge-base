# std::max_align_t

| Defined in header `<cstddef>` |  |
| --- | --- |
| `typedef /* implementation-defined */ max_align_t;` | (since C++11) |

`std::max_align_t` is a standard-layout TrivialType(until C++26)TriviallyCopyable type(since C++26) whose alignment requirement is at least as strict (as large) as that of every scalar type.

`std::is_trivially_default_constructible_v<std::max_align_t>` is `true`.

### Notes

Pointers returned by allocation functions such as `std::malloc` are suitably aligned for any object, which means they are aligned at least as strictly as `std::max_align_t`.

### Example

```cpp
#include <cstddef>
#include <iostream>

int main()
{
    std::cout << alignof(std::max_align_t) << '\n';
}
```

Possible output:

```text
16
```

### References

- C++23 standard (ISO/IEC 14882:2024):

- 17.2.4 Sizes, alignments, and offsets [support.types.layout] (p: 504-505)

- C++20 standard (ISO/IEC 14882:2020):

- 17.2.4 Sizes, alignments, and offsets [support.types.layout] (p: 507-508)

- C++17 standard (ISO/IEC 14882:2017):

- 21.2.4 Sizes, alignments, and offsets [support.types.layout] (p: 479)

- C++14 standard (ISO/IEC 14882:2014):

- 18.2 Types [support.types] (p: 443-444)

- C++11 standard (ISO/IEC 14882:2011):

- 18.2 Types [support.types] (p: 454-455)

### See also

|  |  |
| --- | --- |
| `alignof` (C++11) | queries alignment requirements of a type (operator) |
| alignment_of (C++11) | obtains the type's alignment requirements (class template) |
| is_scalar (C++11) | checks if a type is a scalar type (class template) |
| C documentation for max_align_t |  |
