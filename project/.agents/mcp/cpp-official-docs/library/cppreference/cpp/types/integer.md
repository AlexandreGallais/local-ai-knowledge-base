# Fixed width integer types (since C++11)

### Types

| Defined in header `<cstdint>` |  |
| --- | --- |
| int8_t, int16_t, int32_t, int64_t (optional) | signed integer type with width of exactly 8, 16, 32 and 64 bits respectively with no padding bits and using 2's complement for negative values (provided if and only if the implementation directly supports the type) (typedef) |
| int_fast8_t, int_fast16_t, int_fast32_t, int_fast64_t | fastest signed integer type with width of at least 8, 16, 32 and 64 bits respectively (typedef) |
| int_least8_t, int_least16_t, int_least32_t, int_least64_t | smallest signed integer type with width of at least 8, 16, 32 and 64 bits respectively (typedef) |
| intmax_t | maximum-width signed integer type (typedef) |
| intptr_t (optional) | signed integer type capable of holding a pointer to `void` (typedef) |
| uint8_t, uint16_t, uint32_t, uint64_t (optional) | unsigned integer type with width of exactly 8, 16, 32 and 64 bits respectively (provided if and only if the implementation directly supports the type) (typedef) |
| uint_fast8_t, uint_fast16_t, uint_fast32_t, uint_fast64_t | fastest unsigned integer type with width of at least 8, 16, 32 and 64 bits respectively (typedef) |
| uint_least8_t, uint_least16_t, uint_least32_t, uint_least64_t | smallest unsigned integer type with width of at least 8, 16, 32 and 64 bits respectively (typedef) |
| uintmax_t | maximum-width unsigned integer type (typedef) |
| uintptr_t (optional) | unsigned integer type capable of holding a pointer to `void` (typedef) |

The implementation may define typedef names `intN_t`, `int_fastN_t`, `int_leastN_t`, `uintN_t`, `uint_fastN_t`, and `uint_leastN_t` when *N* is not 8, 16, 32 or 64. Typedef names of the form `intN_t` may only be defined if the implementation supports an integer type of that width with no padding. Thus, `std::uint24_t` denotes an unsigned integer type with a width of exactly 24 bits.

Each of the macros listed in below is defined if and only if the implementation defines the corresponding typedef name. The macros `INTN_C` and `UINTN_C` correspond to the typedef names `int_leastN_t` and `uint_leastN_t`, respectively.

### Macro constants

| Defined in header `<cstdint>` |  |
| --- | --- |
| Signed integers : minimum value |  |
| INT8_MIN, INT16_MIN, INT32_MIN, INT64_MIN (optional) | minimum value of `std::int8_t`, `std::int16_t`, `std::int32_t` and `std::int64_t` respectively (macro constant) |
| INT_FAST8_MIN, INT_FAST16_MIN, INT_FAST32_MIN, INT_FAST64_MIN | minimum value of `std::int_fast8_t`, `std::int_fast16_t`, `std::int_fast32_t` and `std::int_fast64_t` respectively (macro constant) |
| INT_LEAST8_MIN, INT_LEAST16_MIN, INT_LEAST32_MIN, INT_LEAST64_MIN | minimum value of `std::int_least8_t`, `std::int_least16_t`, `std::int_least32_t` and `std::int_least64_t` respectively (macro constant) |
| INTPTR_MIN (optional) | minimum value of `std::intptr_t` (macro constant) |
| INTMAX_MIN | minimum value of `std::intmax_t` (macro constant) |
| Signed integers : maximum value |  |
| INT8_MAX, INT16_MAX, INT32_MAX, INT64_MAX (optional) | maximum value of `std::int8_t`, `std::int16_t`, `std::int32_t` and `std::int64_t` respectively (macro constant) |
| INT_FAST8_MAX, INT_FAST16_MAX, INT_FAST32_MAX, INT_FAST64_MAX | maximum value of `std::int_fast8_t`, `std::int_fast16_t`, `std::int_fast32_t` and `std::int_fast64_t` respectively (macro constant) |
| INT_LEAST8_MAX, INT_LEAST16_MAX, INT_LEAST32_MAX, INT_LEAST64_MAX | maximum value of `std::int_least8_t`, `std::int_least16_t`, `std::int_least32_t` and `std::int_least64_t` respectively (macro constant) |
| INTPTR_MAX (optional) | maximum value of `std::intptr_t` (macro constant) |
| INTMAX_MAX | maximum value of `std::intmax_t` (macro constant) |
| Unsigned integers : maximum value |  |
| UINT8_MAX, UINT16_MAX, UINT32_MAX, UINT64_MAX (optional) | maximum value of `std::uint8_t`, `std::uint16_t`, `std::uint32_t` and `std::uint64_t` respectively (macro constant) |
| UINT_FAST8_MAX, UINT_FAST16_MAX, UINT_FAST32_MAX, UINT_FAST64_MAX | maximum value of `std::uint_fast8_t`, `std::uint_fast16_t`, `std::uint_fast32_t` and `std::uint_fast64_t` respectively (macro constant) |
| UINT_LEAST8_MAX, UINT_LEAST16_MAX, UINT_LEAST32_MAX, UINT_LEAST64_MAX | maximum value of `std::uint_least8_t`, `std::uint_least16_t`, `std::uint_least32_t` and `std::uint_least64_t` respectively (macro constant) |
| UINTPTR_MAX (optional) | maximum value of `std::uintptr_t` (macro constant) |
| UINTMAX_MAX | maximum value of `std::uintmax_t` (macro constant) |

### Function macros for minimum-width integer constants

|  |  |
| --- | --- |
| INT8_C, INT16_C, INT32_C, INT64_C | expands to an integer constant expression having the value specified by its argument and whose type is the promoted type of `std::int_least8_t`, `std::int_least16_t`, `std::int_least32_t` and `std::int_least64_t` respectively (function macro) |
| INTMAX_C | expands to an integer constant expression having the value specified by its argument and the type `std::intmax_t` (function macro) |
| UINT8_C, UINT16_C, UINT32_C, UINT64_C | expands to an integer constant expression having the value specified by its argument and whose type is the promoted type of `std::uint_least8_t`, `std::uint_least16_t`, `std::uint_least32_t` and `std::uint_least64_t` respectively (function macro) |
| UINTMAX_C | expands to an integer constant expression having the value specified by its argument and the type `std::uintmax_t` (function macro) |

```cpp
#include <cstdint>
UINT64_C(0x123) // expands to a literal of type uint_least64_t and value 0x123
```

### Format macro constants

Defined in header `<cinttypes>`

#### Format constants for the `std::fprintf` family of functions

Each of the `PRI` macros listed here is defined if and only if the implementation defines the corresponding typedef name.

| Equivalent for `int` or `unsigned int` | Description | Macros for data types |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| `std::int`**x**`_t` | `std::int_least`**x**`_t` | `std::int_fast`**x**`_t` | `std::intmax_t` | `std::intptr_t` |  |  |
| `d` | output of a signed decimal integer value | PRId**x** | PRIdLEAST**x** | PRIdFAST**x** | PRIdMAX | PRIdPTR |
| `i` | PRIi**x** | PRIiLEAST**x** | PRIiFAST**x** | PRIiMAX | PRIiPTR |  |
| `u` | output of an unsigned decimal integer value | PRIu**x** | PRIuLEAST**x** | PRIuFAST**x** | PRIuMAX | PRIuPTR |
| `o` | output of an unsigned octal integer value | PRIo**x** | PRIoLEAST**x** | PRIoFAST**x** | PRIoMAX | PRIoPTR |
| `x` | output of an unsigned lowercase hexadecimal integer value | PRIx**x** | PRIxLEAST**x** | PRIxFAST**x** | PRIxMAX | PRIxPTR |
| `X` | output of an unsigned uppercase hexadecimal integer value | PRIX**x** | PRIXLEAST**x** | PRIXFAST**x** | PRIXMAX | PRIXPTR |

#### Format constants for the `std::fscanf` family of functions

Each of the `SCN` macros listed in here is defined if and only if the implementation defines the corresponding typedef name and has a suitable `std::fscanf` length modifier for the type.

| Equivalent for `int` or `unsigned int` | Description | Macros for data types |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| `std::int`**x**`_t` | `std::int_least`**x**`_t` | `std::int_fast`**x**`_t` | `std::intmax_t` | `std::intptr_t` |  |  |
| `d` | input of a signed decimal integer value | SCNd**x** | SCNdLEAST**x** | SCNdFAST**x** | SCNdMAX | SCNdPTR |
| `i` | input of a signed integer value | SCNi**x** | SCNiLEAST**x** | SCNiFAST**x** | SCNiMAX | SCNiPTR |
| `u` | input of an unsigned decimal integer value | SCNu**x** | SCNuLEAST**x** | SCNuFAST**x** | SCNuMAX | SCNuPTR |
| `o` | input of an unsigned octal integer value | SCNo**x** | SCNoLEAST**x** | SCNoFAST**x** | SCNoMAX | SCNoPTR |
| `x` | input of an unsigned hexadecimal integer value | SCNx**x** | SCNxLEAST**x** | SCNxFAST**x** | SCNxMAX | SCNxPTR |

### Notes

Because C++ interprets a character immediately following a string literal as a user-defined string literal, C code such as `printf("%"PRId64"\n",n);` is invalid C++ and requires a space before `PRId64`.

The C99 standard suggests that C++ implementations should not define the above limit, constant, or format macros unless the macros `__STDC_LIMIT_MACROS`, `__STDC_CONSTANT_MACROS` or `__STDC_FORMAT_MACROS` (respectively) are defined before including the relevant C header (`stdint.h` or `inttypes.h`). This recommendation was not adopted by any C++ standard and was removed in C11. However, some implementations (such as glibc 2.17) try to apply this rule, and it may be necessary to define the `__STDC` macros; C++ compilers may try to work around this by automatically defining them in some circumstances.

`std::int8_t` may be `signed char` and `std::uint8_t` may be `unsigned char`, but neither can be `char` regardless of its signedness (because `char` is not considered a "signed integer type" or "unsigned integer type").

### Example

See also a note regarding spaces before format macros used in this example.

```cpp
#include <cinttypes>
#include <cstdio>

int main()
{
    std::printf("%zu\n", sizeof(std::int64_t));
    std::printf("%s\n", PRId64);
    std::printf("%+" PRId64 "\n", INT64_MIN);
    std::printf("%+" PRId64 "\n", INT64_MAX);

    std::int64_t n = 7;
    std::printf("%+" PRId64 "\n", n);
}
```

Possible output:

```text
8
lld
-9223372036854775808
+9223372036854775807
+7
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2820 | C++11 | the requirements for optional typedef names and macros were inconsistent with C | made consistent |

### References

- C++23 standard (ISO/IEC 14882:2024):

- 17.4.1 Header <cstdint> synopsis [cstdint.syn]

- 31.13.2 Header <cinttypes> synopsis [cinttypes.syn]

- C++20 standard (ISO/IEC 14882:2020):

- 17.4 Integer types [cstdint]

- 29.12.2 Header <cinttypes> synopsis [cinttypes.syn]

- C++17 standard (ISO/IEC 14882:2017):

- 21.4 Integer types [cstdint]

- 30.11.2 Header <cinttypes> synopsis [cinttypes.syn]

- C++14 standard (ISO/IEC 14882:2014):

- 18.4 Integer types [cstdint]

- 27.9.2 C library files [c.files]

- C++11 standard (ISO/IEC 14882:2011):

- 18.4 Integer types [cstdint]

- 27.9.2 C library files [c.files]

### See also

- Fundamental types

C documentation for Fixed width integer types
