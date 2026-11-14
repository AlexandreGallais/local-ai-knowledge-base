# std::experimental::filesystem::filesystem_error::filesystem_error

|  |  |  |
| --- | --- | --- |
| `filesystem_error( const string& what_arg, error_code ec );` | (1) | (filesystem TS) |
| `filesystem_error( const string& what_arg, const path& p1, error_code ec );` | (2) | (filesystem TS) |
| `filesystem_error( const string& what_arg, const path& p1, const path& p2, error_code ec );` | (3) | (filesystem TS) |

Constructs a new filesystem error object. The explanatory string is set to `what_arg`, error code is set to `ec` and optionally, the paths that were involved in the operation that resulted in the error, are set to `p1` and `p2`.

### Parameters

This section is incomplete

### See also

This section is incomplete
