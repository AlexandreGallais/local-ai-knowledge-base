# std::end(std::initializer_list)

| Defined in header `<initializer_list>` |  |
| --- | --- |
| `template< class E > const E* end( std::initializer_list<E> il ) noexcept;` | (since C++11) (constexpr since C++14) |

The overload of `std::end` for `initializer_list` returns a pointer to one past the last element of `il`.

### Parameters

il - an `initializer_list`

### Return value

`il.end()`

### Example

```cpp
#include <cassert>
#include <initializer_list>
#include <iterator>
#include <numeric>

int main()
{
    std::initializer_list e = {2, 7, 1, 8, 2, 8, 1};
    assert(std::accumulate(std::begin(e), std::end(e), 13) == 42);
}
```

### See also

end returns a pointer to one past the last element (public member function)
