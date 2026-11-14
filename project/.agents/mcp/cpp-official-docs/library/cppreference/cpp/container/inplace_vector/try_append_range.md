# std::inplace_vector<T,N>::try_append_range

`template< container-compatible-range<T> R > constexpr std::ranges::borrowed_iterator_t<R> try_append_range( R&& rg );` (since C++26)

Appends copies of initial elements in `rg` before `end()`, until all elements are inserted or the internal storage is exhausted (i.e. `size() == capacity()` is `true`).

All iterators and references remain valid. The `end()` iterator is invalidated.

Each iterator in `rg` is dereferenced at most once.

### Parameters

|  |  |  |
| --- | --- | --- |
| rg | - | a container compatible range, that is, an `input_range` whose elements are convertible to `T` |
| Type requirements |  |  |
| - `T` must be EmplaceConstructible into `inplace_vector` from `*ranges::begin(rg)`. Otherwise, the behavior is undefined. |  |  |

### Return value

An iterator pointing to the first element of `rg` that was not inserted into `*this`, or `ranges::end(rg)` if no such element exists.

### Complexity

Linear in the number of elements inserted.

### Exceptions

Any exception thrown by initialization of inserted element.

`inplace_vector` provides the *basic exception safety guarantee*, i.e., all elements of the container before the call are preserved, and all already inserted elements (before the exception, if any) are also preserved.

### Notes

This section is incomplete Reason: Explain the purpose of this API.

### Example

```cpp
#include <cassert>
#include <initializer_list>
#include <inplace_vector>

int main()
{
    using I = std::inplace_vector<int, 8>;
    auto nums = I{1, 2, 3};
    const auto rg = {-1, -2, -3};

    auto it = nums.try_append_range(rg);
    assert(nums.size() == 6);
    assert((nums == I{1, 2, 3, -1, -2, -3}));
    assert(it == rg.end());

    it = nums.try_append_range(rg);
    assert(nums.size() == 8);
    assert((nums == I{1, 2, 3, -1, -2, -3, -1, -2}));
    assert(it == rg.begin() + 2);
}
```

### See also

|  |  |
| --- | --- |
| append_range | adds a range of elements to the end (public member function) |
| push_back | adds an element to the end (public member function) |
| try_push_back | tries to add an element to the end (public member function) |
| unchecked_push_back | unconditionally adds an element to the end (public member function) |
| emplace_back | constructs an element in-place at the end (public member function) |
| try_emplace_back | tries to construct an element in-place at the end (public member function) |
| unchecked_emplace_back | unconditionally constructs an element in-place at the end (public member function) |
| pop_back | removes the last element (public member function) |
| back_inserter | creates a `std::back_insert_iterator` of type inferred from the argument (function template) |
