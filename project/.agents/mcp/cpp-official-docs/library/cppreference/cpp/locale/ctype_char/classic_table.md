# std::ctype<char>::classic_table

| Defined in header `<locale>` |  |
| --- | --- |
| `static const mask* classic_table() throw();` | (until C++11) |
| `static const mask* classic_table() noexcept;` | (since C++11) |

Returns the classification table that matches the classification used by the minimal "C" locale.

### Parameters

(none)

### Return value

A pointer to the first element in the classification table (which is an array of size `std::ctype<char>::table_size`).

### Notes

Default-constructed `std::ctype<char>` facets use this table for classification.

### Example

This section is incomplete Reason: no example
