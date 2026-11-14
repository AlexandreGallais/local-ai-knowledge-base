# std::basic_string<CharT,Traits,Allocator>::end, std::basic_string<CharT,Traits,Allocator>::cend

|  |  |  |
| --- | --- | --- |
| `iterator end();` | (1) | (noexcept since C++11) (constexpr since C++20) |
| `const_iterator end() const;` | (2) | (noexcept since C++11) (constexpr since C++20) |
| `const_iterator cend() const noexcept;` | (3) | (since C++11) (constexpr since C++20) |

Returns an iterator to the character following the last character of the string. This character acts as a placeholder, attempting to access it results in undefined behavior.

range-begin-end.svg

### Parameters

(none)

### Return value

Iterator to the character following the last character.

### Complexity

Constant.

### Notes

libc++ backports `cend()` to C++98 mode.

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <iterator>
#include <string>

int main()
{
    std::string s("Exemparl");
    std::next_permutation(s.begin(), s.end());

    std::string c;
    std::copy(s.cbegin(), s.cend(), std::back_inserter(c));
    std::cout << c << '\n'; // "Exemplar"
}
```

Output:

```text
Exemplar
```

### See also

|  |  |
| --- | --- |
| begin, cbegin (C++11) | returns an iterator to the beginning (public member function) |
| end, cend | returns an iterator to the end (public member function of `std::basic_string_view<CharT,Traits>`) |
