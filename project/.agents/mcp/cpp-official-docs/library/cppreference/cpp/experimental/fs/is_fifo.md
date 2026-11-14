# std::experimental::filesystem::is_fifo

| Defined in header `<experimental/filesystem>` |  |  |
| --- | --- | --- |
| `bool is_fifo( file_status s );` | (1) | (filesystem TS) |
| `bool is_fifo( const path& p );` | (2) | (filesystem TS) |
| `bool is_fifo( const path& p, error_code& ec );` | (3) | (filesystem TS) |

Checks if the given file status or path corresponds to a FIFO or pipe file.

1) Equivalent to `s.type() == file_type::fifo`.

2) Equivalent to `is_fifo(status(p))`.

3) Equivalent to `is_fifo(status(p, ec))`. Returns `false` and sets `ec` to an appropriate error code if an error occurs. Otherwise, `ec` is cleared with a call to `ec.clear()`.

### Parameters

|  |  |  |
| --- | --- | --- |
| s | - | file status to check |
| p | - | path to query |
| ec | - | error code to modify in case of errors |

### Return value

`true` if the given path or file status corresponds to a FIFO file.

### Exceptions

1,3)

`noexcept` specification:

`noexcept`

2) Throws `filesystem_error` if an error occurs. The exception object is constructed with `p` as an argument.

### See also

This section is incomplete
