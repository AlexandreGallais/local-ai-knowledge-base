# std::wstring_convert<Codecvt,Elem,Wide_alloc,Byte_alloc>::to_bytes

| Defined in header `<locale>` |  |
| --- | --- |
| `byte_string to_bytes( Elem wchar );` | (1) |
| `byte_string to_bytes( const Elem* wptr );` | (2) |
| `byte_string to_bytes( const wide_string& wstr );` | (3) |
| `byte_string to_bytes( const Elem* first, const Elem* last );` | (4) |

Converts a wide sequence to a byte string using the facet pointed to by `cvtptr` .

1) The wide sequence only consists of one element `byte`.

2) The wide sequence is the null-terminated sequence beginning at `ptr`.

3) The wide sequence is the sequence contained in `str`.

4) The wide sequence is the range `[``first``,``last``)`.

Before the conversion begins, if `*this` was **not** constructed with constructor overload (3), `cvtstate` will be set to its default value (the initial conversion state).

The number of input elements successfully converted will be stored in `cvtcount` .

### Return value

If the conversion succeeds, returns the conversion result. Otherwise, if `*this` is constructed with constructor overload (4), returns `byte_err_string`.

### Exceptions

If the conversion fails and `*this` was **not** constructed with constructor overload (4), throws `std::range_error`.

### Example

```cpp
#include <codecvt>
#include <iomanip>
#include <iostream>
#include <locale>
#include <string>

// utility function for output
void hex_print(const std::string& s)
{
    std::cout << std::hex << std::setfill('0');
    for (unsigned char c : s)
        std::cout << std::setw(2) << static_cast<int>(c) << ' ';
    std::cout << std::dec << '\n';
}

int main()
{
    // wide character data
    std::wstring wstr = L"z\u00df\u6c34\U0001f34c"; // or L"zß水🍌"

    // wide to UTF-8
    std::wstring_convert<std::codecvt_utf8<wchar_t>> conv1;
    std::string u8str = conv1.to_bytes(wstr);
    std::cout << "UTF-8 conversion produced " << u8str.size() << " bytes:\n";
    hex_print(u8str);

    // wide to UTF-16le
    std::wstring_convert<std::codecvt_utf16<wchar_t, 0x10ffff, std::little_endian>> conv2;
    std::string u16str = conv2.to_bytes(wstr);
    std::cout << "UTF-16le conversion produced " << u16str.size() << " bytes:\n";
    hex_print(u16str);
}
```

Output:

```text
UTF-8 conversion produced 10 bytes:
7a c3 9f e6 b0 b4 f0 9f 8d 8c
UTF-16le conversion produced 10 bytes:
7a 00 df 00 34 6c 3c d8 4c df
```

### See also

|  |  |
| --- | --- |
| from_bytes | converts a byte string into a wide string (public member function) |
| wcsrtombs | converts a wide string to narrow multibyte character string, given state (function) |
| do_out [virtual] | converts a string from `InternT` to `ExternT`, such as when writing to file (virtual protected member function of `std::codecvt<InternT,ExternT,StateT>`) |
