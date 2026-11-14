# std::inplace_vector<T,N>::try_push_back

|  |  |  |
| --- | --- | --- |
| `constexpr pointer try_push_back( const T& value );` | (1) | (since C++26) |
| `constexpr pointer try_push_back( T&& value );` | (2) | (since C++26) |

Conditionally appends the given element `value` to the end of the container.

If `size() == capacity()` is `true`, there are no effects. Otherwise, appends an object of type `T`:

1) The new element is initialized as a copy of `value`.

2) `value` is moved into the new element.

No iterators or references are invalidated, except `end()`, which is invalidated if the insertion occurs.

### Parameters

|  |  |  |
| --- | --- | --- |
| value | - | the value of the element to append |
| Type requirements |  |  |
| - `T` must meet the requirements of EmplaceConstructible. |  |  |

### Return value

`std::addressof(back())` if `size() < capacity()`, `nullptr` otherwise.

### Complexity

Constant.

### Exceptions

Any exception thrown by initialization of inserted element.

If an exception is thrown for any reason, these functions have no effect (strong exception safety guarantee).

### Notes

This section is incomplete Reason: Explain the purpose of this API.

### Example

```cpp
#include <cassert>
#include <inplace_vector>
#include <string>

int main()
{
    std::inplace_vector<std::string, 2> pets;
    std::string dog{"dog"};

    std::string* p1 = pets.try_push_back("cat"); // overload (1)
    assert(*p1 == "cat" and pets.size() == 1);

    std::string* p2 = pets.try_push_back(std::move(dog)); // overload (2)
    assert(*p2 == "dog" and pets.size() == 2);

    assert(pets[0] == "cat" and pets[1] == "dog");
    assert(pets.size() == pets.capacity());

    std::string* p3 = pets.try_push_back("bug");
    assert(p3 == nullptr and pets.size() == 2);
}
```

### See also

|  |  |
| --- | --- |
| push_back | adds an element to the end (public member function) |
| emplace_back | constructs an element in-place at the end (public member function) |
| append_range | adds a range of elements to the end (public member function) |
| try_emplace_back | tries to construct an element in-place at the end (public member function) |
| try_append_range | tries to add a range of elements to the end (public member function) |
| unchecked_emplace_back | unconditionally constructs an element in-place at the end (public member function) |
| unchecked_push_back | unconditionally adds an element to the end (public member function) |
| pop_back | removes the last element (public member function) |
| back_inserter | creates a `std::back_insert_iterator` of type inferred from the argument (function template) |
