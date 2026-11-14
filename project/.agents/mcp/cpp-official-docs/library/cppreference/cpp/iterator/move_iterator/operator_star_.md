# std::move_iterator<Iter>::operator*,->

|  |  |  |
| --- | --- | --- |
| `reference operator*() const;` | (1) | (since C++11) (constexpr since C++17) |
| `pointer operator->() const;` | (2) | (since C++11) (constexpr since C++17) (deprecated in C++20) |

Returns an rvalue reference or pointer to the current element.

### Return value

1) `static_cast<reference>(*current )`(until C++20)`ranges::iter_move(current )`(since C++20)

2) `current`

### Notes

`operator->` is deprecated because deferencing its result may yield an lvalue. This may lead to unintended behavior.

### Example

```cpp
#include <iomanip>
#include <iostream>
#include <iterator>
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
    for (std::move_iterator it{p.begin()}, end{p.end()}; it != end; ++it)
    {
        it->push_back('!'); // calls -> string::push_back(char)
        q.emplace_back(*it); // *it <- overload (1)
    }
    print("2) p: ", p);
    print("3) q: ", q);

    std::vector v{1, 2, 3};
    std::move_iterator it{v.begin()};
    // *it = 13; // error: using rvalue as lvalue
}
```

Possible output:

```text
1) p: "alpha" "beta" "gamma" "delta"
2) p: "" "" "" ""
3) q: "alpha!" "beta!" "gamma!" "delta!"
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2106 | C++11 | `operator*` would return a dangling reference if `*current` yields a prvalue | returns the object in this case |

### See also

operator[] (C++11) accesses an element by index (public member function)
