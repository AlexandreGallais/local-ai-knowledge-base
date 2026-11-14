# std::basic_string<CharT,Traits,Allocator>::rbegin, std::basic_string<CharT,Traits,Allocator>::crbegin

|  |  |  |
| --- | --- | --- |
| `reverse_iterator rbegin();` | (1) | (noexcept since C++11) (constexpr since C++20) |
| `const_reverse_iterator rbegin() const;` | (2) | (noexcept since C++11) (constexpr since C++20) |
| `const_reverse_iterator crbegin() const noexcept;` | (3) | (since C++11) (constexpr since C++20) |

Returns a reverse iterator to the first character of the reversed string. It corresponds to the last character of the non-reversed string.

range-rbegin-rend.svg

### Parameters

(none)

### Return value

Reverse iterator to the first character.

### Complexity

Constant.

### Notes

libc++ backports `crbegin()` to C++98 mode.

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <iterator>
#include <string>

int main()
{
    std::string s("Exemplar!");
    *s.rbegin() = 'y';
    std::cout << s << '\n'; // "Exemplary"

    std::string c;
    std::copy(s.crbegin(), s.crend(), std::back_inserter(c));
    std::cout << c << '\n'; // "yralpmexE"
}
```

Output:

```text
Exemplary
yralpmexE
```

### See also

|  |  |
| --- | --- |
| rend, crend (C++11) | returns a reverse iterator to the end (public member function) |
| rbegin, crbegin | returns a reverse iterator to the beginning (public member function of `std::basic_string_view<CharT,Traits>`) |
