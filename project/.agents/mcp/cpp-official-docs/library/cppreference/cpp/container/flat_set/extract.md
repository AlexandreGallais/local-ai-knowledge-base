# std::flat_set<Key,Compare,KeyContainer>::extract

`container_type extract() &&;` (since C++23)

Extracts adapted container `c`. Equivalent to `return std::move(c);`.

After this operation `*this` is empty, even if an exception is thrown.

### Parameters

(none)

### Return value

`std::move(c)`.

### Complexity

Constant.

### Example

```cpp
#include <cassert>
#include <flat_set>
#include <print>
#include <type_traits>
#include <vector>

int main()
{
    std::flat_set<int> set{1, 2, 3};
    const auto size = set.size();

    auto c = set.extract();
    assert(c.size() == size);
    assert(set.empty());
    assert(set.keys().empty());
    assert(set.values().empty());

    // The default keys container is std::vector:
    static_assert(std::is_same_v<decltype(c), std::vector<int>>);

    std::println("{}", c);
}
```

Output:

```text
[1, 2, 3]
```

### See also

replace replaces the underlying container (public member function)
