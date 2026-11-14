# std::move_iterator<Iter>::base

|  |  |  |
| --- | --- | --- |
|  | (1) |  |
| `iterator_type base() const;` |  | (constexpr since C++17) (until C++20) |
| `constexpr const iterator_type& base() const& noexcept;` |  | (since C++20) |
| `constexpr iterator_type base() &&;` | (2) | (since C++20) |

Returns the underlying iterator.

1) Returns a copy of(until C++20)reference to(since C++20) the underlying iterator.

2) Returns an iterator move constructed from the underlying iterator.

### Return value

1) `current`

2) `std::move(current )`

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <iterator>
#include <vector>

int main()
{
    std::vector<int> v{0, 1, 2, 3, 4};
    std::move_iterator<std::vector<int>::reverse_iterator>
        m1{v.rbegin()},
        m2{v.rend()};

    std::copy(m1.base(), m2.base(), std::ostream_iterator<int>(std::cout, " "));
    std::cout << '\n';
}
```

Output:

```text
4 3 2 1 0
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3391 | C++20 | overload (1) returned a copy of the underlying iterator | returns a reference |
| LWG 3593 | C++20 | overload (1) was not noexcept | made noexcept |

### See also

operator*, operator-> (C++11), (C++11)(deprecated in C++20) accesses the pointed-to element (public member function)
