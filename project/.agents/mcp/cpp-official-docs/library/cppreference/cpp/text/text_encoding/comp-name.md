# std::text_encoding::*comp-name*

`static constexpr bool /*comp-name*/( std::string_view a, std::string_view b );` (since C++26) (exposition only*)

Compares two strings `a` and `b` encoded in ordinary literal encoding following the Unicode Charset Alias Matching rules.

Two strings are considered equal when comparing from left to right after:

- removing all non-alphanumeric characters,
- converting all letters to the same case, and
- removing any standalone sequences of `'0'` characters that do not immediately follow a numeric prefix. A numeric prefix consists of a non-zero digit (`'1'` through `'9'`) optionally followed by one or more non-alphanumeric characters.

Here are the following examples:

```cpp
static_assert(/*comp-name*/("UTF-8", "utf8") == true);
static_assert(/*comp-name*/("u.t.f-008", "utf8") == true);
static_assert(/*comp-name*/("ISO-8859-1", "iso88591") == true);
static_assert(/*comp-name*/("ut8", "utf8") == false);
static_assert(/*comp-name*/("utf-80", "utf8") == false);
```

### Parameters

a, b - strings to compare

### Return value

`true` if two strings compare equal as described above; `false` otherwise.
