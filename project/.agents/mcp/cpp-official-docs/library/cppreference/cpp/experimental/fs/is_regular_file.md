# std::experimental::filesystem::is_regular_file

| Defined in header `<experimental/filesystem>` |  |  |
| --- | --- | --- |
| `bool is_regular_file( file_status s );` | (1) | (filesystem TS) |
| `bool is_regular_file( const path& p );` | (2) | (filesystem TS) |
| `bool is_regular_file( const path& p, error_code& ec );` | (3) | (filesystem TS) |

Checks if the given file status or path corresponds to a regular file.

1) Equivalent to `s.type() == file_type::regular`.

2) Equivalent to `is_regular_file(status(p))`.

3) Equivalent to `is_regular_file(status(p, ec))`. Returns `false` and sets `ec` to an appropriate error code if an error occurs. Otherwise, `ec` is cleared with a call to `ec.clear()`.

This section is incomplete Reason: the specification says that (2) throws filesystem_error if status(p) would throw filesystem_error. This is different from the rest of is_**_file functions. Is that correct and if yes, what's the rationale?

### Parameters

|  |  |  |
| --- | --- | --- |
| s | - | file status to check |
| p | - | path to examine |
| ec | - | error code to store the error status to |

### Return value

`true` if the given path or file status corresponds to a regular link, `false` otherwise.

### Exceptions

1,3)

`noexcept` specification:

`noexcept`

2) Throws `filesystem_error` if an error occurs. The error is constructed with `p` as an argument. The error code is set to an appropriate error code for the error that caused the failure.

### See also

This section is incomplete
