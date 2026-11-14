# Text processing library

The text processing library includes components for dealing with text.

### Localization library

The headers `<locale>` and `<clocale>` provide internationalization support for character classification and string collation, numeric, monetary, and date/time formatting and parsing, and message retrieval.

### Regular expressions library (since C++11)

The header `<regex>` provides a class that represents regular expressions, which are a kind of mini-language used to perform pattern matching within strings.

### Formatting library (since C++20)

The header `<format>` provides facilities for type-safe and extensible string formatting that is an alternative to the `printf` family of functions, and intended to complement the existing C++ I/O streams library.

### Null-terminated sequence utilities

*Null-terminated character sequences* (NTCTS) are sequences of characters that are terminated by a null character (the value after value-initialization).

The strings library provides functions to create, inspect, and modify such sequences:

- null-terminated byte strings (NTBS) helper functions (including support of wide character types),
- null-terminated multibyte strings (NTMBS) helper functions.

### Primitive numeric conversions (since C++17)

In addition to sophisticated locale-dependent parsers and formatters provided by the C++ I/O library, the C I/O library, C++ string converters, and C string converters, the header `<charconv>` provides light-weight, locale-independent, non-allocating, non-throwing parsers and formatters for arithmetic types.

| Defined in header `<charconv>` |  |
| --- | --- |
| to_chars (C++17) | converts an integer or floating-point value to a character sequence (function) |
| to_chars_result (C++17) | the return type of `std::to_chars` (class) |
| from_chars (C++17) | converts a character sequence to an integer or floating-point value (function) |
| from_chars_result (C++17) | the return type of `std::from_chars` (class) |
| chars_format (C++17) | specifies formatting for `std::to_chars` and `std::from_chars` (enum) |

### Text encoding identifications (since C++26)

| Defined in header `<text_encoding>` |  |
| --- | --- |
| text_encoding (C++26) | describes an interface for accessing the IANA Character Sets registry (class) |

### See also

C++ documentation for Strings library
