# std::list<T,Allocator>::front

|  |  |
| --- | --- |
| `reference front();` | (1) |
| `const_reference front() const;` | (2) |

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

The following code uses `front` to display the first element of a `std::list<char>`:

```cpp
#include <cassert>
#include <list>

int main()
{
    std::list<char> letters{'a', 'b', 'c', 'd'};
    assert(letters.front() == 'a');
}
```

### See also

|  |  |
| --- | --- |
| back | access the last element (public member function) |
| rend, crend (C++11) | returns a reverse iterator to the end (public member function) |
| begin, cbegin (C++11) | returns an iterator to the beginning (public member function) |
