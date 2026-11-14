# std::inplace_vector<T,N>::emplace

`template< class... Args > constexpr iterator emplace( const_iterator position, Args&&... args );` (since C++26)

Inserts a new element into the container directly before `pos`. Typically, the element is constructed uses placement-`new` to construct the element in-place at the location provided by the container. The arguments `args...` are forwarded to the constructor as `std::forward<Args>(args)...`.

### Parameters

|  |  |  |
| --- | --- | --- |
| pos | - | iterator before which the new element will be constructed |
| args | - | arguments to forward to the constructor of the element |
| Type requirements |  |  |
| - `T` must meet the requirements of EmplaceConstructible. |  |  |

### Return value

An iterator to the inserted element.

### Complexity

Linear: the distance between `pos` and end of the container + 1.

### Exceptions

- Throws `std::bad_alloc` if before the invocation `size() == capacity()`. The function has no effects (strong exception safety guarantee).
- Any exception thrown by initialization of inserted element or by any LegacyInputIterator operation. Elements in `[``​0​``,``pos``)` are not modified.

### Example

```cpp
#include <cassert>
#include <inplace_vector>
#include <new>
#include <utility>

int main()
{
    using P = std::pair<int, int>;
    using I = std::inplace_vector<P, 3>;
    auto nums = I{{0, 1}, {2, 3}};

    auto it = nums.emplace(nums.begin() + 1, -1, -2);
    assert((*it == P{-1, -2}));
    assert((nums == I{P{0, 1}, {-1, -2}, {2, 3}}));

    try
    {
        nums.emplace(nums.begin(), 1, 3); // throws: no space
    }
    catch(const std::bad_alloc& ex)
    {
        std::cout << ex.what() << '\n';
    }
}
```

Possible output:

```text
std::bad_alloc
```

### See also

|  |  |
| --- | --- |
| insert | inserts elements (public member function) |
| emplace_back | constructs an element in-place at the end (public member function) |
