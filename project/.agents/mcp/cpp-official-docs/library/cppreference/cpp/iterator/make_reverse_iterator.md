# std::make_reverse_iterator

| Defined in header `<iterator>` |  |
| --- | --- |
| `template< class Iter > std::reverse_iterator<Iter> make_reverse_iterator( Iter i );` | (since C++14) (constexpr since C++17) |

`make_reverse_iterator` is a convenience function template that constructs a `std::reverse_iterator` for the given iterator `i` (which must be a LegacyBidirectionalIterator) with the type deduced from the type of the argument.

### Parameters

i - iterator to be converted to reverse iterator

### Return value

`std::reverse_iterator<Iter>(i)`

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_make_reverse_iterator` | `201402L` | (C++14) | `std::make_reverse_iterator` |

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <iterator>
#include <vector>

int main()
{
    std::vector<int> v{1, 3, 10, 8, 22};

    std::sort(v.begin(), v.end());
    std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout, ", "));
    std::cout << '\n';

    std::copy(std::make_reverse_iterator(v.end()),
              std::make_reverse_iterator(v.begin()),
              std::ostream_iterator<int>(std::cout, ", "));
    std::cout << '\n';
}
```

Output:

```text
1, 3, 8, 10, 22,
22, 10, 8, 3, 1,
```

### See also

|  |  |
| --- | --- |
| reverse_iterator | iterator adaptor for reverse-order traversal (class template) |
| rbegin, crbegin (C++14) | returns a reverse iterator to the beginning of a container or array (function template) |
| rend, crend (C++14) | returns a reverse end iterator for a container or array (function template) |
