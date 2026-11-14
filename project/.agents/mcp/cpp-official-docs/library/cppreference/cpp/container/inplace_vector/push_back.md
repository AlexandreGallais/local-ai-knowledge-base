# std::inplace_vector<T,N>::push_back

|  |  |  |
| --- | --- | --- |
| `constexpr reference push_back( const T& value );` | (1) | (since C++26) |
| `constexpr reference push_back( T&& value );` | (2) | (since C++26) |

Appends the given element `value` to the end of the container.

1) The new element is initialized as a copy of `value`.

2) `value` is moved into the new element.

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

- `std::bad_alloc` if `size() == capacity()` before invocation.
- Any exception thrown by initialization of inserted element.

If an exception is thrown for any reason, these functions have no effect (strong exception safety guarantee).

### Example

```cpp
#include <inplace_vector>
#include <new>
#include <print>
#include <string>

int main()
{
    std::inplace_vector<std::string, 2> fauna;
    std::string dog{"\N{DOG}"};

    fauna.push_back("\N{CAT}"); // overload (1)
    fauna.push_back(std::move(dog)); // overload (2)
    std::println("fauna = {}", fauna);

    try
    {
        fauna.push_back("\N{BUG}"); // throws: there is no space
    }
    catch(const std::bad_alloc& ex)
    {
        std::println("{}", ex.what());
    }
    std::println("fauna = {}", fauna);
}
```

Possible output:

```text
fauna = ["🐈", "🐕"]
std::bad_alloc
fauna = ["🐈", "🐕"]
```

### See also

|  |  |
| --- | --- |
| emplace_back | constructs an element in-place at the end (public member function) |
| append_range | adds a range of elements to the end (public member function) |
| try_push_back | tries to add an element to the end (public member function) |
| try_emplace_back | tries to construct an element in-place at the end (public member function) |
| try_append_range | tries to add a range of elements to the end (public member function) |
| unchecked_push_back | unconditionally adds an element to the end (public member function) |
| unchecked_emplace_back | unconditionally constructs an element in-place at the end (public member function) |
| pop_back | removes the last element (public member function) |
| back_inserter | creates a `std::back_insert_iterator` of type inferred from the argument (function template) |
