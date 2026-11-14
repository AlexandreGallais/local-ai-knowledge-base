# std::ostreambuf_iterator

| Defined in header `<iterator>` |  |
| --- | --- |
| `template< class CharT, class Traits = std::char_traits<CharT> > class ostreambuf_iterator : public std::iterator<std::output_iterator_tag, void, void, void, void>` | (until C++17) |
| `template< class CharT, class Traits = std::char_traits<CharT> > class ostreambuf_iterator;` | (since C++17) |

`std::ostreambuf_iterator` is a single-pass LegacyOutputIterator that writes successive characters into the `std::basic_streambuf` object for which it was constructed. The actual write operation is performed when the iterator (whether dereferenced or not) is assigned to. Incrementing the `std::ostreambuf_iterator` is a no-op.

In a typical implementation, the only data members of `std::ostreambuf_iterator` are a pointer to the associated `std::basic_streambuf` and a boolean flag indicating if the end of file condition has been reached.

### Member types

| Member type | Definition |
| --- | --- |
| `iterator_category` | `std::output_iterator_tag` |
| `value_type` | `void` |
| `difference_type` | `void` (until C++20) `std::ptrdiff_t` (since C++20) |
| `pointer` | `void` |
| `reference` | `void` |
| `char_type` | `CharT` |
| `traits_type` | `Traits` |
| `streambuf_type` | `std::basic_streambuf<CharT, Traits>` |
| `ostream_type` | `std::basic_ostream<CharT, Traits>` |

Member types `iterator_category`, `value_type`, `difference_type`, `pointer` and `reference` are required to be obtained by inheriting from `std::iterator<std::output_iterator_tag, void, void, void, void>`. (until C++17)

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a new `ostreambuf_iterator` (public member function) |
| (destructor) (implicitly declared) | destructs an `ostreambuf_iterator` (public member function) |
| operator= | writes a character to the associated output sequence (public member function) |
| operator* | no-op (public member function) |
| operator++, operator++(int) | no-op (public member function) |
| failed | tests if output failed (public member function) |

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <iterator>
#include <string>

int main()
{
    std::string s = "This is an example\n";
    std::copy(s.begin(), s.end(), std::ostreambuf_iterator<char>(std::cout));
}
```

Output:

```text
This is an example
```

### See also

|  |  |
| --- | --- |
| istreambuf_iterator | input iterator that reads from `std::basic_streambuf` (class template) |
| ostream_iterator | output iterator that writes to `std::basic_ostream` (class template) |
