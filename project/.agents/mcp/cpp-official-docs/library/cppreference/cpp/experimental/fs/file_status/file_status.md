# std::experimental::filesystem::file_status::file_status

|  |  |  |
| --- | --- | --- |
| `file_status( const file_status& ) = default;` | (1) | (filesystem TS) |
| `file_status( file_status&& ) = default;` | (2) | (filesystem TS) |
| `explicit file_status( file_type type = file_type::none, perms permissions = perms::unknown );` | (3) | (filesystem TS) |

Constructs a new `file_status` object.

1) Default copy constructor.

2) Default move constructor.

3) Initializes the file status object with `type` as type and `permissions` as permissions.

### Parameters

This section is incomplete

### Exceptions

`noexcept` specification:

`noexcept`
