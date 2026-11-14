# std::multiset<Key,Compare,Allocator>::size

`size_type size() const;` (noexcept since C++11)

Returns the number of elements in the container, i.e. `std::distance(begin(), end())`.

### Parameters

(none)

### Return value

The number of elements in the container.

### Complexity

Constant.

### Example

```cpp
#include <cassert>
#include <set>

int main()
{
    std::multiset<int> nums{4, 2, 4, 2};
    assert(nums.size() == 4);
}
```

### See also

|  |  |
| --- | --- |
| empty | checks whether the container is empty (public member function) |
| max_size | returns the maximum possible number of elements (public member function) |
| size, ssize (C++17), (C++20) | returns the size of a container or array (function template) |
