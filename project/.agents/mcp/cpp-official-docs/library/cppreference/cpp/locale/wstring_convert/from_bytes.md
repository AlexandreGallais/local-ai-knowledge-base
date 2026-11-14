# std::wstring_convert<Codecvt,Elem,Wide_alloc,Byte_alloc>::from_bytes

| Defined in header `<locale>` |  |
| --- | --- |
| `wide_string from_bytes( char byte );` | (1) |
| `wide_string from_bytes( const char* ptr );` | (2) |
| `wide_string from_bytes( const byte_string& str );` | (3) |
| `wide_string from_bytes( const char* first, const char* last );` | (4) |

Converts a byte sequence to a wide string using the facet pointed to by `cvtptr` .

1) The byte sequence only consists of one element `byte`.

2) The byte sequence is the null-terminated sequence beginning at `ptr`.

3) The byte sequence is the sequence contained in `str`.

4) The byte sequence is the range `[``first``,``last``)`.

Before the conversion begins, if `*this` was **not** constructed with constructor overload (3), `cvtstate` will be set to its default value (the initial conversion state).

The number of input elements successfully converted will be stored in `cvtcount` .

### Return value

If the conversion succeeds, returns the conversion result. Otherwise, if `*this` is constructed with constructor overload (4), returns `wide_err_string`.

### Exceptions

If the conversion fails and `*this` was **not** constructed with constructor overload (4), throws `std::range_error`.

### Example

```cpp
#include <codecvt>
#include <cstdint>
#include <iostream>
#include <locale>
#include <string>

int main()
{
    std::string utf8 = "z\u00df\u6c34\U0001d10b"; // or u8"zß水𝄋"
                 // or "\x7a\xc3\x9f\xe6\xb0\xb4\xf0\x9d\x84\x8b";

    // the UTF-8 / UTF-16 standard conversion facet
    std::u16string utf16 =
        std::wstring_convert<std::codecvt_utf8_utf16<char16_t>,
                             char16_t>{}.from_bytes(utf8.data());
    std::cout << "UTF-16 conversion produced " << utf16.size()
              << " code units: " << std::showbase;
    for (char16_t c : utf16)
        std::cout << std::hex << static_cast<std::uint16_t>(c) << ' ';

    // the UTF-8 / UTF-32 standard conversion facet
    std::u32string utf32 =
        std::wstring_convert<std::codecvt_utf8<char32_t>, char32_t>{}.from_bytes(utf8);
    std::cout << "\nUTF-32 conversion produced " << std::dec
              << utf32.size() << " code units: ";
    for (char32_t c : utf32)
        std::cout << std::hex << static_cast<std::uint32_t>(c) << ' ';
    std::cout << '\n';
}
```

Output:

```text
UTF-16 conversion produced 5 code units: 0x7a 0xdf 0x6c34 0xd834 0xdd0b
UTF-32 conversion produced 4 code units: 0x7a 0xdf 0x6c34 0x1d10b
```

### See also

|  |  |
| --- | --- |
| to_bytes | converts a wide string into a byte string (public member function) |
| mbsrtowcs | converts a narrow multibyte character string to wide string, given state (function) |
| do_in [virtual] | converts a string from `ExternT` to `InternT`, such as when reading from file (virtual protected member function of `std::codecvt<InternT,ExternT,StateT>`) |
