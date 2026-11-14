# std::vector<T,Allocator>::size

`size_type size() const;` (noexcept since C++11) (constexpr since C++20)

Returns the number of elements in the container, i.e. `std::distance(begin(), end())`.

### Parameters

(none)

### Return value

The number of elements in the container.

### Complexity

Constant.

### Example

The following code uses `size` to display the number of elements in a `std::vector<int>`:

```cpp
#include <cassert>
#include <vector>

int main()
{
    std::vector<int> nums;
    assert(nums.size() == 0);
    nums = {1, 2, 3, 4};
    assert(nums.size() == 4);
}
```

### See also

|  |  |
| --- | --- |
| capacity | returns the number of elements that can be held in currently allocated storage (public member function) |
| empty | checks whether the container is empty (public member function) |
| max_size | returns the maximum possible number of elements (public member function) |
| resize | changes the number of elements stored (public member function) |
| size, ssize (C++17), (C++20) | returns the size of a container or array (function template) |
