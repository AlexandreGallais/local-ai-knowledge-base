# std::experimental::filesystem::directory_iterator::directory_iterator

|  |  |  |
| --- | --- | --- |
| `directory_iterator();` | (1) | (filesystem TS) |
| `explicit directory_iterator( const path& p );` | (2) | (filesystem TS) |
| `directory_iterator( const path& p, error_code& ec );` | (3) | (filesystem TS) |
| `directory_iterator( const directory_iterator& ) = default;` | (4) | (filesystem TS) |
| `directory_iterator( directory_iterator&& ) = default;` | (5) | (filesystem TS) |

Constructs a new directory iterator.

1) Constructs the end iterator.

2) Constructs a directory iterator that refers to the first directory entry of a directory identified by `p`. If `p` refers to a non-existing file or not a directory, returns the end iterator.

### Parameters

This section is incomplete

### Exceptions

1)

`noexcept` specification:

`noexcept`

2) `filesystem_error` if an error occurs. The exception object is constructed with `p` as an argument.

3)

`noexcept` specification:

`noexcept`

### Notes

To iterate over the current directory, construct the iterator as `directory_iterator(".")` instead of `directory_iterator("")`.
