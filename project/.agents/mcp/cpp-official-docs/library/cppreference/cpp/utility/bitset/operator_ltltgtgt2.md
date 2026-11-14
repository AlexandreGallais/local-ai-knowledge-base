# operator<<,>>(std::bitset)

| Defined in header `<bitset>` |  |
| --- | --- |
| `template< class CharT, class Traits, std::size_t N > std::basic_ostream<CharT, Traits>& operator<<( std::basic_ostream<CharT, Traits>& os, const std::bitset<N>& x );` | (1) |
| `template< class CharT, class Traits, std::size_t N > std::basic_istream<CharT, Traits>& operator>>( std::basic_istream<CharT, Traits>& is, std::bitset<N>& x );` | (2) |

Inserts or extracts a bitset from a character stream.

1) Writes the bitset `x` to the character stream `os` as if by first converting it to a `std::basic_string<CharT, Traits>` using `to_string()`, and then writing it into `os` using the `operator<<` (which is a FormattedOutputFunction for strings). The characters to use for ones and zeroes are obtained from the currently-imbued locale by calling `std::use_facet<std::ctype<CharT>>(os.getloc()).widen()` with `'1'` and `'0'` as arguments.

2) Behaves as a FormattedInputFunction. After constructing and checking the sentry object, which may skip leading whitespace, extracts up to `N` characters from `is` and stores the characters in the bitset `x`. Characters are extracted until either

- `N` characters have been read,
- end-of-file occurs in `is`, or
- the next character is neither `is.widen('0')` nor `is.widen('1')`.

If `N > 0` and no characters are extracted, `is.setstate(ios_base::failbit)` is called.

### Parameters

|  |  |  |
| --- | --- | --- |
| os | - | the character stream to write to |
| is | - | the character stream to read from |
| x | - | the bitset to be read or written |

### Return value

1) `os`

2) `is`

### Example

```cpp
#include <bitset>
#include <iostream>
#include <sstream>

int main()
{
    std::string bit_string = "001101";
    std::istringstream bit_stream(bit_string);

    std::bitset<3> b1;
    bit_stream >> b1; // reads "001", stream still holds "101"
    std::cout << b1 << '\n';

    std::bitset<8> b2;
    bit_stream >> b2; // reads "101", populates the 8-bit set as "00000101"
    std::cout << b2 << '\n';
}
```

Output:

```text
001
00000101
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 303 | C++98 | single-byte characters were extracted from `is`, but `CharT` can have multiple bytes | extracts `CharT` and compares it with widened `'0'` and `'1'` |
| LWG 396 | C++98 | the content written by `operator<<` was locale-independent | writes widened `'0'`s and `'1'`s |
| LWG 3199 | C++98 | extracting a `std::bitset<0>` always sets `failbit` | such extraction never sets `failbit` |

### See also

operator<<=, operator>>=, operator<<, operator>> performs binary shift left and shift right (public member function)
