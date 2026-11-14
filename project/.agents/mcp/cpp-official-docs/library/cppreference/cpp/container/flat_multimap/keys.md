# std::flat_multimap<Key,T,Compare,KeyContainer,MappedContainer>::keys

`const key_container_type& keys() const noexcept;` (since C++23)

Return a constant reference to the adapted keys container. Equivalent to `return c.keys;`.

### Parameters

(none)

### Return value

The underlying keys container.

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
    std::flat_multimap<int, double> adaptor{{1, 1.1}, {2, 2.2}, {3, 3.3}};

    // The default keys container is std::vector:
    static_assert(std::is_same_v<decltype(adaptor.keys()), const std::vector<int>&>);

    std::println("{}", adaptor.keys());
}
```

Output:

```text
[1, 2, 3]
```

### See also

values direct access to the underlying values container (public member function)
