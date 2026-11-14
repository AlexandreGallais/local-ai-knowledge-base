# operator<<,>>(std::basic_string)

| Defined in header `<string>` |  |
| --- | --- |
| `template< class CharT, class Traits, class Allocator > std::basic_ostream<CharT, Traits>& operator<<( std::basic_ostream<CharT, Traits>& os, const std::basic_string<CharT, Traits, Allocator>& str );` | (1) |
| `template< class CharT, class Traits, class Allocator > std::basic_istream<CharT, Traits>& operator>>( std::basic_istream<CharT, Traits>& is, std::basic_string<CharT, Traits, Allocator>& str );` | (2) |

1) Behaves as a FormattedOutputFunction. After constructing and checking the sentry object, determines the output format padding.

Then inserts each character from the resulting sequence `seq` (the contents of `str` plus padding) to the output stream `os` as if by calling `os.rdbuf()->sputn(seq, n)`, where `n` is `std::max(os.width(), str.size())` Finally, calls `os.width(0)` to cancel the effects of `std::setw`, if any.

Equivalent to `return os << std::basic_string_view<CharT, Traits>(str);`. (since C++17)

2) Behaves as a FormattedInputFunction. After constructing and checking the sentry object, which may skip leading whitespace, first clears `str` with `str.erase()`, then reads characters from `is` and appends them to `str` as if by `str.append(1, c)`, until one of the following conditions becomes true:

- `N` characters are read, where `N` is `is.width()` if `is.width() > 0`, otherwise `N` is `str.max_size()`,
- the end-of-file condition occurs in the stream `is`, or
- `std::isspace(c, is.getloc())` is `true` for the next character `c` in `is` (this whitespace character remains in the input stream).

If no characters are extracted then `std::ios::failbit` is set on `is`, which may throw `std::ios_base::failure`.

Finally, calls `is.width(0)` to cancel the effects of `std::setw`, if any.

### Exceptions

1) May throw `std::ios_base::failure` if an exception is thrown during output.

2) May throw `std::ios_base::failure` if no characters are extracted from `is` (e.g. the stream is at end of file, or consists of whitespace only), or if an exception is thrown during input.

### Parameters

|  |  |  |
| --- | --- | --- |
| os | - | a character output stream |
| is | - | a character input stream |
| str | - | the string to be inserted or extracted |

### Return value

1) `os`

2) `is`

### Example

```cpp
#include <iostream>
#include <sstream>
#include <string>

int main()
{
    std::string greeting = "Hello, whirled!";
    std::istringstream iss(greeting);

    std::string hello_comma, whirled, word;

    iss >> hello_comma;
    iss >> whirled;

    std::cout << greeting << '\n'
              << hello_comma << '\n' << whirled << '\n';

    // Reset the stream
    iss.clear();
    iss.seekg(0);

    while (iss >> word)
        std::cout << '+' << word << '\n';
}
```

Output:

```text
Hello, whirled!
Hello,
whirled!
+Hello,
+whirled!
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 25 | C++98 | `n` was the smaller of `os.width()` and `str.size()` | `n` is the larger of them |
| LWG 90 | C++98 | `std::isspace(c, getloc())` was used to check for spaces, but `getloc` is not declared in `<string>` | replaced `getloc()` with `is.getloc()` |
| LWG 91 | C++98 | `operator>>` did not behave as a FormattedInputFunction | behaves as a FormattedInputFunction |
| LWG 211 | C++98 | `operator>>` did not set `failbit` if no character is extracted | sets `failbit` |
| LWG 435 | C++98 | characters were inserted by `os.rdbuf()->sputn(str.data(), n)`, and the resolution of LWG issue 25 made the behavior undefined if `os.width()` is larger than `str.size()` | determines the padding first and inserts the padded character sequence instead |
| LWG 586 | C++98 | `operator<<` did not behave as a FormattedOutputFunction | behaves as a FormattedOutputFunction |

### See also

operator<< (C++17) performs stream output on string views (function template)
