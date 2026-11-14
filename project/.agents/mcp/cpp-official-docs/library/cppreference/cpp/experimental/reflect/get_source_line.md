# std::experimental::reflect::get_source_line

| Defined in header `<experimental/reflect>` |  |
| --- | --- |
| `template< Object T > struct get_source_line;` | (reflection TS) |

Provides the member constant `value` equal to the presumed line number of the declaration of the entity or typedef-name reflected by `T`.

### Helper variable template

`template< class T > constexpr auto get_source_line_v = get_source_line<T>::value;` (reflection TS)

## Inherited from std::integral_constant

### Member constants

value [static] the presumed line number of the declaration of the entity or typedef-name reflected by `T` (public static member constant)

### Member functions

|  |  |
| --- | --- |
| operator std::uint_least32_t | converts the object to `std::uint_least32_t`, returns `value` (public member function) |
| operator() (C++14) | returns `value` (public member function) |

### Member types

| Type | Definition |
| --- | --- |
| `value_type` | `std::uint_least32_t` |
| `type` | `std::integral_constant<std::uint_least32_t, value>` |

### Example

The following code shows the source code line of an object or a class.

```cpp
#include<experimental/reflect>
#include<iostream>

using refl = std::experimental::reflect;

float f;
struct P{};

int main()
{
    std::cout << refl::get_source_line_v<reflexpr(f)> << '\n';
    std::cout << refl::get_source_line_v<reflexpr(P)> << '\n';
}
```

Output:

```text
6
7
```

### See also

|  |  |
| --- | --- |
| line | return the line number represented by this object (public member function of `std::source_location`) |
| source_line | gets the line number that lexically relates the evaluation represented by the `stacktrace_entry` (public member function of `std::stacktrace_entry`) |
