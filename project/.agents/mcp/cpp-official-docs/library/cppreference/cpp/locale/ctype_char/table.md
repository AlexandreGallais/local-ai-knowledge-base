# std::ctype<char>::table

| Defined in header `<locale>` |  |
| --- | --- |
| `const mask* table() const throw();` | (until C++11) |
| `const mask* table() const noexcept;` | (since C++11) |

Returns the classification table that was provided in the constructor of this instance of `std::ctype<char>`, or returns a copy of `classic_table()` if none was provided.

### Parameters

(none)

### Return value

A pointer to the first element in the classification table (which an array of size `std::ctype<char>::table_size`).

### Example

This section is incomplete Reason: no example
