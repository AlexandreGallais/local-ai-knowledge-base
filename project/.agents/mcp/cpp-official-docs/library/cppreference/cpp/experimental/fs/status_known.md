# std::experimental::filesystem::status_known

| Defined in header `<experimental/filesystem>` |  |  |
| --- | --- | --- |
| `bool status_known( file_status s );` | (1) | (filesystem TS) |

Checks if the given file status is known, Equivalent to `s.type() != file_type::none`.

### Parameters

s - file status to check

### Return value

`true` if the given file status is an unknown file status.

### Exceptions

`noexcept` specification:

`noexcept`

### Notes

Despite the name, the function checks for the file status of `file_type::none` (meaning an error occurred), not `file_type::unknown` (meaning file exists, but its type cannot be determined).

### See also

|  |  |
| --- | --- |
| status, symlink_status | determines file attributes determines file attributes, checking the symlink target (function) |
| status, symlink_status | cached status of the file designated by this directory entry cached symlink_status of the file designated by this directory entry (public member function of `std::experimental::filesystem::directory_entry`) |
