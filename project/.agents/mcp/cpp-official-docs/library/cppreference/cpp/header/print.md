# Standard library header <print> (C++23)

This header is part of the Input/Output library.

|  |  |
| --- | --- |
| Functions |  |
| print (C++23) | prints to `stdout` or a file stream using formatted representation of the arguments (function template) |
| println (C++23) | same as `std::print` except that each print is terminated by additional new line (function template) |
| vprint_unicode, vprint_unicode_buffered (C++23) | prints to Unicode capable `stdout` or a file stream using type-erased argument representation (function) |
| vprint_nonunicode, vprint_nonunicode_buffered (C++23) | prints to `stdout` or a file stream using type-erased argument representation (function) |

### Synopsis

```cpp
namespace std {
  // print functions
  template<class... Args>
    void print(format_string<Args...> fmt, Args&&... args);
  template<class... Args>
    void print(FILE* stream, format_string<Args...> fmt, Args&&... args);

  template<class... Args>
    void println(format_string<Args...> fmt, Args&&... args);
  void println();
  template<class... Args>
    void println(FILE* stream, format_string<Args...> fmt, Args&&... args);
  void println(FILE* stream);

  void vprint_unicode(string_view fmt, format_args args);
  void vprint_unicode(FILE* stream, string_view fmt, format_args args);

  void vprint_unicode_locking(FILE* stream, string_view fmt, format_args args);

  void vprint_nonunicode(string_view fmt, format_args args);
  void vprint_nonunicode(FILE* stream, string_view fmt, format_args args);

  void vprint_nonunicode_locking(FILE* stream, string_view fmt, format_args args);
}
```

### References

- C++23 standard (ISO/IEC 14882:2024):

- 31.7.4 Header `<print>` synopsis [print.syn]

- 31.7.10 Print functions [print.fun]
