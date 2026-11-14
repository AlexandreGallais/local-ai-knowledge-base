# std::inplace_vector<T,N>::emplace_back

`template< class... Args > constexpr reference emplace_back( Args&&... args );` (since C++26)

Appends a new element to the end of the container. Typically, the element is constructed using placement-`new` to construct the element in-place at the location provided by the container. The arguments `args...` are forwarded to the constructor as `std::forward<Args>(args)...`.

No iterators or references are invalidated, except `end()`, which is invalidated if the insertion occurs.

### Parameters

|  |  |  |
| --- | --- | --- |
| args | - | arguments to forward to the constructor of the element |
| Type requirements |  |  |
| - `T` must meet the requirements of EmplaceConstructible. |  |  |

### Return value

`back()`, i.e. a reference to the inserted element.

### Complexity

Constant.

### Exceptions

- `std::bad_alloc` if `size() == capacity()` before invocation.
- Any exception thrown by initialization of the inserted element.

If an exception is thrown for any reason, these functions have no effect (strong exception safety guarantee).

### Example

```cpp
#include <inplace_vector>
#include <new>
#include <print>
#include <string>
#include <utility>

int main()
{
    std::inplace_vector<std::pair<std::string, std::string>, 2> fauna;
    std::string dog{"\N{DOG}"};

    fauna.emplace_back("\N{CAT}", dog);
    fauna.emplace_back("\N{CAT}", std::move(dog));
    std::println("fauna = {}", fauna);

    try
    {
        fauna.emplace_back("\N{BUG}", "\N{BUG}"); // throws: there is no space
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
fauna = [("🐈", "🐕"), ("🐈", "🐕")]
std::bad_alloc
fauna = [("🐈", "🐕"), ("🐈", "🐕")]
```

### See also

|  |  |
| --- | --- |
| append_range | adds a range of elements to the end (public member function) |
| push_back | adds an element to the end (public member function) |
| try_push_back | tries to add an element to the end (public member function) |
| try_emplace_back | tries to construct an element in-place at the end (public member function) |
| try_append_range | tries to add a range of elements to the end (public member function) |
| unchecked_push_back | unconditionally adds an element to the end (public member function) |
| unchecked_emplace_back | unconditionally constructs an element in-place at the end (public member function) |
| pop_back | removes the last element (public member function) |
| back_inserter | creates a `std::back_insert_iterator` of type inferred from the argument (function template) |
