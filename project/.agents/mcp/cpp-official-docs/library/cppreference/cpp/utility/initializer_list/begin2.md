# std::begin(std::initializer_list)

| Defined in header `<initializer_list>` |  |
| --- | --- |
| `template< class E > const E* begin( std::initializer_list<E> il ) noexcept;` | (since C++11) (constexpr since C++14) |

The overload of `std::begin` for `initializer_list` returns a pointer to the first element of `il`.

### Parameters

il - an `initializer_list`

### Return value

`il.begin()`

### Example

```cpp
#include <algorithm>
#include <initializer_list>
#include <iostream>
#include <iterator>

int main()
{
    std::initializer_list ϕ = {'1', '.', '6', '1', '8', '0'};

    std::copy(std::begin(ϕ),
              std::end(ϕ),
              std::ostream_iterator<char>(std::cout, ""));

    std::cout << '\n';
}
```

Output:

```text
1.6180
```

### See also

begin returns a pointer to the first element (public member function)
