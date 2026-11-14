# std::basic_string<CharT,Traits,Allocator>::begin, std::basic_string<CharT,Traits,Allocator>::cbegin

|  |  |  |
| --- | --- | --- |
| `iterator begin();` | (1) | (noexcept since C++11) (constexpr since C++20) |
| `const_iterator begin() const;` | (2) | (noexcept since C++11) (constexpr since C++20) |
| `const_iterator cbegin() const noexcept;` | (3) | (since C++11) (constexpr since C++20) |

Returns an iterator to the first character of the string.

`begin()` returns a mutable or constant iterator, depending on the constness of `*this`.

`cbegin()` always returns a constant iterator. It is equivalent to `const_cast<const basic_string&>(*this).begin()`.

range-begin-end.svg

### Parameters

(none)

### Return value

Iterator to the first character.

### Complexity

Constant.

### Notes

libc++ backports `cbegin()` to C++98 mode.

### Example

```cpp
#include <iostream>
#include <string>

int main()
{
    std::string s("Exemplar");
    *s.begin() = 'e';
    std::cout << s << '\n';

    auto i = s.cbegin();
    std::cout << *i << '\n';
//  *i = 'E'; // error: i is a constant iterator
}
```

Output:

```text
exemplar
e
```

### See also

|  |  |
| --- | --- |
| end, cend (C++11) | returns an iterator to the end (public member function) |
| begin, cbegin | returns an iterator to the beginning (public member function of `std::basic_string_view<CharT,Traits>`) |
