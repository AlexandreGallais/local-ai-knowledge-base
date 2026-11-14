# std::flat_map<Key,T,Compare,KeyContainer,MappedContainer>::begin, std::flat_map<Key,T,Compare,KeyContainer,MappedContainer>::cbegin

|  |  |  |
| --- | --- | --- |
| `iterator begin() noexcept;` | (1) | (since C++23) |
| `const_iterator begin() const noexcept;` | (2) | (since C++23) |
| `const_iterator cbegin() const noexcept;` | (3) | (since C++23) |

Returns an iterator to the first element of the `flat_map`.

If the `flat_map` is empty, the returned iterator will be equal to `end()`.

range-begin-end.svg

### Parameters

(none)

### Return value

Iterator to the first element.

### Complexity

Constant.

### Example

```cpp
#include <iostream>
#include <flat_map>

int main()
{
    std::flat_map<int, double> map{{4, 4.13}, {9, 9.24}, {1, 1.09}};

    for (auto it = map.cbegin(); it != map.cend(); ++it)
        std::cout << '[' << it->first << "] = " << it->second << '\n';

    // Unlike std::map's bidirectional iterators, the std::flat_map iterators
    // are random-access, so they can be used with the operator[]:
    auto it = map.cbegin();
    assert(it[0] == map[1]);
    assert(it[1] == map[4]);
    assert(it[2] == map[9]);
}
```

Output:

```text
[1] = 1.09
[4] = 4.13
[9] = 9.24
```

### See also

|  |  |
| --- | --- |
| end, cend | returns an iterator to the end (public member function) |
| begin, cbegin (C++11), (C++14) | returns an iterator to the beginning of a container or array (function template) |
