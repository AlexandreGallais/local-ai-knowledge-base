# std::experimental::filesystem::file_status::type

|  |  |  |
| --- | --- | --- |
| `file_type type() const;` | (1) | (filesystem TS) |
| `void type( file_type type );` | (2) | (filesystem TS) |

Accesses the file type information.

1) Returns file type information.

2) Sets file type to `type`.

### Parameters

type - file type to set to

### Return value

1) File type information.

2) (none)

### Exceptions

`noexcept` specification:

`noexcept`
