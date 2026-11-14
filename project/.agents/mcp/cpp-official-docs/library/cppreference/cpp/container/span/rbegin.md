# std::span<T,Extent>::rbegin, std::span<T,Extent>::crbegin

|  |  |  |
| --- | --- | --- |
| `constexpr reverse_iterator rbegin() const noexcept;` | (1) | (since C++20) |
| `constexpr const_reverse_iterator crbegin() const noexcept;` | (2) | (since C++23) |

Returns a reverse iterator to the first element of the reversed `span`. It corresponds to the last element of the non-reversed `span`. If the `span` is empty, the returned iterator is equal to `rend()`.

range-rbegin-rend.svg

### Parameters

(none)

### Return value

Reverse iterator to the first element.

### Complexity

Constant.

### Notes

The underlying iterator of the returned reverse iterator is the end iterator. Hence the returned iterator is invalidated if and when the end iterator is invalidated.

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <iterator>
#include <span>

int main()
{
    constexpr std::span<const char> code{"@droNE_T0P_w$s@s#_SECRET_a,p^42!"};

    auto hack = [](const unsigned O) { return O - 0141 < 120; };

    std::copy_if(code.rbegin(), code.rend(),
        std::ostream_iterator<const char>(std::cout), hack);

    std::cout << '\n';
}
```

Output:

```text
password
```

### See also

|  |  |
| --- | --- |
| rend, crend (C++23) | returns a reverse iterator to the end (public member function) |
| rbegin, crbegin (C++14) | returns a reverse iterator to the beginning of a container or array (function template) |
