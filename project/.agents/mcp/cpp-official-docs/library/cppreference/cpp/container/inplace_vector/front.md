# std::inplace_vector<T,N>::front

|  |  |  |
| --- | --- | --- |
| `constexpr reference front();` | (1) | (since C++26) |
| `constexpr const_reference front() const;` | (2) | (since C++26) |

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

The following code uses `front` to display the first element of a `std::inplace_vector<char, 4>`:

```cpp
#include <cassert>
#include <inplace_vector>

int main()
{
    std::inplace_vector<char, 4> letters{'a', 'b', 'c', 'd'};
    assert(letters.front() == 'a');
}
```

### See also

|  |  |
| --- | --- |
| back | access the last element (public member function) |
| rend, crend | returns a reverse iterator to the end (public member function) |
| begin, cbegin | returns an iterator to the beginning (public member function) |
| data | direct access to the underlying contiguous storage (public member function) |
