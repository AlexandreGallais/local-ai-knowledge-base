# std::inplace_vector<T,N>::unchecked_push_back

|  |  |  |
| --- | --- | --- |
| `constexpr reference unchecked_push_back( const T& value );` | (1) | (since C++26) |
| `constexpr reference unchecked_push_back( T&& value );` | (2) | (since C++26) |

Appends the given element `value` to the end of the container.

Equivalent to: `return *try_push_back(std::forward<decltype(value)>(value));`

1) The new element is initialized as a copy of `value`.

2) `value` is moved into the new element.

Before the call to these functions `size() < capacity()` must be `true`. Otherwise, the behavior is undefined.

No iterators or references are invalidated, except `end()`, which is invalidated if the insertion occurs.

### Parameters

|  |  |  |
| --- | --- | --- |
| value | - | the value of the element to append |
| Type requirements |  |  |
| - `T` must meet the requirements of CopyInsertable in order to use overload (1). |  |  |
| - `T` must meet the requirements of MoveInsertable in order to use overload (2). |  |  |

### Return value

`back()`, i.e. a reference to the inserted element.

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
    std::inplace_vector<std::string, 2> fauna;
    std::string dog{"dog"};

    auto& r1 = fauna.unchecked_push_back("cat"); // overload (1)
    assert(r1 == "cat" and fauna.size() == 1);
    auto& r2 = fauna.unchecked_push_back(std::move(dog)); // overload (2)
    assert(r2 == "dog" and fauna.size() == 2);
    assert(fauna[0] == "cat" and fauna[1] == "dog");
    // fauna.unchecked_push_back("bug"); // undefined behavior: there is no space
}
```

### See also

|  |  |
| --- | --- |
| push_back | adds an element to the end (public member function) |
| emplace_back | constructs an element in-place at the end (public member function) |
| append_range | adds a range of elements to the end (public member function) |
| try_push_back | tries to add an element to the end (public member function) |
| try_emplace_back | tries to construct an element in-place at the end (public member function) |
| try_append_range | tries to add a range of elements to the end (public member function) |
| unchecked_emplace_back | unconditionally constructs an element in-place at the end (public member function) |
| pop_back | removes the last element (public member function) |
| back_inserter | creates a `std::back_insert_iterator` of type inferred from the argument (function template) |
