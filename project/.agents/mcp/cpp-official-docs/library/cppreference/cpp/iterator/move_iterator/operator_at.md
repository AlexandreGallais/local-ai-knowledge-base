# std::move_iterator<Iter>::operator[]

|  |  |
| --- | --- |
| `/* unspecified */ operator[]( difference_type n ) const;` | (constexpr since C++17) (until C++20) |
| `constexpr reference operator[]( difference_type n ) const;` | (since C++20) |

Returns a reference to the element at specified relative location.

### Parameters

n - position relative to current location

### Return value

`std::move(current [n])`(until C++20)`ranges::iter_move(current + n)`(since C++20)

### Notes

The return type is unspecified because the return type of the underlying iterator's `operator[]` is also unspecified (see LegacyRandomAccessIterator). (until C++20)

### Example

```cpp
#include <cstddef>
#include <iomanip>
#include <iostream>
#include <iterator>
#include <list>
#include <string>
#include <vector>

void print(auto rem, const auto& v)
{
    for (std::cout << rem; const auto& e : v)
        std::cout << std::quoted(e) << ' ';
    std::cout << '\n';
}

int main()
{
    std::vector<std::string> p{"alpha", "beta", "gamma", "delta"}, q;
    print("1) p: ", p);

    std::move_iterator it{p.begin()};

    for (std::size_t t{}; t != p.size(); ++t)
        q.emplace_back(it[t]);

    print("2) p: ", p);
    print("3) q: ", q);

    std::list l{1, 2, 3};
    std::move_iterator it2{l.begin()};
//  it2[1] = 13; // Compilation error: the underlying iterator
                 // does not model the random access iterator
//  *it2 = 999;  // Compilation error: using rvalue as lvalue
}
```

Possible output:

```text
1) p: "alpha" "beta" "gamma" "delta"
2) p: "" "" "" ""
3) q: "alpha" "beta" "gamma" "delta"
```

### See also

operator*, operator-> (C++11), (C++11)(deprecated in C++20) accesses the pointed-to element (public member function)
