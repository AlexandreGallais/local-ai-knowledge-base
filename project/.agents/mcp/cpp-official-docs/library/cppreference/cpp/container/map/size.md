# std::map<Key,T,Compare,Allocator>::size

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
#include <map>

int main()
{
    std::map<int, char> nums{{1, 'a'}, {1, 'b'}, {2, 'c'}, {2, 'd'}};
    assert(nums.size() == 2);
}
```

### See also

|  |  |
| --- | --- |
| empty | checks whether the container is empty (public member function) |
| max_size | returns the maximum possible number of elements (public member function) |
| size, ssize (C++17), (C++20) | returns the size of a container or array (function template) |
