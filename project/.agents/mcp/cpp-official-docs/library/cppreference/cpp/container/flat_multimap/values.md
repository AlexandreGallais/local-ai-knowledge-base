# std::flat_multimap<Key,T,Compare,KeyContainer,MappedContainer>::values

`const mapped_container_type& values() const noexcept;` (since C++23)

Return a constant reference to the adapted values container. Equivalent to `return c.values;`.

### Parameters

(none)

### Return value

The underlying values container.

### Complexity

Constant.

### Example

```cpp
#include <flat_map>
#include <print>
#include <type_traits>
#include <vector>

int main()
{
    std::flat_multimap<int, double> map{{1, 1.1}, {2, 2.2}, {3, 3.3}};

    // The default values container is std::vector:
    static_assert(std::is_same_v<decltype(map.values()), const std::vector<int>&>);

    std::println("{}", map.values());
}
```

Output:

```text
[1.1, 2.2, 3.3]
```

### See also

keys direct access to the underlying keys container (public member function)
