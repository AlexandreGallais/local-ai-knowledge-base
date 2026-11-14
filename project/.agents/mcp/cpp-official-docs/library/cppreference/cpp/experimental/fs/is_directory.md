# std::experimental::filesystem::is_directory

| Defined in header `<experimental/filesystem>` |  |  |
| --- | --- | --- |
| `bool is_directory( file_status s );` | (1) | (filesystem TS) |
| `bool is_directory( const path& p );` | (2) | (filesystem TS) |
| `bool is_directory( const path& p, error_code& ec );` | (3) | (filesystem TS) |

Checks if the given file status or path corresponds to a directory.

1) Equivalent to `s.type() == file_type::directory`.

2) Equivalent to `is_directory(status(p))`.

3) Equivalent to `is_directory(status(p, ec))`. Returns `false` if error occurs.

### Parameters

|  |  |  |
| --- | --- | --- |
| s | - | file status to check |
| p | - | path to query |
| ec | - | error code to modify in case of errors |

### Return value

`true` if the given path or file status corresponds to a directory, `false` otherwise.

### Exceptions

1,3)

`noexcept` specification:

`noexcept`

2) Throws `filesystem_error` if an error occurs. The exception object is constructed with `p` as an argument.

### See also

This section is incomplete
