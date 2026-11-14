# std::wstring_convert<Codecvt,Elem,Wide_alloc,Byte_alloc>::wstring_convert

|  |  |  |
| --- | --- | --- |
| `wstring_convert() : wstring_convert( new Codecvt ) {}` | (1) |  |
| `explicit wstring_convert( Codecvt* pcvt );` | (2) |  |
| `wstring_convert( Codecvt* pcvt, state_type state );` | (3) |  |
| `explicit wstring_convert( const byte_string& byte_err, const wide_string& wide_err = wide_string() );` | (4) |  |
| `wstring_convert( const std::wstring_convert& ) = delete;` | (5) | (since C++14) |

| Overload | Data members |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| `byte_err_string` | `wide_err_string` | `cvtptr` | `cvtstate` | `cvtcount` |  |
| (1) | default-initialized |  | `new Codecvt` | default-initialized | uninitialized |
| (2) | `pcvt` |  |  |  |  |
| (3) | `state` |  |  |  |  |
| (4) | `byte_err` | `wide_err` | `new Codecvt` | `state_type()` |  |

2,3) If `pcvt` is a null pointer, the behavior is undefined.

5) The copy constructor is deleted, `wstring_convert` is not CopyConstructible.

### Parameters

|  |  |  |
| --- | --- | --- |
| pcvt | - | pointer to the conversion facet |
| state | - | initial value of the conversion shift state |
| byte_err | - | narrow string to display on errors |
| wide_err | - | wide string to display on errors |

### Example

```cpp
#include <codecvt>
#include <locale>
#include <utility>

// utility wrapper to adapt locale-bound facets for wstring/wbuffer convert
template<class Facet>
struct deletable_facet : Facet
{
    using Facet::Facet; // inherit constructors
    ~deletable_facet() {}
};

int main()
{
    // UTF-16le / UCS4 conversion
    std::wstring_convert
        <std::codecvt_utf16<char32_t, 0x10ffff, std::little_endian>> u16to32;

    // UTF-8 / wide string conversion with custom messages
    std::wstring_convert<std::codecvt_utf8<wchar_t>> u8towide("Error!", L"Error!");

    // GB18030 / wide string conversion facet
    using F = deletable_facet<std::codecvt_byname<wchar_t, char, std::mbstate_t>>;
    std::wstring_convert<F> gbtowide(new F("zh_CN.gb18030"));
}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2175 | C++11 | `pcvt` could be a null pointer | the behavior is undefined in this case |
| LWG 2176 | C++11 | constructors accepting single argument were implicit | made explicit |
| P0935R0 | C++11 | the default constructor was explicit | made implicit |
