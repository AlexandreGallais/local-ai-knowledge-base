# std::inplace_vector<T,N>::reserve

`static constexpr void reserve( size_type new_cap );` (since C++26)

Does nothing, except that may throw `std::bad_alloc`. The request to increase the capacity (i.e., the internal storage size) is ignored because `std::inplace_vector<T, N>` is a fixed-capacity container.

### Parameters

new_cap - new capacity of the `inplace_vector`, in number of elements

### Return value

(none)

### Complexity

Constant.

### Exceptions

`std::bad_alloc` if `new_cap > capacity()` is `true`.

### Notes

This function exists for compatibility with vector-like interfaces.

### Example

```cpp
#include <cassert>
#include <inplace_vector>
#include <iostream>

int main()
{
    std::inplace_vector<int, 4> v{1, 2, 3};
    assert(v.capacity() == 4 && v.size() == 3);

    v.reserve(2); // does nothing
    assert(v.capacity() == 4 && v.size() == 3);

    try
    {
        v.reserve(13); // throws, because requested capacity > N; v is left unchanged
    }
    catch(const std::bad_alloc& ex)
    {
        std::cout << ex.what() << '\n';
    }
    assert(v.capacity() == 4 && v.size() == 3);
}
```

Possible output:

```text
std::bad_alloc
```

### See also

|  |  |
| --- | --- |
| size | returns the number of elements (public member function) |
| max_size [static] | returns the maximum possible number of elements (public static member function) |
| resize | changes the number of elements stored (public member function) |
| capacity [static] | returns the number of elements that can be held in currently allocated storage (public static member function) |
| shrink_to_fit [static] | reduces memory usage by freeing unused memory (public static member function) |
