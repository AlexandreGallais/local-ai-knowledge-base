# std::experimental::ostream_joiner

| Defined in header `<experimental/iterator>` |  |
| --- | --- |
| `template< class DelimT, class CharT = char, class Traits = std::char_traits<CharT> > class ostream_joiner;` | (library fundamentals TS v2) |

`std::experimental::ostream_joiner` is a single-pass LegacyOutputIterator that writes successive objects into the `std::basic_ostream` object for which it was constructed, using `operator<<`, separated by a delimiter. The delimiter is written to the output stream between every two objects that are written. The write operation is performed when the iterator (whether dereferenced or not) is assigned to. Incrementing the `ostream_joiner` is a no-op.

In a typical implementation, the only data members of `ostream_joiner` are a pointer to the associated `std::basic_ostream`, the delimiter, and a `bool` member that indicates whether the next write is for the first element in the sequence.

Compared to `std::ostream_iterator`, `ostream_joiner` prints the delimiter sequence one fewer time, and is not templated on the type of the object to be printed.

### Member types

| Member type | Definition |
| --- | --- |
| `char_type` | `CharT` |
| `traits_type` | `Traits` |
| `ostream_type` | `std::basic_ostream<CharT, Traits>` |
| `value_type` | `void` |
| `difference_type` | `void` |
| `pointer` | `void` |
| `reference` | `void` |
| `iterator_category` | `std::output_iterator_tag` |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a new `ostream_joiner` (public member function) |
| (destructor) (implicitly declared) | destructs an `ostream_joiner` (public member function) |
| operator= | writes an object to the associated output sequence (public member function) |
| operator* | no-op (public member function) |
| operator++, operator++(int) | no-op (public member function) |

### Non-member functions

make_ostream_joiner creates an `ostream_joiner` object, deducing the template's type arguments from the function arguments (function template)

### Example

```cpp
#include <algorithm>
#include <experimental/iterator>
#include <iostream>
#include <iterator>

int main()
{
    int i[] = {1, 2, 3, 4, 5};
    std::copy(std::begin(i),
              std::end(i),
              std::experimental::make_ostream_joiner(std::cout, ", "));
}
```

Output:

```text
1, 2, 3, 4, 5
```

### See also

|  |  |
| --- | --- |
| ostreambuf_iterator | output iterator that writes to `std::basic_streambuf` (class template) |
| ostream_iterator | output iterator that writes to `std::basic_ostream` (class template) |
| istream_iterator | input iterator that reads from `std::basic_istream` (class template) |
