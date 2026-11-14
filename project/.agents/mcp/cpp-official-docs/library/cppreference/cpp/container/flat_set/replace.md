# std::flat_set<Key,Compare,KeyContainer>::replace

`void replace( container_type&& cont );` (since C++23)

Replaces the underlying container `c`. Equivalent to: `c = std::move(cont);`.

The elements of `cont` must be sorted with respect to `compare`, and `cont` must not contain equal elements. Otherwise, the behavior is undefined.

### Parameters

cont - a sorted container of type `KeyContainer`, the contents of which will be moved into `*this`

### Return value

(none)

### Complexity

Equals to complexity of `std::move` applied to adapted container.

### Example

```cpp
#include <algorithm>
#include <cassert>
#include <flat_set>
#include <print>
#include <vector>

int main()
{
    std::vector<int> keys{1, 2, 3};
    assert(std::ranges::is_sorted(keys));

    std::flat_set<int> set;
    assert(set.empty());

    set.replace(keys);
    assert(set.size() == 3);
    assert(keys.empty());

    std::println("{}", set); // set.keys()
}
```

Output:

```text
[1, 2, 3]
```

### See also

extract extracts the underlying container (public member function)
