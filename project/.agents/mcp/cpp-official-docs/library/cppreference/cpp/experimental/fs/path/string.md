# std::experimental::filesystem::path::string,wstring,u8string,...

|  |  |  |
| --- | --- | --- |
| `template< class CharT, class Traits = std::char_traits<CharT>, class Alloc = std::allocator<CharT> > std::basic_string<CharT,Traits,Alloc> string( const Alloc& a = Alloc() ) const;` | (1) | (filesystem TS) |
|  | (2) | (filesystem TS) |
| `std::string string() const;` |  |  |
| `std::wstring wstring() const;` |  |  |
| `std::string u8string() const;` |  |  |
| `std::u16string u16string() const;` |  |  |
| `std::u32string u32string() const;` |  |  |

Returns the internal pathname in native pathname format, converted to specific string type. Conversion, if any, is specified in todo.

1) All memory allocations are performed by `a`.

2) The encoding in the case of `u8string()` is always UTF-8.

### Parameters

(none)

### Return value

The internal pathname in native pathname format, converted to specified string type.

### Exceptions

May throw implementation-defined exceptions.

### Example

```cpp
#include <clocale>
#include <cstdio>
#include <experimental/filesystem>
#include <fstream>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    std::setlocale(LC_ALL, "en_US.utf8");
    std::locale::global(std::locale("en_US.utf8"));

    fs::path p = fs::u8path(u8"要らない.txt");

    // native string representation can be used with OS APIs
    std::ofstream(p) << "File contents"; // this uses operator string()
    if (std::FILE* f = std::fopen(p.c_str(), "r"))
    {
        int ch;
        while ((ch=fgetc(f))!= EOF) putchar(ch);
        std::fclose(f);
    }

    // multibyte and wide representation can be used for output
    std::cout.imbue(std::locale());
    std::cout << "\nFile name in narrow multibyte encoding: "
              << p.string() << '\n';

    std::wcerr.imbue(std::locale());
    std::wcerr << "File name in wide encoding: "
               << p.wstring() << '\n';

    fs::remove(p);
}
```

Possible output:

```text
File contents
File name in narrow multibyte encoding: 要らない.txt
File name in wide encoding: 要らない.txt
```

### See also

generic_string, generic_wstring, generic_u8string, generic_u16string, generic_u32string returns the path in generic pathname format converted to a string (public member function)
