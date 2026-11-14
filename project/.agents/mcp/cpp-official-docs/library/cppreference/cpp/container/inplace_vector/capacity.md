# std::inplace_vector<T,N>::capacity

`static constexpr size_type capacity() noexcept;` (since C++26)

Returns the capacity of the internal (inplace) storage. Equivalent to: `return N;`.

### Parameters

(none)

### Return value

The maximum number of elements the container is able to hold.

### Complexity

Constant.

### Notes

Because each `std::inplace_vector<T, N>` is a fixed-capacity container, the value returned by `capacity` equals `N` (which is also the value returned by `max_size()`).

### Example

```cpp
#include <inplace_vector>

int main()
{
    constexpr std::inplace_vector<int, 4> v1;
    static_assert(v1.capacity() == 4 && v1.max_size() == 4);

    constexpr std::inplace_vector<int, 0> v2;
    static_assert(v2.capacity() == 0 && v2.max_size() == 0);
}
```

### See also

|  |  |
| --- | --- |
| max_size [static] | returns the maximum possible number of elements (public static member function) |
| size | returns the number of elements (public member function) |
| resize | changes the number of elements stored (public member function) |
| empty | checks whether the container is empty (public member function) |
| reserve [static] | reserves storage (public static member function) |
