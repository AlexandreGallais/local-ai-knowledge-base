# std::flat_map<Key,T,Compare,KeyContainer,MappedContainer>::size

`size_type size() const noexcept;` (since C++23)

Returns the number of elements in the container adaptor. Equivalent to: `return c.keys.size()`.

### Parameters

(none)

### Return value

The number of elements in the container adaptor.

### Complexity

Constant.

### Example

```cpp
#include <cassert>
#include <flat_map>

int main()
{
    std::flat_map<int, char> nums{{1, 'a'}, {1, 'b'}, {2, 'c'}, {2, 'd'}};
    assert(nums.size() == 2);
}
```

### See also

|  |  |
| --- | --- |
| empty | checks whether the container adaptor is empty (public member function) |
| size, ssize (C++17), (C++20) | returns the size of a container or array (function template) |
| max_size | returns the maximum possible number of elements (public member function) |
