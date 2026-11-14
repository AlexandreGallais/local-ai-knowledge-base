# std::basic_format_context

| Defined in header `<format>` |  |  |
| --- | --- | --- |
| `template< class OutputIt, class CharT > class basic_format_context;` | (1) | (since C++20) |
| `using format_context = basic_format_context</* unspecified */, char>;` | (2) | (since C++20) |
| `using wformat_context = basic_format_context</* unspecified */, wchar_t>;` | (3) | (since C++20) |

Provides access to formatting state consisting of the formatting arguments and the output iterator.

2) The unspecified template argument is an output iterator that appends to `std::string`, such as `std::back_insert_iterator<std::string>`. Implementations typically use an iterator to type-erased buffer type that supports appending to any contiguous and resizable container.

3) The unspecified template argument is an output iterator that appends to `std::wstring`.

The behavior is undefined if `OutputIt` does not model `std::output_iterator<const CharT&>`.

A program that declares an explicit or partial specialization of `std::basic_format_context` is ill-formed, no diagnostic required.

`std::basic_format_context` objects can only be created by the implementation. User codes are only allowed to modify the format context via the `format` function of `std::formatter` specializations.

### Member types

| Type | Definition |
| --- | --- |
| `iterator` | `OutputIt` |
| `char_type` | `CharT` |

### Member alias templates

| Type | Definition |
| --- | --- |
| `formatter_type<T>` | `std::formatter<T, CharT>` |

### Member functions

|  |  |
| --- | --- |
| (constructor) [deleted] | `basic_format_context` cannot be constructed by user code (public member function) |
| operator= [deleted] | `basic_format_context` is not assignable (public member function) |
| arg | returns the argument at the given index (public member function) |
| locale | returns the locale used for locale-specific formatting (public member function) |
| out | returns the iterator to output buffer (public member function) |
| advance_to | advances the output iterator to the given position (public member function) |

## std::basic_format_context::arg

`std::basic_format_arg<basic_format_context> arg( std::size_t id ) const;`

Returns a `std::basic_format_arg` holding the `id`-th argument in `args`, where `args` is the parameter pack or `std::basic_format_args` object passed to the formatting function.

If `id` is not less than the number of formatting arguments, returns a default-constructed `std::basic_format_arg` (holding a `std::monostate` object).

## std::basic_format_context::locale

`std::locale locale();`

Returns the locale passed to the formatting function, or a default-constructed `std::locale` if the formatting function does not take a locale.

## std::basic_format_context::out

`iterator out();`

Returns the iterator to the output buffer. The result is move-constructed from the stored iterator.

## std::basic_format_context::advance_to

`void advance_to( iterator it );`

Move assigns `it` to the stored output iterator. After a call to `advance_to`, the next call to `out()` will return an iterator with the value that `it` had before the assignment.

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3567 | C++20 | `basic_format_context` does not work move-only iterator types | made to move iterators |
| LWG 3975 | C++20 | user specialization of `basic_format_context` was allowed | disallowed |
| LWG 4061 | C++20 | `basic_format_context` was constructible and assignable by user code | made neither constructible nor assignable |
