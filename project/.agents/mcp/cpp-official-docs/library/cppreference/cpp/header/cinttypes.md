# Standard library header <cinttypes> (C++11)

This header was originally in the C standard library as `<inttypes.h>`.

|  |  |
| --- | --- |
| Includes |  |
| <cstdint> (C++11) | Fixed-width integer types and limits of other types |
| Types |  |
| imaxdiv_t (C++11) | structure type, returned by `std::imaxdiv` (typedef) |
| Functions |  |
| abs(std::intmax_t), imaxabs (C++11), (C++11) | computes absolute value of an integral value (\(\small{\|x\|}\)\|x\|) (function) |
| div(std::intmax_t), imaxdiv (C++11), (C++11) | computes quotient and remainder of integer division (function) |
| strtoimax, strtoumax (C++11), (C++11) | converts a byte string to `std::intmax_t` or `std::uintmax_t` (function) |
| wcstoimax, wcstoumax (C++11), (C++11) | converts a wide string to `std::intmax_t` or `std::uintmax_t` (function) |
| Macros |  |
| Format constants for the `std::fprintf` family of functions |  |
| PRId8, PRId16, PRId32, PRId64, PRIdLEAST8, PRIdLEAST16, PRIdLEAST32, PRIdLEAST64, PRIdFAST8, PRIdFAST16, PRIdFAST32, PRIdFAST64, PRIdMAX, PRIdPTR (C++11) | format conversion specifier to output a signed decimal integer value of type `std::int8_t`, `std::int16_t`, `std::int32_t`, `std::int64_t`, `std::int_least8_t`, `std::int_least16_t`, `std::int_least32_t`, `std::int_least64_t`, `std::int_fast8_t`, `std::int_fast16_t`, `std::int_fast32_t`, `std::int_fast64_t`, `std::intmax_t`, `std::intptr_t` respectively, equivalent to `d` for `int` (macro constant) |
| PRIi8, PRIi16, PRIi32, PRIi64, PRIiLEAST8, PRIiLEAST16, PRIiLEAST32, PRIiLEAST64, PRIiFAST8, PRIiFAST16, PRIiFAST32, PRIiFAST64, PRIiMAX, PRIiPTR (C++11) | format conversion specifier to output a signed decimal integer value of type `std::int8_t`, `std::int16_t`, `std::int32_t`, `std::int64_t`, `std::int_least8_t`, `std::int_least16_t`, `std::int_least32_t`, `std::int_least64_t`, `std::int_fast8_t`, `std::int_fast16_t`, `std::int_fast32_t`, `std::int_fast64_t`, `std::intmax_t`, `std::intptr_t` respectively, equivalent to `i` for `int` (macro constant) |
| PRIu8, PRIu16, PRIu32, PRIu64, PRIuLEAST8, PRIuLEAST16, PRIuLEAST32, PRIuLEAST64, PRIuFAST8, PRIuFAST16, PRIuFAST32, PRIuFAST64, PRIuMAX, PRIuPTR (C++11) | format conversion specifier to output an unsigned decimal integer value of type `std::uint8_t`, `std::uint16_t`, `std::uint32_t`, `std::uint64_t`, `std::uint_least8_t`, `std::uint_least16_t`, `std::uint_least32_t`, `std::uint_least64_t`, `std::uint_fast8_t`, `std::uint_fast16_t`, `std::uint_fast32_t`, `std::uint_fast64_t`, `std::uintmax_t`, `std::uintptr_t` respectively, equivalent to `u` for `unsigned int` (macro constant) |
| PRIo8, PRIo16, PRIo32, PRIo64, PRIoLEAST8, PRIoLEAST16, PRIoLEAST32, PRIoLEAST64, PRIoFAST8, PRIoFAST16, PRIoFAST32, PRIoFAST64, PRIoMAX, PRIoPTR (C++11) | format conversion specifier to output an unsigned octal integer value of type `std::uint8_t`, `std::uint16_t`, `std::uint32_t`, `std::uint64_t`, `std::uint_least8_t`, `std::uint_least16_t`, `std::uint_least32_t`, `std::uint_least64_t`, `std::uint_fast8_t`, `std::uint_fast16_t`, `std::uint_fast32_t`, `std::uint_fast64_t`, `std::uintmax_t`, `std::uintptr_t` respectively, equivalent to `o` for `unsigned int` (macro constant) |
| PRIx8, PRIx16, PRIx32, PRIx64, PRIxLEAST8, PRIxLEAST16, PRIxLEAST32, PRIxLEAST64, PRIxFAST8, PRIxFAST16, PRIxFAST32, PRIxFAST64, PRIxMAX, PRIxPTR (C++11) | format conversion specifier to output an unsigned lowercase hexadecimal integer value of type `std::uint8_t`, `std::uint16_t`, `std::uint32_t`, `std::uint64_t`, `std::uint_least8_t`, `std::uint_least16_t`, `std::uint_least32_t`, `std::uint_least64_t`, `std::uint_fast8_t`, `std::uint_fast16_t`, `std::uint_fast32_t`, `std::uint_fast64_t`, `std::uintmax_t`, `std::uintptr_t` respectively, equivalent to `x` for `unsigned int` (macro constant) |
| PRIX8, PRIX16, PRIX32, PRIX64, PRIXLEAST8, PRIXLEAST16, PRIXLEAST32, PRIXLEAST64, PRIXFAST8, PRIXFAST16, PRIXFAST32, PRIXFAST64, PRIXMAX, PRIXPTR (C++11) | format conversion specifier to output an unsigned uppercase hexadecimal integer value of type `std::uint8_t`, `std::uint16_t`, `std::uint32_t`, `std::uint64_t`, `std::uint_least8_t`, `std::uint_least16_t`, `std::uint_least32_t`, `std::uint_least64_t`, `std::uint_fast8_t`, `std::uint_fast16_t`, `std::uint_fast32_t`, `std::uint_fast64_t`, `std::uintmax_t`, `std::uintptr_t` respectively, equivalent to `X` for `unsigned int` (macro constant) |
| Format constants for the `std::fscanf` family of functions |  |
| SCNd8, SCNd16, SCNd32, SCNd64, SCNdLEAST8, SCNdLEAST16, SCNdLEAST32, SCNdLEAST64, SCNdFAST8, SCNdFAST16, SCNdFAST32, SCNdFAST64, SCNdMAX, SCNdPTR (C++11) | format conversion specifier to input a signed decimal integer value of type `std::int8_t`, `std::int16_t`, `std::int32_t`, `std::int64_t`, `std::int_least8_t`, `std::int_least16_t`, `std::int_least32_t`, `std::int_least64_t`, `std::int_fast8_t`, `std::int_fast16_t`, `std::int_fast32_t`, `std::int_fast64_t`, `std::intmax_t`, `std::intptr_t` respectively, equivalent to `d` for `int` (macro constant) |
| SCNi8, SCNi16, SCNi32, SCNi64, SCNiLEAST8, SCNiLEAST16, SCNiLEAST32, SCNiLEAST64, SCNiFAST8, SCNiFAST16, SCNiFAST32, SCNiFAST64, SCNiMAX, SCNiPTR (C++11) | format conversion specifier to input a signed decimal/octal/hexadecimal integer value of type `std::int8_t`, `std::int16_t`, `std::int32_t`, `std::int64_t`, `std::int_least8_t`, `std::int_least16_t`, `std::int_least32_t`, `std::int_least64_t`, `std::int_fast8_t`, `std::int_fast16_t`, `std::int_fast32_t`, `std::int_fast64_t`, `std::intmax_t`, `std::intptr_t` respectively, equivalent to `i` for `int` (macro constant) |
| SCNu8, SCNu16, SCNu32, SCNu64, SCNuLEAST8, SCNuLEAST16, SCNuLEAST32, SCNuLEAST64, SCNuFAST8, SCNuFAST16, SCNuFAST32, SCNuFAST64, SCNuMAX, SCNuPTR (C++11) | format conversion specifier to input an unsigned decimal integer value of type `std::uint8_t`, `std::uint16_t`, `std::uint32_t`, `std::uint64_t`, `std::uint_least8_t`, `std::uint_least16_t`, `std::uint_least32_t`, `std::uint_least64_t`, `std::uint_fast8_t`, `std::uint_fast16_t`, `std::uint_fast32_t`, `std::uint_fast64_t`, `std::uintmax_t`, `std::uintptr_t` respectively, equivalent to `u` for `unsigned int` (macro constant) |
| SCNo8, SCNo16, SCNo32, SCNo64, SCNoLEAST8, SCNoLEAST16, SCNoLEAST32, SCNoLEAST64, SCNoFAST8, SCNoFAST16, SCNoFAST32, SCNoFAST64, SCNoMAX, SCNoPTR (C++11) | format conversion specifier to input an unsigned octal integer value of type `std::uint8_t`, `std::uint16_t`, `std::uint32_t`, `std::uint64_t`, `std::uint_least8_t`, `std::uint_least16_t`, `std::uint_least32_t`, `std::uint_least64_t`, `std::uint_fast8_t`, `std::uint_fast16_t`, `std::uint_fast32_t`, `std::uint_fast64_t`, `std::uintmax_t`, `std::uintptr_t` respectively, equivalent to `o` for `unsigned int` (macro constant) |
| SCNx8, SCNx16, SCNx32, SCNx64, SCNxLEAST8, SCNxLEAST16, SCNxLEAST32, SCNxLEAST64, SCNxFAST8, SCNxFAST16, SCNxFAST32, SCNxFAST64, SCNxMAX, SCNxPTR (C++11) | format conversion specifier to input an unsigned hexadecimal integer value of type `std::uint8_t`, `std::uint16_t`, `std::uint32_t`, `std::uint64_t`, `std::uint_least8_t`, `std::uint_least16_t`, `std::uint_least32_t`, `std::uint_least64_t`, `std::uint_fast8_t`, `std::uint_fast16_t`, `std::uint_fast32_t`, `std::uint_fast64_t`, `std::uintmax_t`, `std::uintptr_t` respectively, equivalent to `x` for `unsigned int` (macro constant) |

### Synopsis

```cpp
#include <cstdint>

namespace std
{
    using imaxdiv_t = /* see description */;

    constexpr intmax_t imaxabs(intmax_t j);
    constexpr imaxdiv_t imaxdiv(intmax_t numer, intmax_t denom);
    intmax_t strtoimax(const char* nptr, char** endptr, int base);
    uintmax_t strtoumax(const char* nptr, char** endptr, int base);
    intmax_t wcstoimax(const wchar_t* nptr, wchar_t** endptr, int base);
    uintmax_t wcstoumax(const wchar_t* nptr, wchar_t** endptr, int base);

    constexpr intmax_t abs(intmax_t);            // optional, see description
    constexpr imaxdiv_t div(intmax_t, intmax_t); // optional, see description
}

#define PRIdN /* see description */
#define PRIiN /* see description */
#define PRIoN /* see description */
#define PRIuN /* see description */
#define PRIxN /* see description */
#define PRIXN /* see description */
#define SCNdN /* see description */
#define SCNiN /* see description */
#define SCNoN /* see description */
#define SCNuN /* see description */
#define SCNxN /* see description */
#define PRIdLEASTN /* see description */
#define PRIiLEASTN /* see description */
#define PRIoLEASTN /* see description */
#define PRIuLEASTN /* see description */
#define PRIxLEASTN /* see description */
#define PRIXLEASTN /* see description */
#define SCNdLEASTN /* see description */
#define SCNiLEASTN /* see description */
#define SCNoLEASTN /* see description */
#define SCNuLEASTN /* see description */
#define SCNxLEASTN /* see description */
#define PRIdFASTN /* see description */
#define PRIiFASTN /* see description */
#define PRIoFASTN /* see description */
#define PRIuFASTN /* see description */
#define PRIxFASTN /* see description */
#define PRIXFASTN /* see description */
#define SCNdFASTN /* see description */
#define SCNiFASTN /* see description */
#define SCNoFASTN /* see description */
#define SCNuFASTN /* see description */
#define SCNxFASTN /* see description */
#define PRIdMAX /* see description */
#define PRIiMAX /* see description */
#define PRIoMAX /* see description */
#define PRIuMAX /* see description */
#define PRIxMAX /* see description */
#define PRIXMAX /* see description */
#define SCNdMAX /* see description */
#define SCNiMAX /* see description */
#define SCNoMAX /* see description */
#define SCNuMAX /* see description */
#define SCNxMAX /* see description */
#define PRIdPTR /* see description */
#define PRIiPTR /* see description */
#define PRIoPTR /* see description */
#define PRIuPTR /* see description */
#define PRIxPTR /* see description */
#define PRIXPTR /* see description */
#define SCNdPTR /* see description */
#define SCNiPTR /* see description */
#define SCNoPTR /* see description */
#define SCNuPTR /* see description */
#define SCNxPTR /* see description */
```
