# std::experimental::filesystem::is_empty

| Defined in header `<experimental/filesystem>` |  |  |
| --- | --- | --- |
| `bool is_empty( const path& p );` | (1) | (filesystem TS) |
| `bool is_empty( const path& p, error_code& ec );` | (2) | (filesystem TS) |

Checks whether the given path refers to an empty file or directory.

The second version returns `false` and sets `ec` to an appropriate error code if an error occurs. Otherwise, `ec` is cleared with a call to `ec.clear()`.

### Parameters

|  |  |  |
| --- | --- | --- |
| p | - | path to examine |
| ec | - | error code to modify in case of error |

### Return value

`true` if `p` refers to an empty file or directory, `false` otherwise.

### Exceptions

1) `filesystem_error` if an error occurs. The exception object is constructed with `p` as an argument. The error code is set to an appropriate error code for the error that caused the failure.

2)

`noexcept` specification:

`noexcept`

### See also

This section is incomplete
