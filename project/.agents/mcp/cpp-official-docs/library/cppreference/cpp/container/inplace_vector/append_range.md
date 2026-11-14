# std::inplace_vector<T,N>::append_range

`template< container-compatible-range<T> R > constexpr void append_range( R&& rg );` (since C++26)

Inserts copies of elements from the range `rg` before `end()`, in non-reversing order.

Each iterator in `rg` is dereferenced exactly once.

### Parameters

|  |  |  |
| --- | --- | --- |
| rg | - | a container compatible range, that is, an `input_range` whose elements are convertible to `T` |
| Type requirements |  |  |
| - `T` must be EmplaceConstructible into `inplace_vector` from `*ranges::begin(rg)`. Otherwise, the behavior is undefined. |  |  |

### Return value

(none)

### Complexity

Linear in size of `rg`. The number of calls to the constructor of `T` is exactly equal to the `std::ranges::size(rg))`.

### Exceptions

Throws `std::bad_alloc` if `std::ranges::size(rg) > N`. If an exception is thrown other than by the copy constructor, move constructor, assignment operator, or move assignment operator of `T` or by any `InputIterator` operation, there are no effects. Otherwise, if an exception is thrown, then `size() >= n` and elements in the range `[``​0​``,``n``)` are not modified, where `n` is the value of `size()` before this call.

### Example

```cpp
#include <cassert>
#include <inplace_vector>
#include <iostream>

int main()
{
    using I = std::inplace_vector<int, 8>;
    auto head = I{1, 2, 3, 4};
    const auto tail = {-5, -6, -7};
    head.append_range(tail);
    assert(head.size() == 7 and (head == I{1, 2, 3, 4, -5, -6, -7}));
    try
    {
        head.append_range(tail); // throws: no space
    }
    catch(const std::bad_alloc&)
    {
        std::cout << "std::bad_alloc\n";
    }
}
```

Output:

```text
std::bad_alloc
```

### See also

|  |  |
| --- | --- |
| try_append_range | tries to add a range of elements to the end (public member function) |
| insert_range | inserts a range of elements (public member function) |
| push_back | adds an element to the end (public member function) |
| emplace_back | constructs an element in-place at the end (public member function) |
