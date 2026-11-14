# std::unordered_multimap<Key,T,Hash,KeyEqual,Allocator>::begin, std::unordered_multimap<Key,T,Hash,KeyEqual,Allocator>::cbegin

|  |  |  |
| --- | --- | --- |
| `iterator begin() noexcept;` | (1) | (since C++11) |
| `const_iterator begin() const noexcept;` | (2) | (since C++11) |
| `const_iterator cbegin() const noexcept;` | (3) | (since C++11) |

Returns an iterator to the first element of the `unordered_multimap`.

If the `unordered_multimap` is empty, the returned iterator will be equal to `end()`.

range-begin-end.svg

### Parameters

(none)

### Return value

Iterator to the first element.

### Complexity

Constant.

### Example

```cpp
#include <algorithm>
#include <cassert>
#include <iostream>
#include <string>
#include <utility>
#include <unordered_map>

int main()
{
    auto show_node = [](const std::pair<std::string, std::string>& node)
    {
        std::cout << node.first << " : " << node.second << '\n';
    };

    std::unordered_multimap<std::string, std::string> lemmas;
    assert(lemmas.begin() == lemmas.end());
    assert(lemmas.cbegin() == lemmas.cend());

    lemmas.insert({ "1. ∀x ∈ N ∃y ∈ N", "x ≤ y" });
    show_node(*lemmas.cbegin());
    assert(lemmas.begin() != lemmas.end());
    assert(lemmas.cbegin() != lemmas.cend());

    lemmas.begin()->second = "x < y";
    show_node(*lemmas.cbegin());

    lemmas.insert({ "2. ∀x, y ∈ N    ", "x = y V x ≠ y" });
    show_node(*lemmas.cbegin());

    lemmas.insert({ "3. ∀x ∈ N ∃y ∈ N", "y = x + 1" });
    show_node(*lemmas.cbegin());

    std::cout << "Lemmas: \n";
    std::for_each(lemmas.cbegin(), lemmas.cend(), [&](const auto& n)
    {
        show_node(n);
    });
    std::cout << '\n';
}
```

Possible output:

```text
1. ∀x ∈ N ∃y ∈ N : x ≤ y
1. ∀x ∈ N ∃y ∈ N : x < y
2. ∀x, y ∈ N     : x = y V x ≠ y
3. ∀x ∈ N ∃y ∈ N : y = x + 1
Lemmas:
3. ∀x ∈ N ∃y ∈ N : y = x + 1
1. ∀x ∈ N ∃y ∈ N : x < y
2. ∀x, y ∈ N     : x = y V x ≠ y
```

### See also

|  |  |
| --- | --- |
| end, cend | returns an iterator to the end (public member function) |
| begin, cbegin (C++11), (C++14) | returns an iterator to the beginning of a container or array (function template) |
