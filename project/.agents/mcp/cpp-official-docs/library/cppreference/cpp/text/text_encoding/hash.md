# std::hash<std::text_encoding>

| Defined in header `<text_encoding>` |  |
| --- | --- |
| `template<> struct hash<std::text_encoding>;` | (since C++26) |

The template specialization of `std::hash` for `std::text_encoding` allows users to obtain hashes of encoded id and name of type `std::text_encoding`.

`operator()` of this specialization is noexcept.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| hash (C++11) | hash function object (class template) |
| std::hash<std::basic_stacktrace> (C++23) | hash support for `std::basic_stacktrace` (class template specialization) |
