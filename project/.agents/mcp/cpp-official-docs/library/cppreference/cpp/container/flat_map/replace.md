# std::flat_map<Key,T,Compare,KeyContainer,MappedContainer>::replace

`void replace( key_container_type&& key_cont, mapped_container_type&& mapped_cont );` (since C++23)

Replaces the underlying containers `c`. Equivalent to:

```cpp
c.keys = std::move(key_cont);
c.values = std::move(mapped_cont);
```

The following conditions must be met:

- The expression `key_cont.size() == mapped_cont.size()` is `true`,
- The elements of `key_cont` are sorted with respect to `compare`, and
- `key_cont` does not contain equal elements. Otherwise, the behavior is undefined.

### Parameters

|  |  |  |
| --- | --- | --- |
| keys_cont | - | a sorted keys container of type `KeyContainer`, the contents of which will be moved into `*this` |
| mapped_cont | - | a container of mapped values of type `MappedContainer`, the contents of which will be moved into `*this` |

### Return value

(none)

### Complexity

Equals to complexity of `std::move` applied to adapted containers.

### Example

```cpp
#include <algorithm>
#include <cassert>
#include <flat_map>
#include <print>
#include <vector>

int main()
{
    std::vector<int> keys{1, 2, 3};
    assert(std::ranges::is_sorted(keys));
    std::vector<double> values{2.2, 3.3, 1.1};
    assert(keys.size() == values.size());

    std::flat_map<int, double> map;
    assert(map.empty());

    map.replace(keys, values);
    assert(map.size() == 3);
    assert(map.keys() == 3);
    assert(map.values() == 3);
    assert(keys.empty());
    assert(values.empty());

    std::println("{}", map);
}
```

Output:

```text
{1: 2.2, 2: 3.3, 3: 1.1}
```

### See also

extract extracts the underlying containers (public member function)
