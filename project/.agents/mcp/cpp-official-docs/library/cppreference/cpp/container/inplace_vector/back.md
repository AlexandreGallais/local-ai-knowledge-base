# std::inplace_vector<T,N>::back

|  |  |  |
| --- | --- | --- |
| `constexpr reference back();` | (1) | (since C++26) |
| `constexpr const_reference back() const;` | (2) | (since C++26) |

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
#include <inplace_vector>

int main()
{
    std::inplace_vector<char, 4> letters{'a', 'b', 'c', 'd'};
    assert(letters.back() == 'd');
}
```

### See also

|  |  |
| --- | --- |
| front | access the first element (public member function) |
| rbegin, crbegin | returns a reverse iterator to the beginning (public member function) |
| end, cend | returns an iterator to the end (public member function) |
