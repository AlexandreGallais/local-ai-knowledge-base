# std::flat_multimap<Key,T,Compare,KeyContainer,MappedContainer>::begin, std::flat_multimap<Key,T,Compare,KeyContainer,MappedContainer>::cbegin

|  |  |  |
| --- | --- | --- |
| `iterator begin() noexcept;` | (1) | (since C++23) |
| `const_iterator begin() const noexcept;` | (2) | (since C++23) |
| `const_iterator cbegin() const noexcept;` | (3) | (since C++23) |

Returns an iterator to the first element of the `flat_multimap`.

If the `flat_multimap` is empty, the returned iterator will be equal to `end()`.

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
    std::flat_multimap<int, int> map{{4, 13}, {9, 94}, {1, 19}, {4, 42}};

    for (auto it = map.cbegin(); it != map.cend(); ++it)
        std::cout << '[' << it->first << "] = " << it->second << '\n';

    // Unlike std::multimap's bidirectional iterators, the std::flat_multimap
    // iterators are random-access, so they can be used with the operator[]:
    auto it = map.cbegin();
    assert(it[1] == 19);
    assert(it[4] == 13);
    assert(it[4] == 42);
    assert(it[9] == 94);
}
```

Output:

```text
[1] = 19
[4] = 13
[4] = 42
[9] = 94
```

### See also

|  |  |
| --- | --- |
| end, cend | returns an iterator to the end (public member function) |
| begin, cbegin (C++11), (C++14) | returns an iterator to the beginning of a container or array (function template) |
