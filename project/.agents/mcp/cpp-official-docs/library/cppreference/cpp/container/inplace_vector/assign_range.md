# std::inplace_vector<T,N>::assign_range

`template< container-compatible-range<T> R > constexpr void assign_range( R&& rg );` (since C++26)

Replaces elements in the container with a copy of each element in `rg`.

This section is incomplete

Each iterator in the range `rg` is dereferenced exactly once.

The behavior is undefined if `rg` overlaps with the container.

### Parameters

|  |  |  |
| --- | --- | --- |
| rg | - | an `input_range` with reference type convertible to the element type of the container |
| Type requirements |  |  |
| - `std::assignable_from<T&, ranges::range_reference_t<R>>` must be modeled. Otherwise, the program is ill-formed. |  |  |
| - `T` must be EmplaceConstructible into the container from `*ranges::begin(rg)`. Otherwise, the behavior is undefined. |  |  |

### Return value

(none)

### Exceptions

- `bad_alloc`, if `std::ranges::distance(rg) > capacity()`.
- Any exception thrown by initialization of inserted element.

### Example

```cpp
#include <algorithm>
#include <cassert>
#include <initializer_list>
#include <inplace_vector>
#include <iostream>
#include <new>

int main()
{
    const auto source = {1, 2, 3};
    std::inplace_vector<int, 4> destination{4, 5};
    destination.assign_range(source);
    assert(std::ranges::equal(destination, source));

    try
    {
        const auto bad = {-1, -2, -3, -4, -5};
        destination.assign_range(bad); // throws: bad.size() > destination.capacity()
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
| insert_range | inserts a range of elements (public member function) |
| append_range | adds a range of elements to the end (public member function) |
| assign | assigns values to the container (public member function) |
| operator= | assigns values to the container (public member function) |
