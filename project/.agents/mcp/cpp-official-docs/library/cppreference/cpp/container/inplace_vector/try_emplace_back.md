# std::inplace_vector<T,N>::try_emplace_back

`template< class... Args > constexpr pointer try_emplace_back( Args&&... args );` (since C++26)

Conditionally appends an object of type `T` to the end of the container.

If `size() == capacity()` is `true`, there are no effects. Otherwise, appends direct-non-list-initialized with `std::forward<Args>(args)...` object of type `T`.

No iterators or references are invalidated, except `end()`, which is invalidated if the insertion occurs.

### Parameters

|  |  |  |
| --- | --- | --- |
| args | - | arguments to forward to the constructor of the element |
| Type requirements |  |  |
| - `T` must be EmplaceConstructible into `inplace_vector` from `std::forward<Args>(args)...`. |  |  |

### Return value

`std::addressof(back())` if `size() < capacity()`, `nullptr` otherwise.

### Complexity

Constant.

### Exceptions

Any exception thrown by initialization of inserted element. If an exception is thrown for any reason, this function has no effect (strong exception safety guarantee).

### Notes

This section is incomplete Reason: Explain the purpose of this API.

### Example

```cpp
#include <cassert>
#include <complex>
#include <inplace_vector>

int main()
{
    using namespace std::complex_literals;
    using C = std::complex<double>;
    using I = std::inplace_vector<C, 3>;
    auto v = I{1.0 + 2.0i, 3.0 + 4.0i};

    C* c = v.try_emplace_back(5.0, 6.0);
    assert(*c == 5.0 + 6.0i);
    assert((v == I{1.0 + 2.0i, 3.0 + 4.0i, 5.0 + 6.0i}));

    c = v.try_emplace_back(7.0, 8.0); // no space => no insertion
    assert(c == nullptr);
    assert((v == I{1.0 + 2.0i, 3.0 + 4.0i, 5.0 + 6.0i}));
}
```

### See also

|  |  |
| --- | --- |
| emplace_back | constructs an element in-place at the end (public member function) |
| push_back | adds an element to the end (public member function) |
| append_range | adds a range of elements to the end (public member function) |
| try_append_range | tries to add a range of elements to the end (public member function) |
| unchecked_emplace_back | unconditionally constructs an element in-place at the end (public member function) |
| unchecked_push_back | unconditionally adds an element to the end (public member function) |
| pop_back | removes the last element (public member function) |
| back_inserter | creates a `std::back_insert_iterator` of type inferred from the argument (function template) |
