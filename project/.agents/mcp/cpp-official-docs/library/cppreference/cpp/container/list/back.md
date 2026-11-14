# std::list<T,Allocator>::back

|  |  |
| --- | --- |
| `reference back();` | (1) |
| `const_reference back() const;` | (2) |

Returns a reference to the last element in the container.

Calling `back` on an empty container causes undefined behavior.

### Parameters

(none)

### Return value

Reference to the last element.

### Complexity

Constant.

### Notes

For a non-empty container `c`, the expression `c.back()` is equivalent to `*std::prev(c.end())`.

### Example

```cpp
#include <cassert>
#include <list>

int main()
{
    std::list<char> letters{'a', 'b', 'c', 'd'};
    assert(letters.back() == 'd');
}
```

### See also

|  |  |
| --- | --- |
| front | access the first element (public member function) |
| rbegin, crbegin (C++11) | returns a reverse iterator to the beginning (public member function) |
| end, cend (C++11) | returns an iterator to the end (public member function) |
