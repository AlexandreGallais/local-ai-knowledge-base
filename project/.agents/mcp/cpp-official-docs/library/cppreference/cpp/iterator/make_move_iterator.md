# std::make_move_iterator

| Defined in header `<iterator>` |  |
| --- | --- |
| `template< class Iter > std::move_iterator<Iter> make_move_iterator( Iter i );` | (since C++11) (constexpr since C++17) |

`make_move_iterator` is a convenience function template that constructs a `std::move_iterator` for the given iterator `i` with the type deduced from the type of the argument.

### Parameters

i - input iterator to be converted to move iterator

### Return value

`std::move_iterator<Iter>(std::move(i))`

### Example

```cpp
#include <iomanip>
#include <iostream>
#include <iterator>
#include <list>
#include <string>
#include <vector>

auto print = [](const auto rem, const auto& seq)
{
    for (std::cout << rem; const auto& str : seq)
        std::cout << std::quoted(str) << ' ';
    std::cout << '\n';
};

int main()
{
    std::list<std::string> s{"one", "two", "three"};

    std::vector<std::string> v1(s.begin(), s.end()); // copy

    std::vector<std::string> v2(std::make_move_iterator(s.begin()),
                                std::make_move_iterator(s.end())); // move

    print("v1 now holds: ", v1);
    print("v2 now holds: ", v2);
    print("original list now holds: ", s);
}
```

Possible output:

```text
v1 now holds: "one" "two" "three"
v2 now holds: "one" "two" "three"
original list now holds: "" "" ""
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2061 | C++11 | `make_move_iterator` did not convert array arguments to pointers | made to convert |

### See also

|  |  |
| --- | --- |
| move_iterator (C++11) | iterator adaptor which dereferences to an rvalue (class template) |
| move (C++11) | converts the argument to an xvalue (function template) |
