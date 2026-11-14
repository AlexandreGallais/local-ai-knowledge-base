# Experimental library header <experimental/string_view>

This header is part of the Library Fundamentals TS (v1, v2).

### Classes

| Name | Description |
| --- | --- |
| `std::experimental::basic_string_view` (library fundamentals TS) | Class template representing a reference to a character string (class template) |
| `std::experimental::string_view` (library fundamentals TS) | `std::experimental::basic_string_view<char>` (typedef) |
| `std::experimental::wstring_view` (library fundamentals TS) | `std::experimental::basic_string_view<wchar_t>` (typedef) |
| `std::experimental::u16string_view` (library fundamentals TS) | `std::experimental::basic_string_view<char16_t>` (typedef) |
| `std::experimental::u32string_view` (library fundamentals TS) | `std::experimental::basic_string_view<char32_t>` (typedef) |
| `std::hash<std::experimental::string_view>` (library fundamentals TS) | (class template specialization) |
| `std::hash<std::experimental::u16string_view>` (library fundamentals TS) | (class template specialization) |
| `std::hash<std::experimental::u32string_view>` (library fundamentals TS) | (class template specialization) |
| `std::hash<std::experimental::wstring_view>` (library fundamentals TS) | (class template specialization) |

### Functions

|  |  |
| --- | --- |
| operator==, operator!=, operator<, operator>, operator<=, operator>= | lexicographically compares two views (function template) |
| Output |  |
| operator<< | performs stream output on views (function template) |

### Synopsis

```cpp
namespace std {
  namespace experimental {
  inline namespace fundamentals_v1 {

    // 7.2, Class template basic_string_view
    template<class CharT, class Traits = char_traits<CharT>>
        class basic_string_view;

    // 7.9, basic_string_view non-member comparison functions
    template<class CharT, class Traits>
    constexpr bool operator==(basic_string_view<CharT, Traits> x,
                              basic_string_view<CharT, Traits> y) noexcept;
    template<class CharT, class Traits>
    constexpr bool operator!=(basic_string_view<CharT, Traits> x,
                              basic_string_view<CharT, Traits> y) noexcept;
    template<class CharT, class Traits>
    constexpr bool operator< (basic_string_view<CharT, Traits> x,
                                 basic_string_view<CharT, Traits> y) noexcept;
    template<class CharT, class Traits>
    constexpr bool operator> (basic_string_view<CharT, Traits> x,
                              basic_string_view<CharT, Traits> y) noexcept;
    template<class CharT, class Traits>
    constexpr bool operator<=(basic_string_view<CharT, Traits> x,
                                 basic_string_view<CharT, Traits> y) noexcept;
    template<class CharT, class Traits>
    constexpr bool operator>=(basic_string_view<CharT, Traits> x,
                              basic_string_view<CharT, Traits> y) noexcept;
    // /* see description */, sufficient additional overloads of comparison functions

    // 7.10, Inserters and extractors
    template<class CharT, class Traits>
      basic_ostream<CharT, Traits>&
        operator<<(basic_ostream<CharT, Traits>& os,
                   basic_string_view<CharT, Traits> str);

    // basic_string_view typedef names
    typedef basic_string_view<char> string_view;
    typedef basic_string_view<char16_t> u16string_view;
    typedef basic_string_view<char32_t> u32string_view;
    typedef basic_string_view<wchar_t> wstring_view;

  }  // namespace fundamentals_v1
  }  // namespace experimental

  // 7.11, Hash support
  template <class T> struct hash;
  template <> struct hash<experimental::string_view>;
  template <> struct hash<experimental::u16string_view>;
  template <> struct hash<experimental::u32string_view>;
  template <> struct hash<experimental::wstring_view>;

}  // namespace std
```
