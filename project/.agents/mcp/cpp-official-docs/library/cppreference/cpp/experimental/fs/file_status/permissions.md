# std::experimental::filesystem::file_status::permissions

|  |  |  |
| --- | --- | --- |
| `perms permissions() const;` | (1) | (filesystem TS) |
| `void permissions( perms perm );` | (2) | (filesystem TS) |

Accesses the file permissions information.

1) Returns file permissions information.

2) Sets file type to `perm`.

### Parameters

perm - file permissions to set to

### Return value

1) File permissions information.

2) (none)

### Exceptions

`noexcept` specification:

`noexcept`
