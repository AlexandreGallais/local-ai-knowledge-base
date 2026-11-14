# std::forward_list<T,Allocator>::front

|  |  |  |
| --- | --- | --- |
| `reference front();` | (1) | (since C++11) |
| `const_reference front() const;` | (2) | (since C++11) |

Returns a reference to the first element in the container.

Calling `front` on an empty container causes undefined behavior.

### Parameters

(none)

### Return value

Reference to the first element.

### Complexity

Constant.

### Notes

For a container `c`, the expression `c.front()` is equivalent to `*c.begin()`.

### Example

The following code uses `front` to display the first element of a `std::forward_list<char>`:

```cpp
#include <cassert>
#include <forward_list>

int main()
{
    std::forward_list<char> letters{'a', 'b', 'c', 'd'};
    assert(letters.front() == 'a');
}
```

### See also

|  |  |
| --- | --- |
| before_begin, cbefore_begin | returns an iterator to the element before beginning (public member function) |
| begin, cbegin | returns an iterator to the beginning (public member function) |
