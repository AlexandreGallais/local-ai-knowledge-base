# std::println(std::ostream)

| Defined in header `<ostream>` |  |  |
| --- | --- | --- |
| `template< class... Args > void println( std::ostream& os, std::format_string<Args...> fmt, Args&&... args );` | (1) | (since C++23) |
| `void println( std::ostream& os );` | (2) | (since C++26) |

Formats `args` according to the format string `fmt` with appended `'\n'` (which means that each output ends with a new-line), and inserts the result into `os` stream.

1) Equivalent to: `std::print(os, "{}\n", std::format(os.getloc(), fmt, args...));`

2) Equivalent to: `std::print(os, "\n");`

The behavior is undefined if `std::formatter<Ti, char>` does not meet the BasicFormatter requirements for any `Ti` in `Args` (as required by `std::make_format_args`).

### Parameters

|  |  |  |
| --- | --- | --- |
| os | - | output stream to insert data into |
| fmt | - | an object that represents the format string. The format string consists of ordinary characters (except `{` and `}`), which are copied unchanged to the output, escape sequences `{{` and `}}`, which are replaced with `{` and `}` respectively in the output, and replacement fields. Each replacement field has the following format: `{` arg-id (optional) `}` (1) `{` arg-id (optional) `:` format-spec `}` (2) 1) replacement field without a format specification 2) replacement field with a format specification arg-id - specifies the index of the argument in `args` whose value is to be used for formatting; if it is omitted, the arguments are used in order. The arg-id s in a format string must all be present or all be omitted. Mixing manual and automatic indexing is an error. format-spec - the format specification defined by the `std::formatter` specialization for the corresponding argument. Cannot start with `}`. For basic types and standard string types, the format specification is interpreted as standard format specification. For chrono types, the format specification is interpreted as chrono format specification. For range types, the format specification is interpreted as range format specification. For `std::pair` and `std::tuple`, the format specification is interpreted as tuple format specification. For `std::thread::id` and `std::stacktrace_entry`, see thread id format specification and stacktrace entry format specification. For `std::basic_stacktrace`, no format specifier is allowed. (since C++23) For `std::filesystem::path`, see path format specification. (since C++26) For other formattable types, the format specification is determined by user-defined `formatter` specializations. |
| args... | - | arguments to be formatted |

### Return value

(none)

### Exceptions

- `std::bad_alloc` on allocation failure.
- Propagate any exception thrown by any formatter, e.g. `std::format_error`, without regard to the value of `os.exceptions()` and without turning on `ios_base::badbit` in the error state of `os`.
- May throw `ios_base::failure` caused by `os.setstate(ios_base::badbit)` which is called if an insertion into `os` fails.

### Notes

Although overload (2) is added in C++26, all known implementations make it available in C++23 mode.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_print` | `202207L` | (C++23) | Formatted output |
| `__cpp_lib_format` | `202207L` | (C++23) | Exposing `std::basic_format_string` |

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 4088 | C++23 | (1) ignored the locale imbued in `os` in formatting arguments | such locale is used |

### See also

|  |  |
| --- | --- |
| print(std::ostream) (C++23) | outputs formatted representation of the arguments (function template) |
| println (C++23) | same as `std::print` except that each print is terminated by additional new line (function template) |
| format (C++20) | stores formatted representation of the arguments in a new string (function template) |
