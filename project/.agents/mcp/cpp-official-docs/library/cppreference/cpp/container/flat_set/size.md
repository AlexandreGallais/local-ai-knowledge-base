# std::flat_set<Key,Compare,KeyContainer>::size

`size_type size() const noexcept;` (since C++23)

Returns the number of elements in the container adaptor. Equivalent to: `return c.size()`.

### Parameters

(none)

### Return value

The number of elements in the container adaptor.

### Complexity

Constant.

### Example

```cpp
#include <cassert>
#include <flat_set>

int main()
{
    std::flat_set<int> nums{4, 2, 4, 2};
    assert(nums.size() == 2);
}
```

### See also

|  |  |
| --- | --- |
| empty | checks whether the container adaptor is empty (public member function) |
| size, ssize (C++17), (C++20) | returns the size of a container or array (function template) |
| max_size | returns the maximum possible number of elements (public member function) |
