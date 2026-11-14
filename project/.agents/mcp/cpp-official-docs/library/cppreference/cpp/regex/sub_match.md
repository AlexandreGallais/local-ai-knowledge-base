# std::sub_match

| Defined in header `<regex>` |  |
| --- | --- |
| `template< class BidirIt > class sub_match;` | (since C++11) |

The class template `std::sub_match` is used by the regular expression engine to denote sequences of characters matched by marked sub-expressions. A match is a `[``begin``,``end``)` pair within the target range matched by the regular expression, but with additional observer functions to enhance code clarity.

Only the default constructor is publicly accessible. Instances of `std::sub_match` are normally constructed and populated as a part of a `std::match_results` container during the processing of one of the regex algorithms.

The member functions return defined default values unless the `matched` member is `true`.

`std::sub_match` inherits from `std::pair<BidirIt, BidirIt>`, although it cannot be treated as a `std::pair` object because member functions such as assignment will not work as expected.

### Type requirements

- `BidirIt` must meet the requirements of LegacyBidirectionalIterator.

### Specializations

Several specializations for common character sequence types are provided:

| Defined in header `<regex>` |  |
| --- | --- |
| Type | Definition |
| `std::csub_match` | `std::sub_match<const char*>` |
| `std::wcsub_match` | `std::sub_match<const wchar_t*>` |
| `std::ssub_match` | `std::sub_match<std::string::const_iterator>` |
| `std::wssub_match` | `std::sub_match<std::wstring::const_iterator>` |

### Nested types

| Type | Definition |
| --- | --- |
| `iterator` | `BidirIt` |
| `value_type` | `std::iterator_traits<BidirIt>::value_type` |
| `difference_type` | `std::iterator_traits<BidirIt>::difference_type` |
| `string_type` | `std::basic_string<value_type>` |

### Data members

| Member | Description |
| --- | --- |
| `bool` `matched` | whether this match was successful (public member object) |

## Inherited from std::pair

|  |  |
| --- | --- |
| BidirIt first | start of the match sequence (public member object) |
| BidirIt second | one-past-the-end of the match sequence (public member object) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs the match object (public member function) |
| Observers |  |
| length | returns the length of the match (if any) (public member function) |
| str, operator string_type | converts to the underlying string type (public member function) |
| compare | compares matched subsequence (if any) (public member function) |
| Modifiers |  |
| swap | swaps the contents (public member function) |

### Non-member functions

|  |  |
| --- | --- |
| operator==, operator!=, operator<, operator<=, operator>, operator>=, operator<=> (removed in C++20), (removed in C++20), (removed in C++20), (removed in C++20), (removed in C++20), (C++20) | compares a `sub_match` with another `sub_match`, a string, or a character (function template) |
| operator<< | outputs the matched character subsequence (function template) |

### Example

```cpp
#include <cassert>
#include <iostream>
#include <regex>
#include <string>

int main()
{
    std::string sentence{"Friday the thirteenth."};
    const std::regex re{"([A-z]+) ([a-z]+) ([a-z]+)"};
    std::smatch words;
    std::regex_search(sentence, words, re);
    std::cout << std::boolalpha;
    for (const auto& m : words)
    {
        assert(m.matched);
        std::cout << "m: [" << m << "], m.length(): " << m.length() << ", "
                     "*m.first: '" << *m.first << "', "
                     "*m.second: '" << *m.second << "'\n";
    }
}
```

Output:

```text
m: [Friday the thirteenth], m.length(): 21, *m.first: 'F', *m.second: '.'
m: [Friday], m.length(): 6, *m.first: 'F', *m.second: ' '
m: [the], m.length(): 3, *m.first: 't', *m.second: ' '
m: [thirteenth], m.length(): 10, *m.first: 't', *m.second: '.'
```

### See also

regex_token_iterator (C++11) iterates through the specified sub-expressions within all regex matches in a given string or through unmatched substrings (class template)
