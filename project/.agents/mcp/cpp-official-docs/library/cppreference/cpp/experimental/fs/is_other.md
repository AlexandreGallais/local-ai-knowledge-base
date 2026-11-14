# std::experimental::filesystem::is_other

| Defined in header `<experimental/filesystem>` |  |  |
| --- | --- | --- |
| `bool is_other( file_status s );` | (1) | (filesystem TS) |
| `bool is_other( const path& p );` | (2) | (filesystem TS) |
| `bool is_other( const path& p, error_code& ec );` | (3) | (filesystem TS) |

Checks if the given file status or path corresponds to a file of type *other* type. That is, the file exists, but is neither regular file, nor directory nor a symlink.

1) Equivalent to `exists(s) && !is_regular_file(s) && !is_directory(s) && !is_symlink(s)`.

2) Equivalent to `is_other(status(p))`.

3) Equivalent to `is_other(status(p, ec))`. Returns `false` and sets `ec` to an appropriate error code if an error occurs. Otherwise, `ec` is cleared with a call to `ec.clear()`.

### Parameters

|  |  |  |
| --- | --- | --- |
| s | - | file status to check |
| p | - | path to examine |
| ec | - | error code to store the error status to |

### Return value

`true` if the given path or file status corresponds to a *other* file, `false` otherwise.

### Exceptions

1,3)

`noexcept` specification:

`noexcept`

2) Throws `filesystem_error` if an error occurs. The error is constructed with `p` as an argument. The error code is set to an appropriate error code for the error that caused the failure.

### See also

This section is incomplete
